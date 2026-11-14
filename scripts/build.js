const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const root = path.resolve(__dirname, '..');
const contentDir = path.join(root, 'content');
const outputDir = path.join(root, 'dist');
const allowedKeys = new Set(['slug', 'date', 'vendor', 'genre', 'kind', 'url', 'evidenceType', 'evidenceText', 'evidenceCite', 'evidenceItems']);

function filesIn(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name, 'en')).flatMap(entry => {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) return filesIn(full);
    return entry.isFile() && entry.name.endsWith('.md') ? [full] : [];
  });
}

function weekDetails(dateString) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) throw new Error('date must be YYYY-MM-DD');
  const date = new Date(`${dateString}T00:00:00Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== dateString) throw new Error('invalid calendar date');
  const monday = new Date(date);
  monday.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 6) % 7);
  const thursday = new Date(monday);
  thursday.setUTCDate(monday.getUTCDate() + 3);
  const isoYear = thursday.getUTCFullYear();
  const yearStart = new Date(Date.UTC(isoYear, 0, 1));
  const week = Math.ceil((((thursday - yearStart) / 86400000) + 1) / 7);
  const sunday = new Date(monday);
  sunday.setUTCDate(monday.getUTCDate() + 6);
  const short = d => `${String(d.getUTCMonth() + 1).padStart(2, '0')}.${String(d.getUTCDate()).padStart(2, '0')}`;
  const weekCode = `W${String(week).padStart(2, '0')}`;
  return { weekId: `${isoYear}-${weekCode}`, weekCode, weekRange: `${short(monday)}–${short(sunday)}` };
}

function parseSignal(file) {
  const text = fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '').replace(/\r\n/g, '\n');
  const match = /^---\n([\s\S]*?)\n---\n+#[ \t]+(.+)\n+([\s\S]*?)\s*$/.exec(text);
  if (!match) throw new Error('expected front matter, a # title, and a summary');
  const fields = {};
  for (const line of match[1].split('\n')) {
    if (!line.trim() || line.trimStart().startsWith('#')) continue;
    const entry = /^([A-Za-z][A-Za-z0-9]*):\s*(.*?)\s*$/.exec(line);
    if (!entry || !allowedKeys.has(entry[1])) throw new Error(`unknown or invalid field: ${line}`);
    const [, key, raw] = entry;
    if (Object.hasOwn(fields, key)) throw new Error(`duplicate field: ${key}`);
    if (raw.startsWith('"') || raw.startsWith('[')) {
      try { fields[key] = JSON.parse(raw); } catch { throw new Error(`invalid quoted value for ${key}; use JSON double quotes`); }
    } else fields[key] = raw;
  }
  for (const key of ['slug', 'date', 'vendor', 'genre', 'kind', 'url']) {
    if (typeof fields[key] !== 'string' || !fields[key].trim()) throw new Error(`missing or invalid ${key}`);
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(fields.slug)) throw new Error('slug must contain lowercase letters, digits, and hyphens');
  if (!['primitive', 'insight'].includes(fields.kind)) throw new Error('kind must be primitive or insight');
  let url;
  try { url = new URL(fields.url); } catch { throw new Error('url must be an absolute http(s) URL'); }
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error('url must be an absolute http(s) URL');
  const title = match[2].trim();
  const summary = match[3].trim();
  if (!title || !summary || /\n\s*\n/.test(summary)) throw new Error('title and a single summary paragraph are required');
  const result = { slug: fields.slug, date: fields.date, ...weekDetails(fields.date), vendor: fields.vendor, genre: fields.genre, kind: fields.kind, title, url: fields.url, summary: summary.replace(/\n/g, ' ') };
  const evidenceKeys = ['evidenceType', 'evidenceText', 'evidenceCite', 'evidenceItems'];
  if (evidenceKeys.some(key => Object.hasOwn(fields, key))) {
    if (fields.evidenceType === 'quote' && typeof fields.evidenceText === 'string' && fields.evidenceText.trim() && (!Object.hasOwn(fields, 'evidenceCite') || typeof fields.evidenceCite === 'string') && !Object.hasOwn(fields, 'evidenceItems')) {
      result.evidence = { type: 'quote', text: fields.evidenceText };
      if (Object.hasOwn(fields, 'evidenceCite')) result.evidence.cite = fields.evidenceCite;
    } else if (fields.evidenceType === 'metrics' && Array.isArray(fields.evidenceItems) && fields.evidenceItems.length && fields.evidenceItems.every(item => typeof item === 'string' && item.trim()) && !Object.hasOwn(fields, 'evidenceText') && !Object.hasOwn(fields, 'evidenceCite')) {
      result.evidence = { type: 'metrics', items: fields.evidenceItems };
    } else throw new Error('invalid evidence fields; see README');
  }
  return result;
}

const seen = new Set();
const signals = filesIn(contentDir).map(file => {
  try {
    const signal = parseSignal(file);
    if (seen.has(signal.slug)) throw new Error(`duplicate slug: ${signal.slug}`);
    seen.add(signal.slug);
    return signal;
  } catch (error) { throw new Error(`${path.relative(root, file)}: ${error.message}`); }
}).sort((a, b) => b.date.localeCompare(a.date));
if (!signals.length) throw new Error('No Markdown signals found in content/');
fs.mkdirSync(outputDir, { recursive: true });
for (const name of fs.readdirSync(outputDir)) {
  if (/^(?:content(?:-[0-9a-f]{16})?\.js|archive-[0-9a-f]{16}\.json)$/.test(name)) {
    fs.unlinkSync(path.join(outputDir, name));
  }
}
const latestDate = signals[0].date;
const latest = signals.filter(signal => signal.date === latestDate);
const archive = signals.filter(signal => signal.date !== latestDate);
const archiveCounts = { all: archive.length, primitive: 0, insight: 0 };
for (const signal of archive) archiveCounts[signal.kind]++;
const safeJson = value => JSON.stringify(value, null, 2).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
const archiveJson = safeJson(archive);
const digest = value => crypto.createHash('sha256').update(value).digest('hex').slice(0, 16);
const archiveFile = `archive-${digest(archiveJson)}.json`;
fs.writeFileSync(path.join(outputDir, archiveFile), archiveJson);
const bootstrap = `${fs.readFileSync(path.join(root, 'weekly.js'), 'utf8')}\nvar SIGNALS = ${safeJson(latest)};\nvar ARCHIVE_COUNTS = ${safeJson(archiveCounts)};\nvar ARCHIVE_URL = ${JSON.stringify(archiveFile)};\n`;
const contentFile = `content-${digest(bootstrap)}.js`;
fs.writeFileSync(path.join(outputDir, contentFile), bootstrap);
const page = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
if (!page.includes('src="content.js"')) throw new Error('Missing content.js script tag in index.html');
fs.writeFileSync(path.join(outputDir, 'index.html'), page.replace('src="content.js"', `src="${contentFile}"`));
console.log(`Built ${signals.length} signals into dist/`);

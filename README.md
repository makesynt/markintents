# MarkIntents

静态网站由 GitHub Actions 构建并部署到 GitHub Pages。每条资讯是一份 Markdown；`weekly.js` 保存每周结音；`index.html` 保存页面和交互。

## 内容来源与选题

MarkIntents 关注 AI 技术和组织变化，沿用两类资讯。

- **Primitive** 通过发布者的博客或 X 账号发现更新。以官方 changelog 核验产品、模型和 API 的变化，标题直接链接到对应更新条目。
- **Insight** 关注工程实践、研究和 AI 对组织的影响。优先选 MIT Sloan 和 INSEAD Knowledge 的具体做法，加入工程团队博客和可核验的演讲访谈。

[完整来源清单](docs/editorial-standard.md#来源清单)

以 Asia/Shanghai 当天为范围，只收录当天首次公开发布的实质变化或可借鉴的观点，按实际合格条数收录。同一事件或观点只收录一次。

## 内容整理与发布方式

资讯的检索、筛选、核验和摘要由 AI 按[试行标准](docs/editorial-standard.md)执行；试运行结果写在 [reports/](reports/)，由维护者决定是否发布。当前 GitHub Actions 只负责检查文件格式、构建和发布网站，**不会自动搜集新闻、核实事实或生成摘要**。

整理资讯时应链接具体原文，核对标题、日期、事实和数字，用自己的话概括其内容与意义；引用或指标应能在原文中找到，并清楚标明来源。对于需要订阅或无法访问全文的文章，只根据实际可核实的内容整理，避免推测。`primitive` 用于记录具体能力、产品或技术变化，`insight` 用于记录实践经验、观点或组织影响。

## 添加资讯

在 GitHub 的 `content/` 中新建以 `.md` 结尾的文件，可以按年份周次建目录，如 `content/2026-W46/agent-update.md`。目录只用于整理；日期对应的 ISO 周次和周范围由构建程序自动计算。文件示例（示例内容和链接请替换）：

```markdown
---
slug: example-agent-update-2026-11-14
date: 2026-11-14
vendor: 示例公司
genre: 产品更新
kind: primitive
url: https://example.com/
---

# 示例：发布一项新的 Agent 工具能力

这里填写一段摘要，可使用 `代码` 标记。
```

- `slug` 全站唯一，只能用小写英文字母、数字和连字符；发布后尽量不要修改，避免旧链接失效。
- `date` 使用 Asia/Shanghai 当天的 `YYYY-MM-DD`，须与核实后的原文首发日期一致。`kind` 只能填 `primitive` 或 `insight`，链接必须以 `https://` 或 `http://` 开头。
- 上方字段支持普通单行文本，也支持 JSON 格式的双引号字符串，如 `vendor: "示例公司"`。如果字段包含双引号或需要转义，请使用 JSON 字符串语法。此处只支持本说明列出的字段，不支持完整 YAML 语法。
- `#` 后是一行标题，下面写一段摘要。页面支持摘要中的反引号代码标记，不支持完整 Markdown 排版。
- 可选择添加证据字段：引用用 `evidenceType: quote`、`evidenceText: "引用内容"`、可选 `evidenceCite: "来源"`；指标用 `evidenceType: metrics` 和 `evidenceItems: ["指标一", "指标二"]`。字段写在第二个 `---` 之前。
- 同日期的资讯按文件路径排序；文件名开头可用数字控制顺序。

提交到 `main` 后，[Actions](https://github.com/makesynt/markintents/actions) 自动校验并发布。失败时可在构建日志看到出错文件和原因；修复后重新提交。首页显示日期最新的资讯，其他日期进入归档。

构建时会将最新一期和历史资讯分别生成：打开首页时只加载当期资讯和归档数量，打开归档或历史资讯链接时才加载历史资讯。同一次访问中再次打开归档会复用已加载的数据；网络失败时页面提供重试。

## 每周结音

在 `weekly.js` 的 `WEEKLY_SONGS` 中参照现有记录添加周度内容，并将 `FEATURED_HOME_WEEK_ID` 改为首页要展示的周次。

发布 MP3 时，把文件存到 `audio/`，在对应周次填写 `audioSrc`（例如 `audio/2026-w48-deng-ni-shuo-shou-dao.mp3`）和以秒为单位的 `duration`。可用 `lyricsText` 添加可展开的歌词。构建会将音频复制到网站目录。

## 本地构建

安装 Node.js 24 后，在仓库目录执行 `node scripts/build.js`。构建输出位于 `dist/`，不提交到仓库；通过本地 HTTP 服务预览该目录。网站和仓库都是公开的，请勿提交凭据或私人资料。

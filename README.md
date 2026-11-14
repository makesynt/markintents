# MarkIntents

静态网站由 GitHub Actions 构建并部署到 GitHub Pages。每条资讯是一份 Markdown；`weekly.js` 保存每周结音；`index.html` 保存页面和交互。

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
- `date` 使用 `YYYY-MM-DD`；`kind` 只能填 `primitive` 或 `insight`；链接必须以 `https://` 或 `http://` 开头。
- 上方字段支持普通单行文本，也支持 JSON 格式的双引号字符串，如 `vendor: "示例公司"`。如果字段包含双引号或需要转义，请使用 JSON 字符串语法。此处只支持本说明列出的字段，不支持完整 YAML 语法。
- `#` 后是一行标题，下面写一段摘要。页面支持摘要中的反引号代码标记，不支持完整 Markdown 排版。
- 可选择添加证据字段：引用用 `evidenceType: quote`、`evidenceText: "引用内容"`、可选 `evidenceCite: "来源"`；指标用 `evidenceType: metrics` 和 `evidenceItems: ["指标一", "指标二"]`。字段写在第二个 `---` 之前。
- 同日期的资讯按文件路径排序；文件名开头可用数字控制顺序。

提交到 `main` 后，[Actions](https://github.com/makesynt/markintents/actions) 自动校验并发布。失败时可在构建日志看到出错文件和原因；修复后重新提交。首页显示日期最新的资讯，其他日期进入归档。

## 每周结音

在 `weekly.js` 的 `WEEKLY_SONGS` 中参照现有记录添加周度内容，并将 `FEATURED_HOME_WEEK_ID` 改为首页要展示的周次。

## 本地构建

安装 Node.js 24 后，在仓库目录执行 `node scripts/build.js`。构建输出位于 `dist/`，不提交到仓库；通过本地 HTTP 服务预览该目录。网站和仓库都是公开的，请勿提交凭据或私人资料。

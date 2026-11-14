# MarkIntents

静态网站，使用 GitHub Pages 发布。网页结构与交互在 `index.html`，内容在 `content.js`。

## 更新资讯

在 GitHub 打开 `content.js` 并点击编辑，在 `SIGNALS` 数组中添加或修改一条记录。可复制已有记录作为模板：

- `slug`：唯一标识，使用英文、数字和连字符，发布后尽量不要更改。
- `date`：日期，格式为 `YYYY-MM-DD`；`weekId`、`weekCode` 和 `weekRange` 应与日期对应。
- `vendor`、`genre`、`title`、`url`、`summary`：来源、类型、标题、原文链接和摘要。
- `kind`：只能为 `primitive` 或 `insight`。
- `evidence`：可选；参考已有的 `quote` 或 `metrics` 示例。

内容是 JavaScript：请保留引号、逗号及括号；文本中的单引号需要写成 `\'`。保存前建议先预览并检查链接及事实。

## 更新每周结音

在 `WEEKLY_SONGS` 中按现有格式添加周度记录，并将 `FEATURED_HOME_WEEK_ID` 改为要在首页展示的周次。歌词、时长、和弦及旋律均使用现有数据格式。

## 发布

向 `main` 分支提交修改后，GitHub Pages 会自动重新发布。网站及发布到网站的内容为公开内容，请勿提交凭据或私人资料。

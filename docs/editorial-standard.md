# AI 资讯筛选与摘要标准（试行版）

## 目的与边界

由 AI 执行资料发现、筛选、核验和摘要生成，为 MarkIntents 提供与 AI 技术和组织变化有关的高价值资讯。现阶段由人触发运行，并由维护者决定是否发布；仓库的 GitHub Actions 只构建和部署，不自动搜集或生成内容。试行结果先写入 `reports/`，不要自动添加到 `content/`。

## 输入与范围

- 每次明确运行日期、核验时间和已有资讯。以 Asia/Shanghai 当天为范围，只收录当天首次公开发布的内容。原文给出时间及时区时换算成上海时间，原文只标日期时核对其标注的发布日期。按实际合格条数收录，允许任一分类为空。
- 产品、模型和 API 更新从官方 changelog 获取，包括厂商在官方仓库发布并附有具体变更的版本说明。首页标题直接链接到对应更新条目的页面或锚点，相关公告和文档可补充核验。
- 技术主题：模型、编程工具、Agent、API、工程实践、评估和安全等；组织主题：AI 对协作、管理、人才、组织设计、决策和工作流程的影响。仅在关联具体 AI 能力或应用时入选。
- 组织类选题聚焦实际做法，例如如何调整人机分工、重设审核流程或明确决策责任。略过以企业采用率、问卷统计、投入回报或例行汇报数据为主的选题。实务文章中出现这类数字时，摘要提炼做法及其适用条件。
- 不收入纯广告、无实质信息的预告、未获佐证的传闻、与已有条目重复的同一事件或无可核实内容的候选。检索结果片段、标题和厂商主页只能用于发现，不能单独支撑摘要；打开原文并核验有用内容。

## 来源清单

### Primitive

通过表中发布者的博客或 X 账号发现更新。表中的官方更新入口是产品 changelog 或厂商在官方仓库发布的版本说明。用它核对具体变更、发布时间、发布阶段和适用范围。首页标题直链核对过的具体更新条目。

| 关注对象 | 博客或 X | 官方更新入口 |
| --- | --- | --- |
| Cursor | [Cursor Blog](https://cursor.com/blog) · [@cursor_ai](https://x.com/cursor_ai) | [Cursor 更新日志](https://cursor.com/changelog) |
| OpenAI | [OpenAI News](https://openai.com/news/) · [@OpenAIDevs](https://x.com/OpenAIDevs) | [ChatGPT 与 Codex 更新日志](https://learn.chatgpt.com/docs/changelog) · [OpenAI API 更新日志](https://developers.openai.com/api/docs/changelog) |
| Anthropic | [Anthropic News](https://www.anthropic.com/news) · [Claude Blog](https://claude.com/blog) · [@AnthropicAI](https://x.com/AnthropicAI) | [Claude Code 更新日志](https://code.claude.com/docs/en/changelog) · [Claude Platform 更新日志](https://platform.claude.com/docs/en/release-notes/overview) |
| Google Gemini | [@GeminiApp](https://x.com/GeminiApp) | [Gemini Apps 更新日志](https://gemini.google/release-notes/) · [Gemini API 更新日志](https://ai.google.dev/gemini-api/docs/changelog) · [Gemini CLI 版本记录](https://github.com/google-gemini/gemini-cli/releases) |
| Google Antigravity | [@antigravity](https://x.com/antigravity) | [Antigravity 更新日志](https://antigravity.google/docs/changelog) |
| Google DeepMind | [Google DeepMind Blog](https://deepmind.google/blog/) · [@GoogleDeepMind](https://x.com/GoogleDeepMind) | 按公告涉及的产品查其官方 changelog，例如 [Gemini API 更新日志](https://ai.google.dev/gemini-api/docs/changelog) |
| DeepSeek | [研究与动态](https://deepseek.com/news/) · [@deepseek_ai](https://x.com/deepseek_ai) | [DeepSeek API 更新日志](https://api-docs.deepseek.com/updates/) |

### Insight

优先从 MIT Sloan 和 INSEAD Knowledge 选有具体做法的组织案例。California Management Review 和麦肯锡用于补充。工程博客侧重可核验的 AI 实现、测试、上线和团队实践，也可按选题补查其他工程复盘与研究原文。三个 YouTube 频道的演讲和访谈按下文的字幕、讲稿和时间戳要求核验。

| 来源 | 关注入口 |
| --- | --- |
| MIT Sloan | [AI 专题](https://mitsloan.mit.edu/ideas-made-to-matter/topics/artificial-intelligence) |
| INSEAD Knowledge | [AI 专题](https://knowledge.insead.edu/artificial-intelligence) |
| LangChain Blog | [官方博客](https://www.langchain.com/blog) |
| OpenAI Blog | [工程文章](https://openai.com/news/engineering/) · [研究文章](https://openai.com/news/research/) |
| Claude Code Blog | [Claude Code 文章专题](https://claude.com/resources/articles?products=claude-code) |
| Google Developers Blog | [官方博客](https://developers.googleblog.com/) |
| California Management Review | [Insights](https://cmr.berkeley.edu/insights/) |
| 麦肯锡 | [组织与人才洞见](https://www.mckinsey.com/capabilities/people-and-organization/our-insights) |
| AI Engineer | [YouTube 频道](https://www.youtube.com/@aiDotEngineer) |
| Stanford HAI | [YouTube 频道](https://www.youtube.com/@stanfordhai) |
| MIT Sloan 视频 | [YouTube 频道](https://www.youtube.com/@MITSloan) |

## 筛选与排序

1. 记录来源标题、原文链接、首次发布时间、访问日期和可读取范围。核对是否为当日发布、链接是否对应具体条目，有时区换算时保留原始时间和换算后的时间。无法核实首发日期的候选记入排除记录。
2. 将候选与 `content/` 中现有条目及可查的既往发布记录比对。按具体变化或核心观点去重，将同一次发布的公告与文档、同一篇文章的不同语言版本、同一场演讲及其配套文章分别合并。Primitive 采用对应 changelog 条目的直达链接，Insight 采用最能支撑摘要的原文。有可核实的实质增量时可单独收录，并说明与已有条目的区别。
3. 每条按五项各 0–2 分评分，总分 0–10：
   - **相关性**：0 无直接 AI 关联；1 间接相关；2 直接涉及 AI 能力、实践或组织影响。
   - **新颖性**：0 重复或没有明确新信息；1 有增量但范围有限；2 有明确新功能、新发现或新观点。
   - **影响**：0 影响不明；1 涉及有限用户或场景；2 对目标读者的开发、决策或团队工作有明确意义。
   - **可核验性**：0 核心事实不能在可访问原文中核对；1 只能核实部分内容或为观点性材料；2 原文可核对核心事实、条件和时间。
   - **可操作性**：0 无具体启示；1 有可理解方向；2 有明确的应用场景、限制或决策线索。
4. 相关性和可核验性均至少为 1，且总分至少 6 才进入候选；无论分数，重复、无原文或核心事实无法核实的条目都不入选。按总分降序，同分优先已核实的发布时间较新者；兼顾技术与组织，但不强制来源配额。
5. 检索范围、入选条目及排除理由写进试运行报告。保留 Primitive 和 Insight 两类，空的分类写明当天暂无合格条目。两类都为空时交审阅报告，由维护者决定如何处理。

## 摘要与来源核验

- 一条只讲一个主要事实或观点：中文标题力求明确、简短；摘要通常 1–2 句，说明发生了什么及其相关性，避免未经证实的结论和夸张词。
- 按原文区分产品公告、预览、逐步开放、实验、观点和已正式提供的功能；不把厂商宣传、实验结果或个案当成普遍事实。数字须保留适用条件、时间、对比基准和来源；条件无法核实时删去数字。
- 区分来源声称与独立验证：涉及性能、效率或组织影响的说法注明“据厂商”或“作者认为”，不把推断冒充事实。可以不写证据块；只有可准确溯源且与条件一致时才添加 quote 或 metrics。
- YouTube 视频用于生成 `insight`。以公开字幕、讲稿或发布方的配套资料为依据，核对讲者、发布日期和支撑观点的段落。报告中标注相关时间戳或配套资料的依据。用一两句提炼一个实践或观点，说明适用条件或讲者给出的证据。草稿的 `vendor` 填频道名，`genre` 填「演讲」或「访谈」，`url` 链接具体视频，可附时间戳。
- 若原文发布时间缺失、不可访问、存在冲突或条件不足，记录不确定性；关键事实无法核实时排除。发现过往条目可能不准确时另行标注，未经核验不悄悄覆盖。

## 分类、日期与输出

- `primitive`：明确的新能力、产品/API 变化或技术原语；`insight`：工程经验、研究观点或组织影响。一条只能选择一个分类，以核心内容为准。
- 网站 `date` 是本期的 Asia/Shanghai 日期，格式为 `YYYY-MM-DD`。按当日选题规则，每条原文的首发日期核对后须与该日期一致。原文标注的时间、核验时间、可访问范围和评分记录在试运行报告中。网站按 `date` 显示最新一期，周次自动计算。
- 输出面向人工审阅的报告，包括检索窗口、来源清单、评分、排除理由、每条候选的可核验事实和网站 Markdown 草稿。草稿使用 `slug`、`date`、`vendor`、`genre`、`kind`、`url`、标题和一段摘要，遵守 README 格式；`slug` 唯一、不可复用。
- 明确写出“试运行草稿，尚未发布”；确认可发布后，再逐条放入 `content/` 并提交。代码构建只验证格式，不等于内容事实核验。

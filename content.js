// ========================================================================
// Weekly Coda ("结音") Dataset: Keyed by ISO Week for Home & Weekly Archive
// ========================================================================
var WEEKLY_SONGS = {
  '2026-W45': {
    id: '2026-W45',
    weekCode: 'W45',
    weekRange: '11.02–11.08',
    title: '《静默工作树》',
    duration: 36,
    summary: '凝练自 W45 影子工作树、推理预算原语与验证套件演进：机器于后台静默自愈，人重归纯粹意图。',
    lyrics: [
      { time: 0, text: '影子工作树在后台静默编译，赶在黎明前将幻觉收敛' },
      { time: 6, text: '采样与温度退入历史，算力按思索的深浅落子' },
      { time: 12, text: '五条分支在暗处并行生长，生成早已越过双手的边疆' },
      { time: 18, text: '不再追问每秒倾泻多少字符，只问契约能否替真实作证' },
      { time: 24, text: '编译器的冷光拂过深夜，将躁动的试错一一抚平' },
      { time: 30, text: '唯余验收的灯塔伫立岸边，替沉默的意图丈量航向' }
    ],
    chords: [
      [174.61, 261.63, 329.63, 392.00, 440.00], // Fmaj9
      [164.81, 246.94, 293.66, 392.00, 493.88], // Em7(add11)
      [146.83, 220.00, 261.63, 329.63, 392.00], // Dm9
      [130.81, 196.00, 246.94, 293.66, 329.63], // Cmaj9
      [116.54, 220.00, 293.66, 349.23, 440.00], // Bbmaj7(#11)
      [130.81, 196.00, 261.63, 329.63, 440.00]  // C6/9
    ],
    melody: [
      523.25, 0, 440.00, 392.00,
      493.88, 0, 392.00, 329.63,
      440.00, 0, 392.00, 349.23,
      392.00, 329.63, 293.66, 0,
      440.00, 0, 392.00, 349.23,
      329.63, 392.00, 261.63, 0
    ]
  },
  '2026-W44': {
    id: '2026-W44',
    weekCode: 'W44',
    weekRange: '10.26–11.01',
    title: '《确定性边界》',
    duration: 36,
    summary: '凝练自 W44 百万输出续写、确定性生命周期钩子与自治编排：秩序归于脚本，长卷不断于中途。',
    lyrics: [
      { time: 0, text: '百万长卷在暗夜里续写，断连的潮水不再重头计算' },
      { time: 6, text: '不必再向提示词祈求秩序，确定性已归还冷峻的钩子' },
      { time: 12, text: '每次工具落下一声脆响，都有守门人在边界核验' },
      { time: 18, text: '流水线在无人处自行编排，亚美元的算力穿过晨昏' },
      { time: 24, text: '把模糊的劝诫从记忆擦去，让规则如岩石般不可逾越' },
      { time: 30, text: '当长路终于首尾相接，留白处方见最初的命名' }
    ],
    chords: [
      [155.56, 233.08, 293.66, 349.23, 392.00], // Ebmaj9
      [146.83, 220.00, 261.63, 349.23, 440.00], // Dm7(b13)
      [130.81, 196.00, 233.08, 293.66, 349.23], // Cm9
      [116.54, 174.61, 220.00, 261.63, 293.66], // Bbmaj9
      [103.83, 196.00, 261.63, 311.13, 392.00], // Abmaj7(#11)
      [116.54, 174.61, 233.08, 293.66, 392.00]  // Bb6/9
    ],
    melody: [
      466.16, 0, 392.00, 349.23,
      440.00, 0, 349.23, 293.66,
      392.00, 0, 349.23, 311.13,
      349.23, 293.66, 261.63, 0,
      392.00, 0, 349.23, 311.13,
      293.66, 349.23, 233.08, 0
    ]
  }
};

var FEATURED_HOME_WEEK_ID = '2026-W45';

// ========================================================================
// Curated Frontier Dataset: Strictly Single-Attribute (`kind`: 'primitive' | 'insight')
// ========================================================================
var SIGNALS = [
  {
    slug: 'anthropic-effective-agents-context',
    date: '2026-11-13',
    weekId: '2026-W46',
    weekCode: 'W46',
    weekRange: '11.09–11.15',
    vendor: 'Anthropic',
    genre: 'engineering blog',
    kind: 'insight',
    title: '长程编码 Agent 的上下文腐败治理：用子进程隔离替代单会话累积',
    url: 'https://www.anthropic.com/engineering',
    summary: '当单轮轨迹超过 `64k` tokens 时工具选择准确率显著退化；高可靠系统应将探索性检索下沉至无状态子 Agent，主循环仅接收压缩后的结构化结论契约。',
    evidence: {
      type: 'quote',
      text: 'Treat context window capacity as scarce working memory, not an append-only log.',
      cite: 'Anthropic Engineering'
    }
  },
  {
    slug: 'openai-responses-remote-mcp',
    date: '2026-11-13',
    weekId: '2026-W46',
    weekCode: 'W46',
    weekRange: '11.09–11.15',
    vendor: 'OpenAI',
    genre: 'api release',
    kind: 'primitive',
    title: 'Responses API 原生内置远程 MCP 协议客户端与异步后台执行流',
    url: 'https://platform.openai.com/docs',
    summary: '新增 `remote_mcp` 工具声明与 `background: true` 托管轮询原语，模型可在服务端直接完成跨工具多步握手，无需业务网关维护有状态中转层。',
    evidence: {
      type: 'metrics',
      items: ['Orchestration Hops: N → 1', 'Max Async Window: 30m', 'Zero Client State']
    }
  },
  {
    slug: 'deepseek-asymmetric-moe-flash',
    date: '2026-11-13',
    weekId: '2026-W46',
    weekCode: 'W46',
    weekRange: '11.09–11.15',
    vendor: 'DeepSeek',
    genre: 'model release',
    kind: 'primitive',
    title: 'DeepSeek-V4.1-Flash 上线：采用非对称预填充-解码 MoE 激活架构',
    url: 'https://api-docs.deepseek.com/',
    summary: '总参数 `552B` 下针对重阅读、轻输出负载解耦路由：输入预填充仅激活 `8B` 参数，解码生成激活 `16B` 参数，显著压降仓库级长上下文吞吐的显存开销。',
    evidence: {
      type: 'metrics',
      items: ['Active Params: 8B prefill / 16B decode', 'KV Cache Footprint: -75%']
    }
  },
  {
    slug: 'cursor-shadow-workspace-evals',
    date: '2026-11-07',
    weekId: '2026-W45',
    weekCode: 'W45',
    weekRange: '11.02–11.08',
    vendor: 'Cursor',
    genre: 'engineering blog',
    kind: 'insight',
    title: 'Shadow Workspace 演进复盘：后台静默 LSP 诊断如何收敛多文件幻觉',
    url: 'https://www.cursor.com/blog',
    summary: '在向用户渲染补丁前，先于内核级隐藏工作树运行编译器与类型检查器闭环自愈，比单纯升级更大参数基座模型带来更陡峭的一次采纳率提升。',
    evidence: {
      type: 'metrics',
      items: ['Multi-file Compile Pass: +24%', 'Median Loop Latency: 380ms']
    }
  },
  {
    slug: 'claude-api-effort-deprecation',
    date: '2026-11-05',
    weekId: '2026-W45',
    weekCode: 'W45',
    weekRange: '11.02–11.08',
    vendor: 'Anthropic',
    genre: 'api changelog',
    kind: 'primitive',
    title: 'Claude API 废弃传统概率采样参数，全面收敛至推理预算 Effort 原语',
    url: 'https://docs.anthropic.com/',
    summary: '新版端点移除 `temperature`、`top_p`、`top_k` 字段校验，统一通过 `reasoning.effort` 调节思考深度，存量多模型网关升级前须清理默认透传参数。'
  },
  {
    slug: 'openai-harness-engineering',
    date: '2026-11-03',
    weekId: '2026-W45',
    weekCode: 'W45',
    weekRange: '11.02–11.08',
    vendor: 'OpenAI',
    genre: 'engineering blog',
    kind: 'insight',
    title: '《Harness Engineering》工程复盘：自治编码时代的瓶颈已转移至验证套件',
    url: 'https://openai.com/news/engineering/',
    summary: '当单名工程师可并发调度 5 条以上独立 `git worktree` 异步编码流时，研发吞吐上限不再受限于代码生成速度，而取决于自动化测试密度与架构验收契约。',
    evidence: {
      type: 'quote',
      text: 'Verification harness quality now bounds engineering velocity far more than token generation speed.',
      cite: 'Harness Engineering'
    }
  },
  {
    slug: 'gemini-continuation-protocol',
    date: '2026-10-30',
    weekId: '2026-W44',
    weekCode: 'W44',
    weekRange: '10.26–11.01',
    vendor: 'Google',
    genre: 'vertex ai',
    kind: 'primitive',
    title: 'Gemini API 上线原生断点续写协议与 1M 输出窗口支持',
    url: 'https://blog.google/technology/ai/',
    summary: '开放单次 `1M` 输出上限与有状态 `continuation_token` 续传原语，消除跨文件全量重构与长篇规约生成中的流式断连重算损耗。'
  },
  {
    slug: 'claude-code-subagent-hooks',
    date: '2026-10-28',
    weekId: '2026-W44',
    weekCode: 'W44',
    weekRange: '10.26–11.01',
    vendor: 'Anthropic',
    genre: 'engineering blog',
    kind: 'insight',
    title: 'Claude Code 团队内部实践：确定性生命周期 Hooks 优于系统提示词软约束',
    url: 'https://www.anthropic.com/engineering',
    summary: '格式化、安全扫描与提交规范不应写入 Prompt 消耗模型注意力，而应绑定至 `PreToolUse` / `PostToolUse` 确定性钩子强制拦截，把确定性归还给工程脚本。'
  },
  {
    slug: 'cursor-declarative-agent-sdk',
    date: '2026-10-26',
    weekId: '2026-W44',
    weekCode: 'W44',
    weekRange: '10.26–11.01',
    vendor: 'Cursor',
    genre: 'sdk changelog',
    kind: 'primitive',
    title: 'Cursor 开放声明式 Agent SDK，支持 CI 流水线后台自治编排',
    url: 'https://www.cursor.com/changelog',
    summary: '支持将代码审查、依赖升级与单测修复定义为版本化配置文件，可在无头容器中按单工单 `$0.60–$0.98` 成本区间批量吞吐常规维护任务。'
  }
];


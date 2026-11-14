---
slug: "claude-code-subagent-hooks"
date: "2026-10-28"
vendor: "Anthropic"
genre: "engineering blog"
kind: "insight"
url: "https://www.anthropic.com/engineering"
---

# Claude Code 团队内部实践：确定性生命周期 Hooks 优于系统提示词软约束

格式化、安全扫描与提交规范不应写入 Prompt 消耗模型注意力，而应绑定至 `PreToolUse` / `PostToolUse` 确定性钩子强制拦截，把确定性归还给工程脚本。

---
slug: "anthropic-effective-agents-context"
date: "2026-11-13"
vendor: "Anthropic"
genre: "engineering blog"
kind: "insight"
url: "https://www.anthropic.com/engineering"
evidenceType: "quote"
evidenceText: "Treat context window capacity as scarce working memory, not an append-only log."
evidenceCite: "Anthropic Engineering"
---

# 长程编码 Agent 的上下文腐败治理：用子进程隔离替代单会话累积

当单轮轨迹超过 `64k` tokens 时工具选择准确率显著退化；高可靠系统应将探索性检索下沉至无状态子 Agent，主循环仅接收压缩后的结构化结论契约。

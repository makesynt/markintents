---
slug: "claude-api-effort-deprecation"
date: "2026-11-05"
vendor: "Anthropic"
genre: "api changelog"
kind: "primitive"
url: "https://docs.anthropic.com/"
---

# Claude API 废弃传统概率采样参数，全面收敛至推理预算 Effort 原语

新版端点移除 `temperature`、`top_p`、`top_k` 字段校验，统一通过 `reasoning.effort` 调节思考深度，存量多模型网关升级前须清理默认透传参数。

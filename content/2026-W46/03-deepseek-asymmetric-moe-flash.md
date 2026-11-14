---
slug: "deepseek-asymmetric-moe-flash"
date: "2026-11-13"
vendor: "DeepSeek"
genre: "model release"
kind: "primitive"
url: "https://api-docs.deepseek.com/"
evidenceType: "metrics"
evidenceItems: ["Active Params: 8B prefill / 16B decode","KV Cache Footprint: -75%"]
---

# DeepSeek-V4.1-Flash 上线：采用非对称预填充-解码 MoE 激活架构

总参数 `552B` 下针对重阅读、轻输出负载解耦路由：输入预填充仅激活 `8B` 参数，解码生成激活 `16B` 参数，显著压降仓库级长上下文吞吐的显存开销。

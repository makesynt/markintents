---
slug: "openai-responses-remote-mcp"
date: "2026-11-13"
vendor: "OpenAI"
genre: "api release"
kind: "primitive"
url: "https://platform.openai.com/docs"
evidenceType: "metrics"
evidenceItems: ["Orchestration Hops: N → 1","Max Async Window: 30m","Zero Client State"]
---

# Responses API 原生内置远程 MCP 协议客户端与异步后台执行流

新增 `remote_mcp` 工具声明与 `background: true` 托管轮询原语，模型可在服务端直接完成跨工具多步握手，无需业务网关维护有状态中转层。

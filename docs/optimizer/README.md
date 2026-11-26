# Prompt 优化器模板来源

六个中文模板来自 [linshenkx/prompt-optimizer](https://github.com/linshenkx/prompt-optimizer)，版权 © 2025 linshenkx，许可证为 **AGPL-3.0-only**。完整许可证见 [LICENSE](./LICENSE)。本目录优化器集成代码同样按 AGPL-3.0-only 提供，无担保；允许按许可证再分发。可获取、修改本仓库公开的源码。

- 上游分支：`develop`
- 固定提交：`92c5aaadc43c60243a3ba68a2016183986e04d84`
- 提取日期：2026-10-08
- 上游目录：`packages/core/src/services/template/default-templates/`
- 用户模板：`user-prompt-basic`、`user-prompt-professional`、`user-prompt-planning`
- 系统模板：`general-optimize`、`analytical-optimize`、`output-format-optimize`

`templates.js` 为本地数据快照，保留模板的正文、消息角色、版本和每个文件的固定提交来源链接。只将 TypeScript 对象转为 JavaScript 数据，增加模式和来源元数据；不加载上游应用或模板引擎。

`optimizer.js` 对字符串模板采用上游处理器的 system + user 消息方式；消息数组模板将 `helpers.toJson` 插槽替换为 `JSON.stringify(originalPrompt)`，将 Mustache 分隔符包围的示例（如 `{{...}}`、`{{variable_name}}`）恢复为字面量。只处理模板本身，不二次替换用户输入中的占位符。

浏览器直接通过 DeepSeek 官方接口生成结果；模型默认 `deepseek-flash`，关闭思考，非流式输出。开始优化不保存 API Key；只有点击「保存配置」才会将密钥和模型明文保存在当前浏览器中，可随时清除。站点不保存提示词、优化结果或请求历史。取消、超时和请求失败保留当前页面的上一次成功结果。

## 验证

运行 `node --test tests/optimizer.test.cjs`，检查六个模板的证据装配、占位符保留、请求参数和错误处理。测试使用模拟响应，不发送真实 API 请求。

本机有 Playwright 和 Chromium 时，运行 `node --test tests/ui.test.cjs`；若 Playwright 位于共享目录，可通过 `NODE_PATH` 指定其父级 `node_modules`。浏览器套件加载本仓库的静态页面，并用模拟请求验证搜索、筛选、原文复制、配置、取消、超时和结果保留，不需要真实密钥。

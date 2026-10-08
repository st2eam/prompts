# Prompt Field

一个可浏览、可复制的 AI 技能目录，覆盖图像生成、项目开发与跨端协作。网站展示每条技能的适用场景；复制按钮读取对应来源的原始 SKILL.md，不会复制中文翻译或站内改写。

网站：<https://st2eam.github.io/prompts/>

| 技能 | 类型 | 原始 Skill |
| --- | --- | --- |
| 摄影记忆面板 | 图像生成 | [photo-abstract-editorial](https://github.com/ZzzLc0405/photo-abstract-editorial/blob/main/SKILL.md) |
| 照片提炼海报 | 图像生成 | [scene-distillation-zine-v1-3](https://github.com/Zeejay0/gathered-scenes-zine-skill/blob/main/skills/scene-distillation-zine-v1-3/SKILL.md) |
| 实景拼贴海报 | 图像生成 | [scenes-gathered-zine-v1-3](https://github.com/Zeejay0/gathered-scenes-zine-skill/blob/main/skills/scenes-gathered-zine-v1-3/SKILL.md) |
| 主题双联版画海报 | 图像生成 | [.agents/skills/print-diptych-poster/SKILL.md](.agents/skills/print-diptych-poster/SKILL.md) |
| 照片等距双联海报 | 图像生成 | [.agents/skills/photo-isometric-diptych-poster/SKILL.md](.agents/skills/photo-isometric-diptych-poster/SKILL.md) |
| 照片印象派厚涂双联海报 | 图像生成 | [.agents/skills/photo-impressionist-impasto-diptych/SKILL.md](.agents/skills/photo-impressionist-impasto-diptych/SKILL.md) |
| 照片纸雕编辑双联海报 | 图像生成 | [.agents/skills/photo-editorial-paper-diptych/SKILL.md](.agents/skills/photo-editorial-paper-diptych/SKILL.md) |
| 城市风景淡彩水彩双联海报 | 图像生成 | [.agents/skills/photo-watercolor-diptych-poster/SKILL.md](.agents/skills/photo-watercolor-diptych-poster/SKILL.md) |
| XXD Panel 066 视觉面板 | 图像生成 | [.agents/skills/xxd-panel-066/SKILL.md](.agents/skills/xxd-panel-066/SKILL.md) |
| 黑白蜡笔信息图 | 图像生成 | [.agents/skills/black-white-crayon-infographics/SKILL.md](.agents/skills/black-white-crayon-infographics/SKILL.md) |
| AI 原生前端项目 | 项目开发 | [.agents/skills/new-project/SKILL.md](.agents/skills/new-project/SKILL.md) |
| 微信小程序与 H5 | 跨端开发 | [.agents/skills/wechat-mini-program/SKILL.md](.agents/skills/wechat-mini-program/SKILL.md) |

本地技能统一放在 `.agents/skills/`。网站是零构建的静态页面，文件在 docs/，由 GitHub Pages 从 main 分支的 /docs 目录发布。示例图位于 docs/images/，仅用于理解图像类技能的视觉方向；原始照片没有加入仓库。

技能原文来自表格链接所指的文件；本地技能（包括黑白蜡笔信息图）直接使用本仓库的 SKILL.md。使用或再发布前，请查看每个 Skill 的许可证与使用条款。

## 首页 Prompt 优化器

首页支持通过 DeepSeek 一键优化用户提示词或系统提示词，各提供三个中文模板。输入 Prompt，展开「DeepSeek 配置」，填写自己的 API Key 与模型名称（默认 `deepseek-flash`），保存后点击「开始优化」，即可复制优化结果。

配置默认记在当前浏览器中，API Key 以明文存储；请仅在自己的设备使用，随时可点击「清除配置」。浏览器阻止存储时，配置只在当前页面使用。Prompt 和结果不保存，请求直接发送到 DeepSeek 官方接口。支持取消请求及 120 秒超时恢复；网络、跨域、余额或认证问题会显示恢复提示。

模板来自 Prompt Optimizer 的固定提交，版权、AGPL-3.0-only 许可证和提取说明见 [优化器来源说明](docs/optimizer/README.md)。本目录优化器集成同样按 AGPL-3.0-only 提供，源码公开于本仓库。

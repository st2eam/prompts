# Prompt Field

四种基于照片创作的视觉提示词。先在网站查看同一张黄鹤楼照片的不同示例效果，再复制独立 Prompt，粘贴到支持图像生成的 Agent 并附上自己的照片。

网站：<https://st2eam.github.io/prompts/>

| 风格 | 本地 Skill |
| --- | --- |
| 摄影记忆面板 | `.agents/skills/photo-abstract-editorial` |
| 照片提炼海报 | `.agents/skills/scene-distillation-zine-v1-3` |
| 实景拼贴海报 | `.agents/skills/scenes-gathered-zine-v1-3` |
| 喜茶风涂鸦海报 | `.agents/skills/heytea-doodle-poster` |

网站是零构建的静态页面，文件在 `docs/`，由 GitHub Pages 从 `main` 分支的 `/docs` 目录发布。示例图位于 `docs/images/`，均由用户提供的同一张照片生成；原始照片没有加入仓库。

网页中的 Prompt 是方便直接粘贴的便携改写版；完整工作流与使用条款请查看各 Skill 及其原作者仓库。涂鸦海报仅借鉴视觉语言，不代表喜茶官方作品或合作。

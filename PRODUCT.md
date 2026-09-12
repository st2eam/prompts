# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

假设主要用户是使用 Codex、Claude Code 或其他 AI Agent 的开发者与创作者。他们在执行具体任务时，需要快速找到合适的技能，并复制完整原文使用。

## Product Purpose

Prompt Field 是一个可浏览的 AI 技能目录。它让用户按类型浏览技能，理解输入要求，查看示例或原始文件状态，并复制对应的原始 SKILL.md。成功标准是用户能在几秒内找到合适技能并完成复制。

## Positioning

目录把仓库内技能与外部技能放在同一套可筛选、可验证的使用入口中；复制内容始终来自对应的原始 SKILL.md，而不是站内翻译或摘要。

## Operating Context

用户通常带着明确任务进入页面，在桌面或移动浏览器中扫描列表、按类型筛选、查看详情，然后把 SKILL.md 粘贴到 Agent 输入框。部分技能需要用户同时提供图片，部分工程技能不需要图片。

## Capabilities and Constraints

- 零构建静态 HTML、CSS、JavaScript 页面。
- 当前目录包含图像生成、项目开发和微信小程序/H5 跨端技能。
- 技能原文通过对应 URL 异步读取，读取失败时必须提供明确恢复路径。
- 页面不应把所有技能都假设为图像生成。
- 复制动作必须复制原始 SKILL.md 全文。
- 不凭空编造技能内容、示例、许可证或用户评价。

## Brand Commitments

保留 Prompt Field 名称、仓库链接、现有示例图和中文界面。视觉表达可以重置，但不改变技能原文和来源归属。

## Evidence on Hand

- 页面入口：docs/index.html
- 页面脚本：docs/app.js
- 页面样式：docs/styles.css
- 示例资源：docs/images/
- 本地技能：skills/new-project/SKILL.md、skills/wechat-mini-program/SKILL.md
- 仓库说明：README.md
- 没有用户评价、转化数据或真实使用时长数据，不应虚构。

## Product Principles

- 先按任务找到技能，再阅读完整原文。
- 使用场景和输入要求必须比装饰更容易扫描。
- 原始内容、来源和失败恢复路径要明确可信。
- 图像技能与工程技能平等呈现。
- 复制应是短路径，但不能牺牲内容真实性。

## Accessibility & Inclusion

页面应支持键盘操作、清晰焦点、足够对比度、移动端阅读和减少动画偏好。状态文案使用明确的中文恢复提示。

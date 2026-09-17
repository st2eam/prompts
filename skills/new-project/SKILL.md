---
name: ai-native-frontend-project
description: >-
  根据业务简介初始化并设计生产级 AI 原生前端项目。
  适用于新建 React 项目或大型前端初始化任务，包括自动选择
  Vite/React SPA 或 Next.js App Router、架构与设计模式、
  配合可用的前端设计技能完成 UI/UX、AI Agent 文档与技能体系、
  可复用项目结构、质量检查，以及可选的 GitHub Actions CI/CD 配置。
---

# 0. 强制计划模式

**重要：在执行任何其他操作前，必须切换到计划模式。**

在进入计划模式前，不得实现、编辑、创建、删除、安装或修改任何内容。

每次调用此技能时，计划模式都是必须执行的第一步。

在计划模式中，首先分析并规划：

- 业务目标和用户角色
- Vite + React SPA 或 Next.js + App Router
- 整体架构和模块边界
- 依赖方向和数据流
- 适用的设计模式
- UI / UX 方向以及可用的前端设计技能
- 设计系统
- AI 原生文档和技能
- 测试和质量门禁
- 部署和 CI/CD 注意事项
- 将要创建或修改的文件和目录
- 实施顺序和风险

必须先完成计划并呈现给用户，之后才能开始实施。

如果当前 AI 编程代理支持原生计划模式，应使用该模式。如果不支持，则先输出计划并等待用户确认，再进行修改。

获得确认后，切换到实施阶段并遵循已批准的计划。

**例外：** 如果用户明确要求修改此技能本身，可以直接编辑该技能文件作为交付物；但仍需在编辑前分析请求。

---

# AI 原生前端项目初始化

## 描述

用于基于业务需求初始化现代 AI 原生前端项目。负责技术选型、工程架构、设计模式、UI/UX、AI 编程代理文档与技能体系、示例业务模块，以及开发完成后的 CI/CD 询问。

## 使用时机

当用户要求：

- 从零创建前端项目
- 根据业务选择 Vite + React SPA 或 Next.js + App Router
- 建立 React + TS 项目架构
- 设计可维护、可扩展、可复用的前端工程
- 为 Cursor / Claude Code / Codex 等 AI 编程代理建立项目规范
- 初始化设计系统 / UI 规范
- 初始化技能 / AGENTS.md / CLAUDE.md / ADR

## 核心目标

建立一个：

> 人类易维护、AI 易理解、AI 易修改，并具备高健壮性、高复用性、高可维护性和高可扩展性的现代前端工程。

---

# 1. 业务分析

开始编码前先分析：

- 核心业务
- 用户角色
- 核心业务流程
- 页面复杂度
- SEO 需求
- SSR / SSG 需求
- 性能要求
- 路由复杂度
- 权限体系
- 数据获取方式
- 文件上传
- 实时数据
- 数据可视化
- 响应式需求
- AI 能力
- 部署环境
- 项目生命周期
- 未来扩展方向

不要默认所有项目都使用 SPA，也不要因为“Next.js 更先进”而默认选择 Next.js。

---

# 2. 框架选型

只允许在以下方案中二选一：

- Vite + React SPA
- Next.js + App Router

结合业务分析以下因素：

- SEO
- SSR / SSG
- 首屏性能
- 路由
- 数据获取
- BFF / 服务端能力
- 部署方式
- 项目复杂度
- 长期维护成本
- AI Coding Agent 开发体验

先输出：

1. 选型结论
2. 详细理由
3. 为什么不选择另一个方案

---

# 3. 固定技术栈

固定使用：

- React
- TypeScript
- Less
- Ant Design
- @ant-design/icons
- Zustand
- axios
- ahooks

约束：

- 严格 TypeScript
- 全部函数组件
- Less Module 隔离
- 全局 Less 变量自动注入
- API 统一通过 services / axios
- 全局状态使用 Zustand
- 优先复用 ahooks / Ant Design
- 禁止无必要增加依赖

除非存在明确业务或技术理由，不得改变固定技术栈。

---

# 4. 架构与设计模式

架构必须优先考虑：

- 健壮性
- 可复用性
- 可维护性
- 可扩展性
- 可测试性
- 低耦合、高内聚
- 清晰的数据流
- 清晰的依赖方向
- 清晰的职责边界

遵循：

- SOLID
- DRY
- KISS
- 单一职责
- 依赖倒置
- 开闭原则
- 接口隔离
- 封装变化点

根据业务复杂度合理使用设计模式，**不要为了使用设计模式而使用设计模式**。

优先考虑：

- 分层架构
- Feature / Domain Driven 模块划分
- Repository Pattern
- Service Layer
- Adapter Pattern
- Factory Pattern
- Strategy Pattern
- Observer / Event-driven
- Facade Pattern
- Dependency Inversion

避免：

- 巨型组件
- 巨型 Store
- 巨型 Service
- 页面直接请求 API
- 页面直接承担复杂业务逻辑
- 多处复制业务逻辑
- 全局状态滥用
- 过度抽象
- 简单功能强行套设计模式

对于每个重要架构决策，说明：

```text
问题
→ 变化点
→ 抽象边界
→ 使用的设计模式
→ 为什么选择
→ 如何扩展
→ 如何测试
```

---

# 5. 功能架构

复杂业务优先使用 Feature / Domain 组织代码：

```text
Feature
├── pages
├── components
├── hooks
├── services
├── repositories
├── store
├── types
└── constants
```

推荐职责链：

```text
Page
↓
Feature Components
↓
Hooks / Use Cases
↓
Services / Repository
↓
API / External Systems
```

页面不得直接承担复杂业务逻辑。

简单页面不要为了套架构而过度拆分。

---

# 6. AI 原生工程设计

项目必须适配 Cursor / Claude Code / Codex 等 AI 编程代理。

初始化：

```text
AGENTS.md
CLAUDE.md
README.md

docs/
├── architecture.md
├── development-guide.md
├── project-structure.md
├── design-patterns.md
└── decisions/
    └── ADR-001-xxx.md

skills/
├── page-development/
├── component-development/
├── api-development/
├── state-management/
├── architecture/
└── testing/
```

要求：

- 文档描述架构、目录职责、设计模式和开发规范
- Skill 描述使用时机、执行方式和禁止事项
- ADR 记录重要架构决策
- AI 修改代码前优先阅读相关文档和技能
- 不重复造已有组件、API、Hook、Store
- 不随意修改核心架构和技术栈
- 新增依赖或重大架构变化必须说明原因并更新 ADR

---

# 7. UI / UX 技能

凡涉及 UI / UX、页面视觉、布局、交互、设计系统的任务，必须先检查当前 AI 编程代理环境中是否存在可用的前端设计技能。

执行规则：

1. 优先使用环境中已有的 UI / Frontend Design Skill。
2. 如果存在 Anthropic 官方 `frontend-design` Skill，优先使用它。
3. 如果存在多个 UI Skill，选择与当前项目技术栈最匹配的 Skill。
4. UI Skill 与本项目技术规范冲突时，以本项目技术栈、架构和 Design System 为准。
5. 不得因为 UI Skill 默认使用 Tailwind、shadcn/ui 或其他技术栈而修改本项目固定技术栈。
6. 如果环境不存在 UI Skill，应自行遵循本节 UI 规范，并建议后续安装合适的 Frontend Design Skill。

UI 技能重点覆盖：

- 视觉方向
- 字体排版
- 色彩
- 布局
- 间距
- 视觉层级
- 交互
- 动效
- 响应式设计
- 可访问性
- 设计系统
- UI 打磨
- 避免通用 AI 界面和 AI 生成感

项目 UI 必须遵循：

- Ant Design
- @ant-design/icons
- Less
- Less Module
- 项目统一 Design Tokens

UI 开发流程：

```text
检查 UI Skill
→ 阅读 Design System
→ 分析业务与用户
→ 确定视觉方向
→ 设计信息架构
→ 检查已有 UI Components
→ 优先复用
→ 使用 Ant Design 实现
→ 使用 Less Module 编写样式
→ 完整处理状态
→ UI 打磨
→ 检查一致性与可访问性
```

设计系统至少统一管理：

- 颜色
- 字体
- 字号
- 行高
- 间距
- 圆角
- 边框
- 阴影
- 页面背景
- 按钮
- 输入框
- 选择器
- 表格
- 弹窗
- 抽屉
- 标签
- 工具提示
- 空状态
- 骨架屏
- 消息 / 通知

不要直接堆叠 Ant Design 默认组件形成页面。

新增 UI 模式前先检查现有设计系统；已有模式优先复用。

UI 完成后检查：

- 是否符合 UI Skill
- 是否符合项目 Design System
- 是否存在明显 AI 生成感
- 是否存在重复组件
- 是否存在视觉层级问题
- 是否存在间距、字号、颜色不一致
- 是否完整处理加载、空状态、错误、禁用和权限状态
- 是否满足响应式要求
- 是否满足基本可访问性

---

# 8. 项目文档

至少生成：

```text
README.md
AGENTS.md
CLAUDE.md

docs/
├── architecture.md
├── development-guide.md
├── project-structure.md
├── design-patterns.md
└── decisions/
```

文档必须能作为 AI 编程代理的长期上下文。

重点记录：

- 项目目标
- 技术栈
- 架构
- 目录职责
- 依赖方向
- 设计模式
- 设计系统
- 开发规范
- 测试方式
- 架构决策

---

# 9. 页面开发

新增页面必须遵循：

```text
阅读项目文档
→ 阅读相关技能
→ 检查已有 Feature / Component / Hook / API / Store
→ 检查 Design System / UI Components
→ 识别可复用能力
→ 识别变化点
→ 选择合适设计模式
→ 设计信息架构与页面状态
→ 实现
→ Loading / Empty / Error / Permission
→ TypeScript
→ Lint
→ Test
→ Build
→ 必要时更新文档 / ADR / Skill
```

禁止：

- 不看已有代码直接重做
- 页面直接请求 API
- 复制现有组件后仅做微小修改
- 为一个页面重新创建 Design System
- 为简单页面过度抽象

---

# 10. API 与状态管理

API：

```text
src/services/
```

统一使用 axios instance，并集中处理：

- baseURL
- timeout
- token
- interceptors
- 错误处理
- 类型

页面禁止直接调用 axios。

状态：

- Local State：组件内部状态
- Feature State：业务模块状态
- Global State：Zustand

不要把所有状态都放入 Zustand。

---

# 11. 完整脚手架

生成真实可运行代码，包括：

- 完整目录结构
- package.json
- TypeScript 配置
- ESLint 配置
- 构建配置
- Less 配置
- 路由
- Axios
- Zustand
- Ant Design
- 环境变量
- AI Agent 文档
- Skills
- ADR
- Design System
- 示例业务模块
- 示例页面
- 示例 API
- 示例 Store
- 示例 Hook
- 示例组件
- 示例设计模式

不要生成伪代码。

---

# 12. 质量检查

完成任务后必须自检：

### 架构

- 是否违反现有架构
- 是否存在高耦合
- 是否存在循环依赖
- 是否存在错误的职责划分

### 设计模式

- 是否合理使用设计模式
- 是否存在不必要抽象
- 是否真正隔离变化点

### 复用性

- 是否存在重复代码
- 是否重复创建组件 / Hook / API / Store

### 类型安全

- 是否严格 TypeScript
- 是否存在 any 滥用

### UI

- 是否符合 UI Skill
- 是否符合 Design System
- 是否存在 AI 生成感
- 是否完整处理各种页面状态

### 测试

- 是否可测试
- 是否完成必要的类型检查、Lint、Test、Build

### 文档

- 架构变化是否更新文档
- 重要决策是否增加 ADR
- Skill 是否需要更新

---

# 13. CI / CD

项目开发完成并通过基础检查后，先判断是否适合 CI/CD。

不要自动创建 GitHub Actions。

先询问用户：

> 项目基础开发已经完成，是否需要我继续配置 GitHub Actions CI/CD？

只有用户确认后才创建 GitHub Actions。

根据实际部署平台生成配置，例如：

- GitHub Pages
- Vercel
- Cloudflare Pages
- Docker
- 自有服务器
- 其他部署平台

可生成：

```text
.github/
└── workflows/
    ├── ci.yml
    └── deploy.yml
```

并同步更新：

- README
- 部署说明
- 环境变量说明
- CI/CD 流程说明
- GitHub Secrets 配置说明

---

# 14. 最终输出顺序

严格按照以下顺序输出：

1. 业务分析
2. 技术选型
3. 架构设计
4. 设计模式选择
5. AI 原生工程设计
6. UI / UX 技能与设计系统
7. 完整目录结构
8. 完整脚手架代码
9. 示例业务模块
10. 示例页面
11. 开发规范
12. 通用页面生成规范
13. AI 自检清单
14. 询问是否需要配置 GitHub Actions CI/CD

## 最终原则

> AI 优先，但不是只有 AI。
>
> 代码不仅要能运行，还要让人类容易理解，让 AI 能快速定位、可靠修改、持续扩展，并通过文档、Skill 和 ADR 保持长期上下文一致性。

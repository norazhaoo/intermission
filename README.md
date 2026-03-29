# Intermission (The Playbill) — 项目分析报告

## 项目概述

**名称**: Intermission / The Playbill
**类型**: 微信小程序
**定位**: 戏剧 / 音乐剧爱好者的伴侣应用（Theater enthusiast companion app）

用户可以浏览音乐剧百科、管理演出票务、记录座位偏好、查看日历排期，以及撰写观演评论。

---

## 技术栈

| 层面 | 技术 | 版本 |
|---|---|---|
| 框架 | **Taro** | ^4.1.11 |
| UI 库 | **React** | ^18.3.1 |
| 语言 | **TypeScript** | ^6.0.2 |
| 样式 | **Sass** + **TailwindCSS** (weapp-tailwindcss 适配) | Sass 1.98 / TW 3.4 |
| 构建 | **Webpack 5** + Babel 7 | — |
| 目标平台 | 微信小程序 (`weapp`) | — |

---

## 目录结构

```
intermission/
├── src/
│   ├── app.tsx              # 应用入口，初始化种子数据 & 加载字体
│   ├── app.config.ts        # Taro 路由配置 & TabBar 定义
│   ├── app.scss             # 全局样式 & 剧院风格设计系统
│   ├── components/          # 公用组件
│   │   ├── CurtainDivider/  # 幕布分隔线组件
│   │   └── Icon/            # 图标组件
│   ├── custom-tab-bar/      # 自定义底部导航栏
│   ├── lib/                 # 核心逻辑层
│   │   ├── types.ts         # 数据模型定义
│   │   ├── store.ts         # 本地 Storage CRUD
│   │   ├── data.ts          # 种子数据（9 部经典音乐剧）
│   │   └── hooks.ts         # React Hooks（useShows / useTickets / useReviews）
│   └── pages/               # 11 个页面
│       ├── loading/         # 启动加载页
│       ├── gallery/         # 🔖 剧目画廊（TabBar）
│       ├── tickets/         # 🔖 票务首页（TabBar）
│       ├── seats/           # 🔖 座位视图（TabBar）
│       ├── shows/           # 🔖 剧目列表（TabBar）
│       ├── calendar/        # 🔖 日历排期（TabBar）
│       ├── shows-detail/    # 剧目详情
│       ├── shows-new/       # 新增剧目
│       ├── tickets-add/     # 新增票务
│       ├── tickets-list/    # 票务列表
│       └── gallery-review-new/  # 新增评论
├── openspec/                # OpenSpec 变更管理（含 11 个 change）
├── config/                  # 构建配置
├── tailwind.config.js       # TailwindCSS 配置（剧院色彩体系）
├── tsconfig.json            # TypeScript 配置
└── project.config.json      # 微信开发者工具配置
```

---

## 数据模型

### Show（剧目）

| 字段 | 类型 | 说明 |
|---|---|---|
| id | string | 主键 |
| title | string | 剧名 |
| composer | string | 作曲 |
| synopsis | string | 剧情简介 |
| posterUrl | string | 海报 URL |
| region | enum | broadway / west-end / china / other |
| theater | string | 剧院 |
| runDates | string | 演出时间段 |
| isRunning | boolean | 是否在演 |
| cast | CastMember[] | 演员阵容 |
| awards | string[] | 获奖记录 |
| reviews | ShowReview[] | 剧目评论 |

### Ticket（票务）

| 字段 | 类型 | 说明 |
|---|---|---|
| id | string | 主键 |
| showName | string | 剧目名称 |
| theater | string | 剧院 |
| date / time | string | 演出日期 / 时间 |
| seatAssignment | string | 座位号 |
| purchaseChannel | string | 购票渠道 |

### Review（评论）

| 字段 | 类型 | 说明 |
|---|---|---|
| id | string | 主键 |
| showId / showName | string | 关联剧目 |
| castPerformance | number | 演员表演评分 |
| scenicDesign | number | 舞美设计评分 |
| acousticFidelity | number | 声学还原评分 |
| narrativeFlow | number | 叙事流畅评分 |
| notes | string | 文字评论 |

---

## 设计系统

### 主题色板

应用采用浓郁的**剧院 / 舞台**设计语言：

| 色彩角色 | 色值 | 语义 |
|---|---|---|
| Primary | `#5d000a` | 天鹅绒深红 |
| Primary Container | `#81131a` | 幕布红 |
| Secondary | `#775a19` | 金色装饰 |
| Surface | `#fff9ed` | 羊皮纸暖白 |
| Gold | `#d4af37` | 剧院金 |
| Velvet Dark | `#3a0008` | 深幕布 |

### 全局样式组件

- **`.velvet-bg`** — 天鹅绒渐变背景
- **`.parchment-ticket`** — 羊皮纸票卡风格
- **`.perforation`** — 撕裂线效果（票据装饰）
- **`.ornate-frame`** — 华丽相框边框
- **`.shimmer-gold`** — 金色闪光动画
- **`.curtain-vignette`** — 幕布暗角效果
- **`.btn-theatrical`** — 剧院风格按钮
- **`.btn-gold-outline`** — 金色描边按钮

### 字体

- **Noto Serif** — 标题 / 衬线字体
- **Manrope** — 正文 / 无衬线字体

---

## 数据架构

### 存储方案

使用 **微信小程序本地 Storage**（`Taro.getStorageSync` / `Taro.setStorageSync`），无后端服务。

| Storage Key | 数据 |
|---|---|
| `intermission_shows` | 剧目列表 |
| `intermission_tickets` | 票务列表 |
| `intermission_reviews` | 评论列表 |
| `intermission_initialized` | 种子数据初始化标记 |

### 数据流

```
app.tsx (启动时 initSeedData)
    ↓
lib/store.ts (CRUD 操作层，封装 Storage 读写)
    ↓
lib/hooks.ts (useShows / useTickets / useReviews)
    ↓
pages/*.tsx (页面消费 Hook 数据)
```

---

## 路由 & 导航

### 5 个 TabBar 页面

| Tab | 页面 | 图标文字 |
|---|---|---|
| 1 | `pages/gallery` | GALLERY |
| 2 | `pages/tickets` | TICKETS |
| 3 | `pages/seats` | SEATS |
| 4 | `pages/shows` | SHOWS |
| 5 | `pages/calendar` | CALENDAR |

### 6 个子页面

`loading` → `shows-detail` → `shows-new` → `tickets-add` → `tickets-list` → `gallery-review-new`

> 使用**自定义 TabBar**（`custom-tab-bar/`），TabBar 颜色与剧院主题一致。

---

## 种子数据

预置了 **9 部经典百老汇音乐剧**：

| 剧目 | 作曲 | 状态 |
|---|---|---|
| The Phantom of the Opera | Andrew Lloyd Webber | 已停演 |
| Hamilton | Lin-Manuel Miranda | 在演 |
| Les Misérables | Claude-Michel Schönberg | 已停演 |
| Wicked | Stephen Schwartz | 在演 |
| The Lion King | Elton John & Tim Rice | 在演 |
| Chicago | John Kander & Fred Ebb | 在演 |
| Rent | Jonathan Larson | 已停演 |
| Hadestown | Anaïs Mitchell | 在演 |
| Cats | Andrew Lloyd Webber | 已停演 |

---

## 项目特点总结

1. **纯前端架构** — 无后端依赖，所有数据存储在微信本地 Storage
2. **精致的剧院设计语言** — 天鹅绒、羊皮纸、金饰等贯穿 UI 视觉风格
3. **Taro 跨端框架** — 当前仅编译为微信小程序，但架构上可扩展到其他平台
4. **完整的 CRUD 功能** — 剧目、票务、评论三大数据模型均支持创建/读取/更新/删除
5. **React Hooks 数据层** — 通过自定义 Hooks 封装数据访问，页面与存储层解耦
6. **OpenSpec 工作流** — 项目使用 OpenSpec 管理变更，已有 11 个变更记录
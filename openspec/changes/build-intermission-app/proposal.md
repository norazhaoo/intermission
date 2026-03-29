## Why

Intermission 是一款面向戏剧爱好者的微信小程序，用于追踪、评价和保存他们的现场演出体验。目前戏剧观众缺乏一款专门设计精美的工具来整理票务、记录看过的剧目、撰写演出评论以及浏览音乐剧数据库。本应用以高端的剧院美学风格填补这一空白——天鹅绒幕布、羊皮纸质感、金色镶边——向戏剧艺术本身致敬。

## What Changes

- 使用 Taro + React 构建一个完整的微信小程序，包含 5 个核心标签页：画廊 (Gallery)、票务 (Tickets)、座位 (Seats)、剧目 (Shows) 和日历 (Calendar)
- 实现 **座位体验 (Seats)** 标签页，支持记录座位位置、视野评分、备注，并可从票务记录自动关联
- 实现一个剧院风格的启动屏幕，带有幕布动画效果和进度指示器
- 创建 **大画廊 (Grand Gallery)** 用于浏览个人演出历史，以华丽相框展示海报网格，加上演出评论动态流
- 构建 **票务管理器 (Ticket Organizer)** 支持手动添加票、扫描票和可浏览的票务收藏（即将/过往视图）
- 实现 **剧目数据库 (Shows Database)** 带搜索、剧目详情页（剧情简介、演员阵容、奖项、评论）以及手动录入未收录剧目
- 添加 **日历/票房 (Calendar/Box Office)** 视图，按日期展示演出，包含月度日历
- 创建 **演出评论 (Performance Review)** 系统（称为"Repo"），支持多维度评分和日记功能
- 建立统一的设计系统，使用 Material Design 3 风格令牌（酒红/金/羊皮纸色调），Noto Serif + Manrope 字体，以及剧院风格 UI 组件

## Capabilities

### New Capabilities
- `app-shell`：自定义 TabBar（5 标签页）、页面配置、启动屏幕、Taro 路由和共享布局
- `gallery`：大画廊海报网格（Top 9 + 完整无缝网格）、演出评论动态流、搜索与筛选
- `ticket-management`：票务管理中心（手动添加、扫描、查看）、添加票务表单、即将/过往票务列表
- `seats`：座位体验中心（记录/浏览座位体验）、添加座位表单（区域/排号/座号/视野评分）、座位详情页、从票务关联自动填充
- `show-database`：剧目搜索与浏览、剧目详情页（剧情简介、演员阵容、奖项、评论）、手动剧目录入表单
- `calendar-view`：月度日历含演出日期指示器、按日期排列的节目单列表（票房视图）
- `performance-review`：创建演出评论含多维度评分（演员、舞美、音效、叙事）、日记和节目单扫描
- `seats`：提供真实视野预览与采集功能。
- `design-system`：共享设计令牌、剧院风格 CSS 模式（天鹅绒渐变、羊皮纸质感、华丽相框、幕帘分隔线）、组件库

### Modified Capabilities
_（无——全新项目）_

## Impact

- **全新代码库**：Taro + React 微信小程序，使用 Webpack5 构建
- **依赖项**：`@tarojs/cli`、`@tarojs/components`、TailwindCSS（通过 `weapp-tailwindcss` 适配小程序）、SCSS
- **字体**：小程序不支持外部字体 CDN，需通过 `wx.loadFontFace` 或内嵌字体文件加载 Noto Serif 和 Manrope
- **图标**：Material Symbols 无法在小程序中直接使用，需转为 iconfont 或 SVG 图标方案
- **数据层**：使用 `Taro.setStorageSync` / `Taro.getStorageSync` 替代 localStorage
- **图片处理**：使用 `Taro.chooseImage` 选择图片，临时路径存储（小程序 Storage 限制 10MB）
- **部署**：通过微信开发者工具上传，发布至微信小程序平台

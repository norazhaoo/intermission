## 1. 项目初始化

- [x] 1.1 使用 `npx @tarojs/cli init` 初始化 Taro 项目（选择 React + TypeScript + SCSS + Webpack5）
- [x] 1.2 安装样式依赖：`tailwindcss`、`postcss`、`autoprefixer`、`weapp-tailwindcss`
- [x] 1.3 配置 `postcss.config.js` 启用 Tailwind PostCSS 插件
- [x] 1.4 配置 `tailwind.config.js`：设置 `content` 路径、关闭 `preflight`、添加所有 M3 颜色令牌、字体族（headline/body/label）和圆角值
- [x] 1.5 在 `config/index.ts` 中注册 `UnifiedWebpackPluginV5`（weapp-tailwindcss Webpack 插件）
- [x] 1.6 在 `package.json` 的 `postinstall` 脚本中添加 `weapp-tw patch`
- [x] 1.7 配置 `app.scss` 全局样式，添加 `@import "weapp-tailwindcss"` 引入
- [x] 1.8 配置 `app.config.ts`：定义所有 pages 路径、tabBar（custom: true）、window 默认样式

## 2. 设计系统与共享样式

- [x] 2.1 在 `app.tsx` 的 `onLaunch` 中通过 `Taro.loadFontFace` 加载 Noto Serif 和 Manrope 字体，设置 CSS fallback
- [x] 2.2 准备图标方案：在 iconfont.cn 创建项目，导入 mockup 中约 30 个 Material Symbols 图标，生成 iconfont 文件并引入项目
- [x] 2.3 创建 `Icon` 组件：封装 iconfont 渲染，支持 `name`、`size`、`color` 属性
- [x] 2.4 在全局 SCSS 中实现剧院风格类：`.velvet-bg`（渐变背景）、`.parchment-ticket`（羊皮纸背景）、`.perforation`（虚线撕裂）、`.ornate-frame`（多层边框阴影）、`.shimmer-gold`（金色闪光）
- [x] 2.5 实现 `.btn-theatrical`（天鹅绒渐变按钮 + 点击缩放）和 scrollbar 隐藏工具类

## 3. 应用外壳组件

- [x] 3.1 创建 `src/custom-tab-bar/index.tsx`：5 个标签页（画廊、票务、座位、剧目、日历），使用 `Taro.switchTab` 切换，支持激活态高亮（金色背景 + 填充图标）
- [x] 3.2 创建 `src/custom-tab-bar/index.scss`：自定义 TabBar 样式，与 mockup 底部导航一致
- [x] 3.3 在每个 Tab 页面的 `useDidShow` 中通过 `Taro.getTabBar()?.setSelected(index)` 同步 TabBar 状态
- [x] 3.4 创建共享 `CurtainDivider` 组件（`View` + `Icon` 组件渲染两条线和居中图标）
- [x] 3.5 创建启动屏幕页面 `pages/loading/index.tsx`：幕布背景图、"Intermission" 标题、金色进度条，1 秒后通过 `Taro.switchTab` 跳转到画廊

## 4. 数据层

- [x] 4.1 创建 `src/lib/store.ts`：Taro Storage 抽象层（封装 `getStorageSync`/`setStorageSync`，支持按 key 读写 JSON 数据）
- [x] 4.2 创建 `src/lib/types.ts`：定义 TypeScript 接口：`Show`、`Ticket`、`Review`
- [x] 4.3 创建 `src/lib/data.ts`：种子数据——9+ 预置音乐剧（歌剧魅影、汉密尔顿、魔法坏女巫、悲惨世界、狮子王、芝加哥、吉屋出租、哈迪斯城、猫），包含标题、作曲家和海报 URL
- [x] 4.4 在 `app.tsx` 的 `onLaunch` 中检测首次启动，自动写入种子数据到 Storage
- [x] 4.5 创建自定义 React Hooks：`useShows()`、`useTickets()`、`useReviews()` 封装数据 CRUD 操作

## 5. 画廊功能

- [x] 5.1 创建画廊页面 `pages/gallery/index.tsx`：头部区域（`Text` 标题、成就徽章、`Input` 搜索框、筛选按钮）
- [x] 5.2 实现 Top 9 海报网格（3×3），使用 `Image` + `.ornate-frame` 渲染华丽相框和 `Text` 显示剧目标签
- [x] 5.3 实现完整无缝海报网格（4 列 `View` grid），`Image` 组件 `mode="aspectFill"`
- [x] 5.4 实现演出评论动态流区域：从 Storage 读取评论，渲染评论卡片（`Image` 缩略图、`Text` 日期/引用/标签）
- [x] 5.5 添加 "Missing a Show?" 引导卡片，`Taro.switchTab` 链接到剧目标签页
- [x] 5.6 实现 `Input` 搜索框的筛选逻辑
- [x] 5.7 处理空画廊状态

## 6. 票务管理功能

- [x] 6.1 创建票务中心页面 `pages/tickets/index.tsx`（"My Box Office"），3 个羊皮纸动作按钮，使用 `Taro.navigateTo` 跳转
- [x] 6.2 创建添加票务表单页面 `pages/tickets-add/index.tsx`：`Input` 字段（剧目名称、剧院、时间、座位）、`Picker` 组件（日期选择、购票渠道）
- [x] 6.3 实现表单验证（`Taro.showToast` 提示必填）和 `Taro.setStorageSync` 保存逻辑
- [x] 6.4 创建票务列表页面 `pages/tickets-list/index.tsx`：`ScrollView` 展示"即将到来"/"过往"分区，羊皮纸票卡（`.parchment-ticket` + `.perforation`）
- [x] 6.5 实现票务日期排序（即将到来：正序，过往：倒序）
- [x] 6.6 实现扫描流程：`Taro.chooseImage` 选择图片 → `Taro.saveFile` 保存 → 预览并跳转到添加表单
- [x] 6.7 处理空票务列表状态

## 7. 剧目数据库功能

- [x] 7.1 创建"查找剧目"页面 `pages/shows/index.tsx`：`Input` 搜索框 + `ScrollView` 剧目结果列表
- [x] 7.2 实现剧目搜索，从 Storage 读取数据匹配标题/作曲家
- [x] 7.3 创建剧目详情页 `pages/shows-detail/index.tsx`：通过 `getCurrentInstance().router.params.id` 获取参数，渲染主视觉区域（`Image` + `Text` 叠加标题）
- [x] 7.4 创建剧目详情页剧情简介区域
- [x] 7.5 创建剧目详情页演员阵容网格（4 列 `Image` + `Text`）
- [x] 7.6 创建剧目详情页奖项和制作历史列表
- [x] 7.7 创建剧目详情页观众评论区域，星级评分（`Icon` 组件渲染星星）和评论卡片
- [x] 7.8 创建手动录入表单页面 `pages/shows-new/index.tsx`：`Input`（制作名称、语言）、`Textarea`（首演阵容）、`Taro.chooseImage`（封面上传）、`Picker`（地区）、`Switch`（正在上演）
- [x] 7.9 实现手动录入保存逻辑：`Taro.saveFile` 保存图片 + `Taro.setStorageSync` 保存剧目数据
- [x] 7.10 添加 "Can't find your show?" 区域，`Taro.navigateTo` 链接到手动录入

## 8. 日历功能

- [x] 8.1 创建票房页面 `pages/calendar/index.tsx`：日历头部（`Text` 月/年 + 箭头按钮导航）
- [x] 8.2 实现月度日历网格：7 列 `View` layout、`Text` 星期标题和日期编号
- [x] 8.3 实现月份导航（React state 控制当前年月，点击箭头更新）
- [x] 8.4 从 Storage 读取票务/剧目数据，高亮有关联的日期（边框 + 圆点指示器）
- [x] 8.5 创建按月份分组的时间顺序节目列表（`View` 卡片含日期、星期、剧目名称、剧院）
- [x] 8.6 节目条目点击通过 `Taro.navigateTo` 链接到剧目详情页
- [x] 8.7 处理空日历状态

## 9. 演出评论功能

- [x] 9.1 创建演出评论表单页面 `pages/gallery-review-new/index.tsx`："Act IV: Documentation" 头部
- [x] 9.2 实现节目单上传区域：`Taro.chooseImage` → `Taro.saveFile` → `Image` 组件预览
- [x] 9.3 实现 4 个 `Slider` 评分组件（演员表现、舞美设计、音效保真度、叙事节奏），范围 1–5，步长 1，动态 `Text` 定性标签
- [x] 9.4 实现 `Textarea` 组件的 Patron's Notes 日记（`autoHeight` + 占位文字）
- [x] 9.5 实现 "Stitch Repo" 提交：`Taro.setStorageSync` 保存评论 → `Taro.switchTab` 导航到画廊
- [x] 9.6 通过 `getCurrentInstance().router.params.showId` 获取参数，实现从剧目详情页的预填充功能

## 10. 座位体验功能

- [x] 10.1 在 `src/lib/types.ts` 中新增 `SeatExperience` 接口：`id`、`showName`、`theater`、`section`（Orchestra/Mezzanine/Balcony/Box/Standing）、`row`、`seatNumber`、`date`、`viewRating`（1-5）、`notes`、`linkedTicketId?`、`createdAt`
- [x] 10.2 在 `src/lib/store.ts` 中添加 `seats` 存储 key 和 CRUD 辅助函数
- [x] 10.3 创建 `useSeats()` 自定义 Hook：封装座位体验数据的读写操作
- [x] 10.4 重构座位标签页 `pages/seats/index.tsx`：移除 "Coming Soon" 占位，实现 "My Seats" 中心页面——头部标题、座位体验统计徽章、`Input` 搜索框
- [x] 10.5 实现座位体验列表：`ScrollView` 展示羊皮纸风格座位卡片（`.parchment-ticket`），每张卡片显示剧目名称、剧院、座位位置（区域 + 排 + 号）、日期和星级评分
- [x] 10.6 实现座位列表搜索筛选（按剧目名称/剧院名称匹配）
- [x] 10.7 处理空座位列表状态：显示座位图标 + "No seat experiences yet" 提示 + "Record Your First Seat" 按钮
- [x] 10.8 在 `app.config.ts` 中注册新页面路径：`pages/seats-add/index`、`pages/seats-detail/index`
- [x] 10.9 创建添加座位体验表单页面 `pages/seats-add/index.tsx`：`Input`（剧目名称、剧院名称、排号、座号）、`Picker`（座位区域：Orchestra/Mezzanine/Balcony/Box/Standing）、`Picker`（日期）
- [x] 10.10 实现视野评分组件：5 个可点击星形 `View`（金色填充/空心），点击设置评分值，下方 `Text` 显示定性标签（Obstructed/Limited/Acceptable/Good/Excellent）
- [x] 10.11 实现 `Textarea` 座位备注区域（标题 "Seat Notes"，占位文字 "How was the view? Any obstructions? Legroom?"，`autoHeight`）
- [x] 10.12 实现 "Link from Ticket" 功能：读取已有票务记录，通过 `Taro.showActionSheet` 弹出票务列表供选择，选择后自动填充剧目名称、剧院、日期和座位信息
- [x] 10.13 实现表单验证（剧目名称和座位区域为必填）和 `Taro.setStorageSync` 保存逻辑
- [x] 10.14 创建座位体验详情页 `pages/seats-detail/index.tsx`：通过 `getCurrentInstance().router.params.id` 获取参数，渲染大卡片展示完整座位信息（剧目、剧院、位置、日期、评分、备注）
- [x] 10.15 实现详情页删除功能：`Taro.showModal` 确认对话框 → 从缓存删除记录 → `Taro.navigateBack`

## 11. 完善与集成测试

- [ ] 11.1 在微信开发者工具中验证所有导航流程（`switchTab`、`navigateTo`、`navigateBack`）
- [ ] 11.2 验证自定义 TabBar 在所有 Tab 页面切换时的状态同步和视觉效果
- [ ] 11.3 确保所有数据通过 Taro Storage 在小程序重启后持久化
- [ ] 11.4 测试字体加载（`loadFontFace`）和降级表现
- [ ] 11.5 测试图标系统（iconfont）在各个页面的渲染
- [ ] 11.6 测试 `Taro.chooseImage` + `Taro.saveFile` 的图片选择/保存/预览流程
- [ ] 11.7 检查 `weapp-tailwindcss` 转换后的样式在真机预览中的表现
- [ ] 11.8 验证启动屏幕动画和自动跳转功能
- [ ] 11.9 检查小程序包体积是否在 2MB 主包限制内（如超限考虑分包）

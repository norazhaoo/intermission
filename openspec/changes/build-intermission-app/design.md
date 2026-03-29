## Context

Intermission 是一个全新的微信小程序，面向戏剧爱好者，用于追踪他们的现场演出体验。用户已提供 11 份详细的 HTML mockup，涵盖启动屏幕、画廊视图、票务管理、剧目数据库、日历、演出评论和手动录入表单。这些 mockup 确立了丰富的剧院设计语言：深酒红与金色配色、Noto Serif + Manrope 字体、Material Design 3 风格令牌，以及天鹅绒渐变、羊皮纸质感、华丽相框、幕帘分隔线等装饰性 UI 模式。

当前仓库除 OpenSpec 配置外为空。该应用为微信小程序，使用 Taro + React 开发，无后端服务——v1 版本所有数据存储在小程序本地缓存中。

## Goals / Non-Goals

**目标：**
- 使用 Taro + React 构建与 11 份 mockup 匹配的微信小程序，包含 5 标签页自定义 TabBar
- 实现小程序本地数据持久化（`Taro.setStorageSync`），用户添加的剧目、票务和评论长期保留
- 将 mockup 中的 Tailwind 样式通过 `weapp-tailwindcss` 插件适配为小程序兼容样式
- 所有 UI 组件使用 Taro 跨端组件（`View`、`Text`、`Image`、`ScrollView` 等），不使用 HTML 标签
- 保持沉浸式剧院视觉风格，在小程序环境中尽可能还原 mockup 效果

**非目标：**
- 不构建后端 API 或云开发数据库（v1 完全使用本地 Storage）
- 不实现微信登录或多设备同步
- 不实现真实的购票功能或第三方集成（大麦、猫眼等仅作为参考标签）
- 不实现 AI 驱动的节目单扫描（触发 `Taro.chooseImage` 手动选择图片）
- 不实现暗色模式
- 不实现座位图可视化（但提供座位体验记录、视野评分、从票务关联等功能）
- 不适配 H5 或其他端（仅针对微信小程序优化）

## Decisions

### 1. 框架：Taro + React + TypeScript
**选择**：使用 Taro 框架搭配 React 和 TypeScript 开发微信小程序。
**理由**：Taro 提供成熟的 React 开发体验，自动编译为微信小程序代码。TypeScript 提供类型安全。Taro 的组件体系（`View`、`Text`、`Image`）自动映射为小程序原生组件。
**备选方案**：原生微信小程序（开发效率低），uni-app（Vue 生态，与 mockup 的 React 思维模式不匹配），Taro + Vue（同理）。

### 2. 构建工具：Webpack5（非 Vite）
**选择**：使用 Taro 默认的 Webpack5 构建模式。
**理由**：Taro 的 Vite 模式目前仍不够稳定，Webpack5 模式更成熟，生态插件兼容性更好（尤其是 `weapp-tailwindcss`）。
**备选方案**：Taro Vite 模式（稳定性不足）。

### 3. 样式：TailwindCSS v3 + weapp-tailwindcss
**选择**：使用 TailwindCSS v3，通过 `weapp-tailwindcss` 的 `UnifiedWebpackPluginV5` 插件适配微信小程序。
**理由**：mockup 已使用 Tailwind 编写，大量 class 可直接复用。`weapp-tailwindcss` 会自动转换不兼容的选择器（如 `/`、`:`、`.` 等字符）为小程序安全的类名。需关闭 `preflight`（小程序不需要浏览器 reset）。
**备选方案**：纯 SCSS（需手动转写所有 Tailwind 类，工作量巨大），原子 CSS 手写（维护成本高）。
**配置要点**：
```js
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: { preflight: false },
  theme: { extend: { /* M3 色彩令牌 */ } }
}
```

### 4. 自定义主题颜色令牌
**选择**：在 `tailwind.config.js` 的 `theme.extend.colors` 中定义所有 40+ Material Design 3 颜色令牌。
**理由**：与 mockup 完全一致，开发时可直接使用 `bg-primary`、`text-secondary-container` 等工具类。

### 5. 底部导航：自定义 TabBar（custom: true）
**选择**：使用微信小程序的自定义 TabBar 功能（`tabBar.custom: true`），在 `src/custom-tab-bar/` 目录下创建高度自定义的底部导航组件。
**理由**：mockup 中的底部导航使用了特殊的高亮样式（金色圆角背景、图标填充变化），原生 TabBar 无法实现这些效果。自定义 TabBar 允许完全控制样式和交互。
**注意事项**：
- `app.config.ts` 中仍需声明 `tabBar.list`（含所有 tab 页路径），这是微信框架要求
- 自定义组件中使用 `Taro.switchTab` 进行页面切换
- 每个 tab 页面通过 `Taro.getTabBar()` 更新选中状态
**备选方案**：原生 TabBar（样式受限，无法实现设计稿效果）。

### 6. 数据持久化：Taro Storage API
**选择**：使用 `Taro.setStorageSync` / `Taro.getStorageSync` 存储所有数据（剧目、票务、评论），配合简单的 JSON 存储层。
**理由**：小程序 Storage 限制约 10MB，足够存储结构化数据。API 简单同步，适合 v1。
**备选方案**：微信云开发（增加复杂度，v1 不需要），IndexedDB（小程序不支持）。

### 7. 图片处理：Taro.chooseImage + 临时路径
**选择**：使用 `Taro.chooseImage` 让用户从相册或相机选取图片，存储 `tempFilePath` 到 Storage。不做 base64 编码。
**理由**：小程序的临时文件路径在当前 session 有效。对于需要持久化的图片，使用 `Taro.saveFile` 保存到本地永久路径。避免 base64 编码占用过多 Storage 空间。
**备选方案**：直接存 base64（占用空间太大），云存储（需要后端）。

### 8. 字体方案
**选择**：通过 `Taro.loadFontFace` 动态加载 Noto Serif 和 Manrope 字体（从 CDN 或小程序包内）。
**理由**：小程序不支持 `<link>` 标签加载外部字体，`loadFontFace` 是微信官方推荐方案。
**备选方案**：字体文件内嵌到小程序包（增加包体积，可能超过 2MB 限制），仅使用系统字体（丢失设计感）。
**降级方案**：如果字体加载失败，`font-headline` 降级为系统衬线体 `serif`，`font-body` 降级为系统无衬线体 `sans-serif`。

### 9. 图标方案
**选择**：将 Material Symbols 转为 iconfont（通过 iconfont.cn）或 SVG 组件形式使用。
**理由**：小程序不支持 Google Fonts 的 Material Symbols Outlined 字体链接。需要将用到的图标（约 30 个）提取为 iconfont 或独立 SVG。
**备选方案**：使用微信原生图标（风格不匹配），PNG 切图（不灵活）。

### 10. 项目结构
```
src/
  app.config.ts          # 全局配置：pages、tabBar、window
  app.tsx                 # 应用入口
  app.scss               # 全局样式（Tailwind @import）
  custom-tab-bar/         # 自定义 TabBar 组件（微信框架指定目录）
    index.tsx
    index.scss
  components/             # 共享组件：TopBar、CurtainDivider、OrnateFrame 等
  pages/
    loading/              # 启动屏幕
    gallery/              # 画廊标签页
      index.tsx
      index.scss
    gallery-review-new/   # 创建演出评论
    tickets/              # 票务中心标签页
    tickets-add/          # 添加票务
    tickets-list/         # 票务列表
    shows/                # 查找剧目标签页
    shows-detail/         # 剧目详情
    shows-new/            # 手动录入
    calendar/             # 日历/票房标签页
    seats/                # 座位体验中心标签页
    seats-add/            # 添加座位体验
    seats-detail/         # 座位体验详情
  lib/
    store.ts              # Storage 抽象层
    data.ts               # 种子数据
    types.ts              # 数据类型定义
  assets/
    icons/                # iconfont 或 SVG 图标
    images/               # 本地图片资源
config/
  index.ts                # Taro 构建配置（含 weapp-tailwindcss 插件）
tailwind.config.js        # Tailwind 自定义主题
postcss.config.js         # PostCSS 配置
```

### 11. 路由结构（pages 配置）
```
pages/loading/index        → 启动屏幕（定时跳转到画廊）
pages/gallery/index        → 大画廊（海报网格 + 评论）[TabBar]
pages/gallery-review-new/index → 创建演出评论
pages/tickets/index        → 票务管理中心 [TabBar]
pages/tickets-add/index    → 添加票务表单
pages/tickets-list/index   → 即将/过往票务列表
pages/shows/index          → 查找剧目 [TabBar]
pages/shows-detail/index   → 音乐剧详情页（通过 ?id= 传参）
pages/shows-new/index      → 手动录入表单
pages/calendar/index       → 票房日历视图 [TabBar]
pages/seats/index          → 座位体验中心 [TabBar]
pages/seats-add/index      → 添加座位体验表单
pages/seats-detail/index   → 座位体验详情页（通过 ?id= 传参）
```

## Risks / Trade-offs

- **小程序包体积限制（2MB 主包）** → 字体文件和大量图片可能导致超限。_缓解方案_：字体通过 `loadFontFace` 远程加载；图片使用 CDN URL 或分包加载。
- **Storage 容量限制（10MB）** → 大量图片路径和数据可能接近限制。_缓解方案_：使用 `Taro.saveFile` 保存图片到本地文件系统（不占用 Storage）；定期清理过期临时文件。
- **weapp-tailwindcss 兼容性** → 某些 Tailwind 特性（如 `backdrop-filter`、复杂选择器）在小程序中可能不生效。_缓解方案_：测试每个关键 UI 组件在小程序中的表现；用 SCSS fallback 替代不兼容的特性。
- **自定义字体加载延迟** → `loadFontFace` 异步加载可能导致页面初始渲染时使用系统字体闪烁。_缓解方案_：在 `app.tsx` 的 `onLaunch` 中预加载字体；设置 CSS fallback。
- **自定义 TabBar 首屏闪烁** → 微信自定义 TabBar 在首次加载时可能出现短暂闪烁。_缓解方案_：设置 TabBar 背景色与页面背景一致；优化组件渲染逻辑。
- **Material Symbols 替换工作量** → 需要将 mockup 中约 30 个 Material Symbols 图标转为 iconfont/SVG。_缓解方案_：在 iconfont.cn 创建项目统一管理；批量导出。
- **座位体验功能范围** → 不实现座位图可视化，仅提供座位记录与评分功能。_缓解方案_：后续版本可增加剧院座位图可视化。

## ADDED Requirements

### Requirement: 剧院色彩令牌系统
设计系统 SHALL 在 `tailwind.config.js` 的 `theme.extend.colors` 中定义所有 Material Design 3 颜色令牌。通过 `weapp-tailwindcss` 插件，这些令牌 SHALL 在微信小程序中可用。色板 MUST 至少包含：primary (#5d000a)、primary-container (#81131a)、secondary (#775a19)、secondary-container (#fed488)、tertiary (#3c251f)、tertiary-container (#553a34)、surface (#fff9ed)、on-surface (#1f1c0b)、outline (#8b716f)、outline-variant (#dfbfbd)，以及所有对应的 on-* 变体。

#### Scenario: 颜色令牌在小程序中可用
- **WHEN** 开发者在 JSX 中使用 `className="bg-primary"` 或 `className="text-secondary-container"`
- **THEN** `weapp-tailwindcss` SHALL 将其转换为小程序兼容的类名并应用正确的颜色值

### Requirement: 字体排版系统
设计系统 SHALL 通过 `Taro.loadFontFace` 在 `app.tsx` 的 `onLaunch` 中加载 "Noto Serif" 和 "Manrope" 字体。Tailwind 配置 SHALL 将它们映射为 `font-headline`、`font-body` 和 `font-label`，并提供系统字体 fallback（衬线体 / 无衬线体）。

#### Scenario: 字体加载成功
- **WHEN** 小程序启动并成功加载远程字体
- **THEN** 使用 `font-headline` 的元素 SHALL 以 Noto Serif 渲染

#### Scenario: 字体加载失败降级
- **WHEN** 字体 CDN 不可达或加载超时
- **THEN** `font-headline` SHALL 降级为系统衬线体 `serif`，`font-body` SHALL 降级为系统无衬线体 `sans-serif`

### Requirement: 天鹅绒渐变样式
设计系统 SHALL 在全局 SCSS 中提供一个 `.velvet-bg` 类，应用从 primary (#5d000a) 到 primary-container (#81131a) 的对角线渐变。由于小程序不支持 `::after` 伪元素设置背景图，纹理叠加 SHALL 使用一个额外的 `View` 组件模拟。

#### Scenario: 天鹅绒背景渲染
- **WHEN** 一个 `View` 组件使用 `className="velvet-bg"`
- **THEN** SHALL 渲染酒红色对角线渐变背景

### Requirement: 羊皮纸票卡样式
设计系统 SHALL 提供一个 `.parchment-ticket` SCSS 类，应用温暖的羊皮纸背景色 (#fcf3d8)。`.perforation` 类 SHALL 渲染虚线上边框模拟撕裂效果。

#### Scenario: 羊皮纸票卡渲染
- **WHEN** 一个 `View` 组件使用 `className="parchment-ticket"`
- **THEN** SHALL 以羊皮纸背景色渲染

### Requirement: 华丽相框样式
设计系统 SHALL 提供一个 `.ornate-frame` SCSS 类，应用多层边框效果：主边框和 `outline`（金色偏移）。`box-shadow` 模拟内嵌阴影效果。

#### Scenario: 华丽相框渲染
- **WHEN** 一个 `View` 组件使用 `className="ornate-frame"`
- **THEN** SHALL 渲染带有多层边框和阴影的华丽相框效果

### Requirement: 幕帘分隔线组件
设计系统 SHALL 包含一个可复用的 `CurtainDivider` React 组件，使用 `View` 和 `Text` 组件渲染两条水平线和居中的图标。分隔线 SHALL 以降低的不透明度渲染。组件 SHALL 接受 `icon` 属性以自定义中间图标。

#### Scenario: 幕帘分隔线渲染
- **WHEN** `<CurtainDivider icon="diamond" />` 放置在区域之间
- **THEN** SHALL 渲染两条细水平线，中间居中显示菱形图标，不透明度 40%

### Requirement: 图标系统
设计系统 SHALL 提供一个 `Icon` 组件，通过 iconfont 或 SVG 方式渲染图标。SHALL 包含 mockup 中使用的所有图标（约 30 个），包括：menu、collections、confirmation_number、event_seat、theater_comedy、calendar_month、search、add、arrow_back、close、chevron_left、chevron_right、photo_camera、star、favorite、auto_awesome 等。

#### Scenario: 图标组件渲染
- **WHEN** 使用 `<Icon name="theater_comedy" />` 组件
- **THEN** SHALL 渲染对应的图标，支持通过 className 自定义大小和颜色

### Requirement: 剧院风格按钮样式
设计系统 SHALL 提供 `.btn-theatrical` SCSS 类（天鹅绒渐变背景、白色文字、圆角）。点击态 SHALL 缩放至 0.95 倍。

#### Scenario: 按钮按压交互
- **WHEN** 用户按下剧院风格按钮
- **THEN** 按钮 SHALL 以平滑过渡缩小至 95% 尺寸（通过 `hover-class` 或 CSS `active` 伪类实现）

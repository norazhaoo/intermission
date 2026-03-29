## ADDED Requirements

### Requirement: 剧院色彩令牌系统
设计系统 SHALL 将所有 Material Design 3 颜色令牌定义为 CSS 自定义属性和 Tailwind 主题颜色。色板 MUST 至少包含：primary (#5d000a)、primary-container (#81131a)、secondary (#775a19)、secondary-container (#fed488)、tertiary (#3c251f)、tertiary-container (#553a34)、surface (#fff9ed)、on-surface (#1f1c0b)、outline (#8b716f)、outline-variant (#dfbfbd)，以及所有对应的 on-* 变体。

#### Scenario: 颜色令牌在 Tailwind 中可用
- **WHEN** 开发者使用 `bg-primary` 或 `text-secondary-container` 等类名
- **THEN** SHALL 应用令牌系统中定义的正确十六进制颜色值

### Requirement: 字体排版系统
设计系统 SHALL 使用两个字体族："Noto Serif"（衬线体）用于标题和装饰性文字，"Manrope"（无衬线体）用于正文和标签。Tailwind 配置 SHALL 将它们映射为 `font-headline`、`font-body` 和 `font-label`。

#### Scenario: 标题字体排版
- **WHEN** 应用 `font-headline` 类名
- **THEN** 元素 SHALL 以 Noto Serif 渲染

#### Scenario: 正文字体排版
- **WHEN** 应用 `font-body` 类名
- **THEN** 元素 SHALL 以 Manrope 渲染

### Requirement: 天鹅绒渐变样式
设计系统 SHALL 提供一个 `.velvet-bg` CSS 类，应用从 primary (#5d000a) 到 primary-container (#81131a) 的对角线渐变，并带有 15% 不透明度的微妙纹理叠加层。

#### Scenario: 天鹅绒背景渲染
- **WHEN** 元素具有 `velvet-bg` 类
- **THEN** SHALL 渲染酒红色渐变和通过 ::after 伪元素实现的半透明纹理叠加层

### Requirement: 羊皮纸票卡样式
设计系统 SHALL 提供一个 `.parchment-ticket` CSS 类，应用温暖的羊皮纸背景色 (#fcf3d8)。可选的 `.perforation` 类 SHALL 渲染虚线边框，并在左右边缘带有圆形切口。

#### Scenario: 羊皮纸票卡渲染
- **WHEN** 元素具有 `parchment-ticket` 类
- **THEN** SHALL 以羊皮纸背景色渲染

### Requirement: 华丽相框样式
设计系统 SHALL 提供一个 `.ornate-frame` CSS 类，应用多层边框效果：主边框、向内偏移的金色镶边轮廓以及内嵌/投影阴影。鼠标悬停时，元素 SHALL 轻微放大并加深阴影。

#### Scenario: 华丽相框悬停效果
- **WHEN** 用户鼠标悬停在具有 `ornate-frame` 类的元素上
- **THEN** 元素 SHALL 放大至 1.02 倍并增加阴影深度

### Requirement: 幕帘分隔线组件
设计系统 SHALL 包含一个可复用的幕帘分隔线组件，由两条水平线和居中的装饰性图标（如菱形、星星、火花）组成。分隔线 SHALL 以降低的不透明度渲染。

#### Scenario: 幕帘分隔线渲染
- **WHEN** 幕帘分隔线放置在区域之间
- **THEN** SHALL 渲染两条细水平线，中间居中一个 Material Symbol 图标，不透明度 40%

### Requirement: 剧院风格按钮样式
设计系统 SHALL 提供剧院风格按钮样式，带有天鹅绒渐变背景、白色文字、圆角、微妙的内发光（内嵌白色阴影）以及悬停时亮度增加。按下状态 SHALL 缩放至 0.95 倍。

#### Scenario: 按钮按压交互
- **WHEN** 用户按下剧院风格按钮
- **THEN** 按钮 SHALL 以平滑过渡缩小至 95% 尺寸

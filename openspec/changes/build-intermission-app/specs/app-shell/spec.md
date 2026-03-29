## ADDED Requirements

### Requirement: 自定义 TabBar 底部导航
应用 SHALL 使用微信小程序自定义 TabBar（`custom: true`）实现底部导航栏，包含正好 5 个标签页：画廊 (Gallery)、票务 (Tickets)、座位 (Seats)、剧目 (Shows) 和日历 (Calendar)。每个标签页 SHALL 显示一个图标和一个大写标签。当前激活的标签页 SHALL 以金色高亮背景和填充图标进行视觉区分。

#### Scenario: 用户点击导航标签页
- **WHEN** 用户点击 5 个底部导航标签页中的任意一个
- **THEN** 应用 SHALL 通过 `Taro.switchTab` 导航到对应页面，并更新自定义 TabBar 的选中状态

#### Scenario: 激活标签页视觉指示
- **WHEN** 某个标签页处于激活状态
- **THEN** 该标签页 SHALL 以金色背景、深酒红文字颜色和圆角容器显示，而未激活标签页以 70% 不透明度显示

#### Scenario: 页面切换后 TabBar 状态同步
- **WHEN** 用户通过 `switchTab` 切换到某个 Tab 页
- **THEN** 页面的 `useDidShow` 生命周期 SHALL 通过 `Taro.getTabBar()` 更新 TabBar 选中索引

### Requirement: 页面导航栏配置
每个页面 SHALL 通过 `definePageConfig` 配置微信小程序导航栏。Tab 页面 SHALL 显示 "The Playbill" 作为导航栏标题，使用自定义背景色（`#fff9ed`）和文字颜色（`#5d000a`）。子页面 SHALL 显示各自的页面标题。

#### Scenario: Tab 页面导航栏
- **WHEN** 用户在 Tab 页面
- **THEN** 导航栏 SHALL 显示 "The Playbill" 标题，背景色为 `#fff9ed`，文字颜色为深酒红

#### Scenario: 子页面导航栏含返回按钮
- **WHEN** 用户通过 `Taro.navigateTo` 进入子页面（如添加票务、手动录入）
- **THEN** 导航栏左侧 SHALL 自动显示系统返回箭头，标题显示子页面名称

### Requirement: 启动屏幕
应用 SHALL 在 `pages` 配置中将启动屏幕设为首页。启动屏幕 SHALL 显示剧院幕布背景图、大号斜体衬线字体的 "Intermission" 文字以及金色进度条。底部 SHALL 显示提示文字 "The curtains are rising..."。

#### Scenario: 应用首次启动
- **WHEN** 小程序启动
- **THEN** 启动屏幕 SHALL 显示至少 1 秒后通过 `Taro.switchTab` 自动导航到画廊标签页

### Requirement: Taro 页面路由
应用 SHALL 在 `app.config.ts` 中配置所有页面路径。Tab 页面使用 `Taro.switchTab` 导航，子页面使用 `Taro.navigateTo` 导航（支持页面参数传递如 `?id=xxx`），返回使用 `Taro.navigateBack`。

#### Scenario: 导航到子页面
- **WHEN** 用户从 Tab 页点击某个条目（如剧目详情）
- **THEN** 应用 SHALL 使用 `Taro.navigateTo({ url: '/pages/shows-detail/index?id=xxx' })` 跳转，保留 Tab 页在导航栈中

#### Scenario: 从子页面返回
- **WHEN** 用户在子页面点击返回或系统返回
- **THEN** 应用 SHALL 返回上一个页面并恢复其状态

### Requirement: 全局组件使用 Taro 跨端组件
所有 UI 组件 SHALL 使用 `@tarojs/components` 提供的组件替代 HTML 标签。`View` 替代 `div`，`Text` 替代 `span`/`p`，`Image` 替代 `img`，`ScrollView` 替代可滚动容器，`Input` 替代 `input`，`Textarea` 替代 `textarea`，`Slider` 替代 `input[type=range]`。

#### Scenario: 组件渲染为小程序原生组件
- **WHEN** 使用 `<View>`, `<Text>`, `<Image>` 等 Taro 组件编写页面
- **THEN** Taro 编译器 SHALL 将其转换为微信小程序原生组件（`view`, `text`, `image`）

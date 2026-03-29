## ADDED Requirements

### Requirement: 票务管理中心
票务标签页 SHALL 显示一个名为 "My Box Office" 的中心页面，包含三个大型操作按钮：手动添加票务 (Manual Add Ticket)、扫描添加票务 (Scan to Add Ticket) 和查看票务 (View Tickets)。每个按钮 SHALL 以羊皮纸卡片样式呈现，使用 `View` 和 `Text` 组件，带有圆形图标、标题和副标题。

#### Scenario: 中心页面展示
- **WHEN** 用户导航到票务标签页
- **THEN** 三个全宽羊皮纸风格按钮 SHALL 垂直排列显示，分别带有手动录入、扫描和查看收藏的图标

#### Scenario: 导航到手动添加
- **WHEN** 用户点击 "Manual Add Ticket"
- **THEN** 应用 SHALL 通过 `Taro.navigateTo` 导航到添加票务表单页面

#### Scenario: 导航到查看票务
- **WHEN** 用户点击 "View Tickets"
- **THEN** 应用 SHALL 通过 `Taro.navigateTo` 导航到票务列表视图

### Requirement: 添加票务表单
系统 SHALL 提供一个手动添加票务的表单页面，使用 Taro 的 `Input`、`Picker` 组件。包含字段：剧目名称 (Show Name)、剧院 (Theater)、日期 (Date)、时间 (Time)、座位信息 (Seat Assignment) 和购票渠道 (Purchase Channel)（Picker 选项：大麦、猫眼、秀动、Ticketmaster）。"Save to Collection" 按钮 SHALL 通过 `Taro.setStorageSync` 持久化票务数据。

#### Scenario: 填写并提交票务表单
- **WHEN** 用户填写票务详情并点击 "Save to Collection"
- **THEN** 票务 SHALL 通过 `Taro.setStorageSync` 保存到本地缓存，用户 SHALL 通过 `Taro.navigateBack` 返回票务中心

#### Scenario: 必填字段验证
- **WHEN** 用户尝试在未填写剧目名称的情况下保存
- **THEN** 表单 SHALL 通过 `Taro.showToast` 提示验证错误

### Requirement: 即将和过往票务视图
票务列表视图 SHALL 使用 `ScrollView` 将票务分为"即将到来"和"过往"两个区域展示。即将到来的票务 SHALL 以羊皮纸票卡样式显示，包含剧目名称、剧院、日期、时间和座位信息。每张票卡 SHALL 带有虚线撕裂分隔线。

#### Scenario: 查看即将到来的票务
- **WHEN** 用户查看票务列表
- **THEN** 日期在未来的票务 SHALL 显示在"即将到来"区域，按时间顺序排列（最近的在前）

#### Scenario: 查看过往票务
- **WHEN** 用户滚动过即将到来的票务
- **THEN** 日期在过去的票务 SHALL 显示在"过往"区域，按时间倒序排列

#### Scenario: 空票务列表
- **WHEN** 用户没有已保存的票务
- **THEN** SHALL 显示空状态提示信息，引导用户添加第一张票

### Requirement: 扫描票务功能
"Scan to Add Ticket" 按钮 SHALL 通过 `Taro.chooseImage` 弹出相册/相机选择器，让用户拍摄或选择票务图片。选中的图片临时路径 SHALL 通过 `Taro.saveFile` 保存到本地永久路径，并关联到票务录入表单。

#### Scenario: 拍摄或选择票务图片
- **WHEN** 用户点击 "Scan to Add Ticket"
- **THEN** SHALL 调用 `Taro.chooseImage({ sourceType: ['album', 'camera'] })` 让用户选择图片，选中后跳转到添加票务表单并预览图片

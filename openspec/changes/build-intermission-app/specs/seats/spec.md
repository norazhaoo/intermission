## ADDED Requirements

### Requirement: 座位体验中心
座位标签页 SHALL 显示一个名为 "My Seats" 的中心页面，使用 `ScrollView` 展示用户的座位体验历史。页面头部 SHALL 显示 `Text` 组件标题 "My Seats"、座位体验总数统计徽章和一个 `Input` 搜索框。页面 SHALL 以时间倒序列出所有已记录的座位体验卡片。

#### Scenario: 中心页面展示
- **WHEN** 用户导航到座位标签页
- **THEN** "My Seats" 页面 SHALL 显示座位体验统计徽章和历史记录列表

#### Scenario: 座位体验卡片展示
- **WHEN** 用户查看座位体验列表
- **THEN** 每张卡片 SHALL 以羊皮纸风格呈现，使用 `View` 和 `Text` 组件显示剧目名称、剧院名称、座位位置（区域 + 排号 + 座号）、观演日期和座位评分星级

#### Scenario: 空座位列表状态
- **WHEN** 用户没有已记录的座位体验
- **THEN** SHALL 显示空状态提示信息（带座位图标和 "No seat experiences yet" 文字），引导用户通过 "Record Your First Seat" 按钮添加

### Requirement: 添加座位体验表单
系统 SHALL 提供一个记录座位体验的表单页面 `pages/seats-add/index.tsx`。表单 SHALL 使用 Taro 的 `Input`、`Picker` 组件，包含字段：关联剧目选择（从已有票务/剧目中选择或手动输入）、剧院名称 (Theater)、座位区域 (Section，Picker 选项：Orchestra、Mezzanine、Balcony、Box、Standing)、排号 (Row)、座号 (Seat Number)、观演日期 (Date，Picker) 和视野评分 (View Rating，1-5 星)。

#### Scenario: 从座位中心进入添加表单
- **WHEN** 用户在座位中心点击右上角 "+" 按钮或空状态下的 "Record Your First Seat" 按钮
- **THEN** 应用 SHALL 通过 `Taro.navigateTo` 导航到座位体验添加表单页面

#### Scenario: 填写并提交座位体验
- **WHEN** 用户填写座位信息并点击 "Save to Collection"
- **THEN** 座位体验 SHALL 通过 `Taro.setStorageSync` 保存到本地缓存，用户 SHALL 通过 `Taro.navigateBack` 返回座位中心

#### Scenario: 必填字段验证
- **WHEN** 用户尝试在未填写剧目名称或座位区域的情况下保存
- **THEN** 表单 SHALL 通过 `Taro.showToast` 提示验证错误

### Requirement: 座位视野评分
座位体验表单 SHALL 包含一个视野评分区域，使用 5 个可点击的 `View` 星形组件。用户点击星星 SHALL 设置对应的评分值（1-5）。评分下方 SHALL 使用 `Text` 组件显示定性标签：1 = "Obstructed"、2 = "Limited"、3 = "Acceptable"、4 = "Good"、5 = "Excellent"。

#### Scenario: 设置视野评分
- **WHEN** 用户点击第 4 颗星
- **THEN** 前 4 颗星 SHALL 以金色填充显示，第 5 颗星以空心显示，标签 SHALL 更新为 "Good"

#### Scenario: 默认评分
- **WHEN** 表单首次打开
- **THEN** 评分 SHALL 默认为 0（未评分），所有星星以空心显示

### Requirement: 座位体验详情页
系统 SHALL 提供座位体验详情页 `pages/seats-detail/index.tsx`，通过 `getCurrentInstance().router.params.id` 获取座位体验 ID。详情页 SHALL 以大卡片形式展示完整信息：剧目名称、剧院、完整座位位置、日期、视野评分（星级显示）和用户备注。

#### Scenario: 查看座位详情
- **WHEN** 用户在座位列表中点击某张座位卡片
- **THEN** 应用 SHALL 通过 `Taro.navigateTo({ url: '/pages/seats-detail/index?id=xxx' })` 导航到该座位体验的详情页

#### Scenario: 删除座位体验
- **WHEN** 用户在详情页点击 "Delete" 按钮
- **THEN** 应用 SHALL 通过 `Taro.showModal` 弹出确认对话框，确认后从本地缓存中删除该记录并通过 `Taro.navigateBack` 返回座位中心

### Requirement: 座位备注
座位体验表单 SHALL 包含一个 `Textarea` 组件，标题为 "Seat Notes"，占位文字为 "How was the view? Any obstructions? Legroom?"。`Textarea` SHALL 设置 `autoHeight` 属性以自动适应内容高度。

#### Scenario: 输入座位备注
- **WHEN** 用户在 `Textarea` 中输入备注文字
- **THEN** 备注 SHALL 在提交时被保存到座位体验记录中

### Requirement: 从票务关联座位
当用户已有票务记录时，座位体验表单 SHALL 支持从已有票务中自动填充信息。表单顶部 SHALL 提供一个 "Link from Ticket" 按钮，点击后弹出 `Taro.showActionSheet` 显示已有票务列表供选择。

#### Scenario: 从票务自动填充
- **WHEN** 用户点击 "Link from Ticket" 并选择一张已有票务
- **THEN** 剧目名称、剧院名称、日期和座位信息 SHALL 从该票务记录中自动填充到表单

#### Scenario: 无可用票务
- **WHEN** 用户没有已保存的票务且点击 "Link from Ticket"
- **THEN** SHALL 通过 `Taro.showToast` 提示 "No tickets found"
## ADDED Requirements

### Requirement: 大画廊海报网格
画廊标签页 SHALL 显示用户参加过的剧目海报网格。网格 SHALL 支持两种显示模式：带华丽相框的 "Top 9" 精选 3×3 网格，以及展示所有剧目的完整无缝 4 列网格。每张海报 SHALL 显示剧目海报图片和名称。

#### Scenario: Top 9 网格展示
- **WHEN** 用户查看画廊标签页
- **THEN** "TOP 9" 区域 SHALL 以 3×3 网格展示最近或评分最高的 9 个剧目，带有华丽边框、金色镶边轮廓和内嵌阴影

#### Scenario: 完整海报网格展示
- **WHEN** 用户滚动过 Top 9 区域
- **THEN** 一个无缝 4 列网格 SHALL 展示所有剧目海报，边框最小化。鼠标悬停时海报 SHALL 轻微放大（1.1 倍）

#### Scenario: 空画廊状态
- **WHEN** 用户的收藏中没有任何剧目
- **THEN** 画廊 SHALL 显示提示信息，引导用户通过剧目标签页添加第一个剧目

### Requirement: 画廊头部含搜索和筛选
画廊标签页 SHALL 显示头部区域，包含标题 "Grand Gallery"、观众成就徽章（显示总演出场次）、搜索输入框和筛选按钮（按首演、收藏、2024 演出季）。

#### Scenario: 成就徽章展示
- **WHEN** 用户已参加过演出
- **THEN** 徽章 SHALL 显示 "Patron of the Arts: X Performances"（X 为总场次），以深棕色背景和金色边框样式呈现

#### Scenario: 搜索档案
- **WHEN** 用户在搜索框中输入内容
- **THEN** 海报网格 SHALL 筛选出标题匹配的剧目

### Requirement: 演出评论动态流
画廊标签页 SHALL 包含一个 "Performance Review" 区域，列出用户撰写的评论。每条评论条目 SHALL 显示一个小型华丽相框海报缩略图、评论日期、斜体引用摘录和标签（如 "Encore worthy"、"Masterpiece"）。

#### Scenario: 查看演出评论
- **WHEN** 用户滚动到演出评论区域
- **THEN** 评论 SHALL 按时间顺序列出，包含海报缩略图、日期、文字摘录和分类标签

#### Scenario: 添加评论按钮
- **WHEN** 用户点击 "Add Review"
- **THEN** 应用 SHALL 导航到演出评论创建页面

### Requirement: 缺失剧目提示
画廊标签页 SHALL 包含一个 "Missing a Show?" 卡片，提示用户探索数据库并添加新剧目到他们的收藏中，附带 "Explore Database" 按钮。

#### Scenario: 探索数据库导航
- **WHEN** 用户点击 "Explore Database"
- **THEN** 应用 SHALL 导航到剧目标签页

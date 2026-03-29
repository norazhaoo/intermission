## ADDED Requirements

### Requirement: 剧目搜索与浏览
剧目标签页 SHALL 使用 `Input` 组件显示一个搜索页面，可按标题、作曲家或类型搜索。搜索输入框下方 SHALL 使用 `ScrollView` 显示匹配的剧目列表。每个列表项 SHALL 使用 `Image` 组件显示海报缩略图、加粗衬线字体的剧目标题和作曲家/创作者名称。

#### Scenario: 浏览默认剧目列表
- **WHEN** 用户导航到剧目标签页
- **THEN** SHALL 显示搜索输入框和本地缓存中可用剧目的列表

#### Scenario: 按标题搜索
- **WHEN** 用户在 `Input` 组件中输入搜索查询
- **THEN** 列表 SHALL 筛选出标题或作曲家与查询匹配的剧目（不区分大小写）

#### Scenario: 导航到剧目详情
- **WHEN** 用户点击搜索结果中的某个剧目
- **THEN** 应用 SHALL 通过 `Taro.navigateTo({ url: '/pages/shows-detail/index?id=xxx' })` 导航到该剧目的详情页

### Requirement: 剧目详情页
剧目详情页 SHALL 使用 `ScrollView` 展示音乐剧的完整信息：带有剧目标题和 "Now Playing" 徽章的主视觉图区域（`Image` 组件）、演出日期和剧院地点信息、剧情简介区域、演员阵容网格、奖项/提名列表以及制作历史时间线。

#### Scenario: 查看剧目主视觉区
- **WHEN** 用户打开剧目详情页（通过 URL 参数 `id` 传入）
- **THEN** 主视觉图 SHALL 横跨顶部，剧目标题以大号斜体衬线字体叠加显示，下方展示当前演出日期和剧院地点

#### Scenario: 查看演员阵容网格
- **WHEN** 用户滚动到演员阵容区域
- **THEN** 4 列演员网格 SHALL 使用 `Image` 组件显示头像照片，`Text` 组件显示演员姓名和角色名称

#### Scenario: 查看观众评论
- **WHEN** 用户滚动到 "Audience Impressions" 区域
- **THEN** 评论卡片 SHALL 显示星级评分（1-5）、引用评论文字、评论者姓名缩写头像、评论者姓名和评论日期

#### Scenario: 从剧目页撰写评论
- **WHEN** 用户点击 "Leave a Review"
- **THEN** 应用 SHALL 通过 `Taro.navigateTo({ url: '/pages/gallery-review-new/index?showId=xxx' })` 导航到预填充剧目的评论创建页面

### Requirement: 手动剧目录入表单
系统 SHALL 提供一个手动添加数据库中未收录剧目的表单页面。表单 SHALL 使用 Taro 的 `Input`、`Textarea`、`Picker`、`Switch` 组件，包含字段：制作名称（必填）、原始语言、首演阵容（必填）、节目单封面上传、首演剧院、地区选择器（百老汇、伦敦西区、中国）、版本以及"正在上演"开关。"Commit to Archives" 按钮 SHALL 通过 `Taro.setStorageSync` 保存该剧目。

#### Scenario: 提交手动剧目录入
- **WHEN** 用户填写必填字段并点击 "Commit to Archives"
- **THEN** 该剧目 SHALL 保存到小程序本地缓存，并出现在剧目数据库和画廊中

#### Scenario: 上传节目单封面
- **WHEN** 用户点击节目单封面上传区域
- **THEN** SHALL 调用 `Taro.chooseImage` 进行图片选择。选中的图片 SHALL 通过 `Image` 组件在上传区域预览显示

#### Scenario: 导航到手动录入
- **WHEN** 用户从剧目搜索页点击 "Add Manual Entry"
- **THEN** 应用 SHALL 通过 `Taro.navigateTo` 导航到手动录入表单

### Requirement: 预置剧目数据库
系统 SHALL 包含一个预置的热门音乐剧数据库（至少包含：歌剧魅影、汉密尔顿、悲惨世界、魔法坏女巫、狮子王、芝加哥、吉屋出租、哈迪斯城、猫），附带基本元数据（标题、作曲家、海报占位图 URL）。首次启动时 SHALL 将种子数据写入 `Taro.setStorageSync`。

#### Scenario: 全新应用含种子数据
- **WHEN** 用户首次打开小程序
- **THEN** 剧目搜索页 SHALL 在浏览列表中显示预置的音乐剧

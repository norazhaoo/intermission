## ADDED Requirements

### Requirement: 演出评论创建表单
系统 SHALL 提供一个"创建演出评论"页面（标题为 "Create Repo"），使用 Taro 组件构建：节目单封面上传区域、4 个 `Slider` 评分组件和一个 `Textarea` 日记区域。页面 SHALL 显示带有 "Act IV: Documentation" 标签的装饰性头部。

#### Scenario: 进入评论创建
- **WHEN** 用户通过 `Taro.navigateTo` 导航到创建新演出评论
- **THEN** 评论表单 SHALL 显示节目单上传区域、4 个评分滑块、笔记文本框和 "Stitch Repo" 提交按钮

### Requirement: 节目单数字化
评论表单 SHALL 包含一个上传实体节目单封面的区域。点击该区域 SHALL 调用 `Taro.chooseImage` 弹出相册/相机选择器。

#### Scenario: 上传节目单图片
- **WHEN** 用户点击上传区域或 "Launch Scanner" 按钮
- **THEN** SHALL 调用 `Taro.chooseImage({ sourceType: ['album', 'camera'] })`。选择图片后，`Image` 组件 SHALL 预览已选图片，临时路径 SHALL 通过 `Taro.saveFile` 持久化

### Requirement: 多维度评分
评论表单 SHALL 使用 4 个 Taro `Slider` 组件，分别标记为：演员表现 (Cast Performance)、舞美设计 (Scenic Design)、音效保真度 (Acoustic Fidelity) 和叙事节奏 (Narrative Flow)。每个滑块 SHALL 范围为 1 到 5，步长为 1。每个滑块旁 SHALL 使用 `Text` 组件显示一个根据值更新的定性标签。

#### Scenario: 调节评分滑块
- **WHEN** 用户将"演员表现" `Slider` 调至 5
- **THEN** 对应的 `Text` 标签 SHALL 更新为最高档位描述词（如 "EXCEPTIONAL"），滑块位置 SHALL 同步更新

#### Scenario: 默认滑块值
- **WHEN** 评论表单首次打开
- **THEN** 所有 4 个 `Slider` SHALL 设置为默认值 3

### Requirement: 观众笔记日记
评论表单 SHALL 包含一个 `Textarea` 组件，标题为 "Patron's Notes"，占位文字为："Capture the evening's essence..."。`Textarea` SHALL 设置 `autoHeight` 属性以自动适应内容高度。

#### Scenario: 输入评论笔记
- **WHEN** 用户在 `Textarea` 中输入文字
- **THEN** 文字 SHALL 在评论提交时被捕获并保存

### Requirement: 提交演出评论
评论表单 SHALL 包含一个 "Stitch Repo" 按钮，点击后将评论数据（节目单图片路径、评分、笔记、关联剧目 ID 和日期）通过 `Taro.setStorageSync` 保存到本地缓存。提交后 SHALL 通过 `Taro.switchTab` 导航到画廊标签页。

#### Scenario: 提交完整评论
- **WHEN** 用户填写评分和笔记后点击 "Stitch Repo"
- **THEN** 评论 SHALL 保存到小程序本地缓存，用户 SHALL 被导航到画廊标签页

#### Scenario: 仅提交评分的评论
- **WHEN** 用户调节滑块但笔记留空，然后点击 "Stitch Repo"
- **THEN** 评论 SHALL 仍然成功保存，笔记为空

#### Scenario: 从剧目详情页预填充
- **WHEN** 用户从剧目详情页跳转（URL 携带 `showId` 参数）
- **THEN** 评论表单 SHALL 自动关联该剧目，无需用户手动选择

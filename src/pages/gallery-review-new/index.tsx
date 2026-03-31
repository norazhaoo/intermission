import { useState } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View, Text, Slider, Textarea, Image } from '@tarojs/components'
import { addReview, generateId, getShowById } from '../../lib/store'
import CurtainDivider from '../../components/CurtainDivider'
import './index.scss'

const SCORE_LABELS: Record<string, string[]> = {
  cast: ['较差', '一般', '良好', '优秀', '极致'],
  scenic: ['简陋', '过得去', '沉浸', '惊艳', '身临其境'],
  acoustic: ['沉闷', '及格', '清晰', '出色', '水晶般透亮'],
  narrative: ['平庸', '可预测', '吸引人', '引人入胜', '扣人心弦']
}

export default function GalleryReviewNew() {
  const params = getCurrentInstance().router?.params || {}
  const showId = params.showId
  const show = showId ? getShowById(showId) : null

  const [playbillUrl, setPlaybillUrl] = useState('')
  const [castScore, setCastScore] = useState(3)
  const [scenicScore, setScenicScore] = useState(3)
  const [acousticScore, setAcousticScore] = useState(3)
  const [narrativeScore, setNarrativeScore] = useState(3)
  const [notes, setNotes] = useState('')

  const handleUpload = () => {
    Taro.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        setPlaybillUrl(res.tempFilePaths[0])
      }
    })
  }

  const handleSubmit = () => {
    addReview({
      id: generateId(),
      showId: showId || undefined,
      showName: show?.title || '未知剧目',
      playbillImageUrl: playbillUrl,
      castPerformance: castScore,
      scenicDesign: scenicScore,
      acousticFidelity: acousticScore,
      narrativeFlow: narrativeScore,
      notes,
      tag: castScore >= 4 ? '值得二刷' : castScore >= 3 ? '值得一看' : undefined,
      createdAt: new Date().toISOString()
    })

    Taro.showToast({ title: '评论已保存！', icon: 'success' })
    setTimeout(() => Taro.switchTab({ url: '/pages/gallery/index' }), 800)
  }

  const renderSlider = (
    label: string,
    subtitle: string,
    key: string,
    value: number,
    onChange: (v: number) => void
  ) => (
    <View className='score-slider'>
      <View className='score-slider__header'>
        <Text className='score-slider__label font-label'>{label}</Text>
        <Text className='score-slider__level font-label'>{SCORE_LABELS[key][value - 1]}</Text>
      </View>
      <Text className='score-slider__subtitle font-body'>{subtitle}</Text>
      <Slider
        min={1}
        max={5}
        step={1}
        value={value}
        activeColor='#5d000a'
        backgroundColor='#ebe2c8'
        blockColor='#d4af37'
        blockSize={20}
        onChange={e => onChange(e.detail.value)}
      />
    </View>
  )

  return (
    <View className='review-page'>
      {/* 装饰头部 */}
      <View className='review-act-header velvet-bg'>
        <Text className='review-act-header__label font-label'>第四幕</Text>
        <Text className='review-act-header__title font-headline'>档案记录</Text>
      </View>

      {/* 预填充剧目信息 */}
      {show && (
        <View className='review-show-info parchment-ticket'>
          <Text className='font-headline' style={{ color: '#5d000a', fontSize: '28rpx' }}>
            正在评价: {show.title}
          </Text>
        </View>
      )}

      {/* 节目单上传 */}
      <View className='review-section'>
        <Text className='review-section__title font-headline'>节目单数字化</Text>
        <Text className='review-section__desc font-body'>
          扫描或拍摄您的实体节目单以归档
        </Text>
        <View className='playbill-upload' onClick={handleUpload}>
          {playbillUrl ? (
            <Image src={playbillUrl} mode='aspectFit' className='playbill-upload__image' />
          ) : (
            <View className='playbill-upload__placeholder'>
              <Text style={{ fontSize: '48rpx' }}>📄</Text>
              <Text className='font-body' style={{ color: '#8b716f', fontSize: '22rpx' }}>
                启动扫描仪
              </Text>
            </View>
          )}
        </View>
      </View>

      <CurtainDivider icon='auto_awesome' />

      {/* 评分滑块 */}
      <View className='review-section'>
        <Text className='review-section__title font-headline'>演出评分</Text>
        {renderSlider('演员表现', '声乐能力、舞台表现力、化学反应', 'cast', castScore, setCastScore)}
        {renderSlider('舞美设计', '布景设计、灯光、视觉氛围', 'scenic', scenicScore, setScenicScore)}
        {renderSlider('声学保真度', '音质、平衡、清晰度', 'acoustic', acousticScore, setAcousticScore)}
        {renderSlider('叙事流畅度', '故事节奏、情感弧线、参与度', 'narrative', narrativeScore, setNarrativeScore)}
      </View>

      <CurtainDivider />

      {/* 笔记 */}
      <View className='review-section'>
        <Text className='review-section__title font-headline'>观众随笔</Text>
        <Textarea
          className='review-notes font-body'
          placeholder="留下今晚的感动……"
          placeholderClass='review-notes__placeholder'
          value={notes}
          onInput={e => setNotes(e.detail.value)}
          autoHeight
        />
      </View>

      {/* 提交 */}
      <View style={{ padding: '32rpx' }}>
        <View
          className='btn-theatrical'
          hoverClass='btn-theatrical-active'
          onClick={handleSubmit}
        >
          <Text style={{ color: '#fff' }}>✦ 保存评论 ✦</Text>
        </View>
      </View>
    </View>
  )
}

import { useState } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View, Text, Slider, Textarea, Image } from '@tarojs/components'
import { addReview, generateId, getShowById } from '../../lib/store'
import CurtainDivider from '../../components/CurtainDivider'
import './index.scss'

const SCORE_LABELS: Record<string, string[]> = {
  cast: ['Weak', 'Adequate', 'Good', 'Excellent', 'EXCEPTIONAL'],
  scenic: ['Plain', 'Decent', 'Immersive', 'Stunning', 'ATMOSPHERIC'],
  acoustic: ['Muffled', 'Passable', 'Clear', 'Brilliant', 'CRYSTAL CLEAR'],
  narrative: ['Confused', 'Predictable', 'Engaging', 'Riveting', 'COMPELLING']
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
      showName: show?.title || 'Unknown Show',
      playbillImageUrl: playbillUrl,
      castPerformance: castScore,
      scenicDesign: scenicScore,
      acousticFidelity: acousticScore,
      narrativeFlow: narrativeScore,
      notes,
      tag: castScore >= 4 ? 'Encore Worthy' : castScore >= 3 ? 'Worth Seeing' : undefined,
      createdAt: new Date().toISOString()
    })

    Taro.showToast({ title: 'Review saved!', icon: 'success' })
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
        <Text className='review-act-header__label font-label'>Act IV</Text>
        <Text className='review-act-header__title font-headline'>Documentation</Text>
      </View>

      {/* 预填充剧目信息 */}
      {show && (
        <View className='review-show-info parchment-ticket'>
          <Text className='font-headline' style={{ color: '#5d000a', fontSize: '28rpx' }}>
            Reviewing: {show.title}
          </Text>
        </View>
      )}

      {/* 节目单上传 */}
      <View className='review-section'>
        <Text className='review-section__title font-headline'>Playbill Digitization</Text>
        <Text className='review-section__desc font-body'>
          Scan or photograph your physical playbill for the archives
        </Text>
        <View className='playbill-upload' onClick={handleUpload}>
          {playbillUrl ? (
            <Image src={playbillUrl} mode='aspectFit' className='playbill-upload__image' />
          ) : (
            <View className='playbill-upload__placeholder'>
              <Text style={{ fontSize: '48rpx' }}>📄</Text>
              <Text className='font-body' style={{ color: '#8b716f', fontSize: '22rpx' }}>
                Launch Scanner
              </Text>
            </View>
          )}
        </View>
      </View>

      <CurtainDivider icon='auto_awesome' />

      {/* 评分滑块 */}
      <View className='review-section'>
        <Text className='review-section__title font-headline'>Performance Scores</Text>
        {renderSlider('Cast Performance', 'Vocal ability, stage presence, chemistry', 'cast', castScore, setCastScore)}
        {renderSlider('Scenic Design', 'Set design, lighting, visual atmosphere', 'scenic', scenicScore, setScenicScore)}
        {renderSlider('Acoustic Fidelity', 'Sound quality, balance, clarity', 'acoustic', acousticScore, setAcousticScore)}
        {renderSlider('Narrative Flow', 'Story pacing, emotional arc, engagement', 'narrative', narrativeScore, setNarrativeScore)}
      </View>

      <CurtainDivider />

      {/* 笔记 */}
      <View className='review-section'>
        <Text className='review-section__title font-headline'>Patron's Notes</Text>
        <Textarea
          className='review-notes font-body'
          placeholder="Capture the evening's essence... the way the light hit the balcony, the hush of the crowd..."
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
          <Text style={{ color: '#fff' }}>✦ Stitch Repo ✦</Text>
        </View>
      </View>
    </View>
  )
}

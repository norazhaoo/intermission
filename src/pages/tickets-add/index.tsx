import { useState } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View, Text, Input, Picker, Image } from '@tarojs/components'
import { addTicket, generateId } from '../../lib/store'
import './index.scss'

const CHANNELS = ['大麦', '猫眼', '秀动', 'Ticketmaster', '其他']

export default function TicketsAdd() {
  const params = getCurrentInstance().router?.params || {}
  const [showName, setShowName] = useState('')
  const [theater, setTheater] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [seat, setSeat] = useState('')
  const [channelIdx, setChannelIdx] = useState(0)
  const [imageUrl] = useState(params.imageUrl ? decodeURIComponent(params.imageUrl) : '')

  const handleSave = () => {
    if (!showName.trim()) {
      Taro.showToast({ title: '请填写剧目名称', icon: 'none' })
      return
    }
    addTicket({
      id: generateId(),
      showName: showName.trim(),
      theater: theater.trim(),
      date,
      time,
      seatAssignment: seat.trim(),
      purchaseChannel: CHANNELS[channelIdx],
      imageUrl,
      createdAt: new Date().toISOString()
    })
    Taro.showToast({ title: '已保存到收藏', icon: 'success' })
    setTimeout(() => Taro.navigateBack(), 800)
  }

  return (
    <View className='add-ticket-page'>
      <View className='form-section'>
        {/* 票务图片预览 */}
        {imageUrl && (
          <View className='form-image-preview'>
            <Image src={imageUrl} mode='aspectFit' className='form-image-preview__img' />
          </View>
        )}

        <View className='form-field'>
          <Text className='form-field__label font-label'>剧目名称 *</Text>
          <Input
            className='form-field__input font-body'
            placeholder='输入剧目名称'
            value={showName}
            onInput={e => setShowName(e.detail.value)}
          />
        </View>

        <View className='form-field'>
          <Text className='form-field__label font-label'>剧院</Text>
          <Input
            className='form-field__input font-body'
            placeholder='输入剧院名称'
            value={theater}
            onInput={e => setTheater(e.detail.value)}
          />
        </View>

        <View className='form-field'>
          <Text className='form-field__label font-label'>日期</Text>
          <Picker mode='date' value={date} onChange={e => setDate(e.detail.value)}>
            <View className='form-field__input font-body'>
              <Text>{date || '选择日期'}</Text>
            </View>
          </Picker>
        </View>

        <View className='form-field'>
          <Text className='form-field__label font-label'>时间</Text>
          <Picker mode='time' value={time} onChange={e => setTime(e.detail.value)}>
            <View className='form-field__input font-body'>
              <Text>{time || '选择时间'}</Text>
            </View>
          </Picker>
        </View>

        <View className='form-field'>
          <Text className='form-field__label font-label'>座位信息</Text>
          <Input
            className='form-field__input font-body'
            placeholder='例如：一楼 A排12座'
            value={seat}
            onInput={e => setSeat(e.detail.value)}
          />
        </View>

        <View className='form-field'>
          <Text className='form-field__label font-label'>购票渠道</Text>
          <Picker
            mode='selector'
            range={CHANNELS}
            value={channelIdx}
            onChange={e => setChannelIdx(Number(e.detail.value))}
          >
            <View className='form-field__input font-body'>
              <Text>{CHANNELS[channelIdx]}</Text>
            </View>
          </Picker>
        </View>

        <View
          className='btn-theatrical'
          style={{ marginTop: '48rpx' }}
          hoverClass='btn-theatrical-active'
          onClick={handleSave}
        >
          <Text style={{ color: '#fff' }}>保存到收藏</Text>
        </View>
      </View>
    </View>
  )
}

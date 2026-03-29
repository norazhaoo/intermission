import { useState } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Input, Textarea, Picker, Switch, Image } from '@tarojs/components'
import { addShow, generateId } from '../../lib/store'
import './index.scss'

const REGIONS = ['Broadway', 'West End', 'China', 'Other']

export default function ShowsNew() {
  const [title, setTitle] = useState('')
  const [language, setLanguage] = useState('')
  const [cast, setCast] = useState('')
  const [theater, setTheater] = useState('')
  const [regionIdx, setRegionIdx] = useState(0)
  const [version, setVersion] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [posterUrl, setPosterUrl] = useState('')

  const handleUpload = () => {
    Taro.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        setPosterUrl(res.tempFilePaths[0])
      }
    })
  }

  const handleSave = () => {
    if (!title.trim()) {
      Taro.showToast({ title: '请填写制作名称', icon: 'none' })
      return
    }
    if (!cast.trim()) {
      Taro.showToast({ title: '请填写首演阵容', icon: 'none' })
      return
    }

    addShow({
      id: generateId(),
      title: title.trim(),
      composer: cast.trim(),
      synopsis: '',
      posterUrl: posterUrl || 'https://via.placeholder.com/300x400/5d000a/fed488?text=🎭',
      region: REGIONS[regionIdx].toLowerCase().replace(' ', '-') as any,
      language: language.trim(),
      theater: theater.trim(),
      isRunning,
      version: version.trim(),
      isUserAdded: true,
      createdAt: new Date().toISOString()
    })

    Taro.showToast({ title: '已存入档案', icon: 'success' })
    setTimeout(() => Taro.navigateBack(), 800)
  }

  return (
    <View className='shows-new-page'>
      <View className='form-section'>
        {/* 封面上传 */}
        <View className='cover-upload' onClick={handleUpload}>
          {posterUrl ? (
            <Image src={posterUrl} mode='aspectFill' className='cover-upload__image' />
          ) : (
            <View className='cover-upload__placeholder'>
              <Text style={{ fontSize: '64rpx' }}>📷</Text>
              <Text className='font-body' style={{ color: '#8b716f', fontSize: '22rpx', marginTop: '12rpx' }}>
                Upload Playbill Cover
              </Text>
            </View>
          )}
        </View>

        <View className='form-field'>
          <Text className='form-field__label font-label'>Production Name *</Text>
          <Input className='form-field__input font-body' placeholder='Enter production name' value={title} onInput={e => setTitle(e.detail.value)} />
        </View>

        <View className='form-field'>
          <Text className='form-field__label font-label'>Original Language</Text>
          <Input className='form-field__input font-body' placeholder='e.g. English, French' value={language} onInput={e => setLanguage(e.detail.value)} />
        </View>

        <View className='form-field'>
          <Text className='form-field__label font-label'>Debut Cast *</Text>
          <Textarea className='form-field__textarea font-body' placeholder='Enter cast members...' value={cast} onInput={e => setCast(e.detail.value)} autoHeight />
        </View>

        <View className='form-field'>
          <Text className='form-field__label font-label'>Debut Theater</Text>
          <Input className='form-field__input font-body' placeholder='Enter theater name' value={theater} onInput={e => setTheater(e.detail.value)} />
        </View>

        <View className='form-field'>
          <Text className='form-field__label font-label'>Region</Text>
          <Picker mode='selector' range={REGIONS} value={regionIdx} onChange={e => setRegionIdx(Number(e.detail.value))}>
            <View className='form-field__input font-body'><Text>{REGIONS[regionIdx]}</Text></View>
          </Picker>
        </View>

        <View className='form-field'>
          <Text className='form-field__label font-label'>Version</Text>
          <Input className='form-field__input font-body' placeholder='e.g. Revival, Tour' value={version} onInput={e => setVersion(e.detail.value)} />
        </View>

        <View className='form-field form-field--row'>
          <Text className='form-field__label font-label'>Currently Running</Text>
          <Switch checked={isRunning} onChange={e => setIsRunning(e.detail.value)} color='#5d000a' />
        </View>

        <View className='btn-theatrical' style={{ marginTop: '48rpx' }} hoverClass='btn-theatrical-active' onClick={handleSave}>
          <Text style={{ color: '#fff' }}>Commit to Archives</Text>
        </View>
      </View>
    </View>
  )
}

import { useEffect, useState } from 'react'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

export default function Loading() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // 进度条动画
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + 5
      })
    }, 40)

    // 1秒后跳转到画廊
    const redirect = setTimeout(() => {
      Taro.switchTab({ url: '/pages/gallery/index' })
    }, 1000)

    return () => {
      clearInterval(timer)
      clearTimeout(redirect)
    }
  }, [])

  return (
    <View className='loading-page'>
      {/* 幕布背景 */}
      <View className='loading-page__curtain velvet-bg'>
        <View className='loading-page__vignette' />
      </View>

      {/* 中央内容 */}
      <View className='loading-page__content'>
        <Text className='loading-page__title font-headline'>Intermission</Text>
        <Text className='loading-page__subtitle font-label'>THE PLAYBILL</Text>

        {/* 金色进度条 */}
        <View className='loading-page__progress-wrap'>
          <View
            className='loading-page__progress-bar shimmer-gold'
            style={{ width: `${progress}%` }}
          />
        </View>

        <Text className='loading-page__footer font-body'>The curtains are rising...</Text>
      </View>
    </View>
  )
}

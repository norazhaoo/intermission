import { useEffect, useState } from 'react'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

export default function Loading() {
  const [progress, setProgress] = useState(0)

  // 改为 2000 毫秒（2秒），因为小程序初始化和自定义 tabBar 的加载需要时间。
  // 太早调用 switchTab 会导致底层 WAService 发生 timeout 错误。
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

    // 2秒后跳转到画廊，给开发者工具和系统足够的初始化时间
    const redirect = setTimeout(() => {
      Taro.switchTab({ url: '/pages/gallery/index' })
        .catch(err => console.error('switchTab error:', err))
    }, 2000)

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
        <Text className='loading-page__subtitle font-label'>剧目手帐</Text>

        {/* 金色进度条 */}
        <View className='loading-page__progress-wrap'>
          <View
            className='loading-page__progress-bar shimmer-gold'
            style={{ width: `${progress}%` }}
          />
        </View>

        <Text className='loading-page__footer font-body'>幕布正在升起...</Text>
      </View>
    </View>
  )
}

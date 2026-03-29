import Taro, { useDidShow } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

export default function Seats() {
  useDidShow(() => {
    const tabBar = Taro.getTabBar?.()
    tabBar?.setSelected(2)
  })

  return (
    <View className='seats-page'>
      <View className='seats-content'>
        <Text className='seats-content__icon'>💺</Text>
        <Text className='seats-content__title font-headline'>Coming Soon</Text>
        <Text className='seats-content__text font-body'>
          Your seat map and theater experience tracker is under development
        </Text>
        <View className='seats-content__ornament'>
          <Text style={{ color: '#d4af37', fontSize: '24rpx', letterSpacing: '4rpx' }}>
            ✦ ✦ ✦
          </Text>
        </View>
      </View>
    </View>
  )
}

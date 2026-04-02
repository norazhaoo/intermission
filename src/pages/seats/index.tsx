import Taro, { useDidShow } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

export default function Seats() {
  useDidShow(() => {
    const page = Taro.getCurrentInstance().page
    const tabBar = Taro.getTabBar?.(page) as any
    tabBar?.setSelected(2)
  })

  return (
    <View className='min-h-screen velvet-bg-seats pt-[100rpx] pb-[160rpx] px-6 flex flex-col items-center justify-center font-body'>
      {/* Hero Section */}
      <View className='text-center mb-16 relative z-10 w-full'>
        <Text className='text-secondary-fixed/80 font-medium tracking-wide text-xs mb-4 block uppercase'>
          票房管理
        </Text>
        <Text className='font-headline text-[96rpx] leading-none text-secondary-fixed font-black tracking-tighter mb-6 italic block'>
          剧场视角
        </Text>
        <View className='flex items-center justify-center gap-4 opacity-40'>
          <View className='h-px w-12 bg-secondary-fixed'></View>
          <Text className='material-symbols-outlined text-secondary-fixed text-sm' style={{ fontVariationSettings: "'FILL' 1" }}>
            star
          </Text>
          <View className='h-px w-12 bg-secondary-fixed'></View>
        </View>
      </View>

      {/* Central Action Grid */}
      <View className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl relative z-10'>
        {/* Add Seat View Button */}
        <View 
          className='group parchment-ticket p-1 shadow-2xl transition-transform active:scale-[0.98] duration-200 aspect-[4/3] flex flex-col'
          onClick={() => Taro.navigateTo({ url: '/pages/seats-add/index' })}
        >
          <View className='border-[4rpx] border-primary/20 p-6 flex flex-col items-center text-center bg-[#fcf3d8] flex-1 h-full'>
            <View className='w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 mb-6 mt-4'>
              <Text className='material-symbols-outlined text-3xl'>add_a_photo</Text>
            </View>
            <View className='flex flex-col flex-1 justify-center items-center'>
              <Text className='font-headline text-[56rpx] text-primary font-black uppercase italic tracking-tighter leading-tight block'>
                添加视角
              </Text>
              <Text className='text-on-surface-variant text-[20rpx] font-bold uppercase tracking-widest mt-3 opacity-70 max-w-[360rpx] block text-center'>
                为观众捕捉并上传新的剧场视角。
              </Text>
            </View>
          </View>
        </View>

        {/* Search Seat Button */}
        <View 
          className='group parchment-ticket p-1 shadow-2xl transition-transform active:scale-[0.98] duration-200 aspect-[4/3] flex flex-col'
          // Temporarily route to detail to show off the visual
          onClick={() => Taro.navigateTo({ url: '/pages/seats-detail/index' })}
        >
          <View className='border-[4rpx] border-primary/20 p-6 flex flex-col items-center text-center bg-[#fcf3d8] flex-1 h-full'>
            <View className='w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 mb-6 mt-4'>
              <Text className='material-symbols-outlined text-3xl'>map</Text>
            </View>
            <View className='flex flex-col flex-1 justify-center items-center'>
              <Text className='font-headline text-[56rpx] text-primary font-black uppercase italic tracking-tighter leading-tight block'>
                搜索座位
              </Text>
              <Text className='text-on-surface-variant text-[20rpx] font-bold uppercase tracking-widest mt-3 opacity-70 max-w-[360rpx] block text-center'>
                定位并浏览全场已有的座位视角档案。
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Curtain Divider Style Decorative Element */}
      <View className='mt-20 flex flex-col items-center opacity-40 relative z-10 w-full'>
        <View className='w-24 h-px bg-secondary-fixed mb-4'></View>
        <Text className='material-symbols-outlined text-secondary-fixed text-4xl block line-height-1'>flare</Text>
        <View className='w-24 h-px bg-secondary-fixed mt-4'></View>
      </View>
    </View>
  )
}

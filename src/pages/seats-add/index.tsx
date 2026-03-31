import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import stageView from '../../assets/images/stage-view.png'
import './index.scss'

export default function SeatsAdd() {
  return (
    <View className='bg-surface text-on-surface font-body min-h-screen flex flex-col'>
      {/* TopAppBar */}
      <View className='flex items-center justify-between px-6 h-[120rpx] w-full z-50 bg-[#fff9ed] dark:bg-[#1f1c0b] shadow-[0px_16px_20px_rgba(31,28,11,0.06)] sticky top-0'>
        <View className='flex items-center gap-4'>
          <View 
            className='flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#ebe2c8] transition-colors duration-300 active:scale-95 text-[#5d000a] dark:text-[#ffb4ab]'
            onClick={() => Taro.navigateBack()}
          >
            <Text className='material-symbols-outlined'>arrow_back</Text>
          </View>
          <Text className='font-headline text-[48rpx] font-bold tracking-tight text-[#5d000a] dark:text-[#ffb4ab]' style={{lineHeight: 1}}>
            捕捉视角
          </Text>
        </View>
        <View className='flex items-center gap-2'>
          <Text className='text-[#5d000a] font-headline font-black italic'>DP</Text>
        </View>
      </View>

      {/* Main Canvas */}
      <View className='flex-1 flex flex-col relative overflow-hidden px-4 pt-6 pb-32'>
        {/* Camera Viewfinder Container */}
        <View className='relative flex-1 w-full rounded-xl overflow-hidden bg-on-background border-[8rpx] border-surface-variant shadow-2xl group min-h-[800rpx]'>
          {/* Stage Image Background */}
          <View 
            className='absolute inset-0 bg-cover bg-center' 
            style={{ backgroundImage: `url(${stageView})` }}
          ></View>
          
          {/* Theatrical Viewfinder Overlay */}
          <View className='absolute inset-0 viewfinder-mask pointer-events-none flex flex-col items-center justify-between p-8'>
            <View className='bg-on-background/40 px-6 py-3 rounded-full border border-secondary/20' style={{ backdropFilter: 'blur(12px)' }}>
              <Text className='text-secondary-fixed text-[20rpx] uppercase tracking-[0.2em] font-bold text-center block'>
                将辅助线与舞台边缘对齐，获得标准视角
              </Text>
            </View>
            
            {/* Alignment Guides */}
            <View className='absolute inset-0 flex justify-center pointer-events-none'>
              <View className='h-full w-[560rpx] flex justify-between'>
                <View className='w-[4rpx] h-full bg-secondary/60 shadow-[0_0_16rpx_rgba(119,90,25,0.8)]'></View>
                <View className='w-[4rpx] h-full bg-secondary/60 shadow-[0_0_16rpx_rgba(119,90,25,0.8)]'></View>
              </View>
            </View>

            <View className='bg-on-background/40 px-6 py-3 rounded-lg border border-outline-variant/30 mt-auto' style={{ backdropFilter: 'blur(12px)' }}>
              <Text className='text-surface font-body text-[20rpx] tracking-widest uppercase font-medium block'>
                固定焦距：1.0x (人眼视觉保全)
              </Text>
            </View>
          </View>
          
          {/* Corner Accents */}
          <View className='absolute top-4 left-4 w-8 h-8 border-t-[4rpx] border-l-[4rpx] border-secondary/40'></View>
          <View className='absolute top-4 right-4 w-8 h-8 border-t-[4rpx] border-r-[4rpx] border-secondary/40'></View>
          <View className='absolute bottom-4 left-4 w-8 h-8 border-b-[4rpx] border-l-[4rpx] border-secondary/40'></View>
          <View className='absolute bottom-4 right-4 w-8 h-8 border-b-[4rpx] border-r-[4rpx] border-secondary/40'></View>
        </View>

        {/* Control Center */}
        <View className='mt-8 flex flex-col items-center gap-8'>
          <View className='flex items-center justify-between w-full max-w-xs px-[40rpx]'>
            {/* Gallery Option */}
            <View className='flex flex-col items-center gap-2 group'>
              <View className='w-[96rpx] h-[96rpx] rounded-full bg-surface-container-high flex items-center justify-center text-secondary border border-outline-variant/40 group-hover:bg-secondary-container transition-all'>
                <Text className='material-symbols-outlined text-[48rpx]'>filter_frames</Text>
              </View>
              <Text className='text-[20rpx] uppercase tracking-tighter font-bold text-on-surface-variant'>画廊</Text>
            </View>
            
            {/* Shutter Button */}
            <View className='relative'>
              <View className='absolute -inset-4 bg-secondary/10 rounded-full' style={{ filter: 'blur(20px)' }}></View>
              <View className='relative w-[192rpx] h-[192rpx] rounded-full bg-gradient-to-tr from-primary to-primary-container p-1 shadow-2xl active:scale-95 transition-transform duration-200 ring-[8rpx] ring-secondary/20'>
                <View className='w-full h-full rounded-full border-[4rpx] border-secondary-fixed/30 flex items-center justify-center'>
                  <View className='w-[128rpx] h-[128rpx] rounded-full border-2 border-on-primary/20 flex items-center justify-center'>
                    <View className='w-4 h-4 rounded-full bg-secondary-fixed shadow-[0_0_20rpx_rgba(255,222,165,0.6)]'></View>
                  </View>
                </View>
              </View>
            </View>
            
            {/* Flash Option */}
            <View className='flex flex-col items-center gap-2 group'>
              <View className='w-[96rpx] h-[96rpx] rounded-full bg-surface-container-high flex items-center justify-center text-secondary border border-outline-variant/40 group-hover:bg-secondary-container transition-all'>
                <Text className='material-symbols-outlined text-[48rpx]'>flash_on</Text>
              </View>
              <Text className='text-[20rpx] uppercase tracking-tighter font-bold text-on-surface-variant'>闪光灯</Text>
            </View>
          </View>
          
          <Text className='font-headline italic text-on-surface-variant/80 text-[28rpx] mt-4'>
            完美定格观众眼中的舞台景象。
          </Text>
        </View>
      </View>
    </View>
  )
}

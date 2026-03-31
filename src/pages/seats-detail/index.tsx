import Taro from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import stageView from '../../assets/images/stage-view.png'
import vintageMap from '../../assets/images/vintage-map.png'
import posterGeneric from '../../assets/images/poster-generic.png'
import './index.scss'

export default function SeatsDetail() {
  return (
    <View className='bg-background text-on-background font-body min-h-screen flex flex-col relative'>
      {/* TopAppBar */}
      <View className='bg-[#fff9ed] dark:bg-[#1f1c0b] shadow-[0_16px_20px_-5px_rgba(31,28,11,0.06)] flex justify-between items-center w-full px-6 h-[120rpx] sticky top-0 z-50'>
        <View className='flex items-center gap-4'>
          <View 
            className='hover:bg-[#fed488]/20 transition-colors active:scale-95 duration-200 ease-in-out p-2 rounded-full flex items-center justify-center'
            onClick={() => Taro.navigateBack()}
          >
            <Text className='material-symbols-outlined text-[#5d000a] dark:text-[#ffb4ab]'>arrow_back</Text>
          </View>
          <Text className='font-headline text-[#5d000a] uppercase tracking-widest text-[40rpx] leading-none font-black italic'>剧目手帐</Text>
        </View>
        <View className='flex items-center gap-4'>
          <Text className='font-label text-[#584140] dark:text-[#dfbfbd] text-[28rpx] hidden md:block'>MAJESTIC THEATRE（美琪大戏院）</Text>
          <View className='w-10 h-10 rounded-full overflow-hidden border-2 border-secondary'>
            <Image className='w-full h-full' src={posterGeneric} mode='aspectFill' />
          </View>
        </View>
      </View>

      <ScrollView scrollY className='flex-1 pb-32'>
        {/* Hero Section: Stage View */}
        <View className='relative w-full h-[1060rpx] md:h-[1326rpx] bg-on-background overflow-hidden flex items-center justify-center p-4 md:p-10'>
          {/* Stage Photo with Ornate Frame */}
          <View className='relative w-full max-w-6xl h-full stage-frame shadow-2xl overflow-hidden group'>
            <Image 
              className='w-full h-full object-cover transition-all duration-700' 
              style={{ filter: 'brightness(0.75)' }}
              src={stageView} 
              mode='aspectFill'
            />
            
            {/* Spotlight Overlay */}
            <View className='absolute inset-0 bg-gradient-to-t from-on-background/80 via-transparent to-transparent pointer-events-none'></View>
            
            {/* View Indicator Labels */}
            <View className='absolute top-6 left-6 flex flex-col gap-2'>
              <Text className='bg-secondary text-on-secondary px-3 py-1 text-[20rpx] font-bold tracking-widest uppercase rounded-sm self-start'>
                中心楼座
              </Text>
              <Text className='bg-primary text-on-primary px-3 py-1 text-[20rpx] font-bold tracking-widest uppercase rounded-sm self-start'>
                C 排 • 112 座
              </Text>
            </View>
            
            {/* Interactive View Controls */}
            <View className='absolute bottom-6 right-6 flex gap-3'>
              <View className='bg-[#ffffff]/10 p-3 rounded-full border border-[#ffffff]/20 flex items-center justify-center' style={{ backdropFilter: 'blur(12px)' }}>
                <Text className='material-symbols-outlined text-white'>zoom_in</Text>
              </View>
              <View className='bg-[#ffffff]/10 p-3 rounded-full border border-[#ffffff]/20 flex items-center justify-center' style={{ backdropFilter: 'blur(12px)' }}>
                <Text className='material-symbols-outlined text-white'>360</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Seat Details Content */}
        <View className='max-w-7xl mx-auto px-6 -mt-[96rpx] relative z-10'>
          <View className='flex flex-col lg:flex-row gap-10'>
            {/* Left: Seat Analytics */}
            <View className='flex-[7] space-y-10'>
              <View className='bg-surface-container-lowest p-8 md:p-12 shadow-xl relative overflow-hidden'>
                <Text className='material-symbols-outlined absolute -right-8 -top-8 text-surface-container-high text-[256rpx] opacity-50 select-none'>event_seat</Text>
                
                <Text className='font-headline text-[72rpx] md:text-[96rpx] leading-tight text-primary font-black italic mb-6 block' style={{lineHeight: '1.2'}}>
                  舞台保真度
                </Text>
                <Text className='text-on-surface-variant font-body text-[36rpx] leading-relaxed mb-8 max-w-2xl block'>
                  坐落于前排楼座中心，112座为您呈现舞台的无遮挡全景。高度正好能够鸟瞰复杂的舞台编舞，确保您绝不会错过任何群舞细节。
                </Text>
                
                <View className='flex flex-col md:flex-row gap-6'>
                  {/* Acoustic Card */}
                  <View className='flex-1 bg-surface-container p-6 border-b-[4rpx] border-secondary'>
                    <View className='flex items-center gap-3 mb-4'>
                      <Text className='material-symbols-outlined text-secondary'>graphic_eq</Text>
                      <Text className='font-headline text-[36rpx] font-bold text-tertiary block' style={{lineHeight: 1}}>声质清晰度</Text>
                    </View>
                    <View className='flex items-end gap-[4rpx] mb-2 h-[80rpx]'>
                      <View className='w-[8rpx] h-[32rpx] bg-secondary'></View>
                      <View className='w-[8rpx] h-[48rpx] bg-secondary'></View>
                      <View className='w-[8rpx] h-[64rpx] bg-secondary'></View>
                      <View className='w-[8rpx] h-[80rpx] bg-secondary'></View>
                      <View className='w-[8rpx] h-[56rpx] bg-outline-variant'></View>
                      <Text className='ml-2 font-label text-[28rpx] text-secondary font-bold inline-block leading-none mt-auto'>完美度 92%</Text>
                    </View>
                    <Text className='text-on-surface-variant text-[28rpx] block mt-4'>
                      剧院拱顶的自然扩音结构直接将声音完美汇聚于此区域。
                    </Text>
                  </View>
                  
                  {/* Legroom Card */}
                  <View className='flex-1 bg-surface-container p-6 border-b-[4rpx] border-secondary'>
                    <View className='flex items-center gap-3 mb-4'>
                      <Text className='material-symbols-outlined text-secondary'>straighten</Text>
                      <Text className='font-headline text-[36rpx] font-bold text-tertiary block' style={{lineHeight: 1}}>腿部空间指数</Text>
                    </View>
                    <View className='flex gap-[4rpx] mb-2 h-[80rpx] items-center'>
                      <Text className='material-symbols-outlined text-secondary text-[48rpx]' style={{ fontVariationSettings: "'FILL' 1" }}>star</Text>
                      <Text className='material-symbols-outlined text-secondary text-[48rpx]' style={{ fontVariationSettings: "'FILL' 1" }}>star</Text>
                      <Text className='material-symbols-outlined text-secondary text-[48rpx]' style={{ fontVariationSettings: "'FILL' 1" }}>star</Text>
                      <Text className='material-symbols-outlined text-secondary text-[48rpx]' style={{ fontVariationSettings: "'FILL' 1" }}>star</Text>
                      <Text className='material-symbols-outlined text-outline-variant text-[48rpx]'>star</Text>
                    </View>
                    <Text className='text-on-surface-variant text-[28rpx] block mt-4'>
                      标准历史剧院间距设计。适合身高 1.85 米以内的观众落座。
                    </Text>
                  </View>
                </View>
              </View>
              
              {/* "Curtain" Divider */}
              <View className='flex justify-center items-center py-10'>
                <View className='h-[2rpx] bg-outline-variant/30 flex-grow'></View>
                <Text className='material-symbols-outlined text-secondary mx-8 text-[48rpx]' style={{ fontVariationSettings: "'FILL' 1" }}>diamond</Text>
                <View className='h-[2rpx] bg-outline-variant/30 flex-grow'></View>
              </View>
              
              {/* Review Section */}
              <View className='space-y-6 pb-20'>
                <Text className='font-headline text-[48rpx] text-primary italic block mb-6'>观众随笔</Text>
                <View className='space-y-4'>
                  <View className='flex gap-6 items-start'>
                    <View className='flex-shrink-0 w-16 h-16 rounded-full overflow-hidden bg-surface-container-highest'>
                      <Image className='w-full h-full' src={posterGeneric} mode='aspectFill' />
                    </View>
                    <View className='border-l-[4rpx] border-outline-variant pl-6 py-2'>
                      <Text className='font-body italic text-on-surface-variant block text-[32rpx]'>"《歌剧魅影》在这个视角的视线极佳。能完美看到吊灯升起的诡异轨迹。"</Text>
                      <Text className='font-label text-[24rpx] mt-4 uppercase tracking-widest text-secondary block'>— Eleanor Vance, 2023 年 10 月</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* Right: Vintage Map Overlay */}
            <View className='flex-[5] lg:w-5/12 pb-24'>
              <View className='lg:sticky top-28 bg-surface-container shadow-2xl rounded-sm p-6 border border-secondary/20'>
                <View className='flex justify-between items-center mb-6'>
                  <Text className='font-headline text-[40rpx] text-primary font-bold'>剧院落座图</Text>
                  <Text className='font-label text-[24rpx] text-secondary-fixed-variant bg-secondary-fixed px-2 py-1'>中心楼座</Text>
                </View>
                
                {/* Vintage-styled Seat Map */}
                <View className='aspect-square bg-[#fcf3d8] rounded-sm p-4 relative overflow-hidden border border-outline-variant/30 min-h-[500rpx] flex flex-col'>
                  <View className='w-full h-full opacity-20 absolute inset-0' style={{ mixBlendMode: 'multiply' }}>
                    <Image className='w-full h-full object-cover' src={vintageMap} mode='aspectFill' />
                  </View>
                  
                  <View className='relative z-10 w-full h-full flex flex-col items-center justify-center flex-1'>
                    <View className='w-48 h-12 bg-primary/10 border-[4rpx] border-primary/20 flex items-center justify-center mb-10'>
                      <Text className='font-headline text-primary/40 text-[24rpx] tracking-widest uppercase block'>舞 台</Text>
                    </View>
                    
                    <View className='grid grid-cols-10 gap-2 opacity-40 justify-center w-full my-4'>
                      {[...Array(20)].map((_, i) => (
                        <View key={`orch-${i}`} className='w-4 h-4 rounded-full bg-outline mx-auto'></View>
                      ))}
                    </View>
                    
                    <View className='w-full h-[2rpx] bg-secondary/30 my-6'></View>
                    
                    <View className='grid grid-cols-8 gap-4 justify-center items-center w-full'>
                      <View className='w-5 h-5 rounded-full bg-outline mx-auto'></View>
                      <View className='w-5 h-5 rounded-full bg-outline mx-auto'></View>
                      <View className='w-5 h-5 rounded-full bg-outline mx-auto'></View>
                      
                      <View className='relative mx-auto flex justify-center items-center'>
                        <View className='w-8 h-8 rounded-full bg-primary shadow-lg ring-[8rpx] ring-primary/20' style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></View>
                        <Text className='absolute -top-12 self-center font-label text-[20rpx] bg-primary text-on-primary px-2 py-1 whitespace-nowrap' style={{ transform: 'translateX(-50%)', left: '50%' }}>
                          您的位置
                        </Text>
                      </View>
                      
                      <View className='w-5 h-5 rounded-full bg-outline mx-auto'></View>
                      <View className='w-5 h-5 rounded-full bg-outline mx-auto'></View>
                      <View className='w-5 h-5 rounded-full bg-outline mx-auto'></View>
                      <View className='w-5 h-5 rounded-full bg-outline mx-auto'></View>
                    </View>
                  </View>
                </View>
                
                <View className='mt-8 space-y-4'>
                  <View className='flex justify-between items-center text-on-surface'>
                    <Text className='font-label uppercase tracking-widest text-[24rpx]'>标准票价</Text>
                    <Text className='font-headline font-bold text-[36rpx]'>$189.00</Text>
                  </View>
                </View>

              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

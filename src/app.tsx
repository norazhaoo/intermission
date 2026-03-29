import { PropsWithChildren } from 'react'
import Taro from '@tarojs/taro'
import { initSeedData } from './lib/store'
import './app.scss'

function App({ children }: PropsWithChildren) {
  // 首次启动时初始化种子数据和加载字体
  Taro.useLaunch(() => {
    // 初始化种子数据
    initSeedData()

    // 加载自定义字体 - Noto Serif
    Taro.loadFontFace({
      global: true,
      family: 'Noto Serif',
      source: 'url("https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400&display=swap")',
      success: () => console.log('Noto Serif loaded'),
      fail: () => console.log('Noto Serif fallback to system serif')
    })

    // 加载自定义字体 - Manrope
    Taro.loadFontFace({
      global: true,
      family: 'Manrope',
      source: 'url("https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700&display=swap")',
      success: () => console.log('Manrope loaded'),
      fail: () => console.log('Manrope fallback to system sans-serif')
    })
  })

  return children
}

export default App

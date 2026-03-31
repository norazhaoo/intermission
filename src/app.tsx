import { PropsWithChildren } from 'react'
import Taro from '@tarojs/taro'
import { initSeedData } from './lib/store'
import './app.scss'

function App({ children }: PropsWithChildren) {
  // 首次启动时初始化种子数据和加载字体
  Taro.useLaunch(() => {
    // 初始化种子数据
    initSeedData()

    // 微信小程序中 loadFontFace 需要绝对字体的 TTF/WOFF2 地址，而非 CSS 地址。
    // 在这里取消加载外部 Google 字体，改用本地设备系统提供的高级替换字体（Serif / Sans-Serif）。
    console.log('Using elegant local system fonts (Serif / Sans-serif) due to WeChat Webfont limitations.')
  })

  return children
}

export default App

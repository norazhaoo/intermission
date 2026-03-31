import { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'

interface TabItem {
  pagePath: string
  text: string
  icon: string
  iconFilled: string
}

const TAB_LIST: TabItem[] = [
  { pagePath: '/pages/gallery/index', text: '画廊', icon: '🖼', iconFilled: '🖼' },
  { pagePath: '/pages/tickets/index', text: '票根', icon: '🎫', iconFilled: '🎫' },
  { pagePath: '/pages/seats/index', text: '座位', icon: '💺', iconFilled: '💺' },
  { pagePath: '/pages/shows/index', text: '剧目', icon: '🎭', iconFilled: '🎭' },
  { pagePath: '/pages/calendar/index', text: '日历', icon: '📅', iconFilled: '📅' }
]

interface CustomTabBarState {
  selected: number
}

export default class CustomTabBar extends Component<{}, CustomTabBarState> {
  state = {
    selected: 0
  }

  setSelected(idx: number) {
    this.setState({ selected: idx })
  }

  switchTab(index: number, url: string) {
    Taro.switchTab({ url })
  }

  render() {
    const { selected } = this.state

    return (
      <View className='custom-tab-bar'>
        <View className='custom-tab-bar__inner'>
          {TAB_LIST.map((tab, index) => {
            const isActive = selected === index
            return (
              <View
                key={tab.pagePath}
                className={`custom-tab-bar__item ${isActive ? 'custom-tab-bar__item--active' : ''}`}
                onClick={() => this.switchTab(index, tab.pagePath)}
              >
                <View className={`custom-tab-bar__icon-wrap ${isActive ? 'custom-tab-bar__icon-wrap--active' : ''}`}>
                  <Text className='custom-tab-bar__icon'>
                    {isActive ? tab.iconFilled : tab.icon}
                  </Text>
                </View>
                <Text className={`custom-tab-bar__label ${isActive ? 'custom-tab-bar__label--active' : ''}`}>
                  {tab.text}
                </Text>
              </View>
            )
          })}
        </View>
      </View>
    )
  }
}

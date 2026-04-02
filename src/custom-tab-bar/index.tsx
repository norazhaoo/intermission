import { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import posterwallIcon from '../assets/images/icon/posterwall_icon.png'
import ticketIcon from '../assets/images/icon/ticket_icon.png'
import seatIcon from '../assets/images/icon/seat_icon.png'
import showIcon from '../assets/images/icon/show_icon.png'
import calendarIcon from '../assets/images/icon/calendar_icon.png'
import './index.scss'

interface TabItem {
  pagePath: string
  text: string
  icon: string
  iconFilled: string
}

const TAB_LIST: TabItem[] = [
  { pagePath: '/pages/gallery/index', text: '画廊', icon: posterwallIcon, iconFilled: posterwallIcon },
  { pagePath: '/pages/tickets/index', text: '票根', icon: ticketIcon, iconFilled: ticketIcon },
  { pagePath: '/pages/seats/index', text: '座位', icon: seatIcon, iconFilled: seatIcon },
  { pagePath: '/pages/shows/index', text: '剧目', icon: showIcon, iconFilled: showIcon },
  { pagePath: '/pages/calendar/index', text: '日历', icon: calendarIcon, iconFilled: calendarIcon }
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

  switchTab(url: string) {
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
                onClick={() => this.switchTab(tab.pagePath)}
              >
                <View className={`custom-tab-bar__icon-wrap ${isActive ? 'custom-tab-bar__icon-wrap--active' : ''}`}>
                  <Image 
                    className={`custom-tab-bar__icon ${isActive ? 'custom-tab-bar__icon--active' : ''}`}
                    src={isActive ? tab.iconFilled : tab.icon} 
                     mode='aspectFit'
                  />
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

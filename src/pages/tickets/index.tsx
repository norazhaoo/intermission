import Taro, { useDidShow } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import CurtainDivider from '../../components/CurtainDivider'
import './index.scss'

export default function Tickets() {
  useDidShow(() => {
    const tabBar = Taro.getTabBar?.()
    tabBar?.setSelected(1)
  })

  const actions = [
    {
      icon: '✎',
      title: '手动添加票根',
      subtitle: '手动输入票根详情',
      url: '/pages/tickets-add/index'
    },
    {
      icon: '📷',
      title: '扫码添加票根',
      subtitle: '拍摄你的实体票根',
      url: '/pages/tickets-add/index?scan=true'
    },
    {
      icon: '👁',
      title: '查看票根',
      subtitle: '浏览你的票根收藏',
      url: '/pages/tickets-list/index'
    }
  ]

  return (
    <View className='tickets-page'>
      <View className='tickets-header'>
        <Text className='tickets-header__title font-headline'>我的票仓</Text>
        <Text className='tickets-header__subtitle font-body'>
          管理你的观剧票根
        </Text>
      </View>

      <CurtainDivider icon='flare' />

      <View className='tickets-actions'>
        {actions.map((action, idx) => (
          <View
            key={idx}
            className='ticket-action parchment-ticket'
            hoverClass='btn-theatrical-active'
            onClick={() => {
              if (action.url.includes('scan=true')) {
                // 扫描流程
                Taro.chooseImage({
                  count: 1,
                  sizeType: ['compressed'],
                  sourceType: ['album', 'camera'],
                  success: (res) => {
                    const tempPath = res.tempFilePaths[0]
                    Taro.navigateTo({
                      url: `/pages/tickets-add/index?imageUrl=${encodeURIComponent(tempPath)}`
                    })
                  }
                })
              } else {
                Taro.navigateTo({ url: action.url })
              }
            }}
          >
            <View className='ticket-action__icon-circle'>
              <Text className='ticket-action__icon'>{action.icon}</Text>
            </View>
            <View className='ticket-action__text'>
              <Text className='ticket-action__title font-headline'>{action.title}</Text>
              <Text className='ticket-action__subtitle font-body'>{action.subtitle}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={{ height: '160rpx' }} />
    </View>
  )
}

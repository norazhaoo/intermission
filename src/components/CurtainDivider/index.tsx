import { View } from '@tarojs/components'
import Icon from '../Icon'
import './index.scss'

interface CurtainDividerProps {
  icon?: string
  className?: string
}

export default function CurtainDivider({ icon = 'diamond', className = '' }: CurtainDividerProps) {
  return (
    <View className={`curtain-divider ${className}`}>
      <View className='curtain-divider__line' />
      <View className='curtain-divider__icon'>
        <Icon name={icon} size={24} color='#8b716f' />
      </View>
      <View className='curtain-divider__line' />
    </View>
  )
}

import { Text } from '@tarojs/components'

interface IconProps {
  name: string
  size?: number
  color?: string
  className?: string
  filled?: boolean
}

/**
 * Icon 组件 - 使用 Unicode 字符和 emoji 作为小程序图标方案
 * 后续可替换为 iconfont 方案
 */
const ICON_MAP: Record<string, string> = {
  'collections': '🖼',
  'confirmation_number': '🎫',
  'event_seat': '💺',
  'theater_comedy': '🎭',
  'calendar_month': '📅',
  'search': '🔍',
  'add': '＋',
  'arrow_back': '←',
  'close': '✕',
  'chevron_left': '‹',
  'chevron_right': '›',
  'photo_camera': '📷',
  'star': '★',
  'star_outline': '☆',
  'favorite': '♥',
  'auto_awesome': '✨',
  'menu': '☰',
  'diamond': '◆',
  'edit': '✎',
  'qr_code_scanner': '📱',
  'visibility': '👁',
  'document_scanner': '📄',
  'flare': '✦',
  'library_books': '📚',
  'emoji_events': '🏆',
  'history': '⏱',
  'groups': '👥',
  'format_quote': '❝',
}

export default function Icon({ name, size = 40, color, className = '', filled }: IconProps) {
  const icon = ICON_MAP[name] || '•'
  return (
    <Text
      className={className}
      style={{
        fontSize: `${size}rpx`,
        color: color || 'inherit',
        lineHeight: 1,
        fontStyle: 'normal'
      }}
    >
      {icon}
    </Text>
  )
}

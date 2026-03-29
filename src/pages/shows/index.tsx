import { useState } from 'react'
import Taro, { useDidShow } from '@tarojs/taro'
import { View, Text, Image, Input, ScrollView } from '@tarojs/components'
import { useShows } from '../../lib/hooks'
import './index.scss'

export default function Shows() {
  const { shows } = useShows()
  const [query, setQuery] = useState('')

  useDidShow(() => {
    const tabBar = Taro.getTabBar?.()
    tabBar?.setSelected(3)
  })

  const filtered = shows.filter(s =>
    s.title.toLowerCase().includes(query.toLowerCase()) ||
    s.composer.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <View className='shows-page'>
      <View className='shows-header'>
        <Text className='shows-header__title font-headline'>Find a Show</Text>
        <View className='shows-search'>
          <Text className='shows-search__icon'>🔍</Text>
          <Input
            className='shows-search__input font-body'
            placeholder='Search by title, composer, genre...'
            placeholderClass='shows-search__placeholder'
            value={query}
            onInput={e => setQuery(e.detail.value)}
          />
        </View>
      </View>

      <ScrollView scrollY className='shows-list'>
        {filtered.map(show => (
          <View
            key={show.id}
            className='show-item'
            onClick={() => Taro.navigateTo({ url: `/pages/shows-detail/index?id=${show.id}` })}
          >
            <Image className='show-item__poster' src={show.posterUrl} mode='aspectFill' />
            <View className='show-item__info'>
              <Text className='show-item__title font-headline'>{show.title}</Text>
              <Text className='show-item__composer font-body'>{show.composer}</Text>
              {show.isRunning && (
                <View className='show-item__badge'>
                  <Text className='font-label'>Now Playing</Text>
                </View>
              )}
            </View>
          </View>
        ))}

        {/* 找不到剧目提示 */}
        <View className='shows-cta parchment-ticket'>
          <Text className='shows-cta__title font-headline'>Can't find your show?</Text>
          <Text className='shows-cta__text font-body'>Add it manually to the archives</Text>
          <View
            className='btn-theatrical'
            style={{ marginTop: '16rpx' }}
            onClick={() => Taro.navigateTo({ url: '/pages/shows-new/index' })}
          >
            <Text style={{ color: '#fff' }}>Add Manual Entry</Text>
          </View>
        </View>

        <View style={{ height: '160rpx' }} />
      </ScrollView>
    </View>
  )
}

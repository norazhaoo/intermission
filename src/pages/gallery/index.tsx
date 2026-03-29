import { useState } from 'react'
import Taro, { useDidShow } from '@tarojs/taro'
import { View, Text, Image, Input, ScrollView } from '@tarojs/components'
import CurtainDivider from '../../components/CurtainDivider'
import { useShows } from '../../lib/hooks'
import { getReviews } from '../../lib/store'
import { Review } from '../../lib/types'
import './index.scss'

export default function Gallery() {
  const { shows } = useShows()
  const [reviews, setReviews] = useState<Review[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  useDidShow(() => {
    setReviews(getReviews())
    // 同步 TabBar 状态
    const tabBar = Taro.getTabBar?.()
    tabBar?.setSelected(0)
  })

  // 筛选剧目
  const filteredShows = shows.filter(show =>
    show.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const top9 = filteredShows.slice(0, 9)
  const allShows = filteredShows

  return (
    <ScrollView scrollY className='gallery-page'>
      {/* 头部 */}
      <View className='gallery-header'>
        <Text className='gallery-header__title font-headline'>Grand Gallery</Text>
        <Text className='gallery-header__subtitle font-body'>Your theatrical archives</Text>

        {/* 成就徽章 */}
        {shows.length > 0 && (
          <View className='gallery-badge'>
            <Text className='gallery-badge__icon'>✨</Text>
            <Text className='gallery-badge__text font-label'>
              Patron of the Arts: {shows.length} Performances
            </Text>
          </View>
        )}

        {/* 搜索 */}
        <View className='gallery-search'>
          <Text className='gallery-search__icon'>🔍</Text>
          <Input
            className='gallery-search__input font-body'
            placeholder='Search the archives...'
            placeholderClass='gallery-search__placeholder'
            value={searchQuery}
            onInput={(e) => setSearchQuery(e.detail.value)}
          />
        </View>

        {/* 筛选按钮 */}
        <View className='gallery-filters'>
          <View className='gallery-filters__btn gallery-filters__btn--active'>
            <Text className='font-label'>All</Text>
          </View>
          <View className='gallery-filters__btn'>
            <Text className='font-label'>Favorites</Text>
          </View>
          <View className='gallery-filters__btn'>
            <Text className='font-label'>By Premiere</Text>
          </View>
        </View>
      </View>

      {/* Top 9 精选 */}
      {top9.length > 0 && (
        <View className='gallery-section'>
          <View className='gallery-section__header'>
            <Text className='gallery-section__title font-headline'>— TOP 9 —</Text>
          </View>
          <View className='gallery-top9'>
            {top9.map(show => (
              <View
                key={show.id}
                className='gallery-top9__item ornate-frame'
                onClick={() => Taro.navigateTo({ url: `/pages/shows-detail/index?id=${show.id}` })}
              >
                <Image
                  className='gallery-top9__poster'
                  src={show.posterUrl}
                  mode='aspectFill'
                />
                <Text className='gallery-top9__name font-body'>{show.title}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      <CurtainDivider icon='flare' />

      {/* 完整海报网格 */}
      {allShows.length > 0 && (
        <View className='gallery-section'>
          <View className='gallery-section__header'>
            <Text className='gallery-section__title font-headline'>Complete Archive</Text>
          </View>
          <View className='gallery-grid'>
            {allShows.map(show => (
              <View
                key={show.id}
                className='gallery-grid__item'
                onClick={() => Taro.navigateTo({ url: `/pages/shows-detail/index?id=${show.id}` })}
              >
                <Image
                  className='gallery-grid__poster'
                  src={show.posterUrl}
                  mode='aspectFill'
                />
              </View>
            ))}
          </View>
        </View>
      )}

      {/* 空状态 */}
      {shows.length === 0 && (
        <View className='gallery-empty'>
          <Text className='gallery-empty__icon'>🎭</Text>
          <Text className='gallery-empty__title font-headline'>Your gallery awaits</Text>
          <Text className='gallery-empty__text font-body'>
            Add shows to your collection to build your theatrical gallery
          </Text>
          <View
            className='btn-theatrical'
            onClick={() => Taro.switchTab({ url: '/pages/shows/index' })}
          >
            <Text style={{ color: '#fff' }}>Explore Shows</Text>
          </View>
        </View>
      )}

      <CurtainDivider />

      {/* 演出评论动态流 */}
      <View className='gallery-section'>
        <View className='gallery-section__header'>
          <Text className='gallery-section__title font-headline'>Performance Reviews</Text>
          <View
            className='btn-gold-outline'
            onClick={() => Taro.navigateTo({ url: '/pages/gallery-review-new/index' })}
          >
            <Text>Add Review</Text>
          </View>
        </View>

        {reviews.length > 0 ? (
          <View className='gallery-reviews'>
            {reviews.map(review => (
              <View key={review.id} className='review-card'>
                <View className='review-card__left'>
                  <View className='review-card__poster-frame ornate-frame'>
                    {review.playbillImageUrl ? (
                      <Image
                        className='review-card__poster'
                        src={review.playbillImageUrl}
                        mode='aspectFill'
                      />
                    ) : (
                      <View className='review-card__poster-placeholder'>
                        <Text>🎭</Text>
                      </View>
                    )}
                  </View>
                </View>
                <View className='review-card__right'>
                  <Text className='review-card__date font-label'>
                    {new Date(review.createdAt).toLocaleDateString()}
                  </Text>
                  <Text className='review-card__quote font-body'>
                    "{review.notes || 'No notes provided'}"
                  </Text>
                  {review.tag && (
                    <View className='review-card__tag'>
                      <Text className='font-label'>{review.tag}</Text>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View className='gallery-reviews-empty'>
            <Text className='font-body' style={{ color: '#8b716f' }}>
              Share your theatrical experiences. Your reviews appear here.
            </Text>
          </View>
        )}
      </View>

      {/* Missing a Show? */}
      <View className='gallery-cta parchment-ticket'>
        <Text className='gallery-cta__title font-headline'>Missing a Show?</Text>
        <Text className='gallery-cta__text font-body'>
          Explore our database and add new shows to your collection
        </Text>
        <View
          className='btn-theatrical'
          style={{ marginTop: '16rpx' }}
          onClick={() => Taro.switchTab({ url: '/pages/shows/index' })}
        >
          <Text style={{ color: '#fff' }}>Explore Database</Text>
        </View>
      </View>

      {/* 底部安全区 */}
      <View style={{ height: '160rpx' }} />
    </ScrollView>
  )
}

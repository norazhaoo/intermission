import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import { useState } from 'react'
import { useDidShow } from '@tarojs/taro'
import { getShowById } from '../../lib/store'
import { Show } from '../../lib/types'
import CurtainDivider from '../../components/CurtainDivider'
import './index.scss'

export default function ShowsDetail() {
  const [show, setShow] = useState<Show | null>(null)
  const id = getCurrentInstance().router?.params?.id

  useDidShow(() => {
    if (id) {
      const found = getShowById(id)
      if (found) setShow(found)
    }
  })

  if (!show) {
    return (
      <View className='detail-page'><Text className='font-body'>Loading...</Text></View>
    )
  }

  // 渲染星星
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Text key={i} style={{ color: i < rating ? '#d4af37' : '#dfbfbd', fontSize: '28rpx' }}>★</Text>
    ))
  }

  return (
    <ScrollView scrollY className='detail-page'>
      {/* 主视觉区域 */}
      <View className='detail-hero'>
        <Image className='detail-hero__image' src={show.posterUrl} mode='aspectFill' />
        <View className='detail-hero__overlay' />
        <View className='detail-hero__content'>
          <Text className='detail-hero__title font-headline'>{show.title}</Text>
          {show.isRunning && (
            <View className='detail-hero__badge'>
              <Text className='font-label' style={{ color: '#fff', fontSize: '18rpx' }}>Now Playing</Text>
            </View>
          )}
        </View>
      </View>

      {/* 演出信息 */}
      <View className='detail-info parchment-ticket'>
        {show.theater && (
          <View className='detail-info__row'>
            <Text className='detail-info__label font-label'>Theater</Text>
            <Text className='detail-info__value font-body'>{show.theater}</Text>
          </View>
        )}
        {show.runDates && (
          <View className='detail-info__row'>
            <Text className='detail-info__label font-label'>Run Dates</Text>
            <Text className='detail-info__value font-body'>{show.runDates}</Text>
          </View>
        )}
        <View className='detail-info__row'>
          <Text className='detail-info__label font-label'>Composer</Text>
          <Text className='detail-info__value font-body'>{show.composer}</Text>
        </View>
      </View>

      {/* 剧情简介 */}
      {show.synopsis && (
        <View className='detail-section'>
          <Text className='detail-section__title font-headline'>Synopsis</Text>
          <Text className='detail-section__text font-body'>{show.synopsis}</Text>
        </View>
      )}

      <CurtainDivider />

      {/* 演员阵容 */}
      {show.cast && show.cast.length > 0 && (
        <View className='detail-section'>
          <Text className='detail-section__title font-headline'>Cast</Text>
          <View className='cast-grid'>
            {show.cast.map((member, idx) => (
              <View key={idx} className='cast-item'>
                <View className='cast-item__avatar'>
                  {member.photoUrl ? (
                    <Image className='cast-item__photo' src={member.photoUrl} mode='aspectFill' />
                  ) : (
                    <Text className='cast-item__initials'>
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </Text>
                  )}
                </View>
                <Text className='cast-item__name font-body'>{member.name}</Text>
                <Text className='cast-item__role font-label'>{member.role}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      <CurtainDivider icon='auto_awesome' />

      {/* 奖项 */}
      {show.awards && show.awards.length > 0 && (
        <View className='detail-section'>
          <Text className='detail-section__title font-headline'>Awards & Honors</Text>
          {show.awards.map((award, idx) => (
            <View key={idx} className='award-item'>
              <Text style={{ marginRight: '12rpx' }}>🏆</Text>
              <Text className='font-body' style={{ fontSize: '24rpx', color: '#4c4733' }}>{award}</Text>
            </View>
          ))}
        </View>
      )}

      {/* 制作历史 */}
      {show.productionHistory && show.productionHistory.length > 0 && (
        <View className='detail-section'>
          <Text className='detail-section__title font-headline'>Production History</Text>
          {show.productionHistory.map((entry, idx) => (
            <View key={idx} className='history-item'>
              <Text className='history-item__year font-headline'>{entry.year}</Text>
              <Text className='history-item__desc font-body'>{entry.description}</Text>
            </View>
          ))}
        </View>
      )}

      <CurtainDivider />

      {/* 观众评论 */}
      <View className='detail-section'>
        <Text className='detail-section__title font-headline'>Audience Impressions</Text>
        {show.reviews && show.reviews.length > 0 ? (
          show.reviews.map(review => (
            <View key={review.id} className='audience-review'>
              <View className='audience-review__stars'>{renderStars(review.rating)}</View>
              <Text className='audience-review__text font-body'>"{review.text}"</Text>
              <View className='audience-review__author'>
                <View className='audience-review__avatar'>
                  <Text style={{ color: '#fff', fontSize: '20rpx' }}>{review.reviewerInitials}</Text>
                </View>
                <View>
                  <Text className='audience-review__name font-body'>{review.reviewerName}</Text>
                  <Text className='audience-review__date font-label'>{review.date}</Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <Text className='font-body' style={{ color: '#8b716f' }}>No reviews yet</Text>
        )}

        <View
          className='btn-theatrical'
          style={{ marginTop: '24rpx' }}
          hoverClass='btn-theatrical-active'
          onClick={() => Taro.navigateTo({ url: `/pages/gallery-review-new/index?showId=${show.id}` })}
        >
          <Text style={{ color: '#fff' }}>Leave a Review</Text>
        </View>
      </View>

      <View style={{ height: '32rpx' }} />
    </ScrollView>
  )
}

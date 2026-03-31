import { useState } from 'react'
import Taro, { useDidShow } from '@tarojs/taro'
import { View, Text, Input, ScrollView } from '@tarojs/components'
import { useSeats } from '../../lib/hooks'
import CurtainDivider from '../../components/CurtainDivider'
import './index.scss'

const VIEW_LABELS = ['', 'Obstructed', 'Limited', 'Acceptable', 'Good', 'Excellent']

function StarRating({ rating }: { rating: number }) {
  return (
    <View className='star-rating'>
      {[1, 2, 3, 4, 5].map(i => (
        <Text key={i} className={`star-rating__star ${i <= rating ? 'star-rating__star--filled' : ''}`}>
          {i <= rating ? '★' : '☆'}
        </Text>
      ))}
    </View>
  )
}

export default function Seats() {
  const { seats } = useSeats()
  const [search, setSearch] = useState('')

  useDidShow(() => {
    const tabBar = Taro.getTabBar?.()
    tabBar?.setSelected(2)
  })

  const filtered = search.trim()
    ? seats.filter(s =>
        s.showName.toLowerCase().includes(search.toLowerCase()) ||
        s.theater.toLowerCase().includes(search.toLowerCase())
      )
    : seats

  return (
    <ScrollView scrollY className='seats-container'>
      <View className='seats-page'>
        {/* 头部 */}
        <View className='seats-header'>
          <View className='seats-header__row'>
            <Text className='seats-header__title font-headline'>My Seats</Text>
            <View
              className='seats-header__add'
              hoverClass='btn-theatrical-active'
              onClick={() => Taro.navigateTo({ url: '/pages/seats-add/index' })}
            >
              <Text className='seats-header__add-icon'>+</Text>
            </View>
          </View>
          {seats.length > 0 && (
            <View className='seats-badge'>
              <Text className='seats-badge__text font-label'>
                {seats.length} Seat{seats.length !== 1 ? 's' : ''} Recorded
              </Text>
            </View>
          )}
          <Input
            className='seats-search font-body'
            placeholder='Search by show or theater...'
            value={search}
            onInput={e => setSearch(e.detail.value)}
          />
        </View>

        <CurtainDivider icon='diamond' />

        {/* 座位列表 */}
        {filtered.length > 0 ? (
          <View className='seats-list'>
            {filtered.map(seat => (
              <View
                key={seat.id}
                className='seat-card parchment-ticket'
                hoverClass='btn-theatrical-active'
                onClick={() => Taro.navigateTo({ url: `/pages/seats-detail/index?id=${seat.id}` })}
              >
                <View className='seat-card__header'>
                  <Text className='seat-card__show font-headline'>{seat.showName}</Text>
                  <Text className='seat-card__theater font-body'>{seat.theater}</Text>
                </View>
                <View className='perforation' />
                <View className='seat-card__details'>
                  <View className='seat-card__row'>
                    <Text className='seat-card__label font-label'>Section</Text>
                    <Text className='seat-card__value font-body'>{seat.section}</Text>
                  </View>
                  <View className='seat-card__row'>
                    <Text className='seat-card__label font-label'>Seat</Text>
                    <Text className='seat-card__value font-body'>
                      {seat.row ? `Row ${seat.row}` : ''}{seat.row && seat.seatNumber ? ', ' : ''}{seat.seatNumber ? `Seat ${seat.seatNumber}` : '—'}
                    </Text>
                  </View>
                  <View className='seat-card__row'>
                    <Text className='seat-card__label font-label'>Date</Text>
                    <Text className='seat-card__value font-body'>{seat.date || '—'}</Text>
                  </View>
                  <View className='seat-card__row'>
                    <Text className='seat-card__label font-label'>View</Text>
                    <View className='seat-card__rating'>
                      <StarRating rating={seat.viewRating} />
                      <Text className='seat-card__rating-label font-label'>
                        {VIEW_LABELS[seat.viewRating] || ''}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        ) : seats.length === 0 ? (
          <View className='seats-empty'>
            <Text className='seats-empty__icon'>💺</Text>
            <Text className='seats-empty__title font-headline'>No seat experiences yet</Text>
            <Text className='seats-empty__text font-body'>
              Record your theater seating experiences to remember the best views
            </Text>
            <View
              className='btn-theatrical'
              style={{ marginTop: '32rpx' }}
              hoverClass='btn-theatrical-active'
              onClick={() => Taro.navigateTo({ url: '/pages/seats-add/index' })}
            >
              <Text style={{ color: '#fff' }}>Record Your First Seat</Text>
            </View>
          </View>
        ) : (
          <View className='seats-empty'>
            <Text className='seats-empty__text font-body'>No matching seat experiences</Text>
          </View>
        )}

        <View style={{ height: '160rpx' }} />
      </View>
    </ScrollView>
  )
}

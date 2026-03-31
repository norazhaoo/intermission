import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { useSeats } from '../../lib/hooks'
import { getSeatById } from '../../lib/store'
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

export default function SeatsDetail() {
  const params = getCurrentInstance().router?.params || {}
  const id = params.id || ''
  const { remove } = useSeats()
  const seat = getSeatById(id)

  if (!seat) {
    return (
      <View className='seats-detail-page'>
        <Text>Seat experience not found</Text>
      </View>
    )
  }

  const handleDelete = () => {
    Taro.showModal({
      title: 'Delete Experience',
      content: 'Are you sure you want to remove this seat record?',
      confirmColor: '#5d000a',
      success: (res) => {
        if (res.confirm) {
          remove(id)
          Taro.showToast({ title: 'Experience deleted', icon: 'success' })
          setTimeout(() => Taro.navigateBack(), 800)
        }
      }
    })
  }

  return (
    <ScrollView scrollY className='seats-detail-page'>
      <View className='detail-container'>
        <View className='detail-card parchment-ticket'>
          <View className='detail-card__header'>
            <Text className='detail-card__show font-headline'>{seat.showName}</Text>
            <Text className='detail-card__theater font-body'>{seat.theater}</Text>
          </View>

          <View className='perforation' />

          <View className='detail-card__info'>
            <View className='info-row'>
              <Text className='info-row__label font-label'>Section</Text>
              <Text className='info-row__value font-body'>{seat.section}</Text>
            </View>

            <View className='info-row'>
              <Text className='info-row__label font-label'>Row</Text>
              <Text className='info-row__value font-body'>{seat.row || '—'}</Text>
            </View>

            <View className='info-row'>
              <Text className='info-row__label font-label'>Seat Number</Text>
              <Text className='info-row__value font-body'>{seat.seatNumber || '—'}</Text>
            </View>

            <View className='info-row'>
              <Text className='info-row__label font-label'>Date</Text>
              <Text className='info-row__value font-body'>{seat.date || '—'}</Text>
            </View>

            <CurtainDivider />

            <View className='info-section'>
              <Text className='info-section__label font-label'>View Experience</Text>
              <View className='rating-block'>
                <StarRating rating={seat.viewRating} />
                <Text className='rating-block__label font-body'>
                  {VIEW_LABELS[seat.viewRating] || 'Not rated'}
                </Text>
              </View>
            </View>

            {seat.notes && (
              <View className='info-section'>
                <Text className='info-section__label font-label'>Patron's Notes</Text>
                <Text className='info-section__notes font-body'>{seat.notes}</Text>
              </View>
            )}
          </View>
        </View>

        <View
          className='delete-btn btn-gold-outline'
          hoverClass='btn-theatrical-active'
          onClick={handleDelete}
        >
          <Text className='delete-btn__text font-label'>Remove from Archives</Text>
        </View>
      </View>

      <View style={{ height: '64rpx' }} />
    </ScrollView>
  )
}


import { View, Text, ScrollView } from '@tarojs/components'
import { useTickets } from '../../lib/hooks'
import CurtainDivider from '../../components/CurtainDivider'
import './index.scss'

export default function TicketsList() {
  const { upcoming, past } = useTickets()

  return (
    <ScrollView scrollY className='tickets-list-page'>
      {/* 即将到来 */}
      <View className='tickets-section'>
        <Text className='tickets-section__title font-headline'>即将到来</Text>
        {upcoming.length > 0 ? (
          upcoming.map(ticket => (
            <View key={ticket.id} className='ticket-card parchment-ticket'>
              <View className='ticket-card__header'>
                <Text className='ticket-card__show font-headline'>{ticket.showName}</Text>
                <Text className='ticket-card__theater font-body'>{ticket.theater}</Text>
              </View>
              <View className='perforation' />
              <View className='ticket-card__details'>
                <View className='ticket-card__row'>
                  <Text className='ticket-card__label font-label'>日期</Text>
                  <Text className='ticket-card__value font-body'>{ticket.date}</Text>
                </View>
                <View className='ticket-card__row'>
                  <Text className='ticket-card__label font-label'>时间</Text>
                  <Text className='ticket-card__value font-body'>{ticket.time || '—'}</Text>
                </View>
                <View className='ticket-card__row'>
                  <Text className='ticket-card__label font-label'>座位</Text>
                  <Text className='ticket-card__value font-body'>{ticket.seatAssignment || '—'}</Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <Text className='tickets-section__empty font-body'>暂无即将到来的演出</Text>
        )}
      </View>

      <CurtainDivider />

      {/* 过往 */}
      <View className='tickets-section'>
        <Text className='tickets-section__title font-headline'>过往</Text>
        {past.length > 0 ? (
          past.map(ticket => (
            <View key={ticket.id} className='ticket-card ticket-card--past parchment-ticket'>
              <View className='ticket-card__header'>
                <Text className='ticket-card__show font-headline'>{ticket.showName}</Text>
                <Text className='ticket-card__theater font-body'>{ticket.theater}</Text>
              </View>
              <View className='perforation' />
              <View className='ticket-card__details'>
                <View className='ticket-card__row'>
                  <Text className='ticket-card__label font-label'>日期</Text>
                  <Text className='ticket-card__value font-body'>{ticket.date}</Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <Text className='tickets-section__empty font-body'>暂无过往演出</Text>
        )}
      </View>

      <View style={{ height: '32rpx' }} />
    </ScrollView>
  )
}

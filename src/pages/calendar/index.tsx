import { useState } from 'react'
import Taro, { useDidShow } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import CurtainDivider from '../../components/CurtainDivider'
import { getTickets } from '../../lib/store'
import { Ticket } from '../../lib/types'
import './index.scss'

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六']
const MONTHS = ['一月', '二月', '三月', '四月', '五月', '六月',
  '七月', '八月', '九月', '十月', '十一月', '十二月']

export default function Calendar() {
  const now = new Date()
  const [year, setYear] = useState(now.getFullYear())
  const [month, setMonth] = useState(now.getMonth())
  const [tickets, setTickets] = useState<Ticket[]>([])

  useDidShow(() => {
    const page = Taro.getCurrentInstance().page
    const tabBar = Taro.getTabBar?.(page) as any
    tabBar?.setSelected(4)
    setTickets(getTickets())
  })

  // 日历数据生成
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const days: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) days.push(null)
  for (let i = 1; i <= daysInMonth; i++) days.push(i)

  // 有票务的日期
  const ticketDates = new Set(
    tickets
      .filter(t => {
        const d = new Date(t.date)
        return d.getFullYear() === year && d.getMonth() === month
      })
      .map(t => new Date(t.date).getDate())
  )

  const prevMonth = () => {
    if (month === 0) { setYear(y => y - 1); setMonth(11) }
    else setMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (month === 11) { setYear(y => y + 1); setMonth(0) }
    else setMonth(m => m + 1)
  }

  // 按月份分组票务
  const grouped = tickets.reduce<Record<string, Ticket[]>>((acc, t) => {
    const d = new Date(t.date)
    const key = `${d.getFullYear()}年 ${MONTHS[d.getMonth()]}`
    if (!acc[key]) acc[key] = []
    acc[key].push(t)
    return acc
  }, {})

  return (
    <ScrollView scrollY className='calendar-page'>
      {/* 头部 */}
      <View className='calendar-header'>
        <Text className='calendar-header__title font-headline'>观剧日历</Text>
      </View>

      {/* 日历 */}
      <View className='calendar-card parchment-ticket'>
        <View className='calendar-nav'>
          <View onClick={prevMonth}><Text className='calendar-nav__arrow'>‹</Text></View>
          <Text className='calendar-nav__title font-headline'>{year}年 {MONTHS[month]}</Text>
          <View onClick={nextMonth}><Text className='calendar-nav__arrow'>›</Text></View>
        </View>

        <View className='calendar-weekdays'>
          {WEEKDAYS.map(d => (
            <Text key={d} className='calendar-weekdays__item font-label'>{d}</Text>
          ))}
        </View>

        <View className='calendar-grid'>
          {days.map((day, idx) => (
            <View
              key={idx}
              className={`calendar-day ${day && ticketDates.has(day) ? 'calendar-day--highlight' : ''}`}
            >
              {day && <Text className='calendar-day__num font-body'>{day}</Text>}
              {day && ticketDates.has(day) && <View className='calendar-day__dot' />}
            </View>
          ))}
        </View>
      </View>

      <CurtainDivider icon='flare' />

      {/* 节目单列表 */}
      <View className='program-list'>
        {Object.keys(grouped).length > 0 ? (
          Object.entries(grouped).map(([monthKey, items]) => (
            <View key={monthKey}>
              <Text className='program-list__month font-headline'>{monthKey}</Text>
              {items.sort((a, b) => b.date.localeCompare(a.date)).map(ticket => {
                const d = new Date(ticket.date)
                return (
                  <View
                    key={ticket.id}
                    className='program-entry'
                    onClick={() => {
                      // 如果有对应剧目则跳转
                    }}
                  >
                    <View className='program-entry__date'>
                      <Text className='program-entry__day font-headline'>{d.getDate()}</Text>
                      <Text className='program-entry__weekday font-label'>
                        {WEEKDAYS[d.getDay()]}
                      </Text>
                    </View>
                    <View className='program-entry__info'>
                      <Text className='program-entry__title font-headline'>
                        {ticket.showName}
                      </Text>
                      <Text className='program-entry__theater font-body'>
                        {ticket.theater}
                      </Text>
                    </View>
                  </View>
                )
              })}
            </View>
          ))
        ) : (
          <View className='program-empty'>
            <Text className='program-empty__icon'>📅</Text>
            <Text className='program-empty__text font-body'>
              暂无演出安排。添加票根后将在此显示。
            </Text>
          </View>
        )}
      </View>

      <View style={{ height: '160rpx' }} />
    </ScrollView>
  )
}

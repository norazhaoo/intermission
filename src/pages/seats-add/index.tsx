import { useState } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Input, Textarea } from '@tarojs/components'
import { useSeats } from '../../lib/hooks'
import { getTickets } from '../../lib/store'
import './index.scss'

const VIEW_LABELS = ['', 'Obstructed', 'Limited', 'Acceptable', 'Good', 'Excellent']

export default function SeatsAdd() {
  const { create } = useSeats()
  const [showName, setShowName] = useState('')
  const [theater, setTheater] = useState('')
  const [section, setSection] = useState('')
  const [row, setRow] = useState('')
  const [seatNumber, setSeatNumber] = useState('')
  const [date, setDate] = useState('')
  const [viewRating, setViewRating] = useState(0)
  const [notes, setNotes] = useState('')
  const [linkedTicketId, setLinkedTicketId] = useState('')

  const handleLinkTicket = () => {
    const tickets = getTickets()
    if (tickets.length === 0) {
      Taro.showToast({ title: 'No tickets to link', icon: 'none' })
      return
    }
    const names = tickets.map(t => `${t.showName} (${t.date})`)
    Taro.showActionSheet({
      itemList: names,
      success: (res) => {
        const ticket = tickets[res.tapIndex]
        setShowName(ticket.showName)
        setTheater(ticket.theater)
        setDate(ticket.date)
        setLinkedTicketId(ticket.id)
        if (ticket.seatAssignment) {
          setSection(ticket.seatAssignment)
        }
        Taro.showToast({ title: 'Ticket linked!', icon: 'success' })
      }
    })
  }

  const handleSubmit = () => {
    if (!showName.trim()) {
      Taro.showToast({ title: 'Show name required', icon: 'none' })
      return
    }
    if (!theater.trim()) {
      Taro.showToast({ title: 'Theater required', icon: 'none' })
      return
    }
    if (!section.trim()) {
      Taro.showToast({ title: 'Section required', icon: 'none' })
      return
    }
    if (viewRating === 0) {
      Taro.showToast({ title: 'Please rate your view', icon: 'none' })
      return
    }

    create({
      showName: showName.trim(),
      theater: theater.trim(),
      section: section.trim(),
      row: row.trim() || undefined,
      seatNumber: seatNumber.trim() || undefined,
      date: date || undefined,
      viewRating,
      notes: notes.trim() || undefined,
      linkedTicketId: linkedTicketId || undefined
    })

    Taro.showToast({ title: 'Seat recorded!', icon: 'success' })
    setTimeout(() => Taro.navigateBack(), 800)
  }

  return (
    <View className='seats-add-page'>
      <View className='form-section'>
        <View className='form-link-btn btn-gold-outline' onClick={handleLinkTicket}>
          <Text>🎫 Link from Ticket</Text>
        </View>
      </View>

      <View className='form-section'>
        <Text className='form-label font-label'>Show Name *</Text>
        <Input className='form-input font-body' placeholder='e.g. Hamilton' value={showName} onInput={e => setShowName(e.detail.value)} />
      </View>

      <View className='form-section'>
        <Text className='form-label font-label'>Theater *</Text>
        <Input className='form-input font-body' placeholder='e.g. Richard Rodgers Theatre' value={theater} onInput={e => setTheater(e.detail.value)} />
      </View>

      <View className='form-section'>
        <Text className='form-label font-label'>Section *</Text>
        <Input className='form-input font-body' placeholder='e.g. Orchestra, Mezzanine' value={section} onInput={e => setSection(e.detail.value)} />
      </View>

      <View className='form-row'>
        <View className='form-section form-section--half'>
          <Text className='form-label font-label'>Row</Text>
          <Input className='form-input font-body' placeholder='e.g. G' value={row} onInput={e => setRow(e.detail.value)} />
        </View>
        <View className='form-section form-section--half'>
          <Text className='form-label font-label'>Seat #</Text>
          <Input className='form-input font-body' placeholder='e.g. 12' value={seatNumber} onInput={e => setSeatNumber(e.detail.value)} />
        </View>
      </View>

      <View className='form-section'>
        <Text className='form-label font-label'>Date</Text>
        <Input className='form-input font-body' placeholder='YYYY-MM-DD' value={date} onInput={e => setDate(e.detail.value)} />
      </View>

      <View className='form-section'>
        <Text className='form-label font-label'>View Rating *</Text>
        <View className='rating-selector'>
          {[1, 2, 3, 4, 5].map(i => (
            <Text
              key={i}
              className={`rating-star ${i <= viewRating ? 'rating-star--active' : ''}`}
              onClick={() => setViewRating(i)}
            >
              {i <= viewRating ? '★' : '☆'}
            </Text>
          ))}
        </View>
        {viewRating > 0 && (
          <Text className='rating-label font-body'>{VIEW_LABELS[viewRating]}</Text>
        )}
      </View>

      <View className='form-section'>
        <Text className='form-label font-label'>Notes</Text>
        <Textarea
          className='form-textarea font-body'
          placeholder='How was your view? Any tips for future visitors?'
          value={notes}
          onInput={e => setNotes(e.detail.value)}
          autoHeight
          maxlength={500}
        />
      </View>

      <View className='form-actions'>
        <View className='btn-theatrical' hoverClass='btn-theatrical-active' onClick={handleSubmit}>
          <Text style={{ color: '#fff' }}>Save Seat Experience</Text>
        </View>
      </View>

      <View style={{ height: '64rpx' }} />
    </View>
  )
}

import { useState, useCallback } from 'react'
import { useDidShow } from '@tarojs/taro'
import { Show, Ticket, Review, SeatExperience } from './types'
import { getShows, getTickets, getReviews, getSeats, addShow, addTicket, addReview, addSeat, deleteSeat, generateId } from './store'

/** 剧目数据 Hook */
export function useShows() {
  const [shows, setShows] = useState<Show[]>([])

  useDidShow(() => {
    setShows(getShows())
  })

  const create = useCallback((show: Omit<Show, 'id' | 'createdAt'>) => {
    const newShow: Show = {
      ...show,
      id: generateId(),
      createdAt: new Date().toISOString(),
      isUserAdded: true
    }
    addShow(newShow)
    setShows(getShows())
    return newShow
  }, [])

  const refresh = useCallback(() => {
    setShows(getShows())
  }, [])

  return { shows, create, refresh }
}

/** 票务数据 Hook */
export function useTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([])

  useDidShow(() => {
    setTickets(getTickets())
  })

  const create = useCallback((ticket: Omit<Ticket, 'id' | 'createdAt'>) => {
    const newTicket: Ticket = {
      ...ticket,
      id: generateId(),
      createdAt: new Date().toISOString()
    }
    addTicket(newTicket)
    setTickets(getTickets())
    return newTicket
  }, [])

  const refresh = useCallback(() => {
    setTickets(getTickets())
  }, [])

  // 分离即将到来和过往
  const now = new Date().toISOString().slice(0, 10)
  const upcoming = tickets
    .filter(t => t.date >= now)
    .sort((a, b) => a.date.localeCompare(b.date))
  const past = tickets
    .filter(t => t.date < now)
    .sort((a, b) => b.date.localeCompare(a.date))

  return { tickets, upcoming, past, create, refresh }
}

/** 评论数据 Hook */
export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>([])

  useDidShow(() => {
    setReviews(getReviews())
  })

  const create = useCallback((review: Omit<Review, 'id' | 'createdAt'>) => {
    const newReview: Review = {
      ...review,
      id: generateId(),
      createdAt: new Date().toISOString()
    }
    addReview(newReview)
    setReviews(getReviews())
    return newReview
  }, [])

  const refresh = useCallback(() => {
    setReviews(getReviews())
  }, [])

  return { reviews, create, refresh }
}

/** 座位体验数据 Hook */
export function useSeats() {
  const [seats, setSeats] = useState<SeatExperience[]>([])

  useDidShow(() => {
    setSeats(getSeats())
  })

  const create = useCallback((seat: Omit<SeatExperience, 'id' | 'createdAt'>) => {
    const newSeat: SeatExperience = {
      ...seat,
      id: generateId(),
      createdAt: new Date().toISOString()
    }
    addSeat(newSeat)
    setSeats(getSeats())
    return newSeat
  }, [])

  const remove = useCallback((id: string) => {
    deleteSeat(id)
    setSeats(getSeats())
  }, [])

  const sorted = [...seats].sort((a, b) => b.createdAt.localeCompare(a.createdAt))

  return { seats: sorted, create, remove }
}

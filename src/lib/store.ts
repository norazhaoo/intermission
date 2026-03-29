import Taro from '@tarojs/taro'
import { Show, Ticket, Review } from './types'
import { SEED_SHOWS } from './data'

// Storage keys
const KEYS = {
  SHOWS: 'intermission_shows',
  TICKETS: 'intermission_tickets',
  REVIEWS: 'intermission_reviews',
  INITIALIZED: 'intermission_initialized'
}

/** 通用 Storage 读取 */
function getItem<T>(key: string, defaultValue: T): T {
  try {
    const data = Taro.getStorageSync(key)
    return data ? JSON.parse(data) : defaultValue
  } catch {
    return defaultValue
  }
}

/** 通用 Storage 写入 */
function setItem<T>(key: string, value: T): void {
  try {
    Taro.setStorageSync(key, JSON.stringify(value))
  } catch (e) {
    console.error(`Storage write failed for key: ${key}`, e)
  }
}

/** 生成唯一 ID */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

// ================================
// Shows CRUD
// ================================
export function getShows(): Show[] {
  return getItem<Show[]>(KEYS.SHOWS, [])
}

export function getShowById(id: string): Show | undefined {
  return getShows().find(s => s.id === id)
}

export function addShow(show: Show): void {
  const shows = getShows()
  shows.push(show)
  setItem(KEYS.SHOWS, shows)
}

export function updateShow(id: string, updates: Partial<Show>): void {
  const shows = getShows()
  const idx = shows.findIndex(s => s.id === id)
  if (idx >= 0) {
    shows[idx] = { ...shows[idx], ...updates }
    setItem(KEYS.SHOWS, shows)
  }
}

// ================================
// Tickets CRUD
// ================================
export function getTickets(): Ticket[] {
  return getItem<Ticket[]>(KEYS.TICKETS, [])
}

export function addTicket(ticket: Ticket): void {
  const tickets = getTickets()
  tickets.push(ticket)
  setItem(KEYS.TICKETS, tickets)
}

export function deleteTicket(id: string): void {
  const tickets = getTickets().filter(t => t.id !== id)
  setItem(KEYS.TICKETS, tickets)
}

// ================================
// Reviews CRUD
// ================================
export function getReviews(): Review[] {
  return getItem<Review[]>(KEYS.REVIEWS, [])
}

export function addReview(review: Review): void {
  const reviews = getReviews()
  reviews.push(review)
  setItem(KEYS.REVIEWS, reviews)
}

// ================================
// 种子数据初始化
// ================================
export function initSeedData(): void {
  const initialized = Taro.getStorageSync(KEYS.INITIALIZED)
  if (!initialized) {
    setItem(KEYS.SHOWS, SEED_SHOWS)
    Taro.setStorageSync(KEYS.INITIALIZED, 'true')
    console.log('Seed data initialized with', SEED_SHOWS.length, 'shows')
  }
}

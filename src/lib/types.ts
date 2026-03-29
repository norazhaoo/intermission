/** 剧目数据接口 */
export interface Show {
  id: string
  title: string
  composer: string
  synopsis?: string
  posterUrl: string
  region?: 'broadway' | 'west-end' | 'china' | 'other'
  language?: string
  theater?: string
  runDates?: string
  isRunning?: boolean
  version?: string
  cast?: CastMember[]
  awards?: string[]
  productionHistory?: ProductionEntry[]
  reviews?: ShowReview[]
  isUserAdded?: boolean
  createdAt: string
}

/** 演员阵容 */
export interface CastMember {
  name: string
  role: string
  photoUrl?: string
}

/** 制作历史条目 */
export interface ProductionEntry {
  year: string
  description: string
}

/** 剧目评论 */
export interface ShowReview {
  id: string
  rating: number
  text: string
  reviewerName: string
  reviewerInitials: string
  date: string
}

/** 票务数据接口 */
export interface Ticket {
  id: string
  showName: string
  theater: string
  date: string
  time: string
  seatAssignment?: string
  purchaseChannel?: string
  imageUrl?: string
  createdAt: string
}

/** 演出评论数据接口 */
export interface Review {
  id: string
  showId?: string
  showName?: string
  playbillImageUrl?: string
  castPerformance: number
  scenicDesign: number
  acousticFidelity: number
  narrativeFlow: number
  notes: string
  tag?: string
  createdAt: string
}

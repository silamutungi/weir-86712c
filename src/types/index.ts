export type MatchStatus = 'risk' | 'pending' | 'approved' | 'monetized' | 'taken_down'

export interface ContentMatch {
  id: string
  user_id: string
  platform: string
  url: string
  thumbnail_emoji: string
  detected_at: string
  status: MatchStatus
  risk_score: number
  estimated_value: number
  title: string
  views: number
  deleted_at: string | null
}

export interface License {
  id: string
  user_id: string
  name: string
  type: 'commercial' | 'editorial' | 'personal' | 'exclusive'
  price_usd: number
  duration_days: number
  platforms: string[]
  active: boolean
  created_at: string
  deleted_at: string | null
}

export interface Earning {
  id: string
  user_id: string
  platform: string
  month: string
  income_usd: number
  cpm_rate: number
  impressions: number
  created_at: string
}

export interface AnalyticsSummary {
  platform: string
  followers: number
  growth_pct: number
  avg_engagement: number
  posts_this_month: number
}

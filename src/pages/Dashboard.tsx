import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertTriangle, DollarSign, FileText, TrendingUp, ArrowRight } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { formatCurrency } from '../lib/utils'
import AppShell from '../components/AppShell'
import { Badge } from '../components/ui/badge'
import type { ContentMatch } from '../types'

const SEED_MATCHES: ContentMatch[] = [
  { id: '1', user_id: 'seed', platform: 'Instagram', url: '#', thumbnail_emoji: '📸', detected_at: '2024-06-15T10:22:00Z', status: 'risk', risk_score: 91, estimated_value: 340, title: 'Sponsored post using your photo', views: 128000, deleted_at: null },
  { id: '2', user_id: 'seed', platform: 'TikTok', url: '#', thumbnail_emoji: '🎬', detected_at: '2024-06-14T08:11:00Z', status: 'pending', risk_score: 62, estimated_value: 180, title: 'Brand video featuring your likeness', views: 85000, deleted_at: null },
  { id: '3', user_id: 'seed', platform: 'YouTube', url: '#', thumbnail_emoji: '▶️', detected_at: '2024-06-13T14:45:00Z', status: 'monetized', risk_score: 20, estimated_value: 520, title: 'Ad campaign — auto-licensed', views: 310000, deleted_at: null }
]

const statCards = [
  { label: 'Active Alerts', value: '3', sub: '2 high risk', icon: <AlertTriangle size={20} strokeWidth={2} />, color: 'var(--color-error)', route: '/matches' },
  { label: 'Monthly Earnings', value: formatCurrency(2840), sub: '+18% vs last month', icon: <DollarSign size={20} strokeWidth={2} />, color: 'var(--color-success)', route: '/earnings' },
  { label: 'Active Licenses', value: '4', sub: '2 platforms covered', icon: <FileText size={20} strokeWidth={2} />, color: 'var(--color-info)', route: '/licenses' },
  { label: 'Audience Growth', value: '+12.4%', sub: 'across all platforms', icon: <TrendingUp size={20} strokeWidth={2} />, color: 'var(--color-warning)', route: '/analytics' }
]

export default function Dashboard() {
  const navigate = useNavigate()
  const [matches, setMatches] = useState<ContentMatch[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isSupabaseConfigured) { setMatches(SEED_MATCHES); setLoading(false); return }
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) { navigate('/login'); return }
      supabase.from('content_matches').select('*').is('deleted_at', null).order('detected_at', { ascending: false }).limit(5)
        .then(({ data: rows }) => { setMatches(rows ?? []); setLoading(false) })
    })
  }, [navigate])

  const riskBadgeVariant = (s: ContentMatch['status']) =>
    s === 'risk' ? 'destructive' : s === 'monetized' ? 'default' : s === 'approved' ? 'secondary' : 'outline'

  return (
    <AppShell title="Overview">
      {!isSupabaseConfigured && (
        <div className="mb-6 px-4 py-3 rounded-lg text-sm font-medium" style={{ backgroundColor: 'rgba(234,179,8,0.12)', border: '1px solid rgba(234,179,8,0.35)', color: 'var(--color-warning)' }}>
          Viewing sample data — connect your database to go live.
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {statCards.map(s => (
          <button key={s.label} onClick={() => navigate(s.route)} className="text-left p-5 rounded-lg transition-opacity hover:opacity-80" style={{ backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', minHeight: 44 }}>
            <div className="flex items-center justify-between mb-3">
              <span style={{ color: s.color }}>{s.icon}</span>
              <ArrowRight size={16} style={{ color: 'var(--color-text-muted)' }} />
            </div>
            <p className="font-bold" style={{ fontSize: 'var(--text-title-2)', color: 'var(--color-text)' }}>{s.value}</p>
            <p className="font-medium" style={{ fontSize: 'var(--text-subhead)', color: 'var(--color-text)' }}>{s.label}</p>
            <p className="mt-1" style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-muted)' }}>{s.sub}</p>
          </button>
        ))}
      </div>
      <div className="rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}>
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <h2 className="font-semibold" style={{ fontSize: 'var(--text-headline)', color: 'var(--color-text)' }}>Recent Matches</h2>
          <button onClick={() => navigate('/matches')} className="text-sm font-medium" style={{ color: 'var(--color-primary)' }}>View all</button>
        </div>
        {loading ? (
          <div className="px-5 py-12 text-center" style={{ color: 'var(--color-text-muted)' }}>Scanning for matches...</div>
        ) : matches.length === 0 ? (
          <div className="px-5 py-12 text-center" style={{ color: 'var(--color-text-muted)' }}>No matches yet — your identity is clean.</div>
        ) : (
          <ul>
            {matches.map(m => (
              <li key={m.id} className="flex items-center gap-4 px-5 py-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
                <span style={{ fontSize: 28 }}>{m.thumbnail_emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate" style={{ fontSize: 'var(--text-subhead)', color: 'var(--color-text)' }}>{m.title}</p>
                  <p style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-muted)' }}>{m.platform} · {new Intl.NumberFormat(undefined, { notation: 'compact' }).format(m.views)} views</p>
                </div>
                <Badge variant={riskBadgeVariant(m.status)}>{m.status}</Badge>
                <span className="font-semibold" style={{ fontSize: 'var(--text-subhead)', color: 'var(--color-success)', whiteSpace: 'nowrap' }}>{formatCurrency(m.estimated_value)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AppShell>
  )
}

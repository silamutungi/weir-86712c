import { useEffect, useState } from 'react'
import { AlertTriangle, CheckCircle, DollarSign, XCircle } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { formatCurrency, formatDate } from '../lib/utils'
import AppShell from '../components/AppShell'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import type { ContentMatch, MatchStatus } from '../types'

const SEED: ContentMatch[] = [
  { id: '1', user_id: 'seed', platform: 'Instagram', url: '#', thumbnail_emoji: '📸', detected_at: '2024-06-15T10:22:00Z', status: 'risk', risk_score: 91, estimated_value: 340, title: 'Sponsored post using your photo', views: 128000, deleted_at: null },
  { id: '2', user_id: 'seed', platform: 'TikTok', url: '#', thumbnail_emoji: '🎬', detected_at: '2024-06-14T08:11:00Z', status: 'pending', risk_score: 62, estimated_value: 180, title: 'Brand video featuring your likeness', views: 85000, deleted_at: null },
  { id: '3', user_id: 'seed', platform: 'YouTube', url: '#', thumbnail_emoji: '▶️', detected_at: '2024-06-13T14:45:00Z', status: 'monetized', risk_score: 20, estimated_value: 520, title: 'Ad campaign — auto-licensed', views: 310000, deleted_at: null },
  { id: '4', user_id: 'seed', platform: 'Facebook', url: '#', thumbnail_emoji: '📣', detected_at: '2024-06-12T16:05:00Z', status: 'approved', risk_score: 15, estimated_value: 95, title: 'Approved editorial use', views: 42000, deleted_at: null },
  { id: '5', user_id: 'seed', platform: 'X (Twitter)', url: '#', thumbnail_emoji: '🐦', detected_at: '2024-06-11T09:30:00Z', status: 'risk', risk_score: 88, estimated_value: 270, title: 'Unauthorized promotional tweet', views: 97000, deleted_at: null },
  { id: '6', user_id: 'seed', platform: 'Pinterest', url: '#', thumbnail_emoji: '📌', detected_at: '2024-06-10T12:00:00Z', status: 'taken_down', risk_score: 0, estimated_value: 0, title: 'Removed infringing pin', views: 8000, deleted_at: null }
]

function riskColor(score: number) {
  if (score >= 80) return 'var(--color-error)'
  if (score >= 50) return 'var(--color-warning)'
  return 'var(--color-success)'
}

export default function Matches() {
  const [matches, setMatches] = useState<ContentMatch[]>([])
  const [loading, setLoading] = useState(true)
  const [actioning, setActioning] = useState<string | null>(null)

  useEffect(() => {
    if (!isSupabaseConfigured) { setMatches(SEED); setLoading(false); return }
    supabase.from('content_matches').select('*').is('deleted_at', null).order('detected_at', { ascending: false })
      .then(({ data }) => { setMatches(data ?? []); setLoading(false) })
  }, [])

  async function updateStatus(id: string, status: MatchStatus) {
    setActioning(id)
    if (!isSupabaseConfigured) {
      setMatches(prev => prev.map(m => m.id === id ? { ...m, status } : m))
      setActioning(null)
      return
    }
    await supabase.from('content_matches').update({ status }).eq('id', id)
    setMatches(prev => prev.map(m => m.id === id ? { ...m, status } : m))
    setActioning(null)
  }

  const badgeVariant = (s: MatchStatus) =>
    s === 'risk' ? 'destructive' : s === 'monetized' ? 'default' : s === 'approved' ? 'secondary' : 'outline'

  return (
    <AppShell title="Content Matches">
      {!isSupabaseConfigured && (
        <div className="mb-6 px-4 py-3 rounded-lg text-sm font-medium" style={{ backgroundColor: 'rgba(234,179,8,0.12)', border: '1px solid rgba(234,179,8,0.35)', color: 'var(--color-warning)' }}>
          Viewing sample data — connect your database to go live.
        </div>
      )}
      {loading ? (
        <div className="py-20 text-center" style={{ color: 'var(--color-text-muted)' }}>Scanning across platforms...</div>
      ) : (
        <div className="space-y-3">
          {matches.map(m => (
            <div key={m.id} className="p-5 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}>
              <div className="flex items-start gap-4">
                <span style={{ fontSize: 36, lineHeight: 1 }}>{m.thumbnail_emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <p className="font-semibold" style={{ fontSize: 'var(--text-headline)', color: 'var(--color-text)' }}>{m.title}</p>
                    <Badge variant={badgeVariant(m.status)}>{m.status}</Badge>
                  </div>
                  <p style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-muted)' }}>
                    {m.platform} · {new Intl.NumberFormat(undefined, { notation: 'compact' }).format(m.views)} views · Detected {formatDate(m.detected_at)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="h-2 rounded-full overflow-hidden flex-1" style={{ maxWidth: 120, backgroundColor: 'var(--color-border)' }}>
                      <div style={{ width: `${m.risk_score}%`, height: '100%', backgroundColor: riskColor(m.risk_score), borderRadius: 9999 }} />
                    </div>
                    <span className="text-xs font-medium" style={{ color: riskColor(m.risk_score) }}>Risk {m.risk_score}%</span>
                  </div>
                </div>
                <span className="font-bold" style={{ fontSize: 'var(--text-title-3)', color: 'var(--color-success)', whiteSpace: 'nowrap' }}>{formatCurrency(m.estimated_value)}</span>
              </div>
              {m.status !== 'taken_down' && (
                <div className="flex flex-wrap gap-2 mt-4">
                  <Button size="sm" variant="outline" disabled={actioning === m.id} onClick={() => updateStatus(m.id, 'approved')}>
                    <CheckCircle size={14} className="mr-1" /> Approve
                  </Button>
                  <Button size="sm" disabled={actioning === m.id} onClick={() => updateStatus(m.id, 'monetized')} style={{ backgroundColor: 'var(--color-success)', color: '#fff' }}>
                    <DollarSign size={14} className="mr-1" /> Monetize
                  </Button>
                  <Button size="sm" variant="destructive" disabled={actioning === m.id} onClick={() => updateStatus(m.id, 'taken_down')}>
                    <XCircle size={14} className="mr-1" /> Take down
                  </Button>
                </div>
              )}
              {m.status === 'taken_down' && (
                <div className="flex items-center gap-2 mt-3">
                  <AlertTriangle size={14} style={{ color: 'var(--color-text-muted)' }} />
                  <span style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-muted)' }}>Takedown submitted. Platform notified.</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </AppShell>
  )
}

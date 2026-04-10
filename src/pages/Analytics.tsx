import { useEffect, useState } from 'react'
import { Users, TrendingUp, BarChart2 } from 'lucide-react'
import { formatNumber } from '../lib/utils'
import AppShell from '../components/AppShell'
import type { AnalyticsSummary } from '../types'

const SEED: AnalyticsSummary[] = [
  { platform: 'Instagram', followers: 284000, growth_pct: 14.2, avg_engagement: 5.8, posts_this_month: 12 },
  { platform: 'TikTok', followers: 512000, growth_pct: 22.7, avg_engagement: 8.3, posts_this_month: 18 },
  { platform: 'YouTube', followers: 98000, growth_pct: 6.4, avg_engagement: 4.1, posts_this_month: 4 },
  { platform: 'Facebook', followers: 67000, growth_pct: 2.1, avg_engagement: 2.6, posts_this_month: 8 },
  { platform: 'X (Twitter)', followers: 43000, growth_pct: 9.8, avg_engagement: 3.4, posts_this_month: 24 },
  { platform: 'Pinterest', followers: 21000, growth_pct: 4.3, avg_engagement: 1.9, posts_this_month: 6 }
]

const PLATFORM_EMOJI: Record<string, string> = { Instagram: '📸', TikTok: '🎬', YouTube: '▶️', Facebook: '📣', 'X (Twitter)': '🐦', Pinterest: '📌' }

function GrowthBar({ pct }: { pct: number }) {
  const max = 25
  const w = Math.min((pct / max) * 100, 100)
  const color = pct >= 15 ? 'var(--color-success)' : pct >= 7 ? 'var(--color-warning)' : 'var(--color-info)'
  return (
    <div className="flex items-center gap-3">
      <div className="h-2 rounded-full flex-1" style={{ backgroundColor: 'var(--color-border)', maxWidth: 120 }}>
        <div style={{ width: `${w}%`, height: '100%', backgroundColor: color, borderRadius: 9999 }} />
      </div>
      <span className="font-semibold text-xs" style={{ color }}>{pct > 0 ? '+' : ''}{pct}%</span>
    </div>
  )
}

export default function Analytics() {
  const [stats, setStats] = useState<AnalyticsSummary[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setStats(SEED)
    setLoading(false)
  }, [])

  const totalFollowers = stats.reduce((s, p) => s + p.followers, 0)
  const avgGrowth = stats.length > 0 ? stats.reduce((s, p) => s + p.growth_pct, 0) / stats.length : 0
  const totalPosts = stats.reduce((s, p) => s + p.posts_this_month, 0)

  return (
    <AppShell title="Growth Analytics">
      {!loading && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="p-5 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}>
              <div className="flex items-center gap-2 mb-2"><Users size={18} style={{ color: 'var(--color-primary)' }} /><p style={{ fontSize: 'var(--text-subhead)', color: 'var(--color-text-secondary)' }}>Total Audience</p></div>
              <p className="font-bold" style={{ fontSize: 'var(--text-title-1)', color: 'var(--color-text)' }}>{formatNumber(totalFollowers)}</p>
            </div>
            <div className="p-5 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}>
              <div className="flex items-center gap-2 mb-2"><TrendingUp size={18} style={{ color: 'var(--color-success)' }} /><p style={{ fontSize: 'var(--text-subhead)', color: 'var(--color-text-secondary)' }}>Avg. Growth</p></div>
              <p className="font-bold" style={{ fontSize: 'var(--text-title-1)', color: 'var(--color-text)' }}>+{avgGrowth.toFixed(1)}%</p>
            </div>
            <div className="p-5 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}>
              <div className="flex items-center gap-2 mb-2"><BarChart2 size={18} style={{ color: 'var(--color-warning)' }} /><p style={{ fontSize: 'var(--text-subhead)', color: 'var(--color-text-secondary)' }}>Posts this month</p></div>
              <p className="font-bold" style={{ fontSize: 'var(--text-title-1)', color: 'var(--color-text)' }}>{totalPosts}</p>
            </div>
          </div>
          <div className="rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}>
            <div className="px-5 py-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
              <h2 className="font-semibold" style={{ fontSize: 'var(--text-headline)', color: 'var(--color-text)' }}>Platform breakdown</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                    {['Platform', 'Followers', 'Growth', 'Engagement', 'Posts'].map(h => (
                      <th key={h} className="px-5 py-3 text-left font-semibold" style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-caption)' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stats.map(s => (
                    <tr key={s.platform} style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td className="px-5 py-4">
                        <span className="flex items-center gap-2" style={{ color: 'var(--color-text)', fontWeight: 500 }}>
                          <span style={{ fontSize: 20 }}>{PLATFORM_EMOJI[s.platform] ?? '🌐'}</span> {s.platform}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-semibold" style={{ color: 'var(--color-text)' }}>{formatNumber(s.followers)}</td>
                      <td className="px-5 py-4"><GrowthBar pct={s.growth_pct} /></td>
                      <td className="px-5 py-4" style={{ color: 'var(--color-text-secondary)' }}>{s.avg_engagement}%</td>
                      <td className="px-5 py-4" style={{ color: 'var(--color-text-secondary)' }}>{s.posts_this_month}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </AppShell>
  )
}

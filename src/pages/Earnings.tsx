import { useEffect, useState } from 'react'
import { DollarSign, TrendingUp } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { formatCurrency, formatNumber } from '../lib/utils'
import AppShell from '../components/AppShell'
import type { Earning } from '../types'

const SEED: Earning[] = [
  { id: '1', user_id: 'seed', platform: 'Instagram', month: '2024-06', income_usd: 1240, cpm_rate: 9.80, impressions: 126500, created_at: '2024-06-01T00:00:00Z' },
  { id: '2', user_id: 'seed', platform: 'TikTok', month: '2024-06', income_usd: 870, cpm_rate: 6.40, impressions: 135900, created_at: '2024-06-01T00:00:00Z' },
  { id: '3', user_id: 'seed', platform: 'YouTube', month: '2024-06', income_usd: 520, cpm_rate: 14.20, impressions: 36600, created_at: '2024-06-01T00:00:00Z' },
  { id: '4', user_id: 'seed', platform: 'Facebook', month: '2024-06', income_usd: 210, cpm_rate: 4.10, impressions: 51200, created_at: '2024-06-01T00:00:00Z' },
  { id: '5', user_id: 'seed', platform: 'Instagram', month: '2024-05', income_usd: 1050, cpm_rate: 9.20, impressions: 114100, created_at: '2024-05-01T00:00:00Z' },
  { id: '6', user_id: 'seed', platform: 'TikTok', month: '2024-05', income_usd: 740, cpm_rate: 5.90, impressions: 125400, created_at: '2024-05-01T00:00:00Z' }
]

const PLATFORM_EMOJI: Record<string, string> = { Instagram: '📸', TikTok: '🎬', YouTube: '▶️', Facebook: '📣', 'X (Twitter)': '🐦', Pinterest: '📌' }

export default function Earnings() {
  const [earnings, setEarnings] = useState<Earning[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isSupabaseConfigured) { setEarnings(SEED); setLoading(false); return }
    supabase.from('earnings').select('*').order('month', { ascending: false })
      .then(({ data }) => { setEarnings(data ?? []); setLoading(false) })
  }, [])

  const total = earnings.filter(e => e.month === '2024-06').reduce((s, e) => s + e.income_usd, 0)
  const totalImpressions = earnings.filter(e => e.month === '2024-06').reduce((s, e) => s + e.impressions, 0)
  const currentMonth = earnings.filter(e => e.month === '2024-06')

  return (
    <AppShell title="Earnings">
      {!isSupabaseConfigured && (
        <div className="mb-6 px-4 py-3 rounded-lg text-sm font-medium" style={{ backgroundColor: 'rgba(234,179,8,0.12)', border: '1px solid rgba(234,179,8,0.35)', color: 'var(--color-warning)' }}>
          Viewing sample data — connect your database to go live.
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="p-5 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}>
          <div className="flex items-center gap-2 mb-2">
            <DollarSign size={18} style={{ color: 'var(--color-success)' }} />
            <p style={{ fontSize: 'var(--text-subhead)', color: 'var(--color-text-secondary)' }}>This month</p>
          </div>
          <p className="font-bold" style={{ fontSize: 'var(--text-title-1)', color: 'var(--color-text)' }}>{formatCurrency(total)}</p>
        </div>
        <div className="p-5 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={18} style={{ color: 'var(--color-info)' }} />
            <p style={{ fontSize: 'var(--text-subhead)', color: 'var(--color-text-secondary)' }}>Total impressions</p>
          </div>
          <p className="font-bold" style={{ fontSize: 'var(--text-title-1)', color: 'var(--color-text)' }}>{formatNumber(totalImpressions)}</p>
        </div>
        <div className="p-5 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}>
          <div className="flex items-center gap-2 mb-2">
            <DollarSign size={18} style={{ color: 'var(--color-warning)' }} />
            <p style={{ fontSize: 'var(--text-subhead)', color: 'var(--color-text-secondary)' }}>Blended CPM</p>
          </div>
          <p className="font-bold" style={{ fontSize: 'var(--text-title-1)', color: 'var(--color-text)' }}>
            {totalImpressions > 0 ? formatCurrency((total / totalImpressions) * 1000) : '--'}
          </p>
        </div>
      </div>
      <div className="rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}>
        <div className="px-5 py-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <h2 className="font-semibold" style={{ fontSize: 'var(--text-headline)', color: 'var(--color-text)' }}>June 2024 — by platform</h2>
        </div>
        {loading ? (
          <div className="py-16 text-center" style={{ color: 'var(--color-text-muted)' }}>Loading earnings...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                  {['Platform', 'Income', 'CPM Rate', 'Impressions'].map(h => (
                    <th key={h} className="px-5 py-3 text-left font-semibold" style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-caption)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentMonth.map(e => (
                  <tr key={e.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <td className="px-5 py-4">
                      <span className="flex items-center gap-2" style={{ color: 'var(--color-text)', fontWeight: 500 }}>
                        <span style={{ fontSize: 20 }}>{PLATFORM_EMOJI[e.platform] ?? '🌐'}</span> {e.platform}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-semibold" style={{ color: 'var(--color-success)' }}>{formatCurrency(e.income_usd)}</td>
                    <td className="px-5 py-4" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-subhead)' }}>{formatCurrency(e.cpm_rate)}</td>
                    <td className="px-5 py-4" style={{ color: 'var(--color-text-secondary)' }}>{formatNumber(e.impressions)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AppShell>
  )
}

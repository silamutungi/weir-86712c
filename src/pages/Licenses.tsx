import { useEffect, useState } from 'react'
import { Plus, FileText, Trash2 } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { formatCurrency } from '../lib/utils'
import AppShell from '../components/AppShell'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Badge } from '../components/ui/badge'
import type { License } from '../types'
import type { FormEvent } from 'react'

const SEED: License[] = [
  { id: '1', user_id: 'seed', name: 'Standard Commercial', type: 'commercial', price_usd: 1200, duration_days: 30, platforms: ['Instagram', 'TikTok'], active: true, created_at: '2024-05-01T00:00:00Z', deleted_at: null },
  { id: '2', user_id: 'seed', name: 'Editorial Use', type: 'editorial', price_usd: 400, duration_days: 90, platforms: ['YouTube', 'Facebook'], active: true, created_at: '2024-04-10T00:00:00Z', deleted_at: null },
  { id: '3', user_id: 'seed', name: 'Exclusive Campaign', type: 'exclusive', price_usd: 8500, duration_days: 180, platforms: ['All'], active: false, created_at: '2024-03-20T00:00:00Z', deleted_at: null },
  { id: '4', user_id: 'seed', name: 'Personal Use Only', type: 'personal', price_usd: 0, duration_days: 14, platforms: ['X (Twitter)'], active: true, created_at: '2024-06-01T00:00:00Z', deleted_at: null }
]

export default function Licenses() {
  const [licenses, setLicenses] = useState<License[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [duration, setDuration] = useState('30')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!isSupabaseConfigured) { setLicenses(SEED); setLoading(false); return }
    supabase.from('licenses').select('*').is('deleted_at', null).order('created_at', { ascending: false })
      .then(({ data }) => { setLicenses(data ?? []); setLoading(false) })
  }, [])

  async function handleCreate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    const newLicense: Omit<License, 'id' | 'user_id'> = { name, type: 'commercial', price_usd: parseFloat(price) || 0, duration_days: parseInt(duration) || 30, platforms: ['All'], active: true, created_at: new Date().toISOString(), deleted_at: null }
    if (!isSupabaseConfigured) {
      setLicenses(prev => [{ ...newLicense, id: Date.now().toString(), user_id: 'demo' }, ...prev])
      setSaving(false); setShowForm(false); setName(''); setPrice(''); setDuration('30')
      return
    }
    const { data } = await supabase.from('licenses').insert([newLicense]).select().single()
    if (data) setLicenses(prev => [data, ...prev])
    setSaving(false); setShowForm(false); setName(''); setPrice('')
  }

  async function deactivate(id: string) {
    if (!isSupabaseConfigured) { setLicenses(prev => prev.map(l => l.id === id ? { ...l, active: false } : l)); return }
    await supabase.from('licenses').update({ active: false }).eq('id', id)
    setLicenses(prev => prev.map(l => l.id === id ? { ...l, active: false } : l))
  }

  return (
    <AppShell title="Licensing Templates">
      {!isSupabaseConfigured && (
        <div className="mb-6 px-4 py-3 rounded-lg text-sm font-medium" style={{ backgroundColor: 'rgba(234,179,8,0.12)', border: '1px solid rgba(234,179,8,0.35)', color: 'var(--color-warning)' }}>
          Viewing sample data — connect your database to go live.
        </div>
      )}
      <div className="flex items-center justify-between mb-6">
        <p style={{ fontSize: 'var(--text-subhead)', color: 'var(--color-text-secondary)' }}>Define how brands can use your identity — and at what price.</p>
        <Button onClick={() => setShowForm(!showForm)} style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff' }}>
          <Plus size={16} className="mr-2" /> New template
        </Button>
      </div>
      {showForm && (
        <form onSubmit={handleCreate} className="p-5 rounded-lg mb-6 space-y-4" style={{ backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}>
          <h3 className="font-semibold" style={{ fontSize: 'var(--text-headline)', color: 'var(--color-text)' }}>New License Template</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-1">
              <Label htmlFor="lname">Name</Label>
              <Input id="lname" required value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Standard Commercial" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="lprice">Price (USD)</Label>
              <Input id="lprice" type="number" min="0" required value={price} onChange={e => setPrice(e.target.value)} placeholder="1200" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="lduration">Duration (days)</Label>
              <Input id="lduration" type="number" min="1" required value={duration} onChange={e => setDuration(e.target.value)} placeholder="30" className="mt-1" />
            </div>
          </div>
          <div className="flex gap-3">
            <Button type="submit" disabled={saving} style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff' }}>{saving ? 'Saving...' : 'Create template'}</Button>
            <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
          </div>
        </form>
      )}
      {loading ? (
        <div className="py-20 text-center" style={{ color: 'var(--color-text-muted)' }}>Loading templates...</div>
      ) : licenses.length === 0 ? (
        <div className="py-20 text-center" style={{ color: 'var(--color-text-muted)' }}>No templates yet — create your first licensing template.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {licenses.map(l => (
            <div key={l.id} className="p-5 rounded-lg" style={{ backgroundColor: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <FileText size={18} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                  <p className="font-semibold" style={{ fontSize: 'var(--text-headline)', color: 'var(--color-text)' }}>{l.name}</p>
                </div>
                <Badge variant={l.active ? 'default' : 'outline'}>{l.active ? 'Active' : 'Inactive'}</Badge>
              </div>
              <p className="mt-2" style={{ fontSize: 'var(--text-subhead)', color: 'var(--color-text-secondary)' }}>
                {formatCurrency(l.price_usd)} · {l.duration_days} days · {l.type}
              </p>
              <p style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-muted)' }}>{l.platforms.join(', ')}</p>
              {l.active && (
                <button onClick={() => deactivate(l.id)} className="flex items-center gap-1 mt-3 text-sm" style={{ color: 'var(--color-error)', minHeight: 44 }}>
                  <Trash2 size={14} /> Deactivate
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </AppShell>
  )
}

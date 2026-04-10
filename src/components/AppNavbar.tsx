import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Shield, LayoutDashboard, AlertTriangle, FileText, DollarSign, TrendingUp, LogOut, Menu, X } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

const NAV = [
  { to: '/dashboard', label: 'Overview', icon: <LayoutDashboard size={18} strokeWidth={2} /> },
  { to: '/matches', label: 'Matches', icon: <AlertTriangle size={18} strokeWidth={2} /> },
  { to: '/licenses', label: 'Licenses', icon: <FileText size={18} strokeWidth={2} /> },
  { to: '/earnings', label: 'Earnings', icon: <DollarSign size={18} strokeWidth={2} /> },
  { to: '/analytics', label: 'Analytics', icon: <TrendingUp size={18} strokeWidth={2} /> }
]

export default function AppNavbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  async function signOut() {
    if (isSupabaseConfigured) await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <nav style={{ backgroundColor: 'var(--color-bg-surface)', borderBottom: '1px solid var(--color-border)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/dashboard" className="flex items-center gap-2" style={{ textDecoration: 'none' }}>
            <Shield size={22} style={{ color: 'var(--color-primary)' }} strokeWidth={2.5} />
            <span className="font-bold" style={{ fontSize: 'var(--text-headline)', color: 'var(--color-text)', letterSpacing: '-0.01em' }}>WEIR</span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {NAV.map(n => (
              <Link key={n.to} to={n.to} className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors" style={{ color: location.pathname === n.to ? 'var(--color-primary)' : 'var(--color-text-secondary)', backgroundColor: location.pathname === n.to ? 'rgba(30,64,175,0.08)' : 'transparent', textDecoration: 'none' }}>
                {n.icon} {n.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={signOut} className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium" style={{ color: 'var(--color-text-secondary)', minHeight: 44 }} aria-label="Sign out">
              <LogOut size={16} /> Sign out
            </button>
            <button className="md:hidden p-2 rounded-md" style={{ minHeight: 44, minWidth: 44, color: 'var(--color-text)' }} onClick={() => setOpen(!open)} aria-label="Toggle menu">
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>
      {open && (
        <div className="md:hidden px-4 pb-4 space-y-1" style={{ borderTop: '1px solid var(--color-border)' }}>
          {NAV.map(n => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="flex items-center gap-2 px-3 py-3 rounded-md text-sm font-medium" style={{ color: location.pathname === n.to ? 'var(--color-primary)' : 'var(--color-text-secondary)', backgroundColor: location.pathname === n.to ? 'rgba(30,64,175,0.08)' : 'transparent', textDecoration: 'none', minHeight: 44 }}>
              {n.icon} {n.label}
            </Link>
          ))}
          <button onClick={signOut} className="flex w-full items-center gap-2 px-3 py-3 rounded-md text-sm font-medium" style={{ color: 'var(--color-text-secondary)', minHeight: 44 }}>
            <LogOut size={16} /> Sign out
          </button>
        </div>
      )}
    </nav>
  )
}

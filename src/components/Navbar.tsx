import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Shield, Menu, X } from 'lucide-react'
import { Button } from './ui/button'

export default function Navbar() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: 'rgba(13,17,23,0.92)', backdropFilter: 'blur(8px)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2" style={{ textDecoration: 'none' }}>
            <Shield size={22} color="#3B82F6" strokeWidth={2.5} />
            <span className="font-bold" style={{ fontSize: 'var(--text-headline)', color: '#F1F5F9', letterSpacing: '-0.01em' }}>WEIR</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/#features" style={{ color: 'rgba(241,245,249,0.75)', fontSize: 'var(--text-subhead)', fontWeight: 500, textDecoration: 'none' }}>Features</Link>
            <Link to="/login" style={{ color: 'rgba(241,245,249,0.75)', fontSize: 'var(--text-subhead)', fontWeight: 500, textDecoration: 'none' }}>Sign in</Link>
            <Button onClick={() => navigate('/signup')} style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff', fontWeight: 600 }}>Start free</Button>
          </div>
          <button className="md:hidden p-2" style={{ color: '#F1F5F9', minHeight: 44, minWidth: 44 }} onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden px-6 pb-4 space-y-2" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <Link to="/login" onClick={() => setOpen(false)} className="block py-3" style={{ color: 'rgba(241,245,249,0.75)', textDecoration: 'none', minHeight: 44 }}>Sign in</Link>
          <Button onClick={() => { setOpen(false); navigate('/signup') }} className="w-full" style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff' }}>Start free</Button>
        </div>
      )}
    </nav>
  )
}

import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Shield } from 'lucide-react'
import { Button } from './ui/button'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)

  // Close drawer on route change
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  // Close drawer on click outside
  useEffect(() => {
    if (!open) return
    function handleClickOutside(e: MouseEvent | TouchEvent) {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [open])

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const navLinks = [
    { label: 'Features', to: '/#features' },
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Sign in', to: '/login' },
  ]

  const isActive = (to: string) => location.pathname === to

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: 'rgba(13,17,23,0.92)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2" style={{ textDecoration: 'none' }}>
              <Shield size={22} color="var(--color-primary)" strokeWidth={2.5} />
              <span
                className="font-bold"
                style={{
                  fontSize: 'var(--text-headline)',
                  color: 'var(--color-text)',
                  letterSpacing: '-0.01em',
                }}
              >
                WEIR
              </span>
            </Link>

            {/* Desktop nav — unchanged */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                to="/#features"
                style={{
                  color: 'rgba(241,245,249,0.75)',
                  fontSize: 'var(--text-subhead)',
                  fontWeight: 500,
                  textDecoration: 'none',
                }}
              >
                Features
              </Link>
              <Link
                to="/login"
                style={{
                  color: 'rgba(241,245,249,0.75)',
                  fontSize: 'var(--text-subhead)',
                  fontWeight: 500,
                  textDecoration: 'none',
                }}
              >
                Sign in
              </Link>
              <Button
                onClick={() => navigate('/signup')}
                style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff', fontWeight: 600 }}
              >
                Start free
              </Button>
            </div>

            {/* Hamburger button — mobile only */}
            <button
              className="md:hidden flex flex-col justify-center items-center gap-[5px] p-2"
              style={{ color: 'var(--color-text)', minHeight: 44, minWidth: 44 }}
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              <span
                className="block w-5 h-[2px] rounded-full transition-all duration-300"
                style={{
                  backgroundColor: 'var(--color-text)',
                  transform: open ? 'translateY(7px) rotate(45deg)' : 'none',
                }}
              />
              <span
                className="block w-5 h-[2px] rounded-full transition-all duration-300"
                style={{
                  backgroundColor: 'var(--color-text)',
                  opacity: open ? 0 : 1,
                }}
              />
              <span
                className="block w-5 h-[2px] rounded-full transition-all duration-300"
                style={{
                  backgroundColor: 'var(--color-text)',
                  transform: open ? 'translateY(-7px) rotate(-45deg)' : 'none',
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer backdrop */}
      <div
        className="md:hidden fixed inset-0 z-40 transition-opacity duration-300"
        style={{
          backgroundColor: 'rgba(0,0,0,0.5)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
        }}
        aria-hidden="true"
      />

      {/* Mobile slide-in drawer */}
      <div
        ref={drawerRef}
        className="md:hidden fixed top-0 right-0 bottom-0 z-50 w-72 flex flex-col transition-transform duration-300 ease-in-out"
        style={{
          backgroundColor: 'var(--color-bg-surface)',
          boxShadow: '-4px 0 24px rgba(0,0,0,0.18)',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
        }}
        aria-hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Drawer header */}
        <div
          className="flex items-center justify-between px-6 h-16 shrink-0"
          style={{ borderBottom: '1px solid var(--color-border)' }}
        >
          <Link
            to="/"
            className="flex items-center gap-2"
            style={{ textDecoration: 'none' }}
            onClick={() => setOpen(false)}
          >
            <Shield size={20} color="var(--color-primary)" strokeWidth={2.5} />
            <span
              className="font-bold"
              style={{
                fontSize: 'var(--text-headline)',
                color: 'var(--color-text)',
                letterSpacing: '-0.01em',
              }}
            >
              WEIR
            </span>
          </Link>
          <button
            className="flex items-center justify-center rounded-md p-2"
            style={{ color: 'var(--color-text)', minHeight: 44, minWidth: 44 }}
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="2" y1="2" x2="16" y2="16" />
              <line x1="16" y1="2" x2="2" y2="16" />
            </svg>
          </button>
        </div>

        {/* Drawer nav links */}
        <nav className="flex flex-col px-4 pt-4 gap-1 flex-1" aria-label="Mobile navigation">
          {navLinks.map((link) => {
            const active = isActive(link.to)
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="flex items-center px-3 py-3 rounded-lg font-medium transition-colors duration-150"
                style={{
                  color: active ? 'var(--color-accent)' : 'var(--color-text)',
                  backgroundColor: active ? 'rgba(220,38,38,0.08)' : 'transparent',
                  textDecoration: 'none',
                  fontSize: 'var(--text-subhead)',
                  minHeight: 44,
                }}
              >
                {active && (
                  <span
                    className="w-1 h-4 rounded-full mr-3 shrink-0"
                    style={{ backgroundColor: 'var(--color-accent)' }}
                  />
                )}
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Drawer footer CTA */}
        <div
          className="px-6 py-6 shrink-0"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          <button
            className="w-full flex items-center justify-center rounded-lg font-semibold transition-opacity duration-150 hover:opacity-90 active:opacity-80"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: '#ffffff',
              fontSize: 'var(--text-subhead)',
              minHeight: 44,
              padding: '0 1.25rem',
            }}
            onClick={() => {
              setOpen(false)
              navigate('/signup')
            }}
          >
            Start free
          </button>
        </div>
      </div>
    </>
  )
}

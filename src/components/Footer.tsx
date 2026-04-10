import { Shield } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--color-bg-surface)', borderTop: '1px solid var(--color-border)' }}>
      <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Shield size={18} style={{ color: 'var(--color-primary)' }} />
          <span className="font-bold" style={{ fontSize: 'var(--text-subhead)', color: 'var(--color-text)' }}>WEIR</span>
          <span style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-muted)' }}>&copy; {new Date().getFullYear()}</span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/login" style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-muted)', textDecoration: 'none' }}>Sign in</Link>
          <Link to="/signup" style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-muted)', textDecoration: 'none' }}>Sign up</Link>
          <a href="mailto:support@weir.ai" style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-muted)', textDecoration: 'none' }}>Support</a>
        </div>
      </div>
    </footer>
  )
}

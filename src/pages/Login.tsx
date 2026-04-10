import { useState, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { LogIn } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)
    if (!isSupabaseConfigured) {
      setTimeout(() => { setLoading(false); navigate('/dashboard') }, 800)
      return
    }
    const { error: err } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (err) { setError(err.message); return }
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4" style={{ backgroundColor: 'var(--color-primary)' }}>
            <LogIn size={20} color="#ffffff" strokeWidth={2} />
          </div>
          <h1 className="font-bold" style={{ fontSize: 'var(--text-title-2)', color: 'var(--color-text)' }}>Sign in to WEIR</h1>
          <p className="mt-1" style={{ fontSize: 'var(--text-subhead)', color: 'var(--color-text-secondary)' }}>Protect your identity. Get paid.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="mt-1" />
          </div>
          {error && <p role="alert" className="text-sm font-medium" style={{ color: 'var(--color-error)' }}>{error}</p>}
          <Button type="submit" className="w-full" disabled={loading} style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff', fontWeight: 600 }}>
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
        <p className="text-center mt-6" style={{ fontSize: 'var(--text-subhead)', color: 'var(--color-text-secondary)' }}>
          No account? <Link to="/signup" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Start free</Link>
        </p>
      </div>
    </div>
  )
}

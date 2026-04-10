import { useState, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { UserPlus } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'

export default function Signup() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return }
    setLoading(true)
    if (!isSupabaseConfigured) {
      setTimeout(() => { setLoading(false); navigate('/dashboard') }, 800)
      return
    }
    const { error: err } = await supabase.auth.signUp({ email, password, options: { data: { full_name: name } } })
    setLoading(false)
    if (err) { setError(err.message); return }
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4" style={{ backgroundColor: 'var(--color-primary)' }}>
            <UserPlus size={20} color="#ffffff" strokeWidth={2} />
          </div>
          <h1 className="font-bold" style={{ fontSize: 'var(--text-title-2)', color: 'var(--color-text)' }}>Create your account</h1>
          <p className="mt-1" style={{ fontSize: 'var(--text-subhead)', color: 'var(--color-text-secondary)' }}>14-day free trial. No card needed.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full name</Label>
            <Input id="name" type="text" required autoComplete="name" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)} placeholder="8+ characters" className="mt-1" />
          </div>
          {error && <p role="alert" className="text-sm font-medium" style={{ color: 'var(--color-error)' }}>{error}</p>}
          <Button type="submit" className="w-full" disabled={loading} style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff', fontWeight: 600 }}>
            {loading ? 'Creating account...' : 'Start free'}
          </Button>
        </form>
        <p className="text-center mt-6" style={{ fontSize: 'var(--text-subhead)', color: 'var(--color-text-secondary)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}

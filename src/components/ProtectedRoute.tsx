import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { isSupabaseConfigured, supabase } from '../lib/supabase'

export default function ProtectedRoute() {
  const navigate = useNavigate()
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    if (!isSupabaseConfigured) { setChecking(false); return }
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) navigate('/login')
      else setChecking(false)
    })
  }, [navigate])

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg)' }}>
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-subhead)' }}>Verifying access...</p>
      </div>
    )
  }

  return <Outlet />
}

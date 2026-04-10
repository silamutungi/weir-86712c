import { type ReactNode } from 'react'
import AppNavbar from './AppNavbar'

interface AppShellProps {
  children: ReactNode
  title: string
}

export default function AppShell({ children, title }: AppShellProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <AppNavbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="font-bold mb-6" style={{ fontSize: 'var(--text-title-2)', color: 'var(--color-text)', letterSpacing: 'var(--tracking-title)' }}>{title}</h1>
        {children}
      </main>
    </div>
  )
}

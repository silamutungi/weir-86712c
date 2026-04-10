import { useNavigate } from 'react-router-dom'
import { Shield, TrendingUp, DollarSign, Zap } from 'lucide-react'
import { Button } from '../components/ui/button'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const features = [
  { icon: <Shield size={32} strokeWidth={2} />, title: 'Real-Time Detection', body: 'AI scans billions of posts, ads, and media placements to find your face, name, and voice within minutes of publication.' },
  { icon: <Zap size={32} strokeWidth={2} />, title: 'One-Tap Actions', body: 'Approve, monetize, or take down any content match instantly — no lawyers, no forms, no delays.' },
  { icon: <DollarSign size={32} strokeWidth={2} />, title: 'Licensing Engine', body: 'Set your rates and terms once. WEIR auto-enforces them and collects royalties from every authorized use.' },
  { icon: <TrendingUp size={32} strokeWidth={2} />, title: 'Earnings Dashboard', body: 'See CPM rates and monthly income by platform. Know exactly how much your identity is worth.' }
]

export default function Home() {
  const navigate = useNavigate()
  return (
    <div style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <Navbar />
      <section
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1676380367878-c79a5f40edb6?ixid=M3w5MTM0MDN8MHwxfHNlYXJjaHwxfHxBJTIwY29uZmlkZW50JTIwZmVtYWxlJTIwY29udGVudCUyMGNyZWF0b3IlMjBzbWlsaW5nJTIwd2hpbGUlMjByZXZpZXdpbmclMjBofGVufDB8MHx8fDE3NzU3OTYxMzB8MA&ixlib=rb-4.1.0&w=1920&h=1080&fit=crop&crop=center&q=80&auto=format)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        className="relative min-h-[100svh] flex items-center overflow-hidden"
      >
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.45) 100%)' }} />
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-32">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-6" style={{ backgroundColor: 'rgba(220,38,38,0.18)', color: '#FCA5A5', border: '1px solid rgba(220,38,38,0.35)' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#EF4444', display: 'inline-block' }} />
            AI Protection Active
          </div>
          <h1 className="font-bold text-white mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.15, letterSpacing: '-0.02em', maxWidth: '680px' }}>
            Stop losing money every time someone uses your face.
          </h1>
          <p className="text-lg mb-10" style={{ color: 'rgba(255,255,255,0.82)', maxWidth: '520px', lineHeight: 1.6 }}>
            WEIR detects, licenses, and monetizes every use of your name, image, and likeness in real time — across every platform.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" onClick={() => navigate('/signup')} style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff', fontWeight: 600 }}>
              Start free
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/login')} style={{ borderColor: 'rgba(255,255,255,0.5)', color: '#ffffff', backgroundColor: 'transparent' }}>
              Sign in
            </Button>
          </div>
          <p className="mt-6 text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>No credit card required. Free for 14 days.</p>
        </div>
      </section>

      <section className="py-20 md:py-32" style={{ backgroundColor: 'var(--color-bg-surface)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-bold mb-4" style={{ fontSize: 'var(--text-title-1)', color: 'var(--color-text)', letterSpacing: 'var(--tracking-title)' }}>Everything you need to own your identity online</h2>
          <p className="mb-16" style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-secondary)', maxWidth: '520px', lineHeight: 'var(--leading-relaxed)' }}>One platform. Full protection. Real income.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((f) => (
              <div key={f.title} className="p-6 rounded-lg" style={{ border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg)' }}>
                <div className="mb-4" style={{ color: 'var(--color-primary)' }}>{f.icon}</div>
                <h3 className="font-semibold mb-2" style={{ fontSize: 'var(--text-title-3)', color: 'var(--color-text)' }}>{f.title}</h3>
                <p style={{ fontSize: 'var(--text-callout)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="font-bold mb-6" style={{ fontSize: 'var(--text-title-1)', color: 'var(--color-text)' }}>Your identity is being monetized — just not by you.</h2>
          <p className="mb-8 mx-auto" style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-secondary)', maxWidth: '480px', lineHeight: 'var(--leading-relaxed)' }}>Brands and advertisers spend billions using creator likenesses without permission. WEIR puts that money back in your hands.</p>
          <Button size="lg" onClick={() => navigate('/signup')} style={{ backgroundColor: 'var(--color-primary)', color: '#ffffff', fontWeight: 600 }}>
            Get your dashboard
          </Button>
        </div>
      </section>
      <Footer />
    </div>
  )
}

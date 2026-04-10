import { useNavigate } from 'react-router-dom'
import { Check, Zap, Shield, Star } from 'lucide-react'
import { Button } from '../components/ui/button'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const tiers = [
  {
    name: 'Starter',
    icon: <Shield size={28} strokeWidth={2} />,
    price: '$0',
    period: 'forever',
    description: 'For creators just starting to protect their identity online.',
    cta: 'Start free',
    ctaVariant: 'outline' as const,
    highlight: false,
    features: [
      'Up to 50 content scans / month',
      '2 platforms monitored',
      'Basic takedown requests',
      'Standard match alerts',
      '1 licensing template',
      'Email support',
    ],
  },
  {
    name: 'Pro',
    icon: <Zap size={28} strokeWidth={2} />,
    price: '$29',
    period: 'per month',
    description: 'For active creators ready to monetize every use of their identity.',
    cta: 'Start free trial',
    ctaVariant: 'default' as const,
    highlight: true,
    features: [
      'Unlimited content scans',
      'All major platforms',
      'One-tap takedown & monetize',
      'Real-time risk alerts',
      'Unlimited licensing templates',
      'Earnings dashboard & CPM data',
      'Priority email support',
      '14-day free trial',
    ],
  },
  {
    name: 'Enterprise',
    icon: <Star size={28} strokeWidth={2} />,
    price: 'Custom',
    period: 'contact us',
    description: 'For agencies, talent managers, and high-volume creators with custom needs.',
    cta: 'Contact sales',
    ctaVariant: 'outline' as const,
    highlight: false,
    features: [
      'Everything in Pro',
      'Dedicated account manager',
      'Custom platform integrations',
      'White-label licensing portals',
      'Advanced analytics & reporting',
      'Legal enforcement support',
      'SLA-backed response times',
      'Team seat management',
    ],
  },
]

const comparisonRows = [
  { feature: 'Content scans', starter: '50 / month', pro: 'Unlimited', enterprise: 'Unlimited' },
  { feature: 'Platforms monitored', starter: '2', pro: 'All major', enterprise: 'All + custom' },
  { feature: 'Takedown actions', starter: 'Basic', pro: 'One-tap', enterprise: 'One-tap + legal' },
  { feature: 'Real-time alerts', starter: false, pro: true, enterprise: true },
  { feature: 'Licensing templates', starter: '1', pro: 'Unlimited', enterprise: 'Unlimited + white-label' },
  { feature: 'Earnings dashboard', starter: false, pro: true, enterprise: true },
  { feature: 'CPM rate data', starter: false, pro: true, enterprise: true },
  { feature: 'Advanced analytics', starter: false, pro: false, enterprise: true },
  { feature: 'Account manager', starter: false, pro: false, enterprise: true },
  { feature: 'Legal enforcement support', starter: false, pro: false, enterprise: true },
]

export default function Pricing() {
  const navigate = useNavigate()

  function handleCta(tier: typeof tiers[number]) {
    if (tier.name === 'Enterprise') {
      window.location.href = 'mailto:sales@weir.ai'
    } else {
      navigate('/signup')
    }
  }

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero */}
      <section
        className="relative flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: 'var(--color-ink)', paddingTop: '8rem', paddingBottom: '5rem' }}
      >
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-6"
            style={{
              backgroundColor: 'rgba(220,38,38,0.18)',
              color: '#FCA5A5',
              border: '1px solid rgba(220,38,38,0.35)',
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#EF4444',
                display: 'inline-block',
              }}
            />
            Simple, transparent pricing
          </div>
          <h1
            className="font-bold text-white mb-6"
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}
          >
            Own your identity.<br />Set your price.
          </h1>
          <p
            className="mx-auto"
            style={{
              fontSize: 'var(--text-body)',
              color: 'rgba(255,255,255,0.72)',
              maxWidth: '480px',
              lineHeight: 'var(--leading-relaxed)',
            }}
          >
            Start free. Upgrade as your identity earns more. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Pricing cards */}
      <section
        className="py-20 md:py-28"
        style={{ backgroundColor: 'var(--color-bg-surface)' }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className="relative flex flex-col rounded-xl p-8"
                style={{
                  backgroundColor: tier.highlight ? 'var(--color-primary)' : 'var(--color-bg)',
                  border: tier.highlight
                    ? '2px solid var(--color-primary)'
                    : '1px solid var(--color-border)',
                  boxShadow: tier.highlight ? '0 8px 32px rgba(220,38,38,0.22)' : 'none',
                }}
              >
                {tier.highlight && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold tracking-wide"
                    style={{ backgroundColor: '#ffffff', color: 'var(--color-primary)' }}
                  >
                    MOST POPULAR
                  </div>
                )}

                {/* Icon */}
                <div
                  className="mb-4"
                  style={{ color: tier.highlight ? '#ffffff' : 'var(--color-primary)' }}
                >
                  {tier.icon}
                </div>

                {/* Name */}
                <h2
                  className="font-bold mb-1"
                  style={{
                    fontSize: 'var(--text-title-2)',
                    color: tier.highlight ? '#ffffff' : 'var(--color-text)',
                  }}
                >
                  {tier.name}
                </h2>

                {/* Description */}
                <p
                  className="mb-6"
                  style={{
                    fontSize: 'var(--text-callout)',
                    color: tier.highlight ? 'rgba(255,255,255,0.80)' : 'var(--color-text-secondary)',
                    lineHeight: 'var(--leading-relaxed)',
                  }}
                >
                  {tier.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <span
                    className="font-bold"
                    style={{
                      fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                      color: tier.highlight ? '#ffffff' : 'var(--color-text)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {tier.price}
                  </span>
                  <span
                    className="ml-2"
                    style={{
                      fontSize: 'var(--text-callout)',
                      color: tier.highlight ? 'rgba(255,255,255,0.70)' : 'var(--color-text-secondary)',
                    }}
                  >
                    {tier.period}
                  </span>
                </div>

                {/* CTA */}
                <button
                  onClick={() => handleCta(tier)}
                  className="w-full flex items-center justify-center rounded-lg font-semibold transition-opacity duration-150 hover:opacity-90 active:opacity-80 mb-8"
                  style={{
                    backgroundColor: tier.highlight ? '#ffffff' : 'transparent',
                    color: tier.highlight ? 'var(--color-primary)' : 'var(--color-primary)',
                    border: tier.highlight ? 'none' : '1.5px solid var(--color-primary)',
                    minHeight: 44,
                    fontSize: 'var(--text-subhead)',
                    padding: '0 1.25rem',
                  }}
                >
                  {tier.cta}
                </button>

                {/* Features */}
                <ul className="flex flex-col gap-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check
                        size={16}
                        strokeWidth={2.5}
                        style={{
                          color: tier.highlight ? '#ffffff' : 'var(--color-primary)',
                          marginTop: 2,
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontSize: 'var(--text-callout)',
                          color: tier.highlight ? 'rgba(255,255,255,0.90)' : 'var(--color-text)',
                          lineHeight: 'var(--leading-relaxed)',
                        }}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature comparison table */}
      <section className="py-20 md:py-28" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="max-w-5xl mx-auto px-6">
          <h2
            className="font-bold mb-4"
            style={{
              fontSize: 'var(--text-title-1)',
              color: 'var(--color-text)',
              letterSpacing: 'var(--tracking-title)',
            }}
          >
            Compare plans
          </h2>
          <p
            className="mb-12"
            style={{
              fontSize: 'var(--text-body)',
              color: 'var(--color-text-secondary)',
              lineHeight: 'var(--leading-relaxed)',
            }}
          >
            Every detail, side by side.
          </p>

          <div className="overflow-x-auto rounded-xl" style={{ border: '1px solid var(--color-border)' }}>
            <table className="w-full" style={{ borderCollapse: 'collapse', minWidth: 560 }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--color-bg-surface)', borderBottom: '1px solid var(--color-border)' }}>
                  <th
                    className="text-left px-6 py-4"
                    style={{ fontSize: 'var(--text-callout)', color: 'var(--color-text-secondary)', fontWeight: 600 }}
                  >
                    Feature
                  </th>
                  {tiers.map((t) => (
                    <th
                      key={t.name}
                      className="px-6 py-4 text-center"
                      style={{
                        fontSize: 'var(--text-callout)',
                        color: t.highlight ? 'var(--color-primary)' : 'var(--color-text)',
                        fontWeight: 700,
                      }}
                    >
                      {t.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={row.feature}
                    style={{
                      backgroundColor: i % 2 === 0 ? 'var(--color-bg)' : 'var(--color-bg-surface)',
                      borderBottom: i < comparisonRows.length - 1 ? '1px solid var(--color-border)' : 'none',
                    }}
                  >
                    <td
                      className="px-6 py-4"
                      style={{ fontSize: 'var(--text-callout)', color: 'var(--color-text)', fontWeight: 500 }}
                    >
                      {row.feature}
                    </td>
                    {(['starter', 'pro', 'enterprise'] as const).map((key) => {
                      const val = row[key]
                      return (
                        <td key={key} className="px-6 py-4 text-center">
                          {typeof val === 'boolean' ? (
                            val ? (
                              <Check
                                size={16}
                                strokeWidth={2.5}
                                style={{ color: 'var(--color-primary)', display: 'inline-block' }}
                              />
                            ) : (
                              <span style={{ color: 'var(--color-text-secondary)', fontSize: 18, lineHeight: 1 }}>—</span>
                            )
                          ) : (
                            <span
                              style={{
                                fontSize: 'var(--text-callout)',
                                color: 'var(--color-text-secondary)',
                              }}
                            >
                              {val}
                            </span>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        className="py-20 md:py-28"
        style={{ backgroundColor: 'var(--color-bg-surface)' }}
      >
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2
            className="font-bold mb-6"
            style={{
              fontSize: 'var(--text-title-1)',
              color: 'var(--color-text)',
              letterSpacing: 'var(--tracking-title)',
            }}
          >
            Start protecting your identity today.
          </h2>
          <p
            className="mb-8 mx-auto"
            style={{
              fontSize: 'var(--text-body)',
              color: 'var(--color-text-secondary)',
              maxWidth: '480px',
              lineHeight: 'var(--leading-relaxed)',
            }}
          >
            No credit card required. Full Pro access free for 14 days.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => navigate('/signup')}
              className="flex items-center justify-center rounded-lg font-semibold transition-opacity duration-150 hover:opacity-90 active:opacity-80"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: '#ffffff',
                fontSize: 'var(--text-subhead)',
                minHeight: 48,
                padding: '0 2rem',
              }}
            >
              Start free trial
            </button>
            <button
              onClick={() => navigate('/login')}
              className="flex items-center justify-center rounded-lg font-semibold transition-opacity duration-150 hover:opacity-90 active:opacity-80"
              style={{
                backgroundColor: 'transparent',
                color: 'var(--color-text)',
                border: '1.5px solid var(--color-border)',
                fontSize: 'var(--text-subhead)',
                minHeight: 48,
                padding: '0 2rem',
              }}
            >
              Sign in
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

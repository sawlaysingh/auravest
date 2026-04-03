'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const stats = [
  { value: '$2.4M+', label: 'Assets Tracked' },
  { value: '98%', label: 'Portfolio Accuracy' },
  { value: '12K+', label: 'Active Users' },
  { value: '4.9★', label: 'User Rating' },
];

const features = [
  {
    icon: '💰',
    title: 'Smart Budget Tracking',
    desc: 'AI auto-categorizes your spending and alerts you before you overspend. Zero effort budgeting.',
    color: '#6c8cff',
  },
  {
    icon: '📈',
    title: 'Investment Portfolio',
    desc: 'Track stocks, ETFs, crypto, and real estate in one unified dashboard with live prices.',
    color: '#22d3a0',
  },
  {
    icon: '🤖',
    title: 'AI Predictive Analytics',
    desc: 'Monte Carlo forecasts, risk scoring, and personalized recommendations powered by AI.',
    color: '#f5c842',
  },
  {
    icon: '🧾',
    title: 'Tax Optimization',
    desc: 'Track capital gains, find tax-loss harvesting opportunities, and estimate your tax liability.',
    color: '#f9546a',
  },
  {
    icon: '🎮',
    title: 'Gamified Investing',
    desc: 'Earn XP, unlock badges, and build streaks as you hit your financial milestones.',
    color: '#a78bfa',
  },
  {
    icon: '🔒',
    title: 'Bank-Level Security',
    desc: 'AES-256 encryption, multi-factor auth, and read-only account linking keep you protected.',
    color: '#38bdf8',
  },
];

const testimonials = [
  {
    name: 'Sarah K.',
    role: 'Software Engineer',
    avatar: 'SK',
    text: 'Auravest replaced 4 different finance apps for me. The AI insights are genuinely helpful.',
    rating: 5,
  },
  {
    name: 'Marcus L.',
    role: 'Freelance Designer',
    avatar: 'ML',
    text: 'Finally understood tax-loss harvesting thanks to Auravest. Saved $3,200 last tax season.',
    rating: 5,
  },
  {
    name: 'Priya M.',
    role: 'Product Manager',
    avatar: 'PM',
    text: 'The gamification actually works. I\'ve saved more in 3 months than the entire past year.',
    rating: 5,
  },
];

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ background: 'var(--bg-base)', minHeight: '100vh' }}>
      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        padding: '0 var(--space-8)',
        height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(10,13,20,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-subtle)' : 'none',
        transition: 'all 0.3s ease',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <div style={{
            width: 36, height: 36, borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, var(--accent-gold), var(--color-primary))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 900, fontSize: 16, color: '#0a0d14',
          }}>A</div>
          <span style={{
            fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em',
            background: 'linear-gradient(135deg, var(--accent-gold), #fff8e0)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>Auravest</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <a href="#features" style={{ color: 'var(--text-secondary)', fontSize: 13, fontWeight: 500 }}>Features</a>
          <a href="#testimonials" style={{ color: 'var(--text-secondary)', fontSize: 13, fontWeight: 500 }}>Reviews</a>
          <Link href="/login" className="btn btn-ghost btn-sm">Sign In</Link>
          <Link href="/register" className="btn btn-gold btn-sm">Start Free</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
        padding: '120px var(--space-8) var(--space-16)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background orbs */}
        <div style={{
          position: 'absolute', top: '20%', left: '10%',
          width: 400, height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(108,140,255,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '30%', right: '10%',
          width: 300, height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245,200,66,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <span className="badge badge-gold animate-fadeUp" style={{ fontSize: 12, marginBottom: 'var(--space-5)' }}>
          ✦ AI-Powered Finance Platform
        </span>

        <h1 className="animate-fadeUp delay-100" style={{ maxWidth: 800, marginBottom: 'var(--space-6)' }}>
          Your Money,{' '}
          <span style={{
            background: 'linear-gradient(135deg, var(--accent-gold), var(--color-primary))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Amplified
          </span>
          <br />by Intelligence
        </h1>

        <p className="animate-fadeUp delay-200" style={{
          fontSize: 18, color: 'var(--text-secondary)', maxWidth: 560,
          marginBottom: 'var(--space-8)', lineHeight: 1.7,
        }}>
          Auravest unifies your budget, investments, and taxes into one
          AI-driven platform that actively grows and protects your wealth.
        </p>

        <div className="animate-fadeUp delay-300" style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/register" className="btn btn-gold btn-lg" id="hero-cta-primary">
            🚀 Get Started Free
          </Link>
          <Link href="/login" className="btn btn-ghost btn-lg" id="hero-cta-demo">
            View Live Demo →
          </Link>
        </div>

        {/* Stats row */}
        <div className="animate-fadeUp delay-400" style={{
          display: 'flex', gap: 'var(--space-10)', marginTop: 64,
          padding: 'var(--space-6) var(--space-10)',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-xl)',
          flexWrap: 'wrap', justifyContent: 'center',
        }}>
          {stats.map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div className="mono" style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)' }}>{s.value}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding: 'var(--space-16) var(--space-8)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
          <span className="badge badge-primary" style={{ marginBottom: 'var(--space-4)' }}>Features</span>
          <h2>Everything your money needs</h2>
          <p style={{ marginTop: 'var(--space-3)', fontSize: 16, maxWidth: 500, margin: '12px auto 0' }}>
            From daily budgeting to long-term wealth growth — Auravest has you covered.
          </p>
        </div>

        <div className="grid-3" style={{ maxWidth: 1100, margin: '0 auto' }}>
          {features.map((f, i) => (
            <div
              key={f.title}
              className="card"
              style={{
                animationDelay: `${i * 0.08}s`,
                transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 12px 32px rgba(0,0,0,0.5)`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '';
              }}
            >
              <div style={{
                width: 52, height: 52, borderRadius: 'var(--radius-md)',
                background: `${f.color}18`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 24, marginBottom: 'var(--space-4)',
                border: `1px solid ${f.color}30`,
              }}>
                {f.icon}
              </div>
              <h4 style={{ marginBottom: 'var(--space-2)', color: 'var(--text-primary)' }}>{f.title}</h4>
              <p style={{ fontSize: 13, lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" style={{
        padding: 'var(--space-16) var(--space-8)',
        background: 'var(--bg-surface)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
          <span className="badge badge-success" style={{ marginBottom: 'var(--space-4)' }}>Reviews</span>
          <h2>Loved by investors</h2>
        </div>

        <div className="grid-3" style={{ maxWidth: 1000, margin: '0 auto' }}>
          {testimonials.map((t) => (
            <div key={t.name} className="card">
              <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-4)', alignItems: 'center' }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 'var(--radius-full)',
                  background: 'linear-gradient(135deg, var(--accent-gold), var(--color-primary))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: 13, color: '#0a0d14',
                }}>{t.avatar}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-primary)' }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{t.role}</div>
                </div>
                <div style={{ marginLeft: 'auto', color: 'var(--accent-gold)', fontSize: 12 }}>{'★'.repeat(t.rating)}</div>
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)' }}>&ldquo;{t.text}&rdquo;</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{
        padding: 'var(--space-16) var(--space-8)',
        textAlign: 'center',
      }}>
        <div style={{
          maxWidth: 700, margin: '0 auto',
          padding: 'var(--space-12)',
          borderRadius: 'var(--radius-xl)',
          background: 'linear-gradient(135deg, rgba(108,140,255,0.1), rgba(245,200,66,0.08))',
          border: '1px solid var(--border-gold)',
          boxShadow: 'var(--shadow-gold)',
        }}>
          <h2 style={{ marginBottom: 'var(--space-4)' }}>Start your financial journey today</h2>
          <p style={{ marginBottom: 'var(--space-8)', fontSize: 15 }}>No credit card required. Free forever.</p>
          <Link href="/register" className="btn btn-gold btn-lg" id="bottom-cta">
            ✦ Launch Auravest Free
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: 'var(--space-8)',
        borderTop: '1px solid var(--border-subtle)',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: 12,
      }}>
        © 2026 Auravest. Built for your financial future.
      </footer>
    </div>
  );
}

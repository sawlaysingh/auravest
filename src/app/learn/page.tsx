'use client';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import AppLayout from '@/components/AppLayout';

const badges = [
  { id: 'b1', icon: '🌱', title: 'First Step',       desc: 'Created your first budget',            unlocked: true  },
  { id: 'b2', icon: '💰', title: 'Saver',             desc: 'Saved $1,000 in a single month',        unlocked: true  },
  { id: 'b3', icon: '📈', title: 'Investor',          desc: 'Made your first investment',            unlocked: true  },
  { id: 'b4', icon: '🛡️', title: 'Guardian',          desc: 'Built a 3-month emergency fund',        unlocked: true  },
  { id: 'b5', icon: '🏆', title: 'Debt Slayer',       desc: 'Paid off $10,000 in debt',              unlocked: false },
  { id: 'b6', icon: '🔥', title: '30-Day Streak',     desc: 'Logged in 30 days in a row',            unlocked: false },
  { id: 'b7', icon: '💎', title: 'Wealth Builder',    desc: 'Net worth exceeded $100K',              unlocked: false },
  { id: 'b8', icon: '🚀', title: 'Master Investor',   desc: 'Portfolio return exceeded 20%',         unlocked: false },
];

const quizzes = [
  { id: 'q1', title: 'Investing Basics',       icon: '📊', questions: 10, xp: 50,  completed: true,  score: 90 },
  { id: 'q2', title: 'Tax Fundamentals',       icon: '🧾', questions: 8,  xp: 40,  completed: true,  score: 75 },
  { id: 'q3', title: 'Portfolio Diversification', icon: '🎯', questions: 12, xp: 60, completed: false, score: 0 },
  { id: 'q4', title: 'Crypto & Web3',          icon: '🪙', questions: 10, xp: 50,  completed: false, score: 0 },
  { id: 'q5', title: 'Real Estate Investing',  icon: '🏠', questions: 8,  xp: 40,  completed: false, score: 0 },
];

const challenges = [
  { id: 'ch1', title: 'No-Spend Weekend',    desc: 'Go 48 hours without non-essential spending', xp: 30, deadline: '2 days', icon: '🔒', active: true  },
  { id: 'ch2', title: 'Invest $100 This Week', desc: 'Make a new investment of at least $100',  xp: 40, deadline: '5 days', icon: '📈', active: true  },
  { id: 'ch3', title: 'Review Your Budget',  desc: 'Check and adjust all budget categories',    xp: 20, deadline: '1 day',  icon: '📋', active: false },
];

const TOTAL_XP = 3890;
const LEVEL = 7;
const XP_TO_NEXT = 4200;

export default function LearnPage() {
  const { data: session } = useSession();
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);
  const [quizStep, setQuizStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const userName = session?.user?.name || session?.user?.email?.split('@')[0] || 'Member';
  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const leaderboard = [
    { rank: 1, name: 'Alex M.',   avatar: 'AM', savingsRate: 42, xp: 4820, crown: true  },
    { rank: 2, name: 'Priya K.',  avatar: 'PK', savingsRate: 38, xp: 4310, crown: false },
    { rank: 3, name: userName,    avatar: initials, savingsRate: 35, xp: 3890, crown: false, isYou: true },
    { rank: 4, name: 'Marcus L.', avatar: 'ML', savingsRate: 31, xp: 3420, crown: false },
    { rank: 5, name: 'Sofia R.',  avatar: 'SR', savingsRate: 28, xp: 2980, crown: false },
  ];

  const sampleQuestions = [
    { q: 'What does "diversification" mean in investing?', options: ['Putting all money in one stock', 'Spreading investments across different assets', 'Investing only in bonds', 'Using leverage'], correct: 1 },
    { q: 'What is a P/E ratio?', options: ['Price-to-Earnings ratio', 'Profit-to-Expense ratio', 'Portfolio Efficiency rate', 'Payout ratio'], correct: 0 },
  ];

  return (
    <AppLayout>
      <div className="page-content">
        <div className="page-header flex items-center justify-between">
          <div>
            <h1 className="page-title">Gamified Learning Hub 🎮</h1>
            <p className="page-subtitle">Earn XP, unlock badges, and master your financial future</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>LEVEL {LEVEL}</div>
              <div className="mono" style={{ fontSize: 16, fontWeight: 700, color: 'var(--accent-gold)' }}>{TOTAL_XP.toLocaleString()} XP</div>
            </div>
          </div>
        </div>

        {/* XP & Level Card */}
        <div className="card card-gold animate-fadeUp" style={{ marginBottom: 'var(--space-6)' }} id="xp-level-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)' }}>
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent-gold), var(--color-primary))',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, boxShadow: 'var(--shadow-gold)',
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#0a0d14', letterSpacing: '0.08em' }}>LEVEL</div>
              <div style={{ fontSize: 26, fontWeight: 900, color: '#0a0d14', lineHeight: 1 }}>{LEVEL}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>Wealth Architect</span>
                <span className="mono" style={{ fontSize: 12, color: 'var(--text-muted)' }}>{TOTAL_XP} / {XP_TO_NEXT} XP</span>
              </div>
              <div className="xp-bar">
                <div className="xp-fill" style={{ width: `${(TOTAL_XP / XP_TO_NEXT) * 100}%` }} />
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>
                {XP_TO_NEXT - TOTAL_XP} XP until Level {LEVEL + 1} — <span style={{ color: 'var(--accent-gold)' }}>Master Investor</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-6)', flexShrink: 0 }}>
              <div style={{ textAlign: 'center' }}>
                <div className="mono" style={{ fontSize: 20, fontWeight: 700, color: 'var(--color-success)' }}>🔥 14</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Day Streak</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div className="mono" style={{ fontSize: 20, fontWeight: 700, color: 'var(--color-primary)' }}>4</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Badges</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div className="mono" style={{ fontSize: 20, fontWeight: 700, color: 'var(--accent-gold)' }}>#3</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Rank</div>
              </div>
            </div>
          </div>
        </div>

        {/* Challenges + Quiz */}
        <div className="grid-2 animate-fadeUp delay-100" style={{ marginBottom: 'var(--space-6)' }}>
          {/* Active Challenges */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Active Challenges</div>
              <span className="badge badge-danger" style={{ fontSize: 10 }}>2 Active</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {challenges.map(c => (
                <div key={c.id} id={c.id} style={{
                  padding: 'var(--space-4)', borderRadius: 'var(--radius-md)',
                  background: c.active ? 'var(--bg-elevated)' : 'var(--bg-card)',
                  border: `1px solid ${c.active ? 'var(--border-default)' : 'var(--border-subtle)'}`,
                  opacity: c.active ? 1 : 0.5,
                  display: 'flex', alignItems: 'center', gap: 'var(--space-4)',
                }}>
                  <div style={{ fontSize: 28 }}>{c.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{c.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{c.desc}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>⏰ {c.deadline} left</div>
                  </div>
                  <div style={{ textAlign: 'center', flexShrink: 0 }}>
                    <div className="badge badge-gold" style={{ fontSize: 11 }}>+{c.xp} XP</div>
                    {c.active && <button className="btn btn-primary btn-sm" style={{ marginTop: 8, fontSize: 11 }}>Accept</button>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quiz Module */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Financial Quizzes</div>
              <span className="badge badge-success" style={{ fontSize: 10 }}>2 Completed</span>
            </div>
            {activeQuiz ? (
              <div id="quiz-active">
                <div style={{ marginBottom: 'var(--space-4)' }}>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8 }}>Question {quizStep + 1} of {sampleQuestions.length}</div>
                  <div className="progress-track" style={{ marginBottom: 16 }}>
                    <div className="progress-fill" style={{ width: `${((quizStep + 1) / sampleQuestions.length) * 100}%` }} />
                  </div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.5, marginBottom: 'var(--space-4)' }}>
                    {sampleQuestions[quizStep].q}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                    {sampleQuestions[quizStep].options.map((opt, i) => (
                      <button key={i} onClick={() => setSelectedAnswer(i)}
                        className="btn btn-ghost"
                        style={{
                          justifyContent: 'flex-start', textAlign: 'left', fontSize: 13, padding: '10px 14px',
                          borderColor: selectedAnswer === i ? 'var(--color-primary)' : 'var(--border-default)',
                          background: selectedAnswer === i ? 'var(--color-primary-glow)' : '',
                          color: selectedAnswer === i ? 'var(--color-primary)' : 'var(--text-secondary)',
                        }}>
                        <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--bg-elevated)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, marginRight: 10, flexShrink: 0 }}>
                          {String.fromCharCode(65 + i)}
                        </span>
                        {opt}
                      </button>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => { setActiveQuiz(null); setQuizStep(0); setSelectedAnswer(null); }}>Exit</button>
                    <button className="btn btn-primary btn-sm" style={{ flex: 1 }} onClick={() => {
                      if (quizStep < sampleQuestions.length - 1) { setQuizStep(s => s + 1); setSelectedAnswer(null); }
                      else { setActiveQuiz(null); setQuizStep(0); setSelectedAnswer(null); }
                    }}>
                      {quizStep < sampleQuestions.length - 1 ? 'Next →' : 'Finish ✓'}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                {quizzes.map(q => (
                  <div key={q.id} id={q.id} style={{
                    display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
                    padding: 'var(--space-3) var(--space-4)', borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border-subtle)',
                    cursor: q.completed ? 'default' : 'pointer',
                    opacity: q.completed ? 0.7 : 1,
                    transition: 'all 0.2s',
                  }}
                    onClick={() => !q.completed && setActiveQuiz(q.id)}
                    onMouseEnter={e => !q.completed && ((e.currentTarget as HTMLDivElement).style.borderColor = 'var(--color-primary)')}
                    onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-subtle)')}
                  >
                    <span style={{ fontSize: 20 }}>{q.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{q.title}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{q.questions} questions</div>
                    </div>
                    {q.completed
                      ? <span className="badge badge-success" style={{ fontSize: 10 }}>✓ {q.score}%</span>
                      : <span className="badge badge-gold" style={{ fontSize: 10 }}>+{q.xp} XP</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Badges + Leaderboard */}
        <div className="grid-2 animate-fadeUp delay-200">
          {/* Badges */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Achievement Badges</div>
              <span className="badge badge-gold" style={{ fontSize: 10 }}>4 / 8 Unlocked</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-3)' }}>
              {badges.map(b => (
                <div key={b.id} id={b.id} className={`achievement-badge ${b.unlocked ? 'unlocked' : ''}`}
                  style={{ opacity: b.unlocked ? 1 : 0.4 }} title={b.desc}>
                  <div className="achievement-icon" style={{ background: b.unlocked ? 'var(--accent-glow)' : 'var(--bg-elevated)' }}>
                    {b.icon}
                  </div>
                  <div style={{ fontSize: 10, fontWeight: 600, color: b.unlocked ? 'var(--text-primary)' : 'var(--text-muted)', textAlign: 'center' }}>
                    {b.title}
                  </div>
                  {b.unlocked && (
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-success)' }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Savings Leaderboard</div>
              <span className="badge badge-muted" style={{ fontSize: 10 }}>Opt-in · Anonymous</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {leaderboard.map(u => (
                <div key={u.rank} id={`lb-${u.rank}`} style={{
                  display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
                  padding: 'var(--space-3) var(--space-4)', borderRadius: 'var(--radius-md)',
                  background: u.isYou ? 'var(--color-primary-glow)' : 'var(--bg-elevated)',
                  border: `1px solid ${u.isYou ? 'rgba(108,140,255,0.3)' : 'var(--border-subtle)'}`,
                }}>
                  <div style={{
                    width: 28, fontWeight: 800, fontSize: 14, textAlign: 'center', flexShrink: 0,
                    color: u.rank === 1 ? 'var(--accent-gold)' : u.rank === 2 ? '#c0c0c0' : u.rank === 3 ? '#cd7f32' : 'var(--text-muted)',
                  }}>
                    {u.crown ? '👑' : `#${u.rank}`}
                  </div>
                  <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-gold), var(--color-primary))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#0a0d14', flexShrink: 0 }}>
                    {u.avatar}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: u.isYou ? 700 : 500, color: u.isYou ? 'var(--color-primary)' : 'var(--text-primary)' }}>
                      {u.name} {u.isYou && <span style={{ fontSize: 10, opacity: 0.7 }}>(you)</span>}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{u.savingsRate}% savings rate</div>
                  </div>
                  <span className="mono" style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent-gold)' }}>{u.xp.toLocaleString()} XP</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

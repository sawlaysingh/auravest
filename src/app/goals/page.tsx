'use client';
import AppLayout from '@/components/AppLayout';
import { useState } from 'react';

const goals = [
  { id: 'g1', title: 'Emergency Fund',    icon: '🛡️', target: 30000, current: 22400, deadline: 'Jul 2025',  color: 'var(--color-success)', category: 'Safety' },
  { id: 'g2', title: 'Down Payment',      icon: '🏠', target: 80000, current: 41200, deadline: 'Dec 2026',  color: 'var(--color-primary)', category: 'Property' },
  { id: 'g3', title: 'Retirement (401k)', icon: '🏖️', target: 500000,current: 142320,deadline: 'Jan 2045',  color: 'var(--accent-gold)',   category: 'Retirement' },
  { id: 'g4', title: 'Vacation Fund',     icon: '✈️', target: 8000,  current: 5600,  deadline: 'Jun 2025',  color: '#a78bfa',              category: 'Lifestyle' },
  { id: 'g5', title: 'Pay Off Car Loan',  icon: '🚗', target: 12000, current: 9800,  deadline: 'Aug 2025',  color: '#38bdf8',              category: 'Debt' },
  { id: 'g6', title: 'Start Business',    icon: '🚀', target: 50000, current: 8000,  deadline: 'Jan 2027',  color: '#fb923c',              category: 'Business' },
];

const milestones = [
  { label: 'First $10K Saved',     done: true,  icon: '🌱' },
  { label: 'Emergency Fund 50%',   done: true,  icon: '🛡️' },
  { label: 'Invested $50K',        done: true,  icon: '📈' },
  { label: 'Net Worth $200K',      done: false, icon: '💎' },
  { label: 'Mortgage Free',        done: false, icon: '🏠' },
  { label: 'Early Retirement',     done: false, icon: '🏖️' },
];

const defaultForm = { title: '', icon: '🎯', target: '', current: '', deadline: '', category: 'General' };

export default function GoalsPage() {
  const [showNew, setShowNew] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [goalList, setGoalList] = useState(goals);

  const totalGoals = goalList.length;
  const netProgress = Math.round(goalList.reduce((acc, g) => acc + (g.current / g.target), 0) / goalList.length * 100);

  const handleSubmit = () => {
    if (!form.title || !form.target || !form.current) return;
    
    const target = parseFloat(form.target);
    const current = parseFloat(form.current);
    
    const colors: Record<string, string> = { Safety: 'var(--color-success)', Property: 'var(--color-primary)', Retirement: 'var(--accent-gold)', Lifestyle: '#a78bfa', Debt: '#38bdf8', Business: '#fb923c', General: 'var(--color-primary)' };
    
    const newGoal = {
      id: `g${Date.now()}`,
      title: form.title,
      icon: form.icon,
      target,
      current,
      deadline: form.deadline || 'Dec 2025',
      color: colors[form.category] || 'var(--color-primary)',
      category: form.category
    };

    setGoalList(prev => [newGoal, ...prev]);
    setForm(defaultForm);
    setShowNew(false);
  };

  return (
    <AppLayout>
      {/* NEW GOAL MODAL */}
      {showNew && (
        <div
          id="new-goal-overlay"
          onClick={(e) => e.target === e.currentTarget && setShowNew(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 'var(--z-modal)' as never,
            background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <div id="new-goal-modal" style={{
            background: 'var(--bg-card)', border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-xl)', padding: 'var(--space-8)',
            width: 480, boxShadow: 'var(--shadow-lg)',
            animation: 'fadeUp 0.25s var(--ease-smooth)',
          }}>
            {/* Modal Header */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'var(--space-6)' }}>
              <div>
                <h3 style={{ color:'var(--text-primary)', fontSize:18 }}>Set New Goal</h3>
                <p style={{ fontSize:12, color:'var(--text-muted)', marginTop:2 }}>Define a new financial target for yourself</p>
              </div>
              <button id="close-modal-btn" onClick={() => setShowNew(false)}
                style={{ background:'var(--bg-elevated)', border:'1px solid var(--border-default)', borderRadius:'var(--radius-md)', width:32, height:32, cursor:'pointer', color:'var(--text-secondary)', fontSize:16, display:'flex', alignItems:'center', justifyContent:'center' }}>
                ✕
              </button>
            </div>

            {/* Fields */}
            <div className="form-group">
              <label className="form-label">Goal Title</label>
              <input id="goal-title" className="form-input" placeholder="e.g. Dream House, Yacht Fund..." value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} autoFocus />
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'var(--space-4)' }}>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select id="goal-category" className="form-select" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                  {['Safety','Property','Retirement','Lifestyle','Debt','Business','General'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Icon</label>
                <input id="goal-icon" className="form-input" placeholder="🎯" value={form.icon} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))} />
              </div>
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'var(--space-4)' }}>
              <div className="form-group">
                <label className="form-label">Target Amount</label>
                <input id="goal-target" className="form-input mono" placeholder="0" type="number" value={form.target} onChange={e => setForm(f => ({ ...f, target: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">Current Savings</label>
                <input id="goal-current" className="form-input mono" placeholder="0" type="number" value={form.current} onChange={e => setForm(f => ({ ...f, current: e.target.value }))} />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom:'var(--space-6)' }}>
              <label className="form-label">Deadline</label>
              <input id="goal-deadline" className="form-input" placeholder="e.g. Dec 2025" value={form.deadline} onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))} />
            </div>

            {/* Actions */}
            <div style={{ display:'flex', gap:'var(--space-3)' }}>
              <button className="btn btn-ghost" style={{ flex:1 }} onClick={() => setShowNew(false)}>Cancel</button>
              <button id="submit-goal-btn" className="btn btn-gold" style={{ flex:2 }} onClick={handleSubmit}>
                Save Goal
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="page-content">
        <div className="page-header flex items-center justify-between">
          <div>
            <h1 className="page-title">Financial Goals</h1>
            <p className="page-subtitle">Track progress towards your biggest life milestones</p>
          </div>
          <button className="btn btn-gold" id="add-goal-btn" onClick={() => setShowNew(true)}>+ New Goal</button>
        </div>

        {/* Summary */}
        <div className="grid-3 animate-fadeUp" style={{ marginBottom: 'var(--space-6)' }}>
          <div className="card" id="goals-total">
            <div className="card-title">Goals Tracked</div>
            <div className="card-value mono" style={{ marginTop: 8 }}>{totalGoals}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>Across categories</div>
          </div>
          <div className="card" id="goals-on-track">
            <div className="card-title">On Track</div>
            <div className="card-value mono" style={{ marginTop: 8, color: 'var(--color-success)' }}>4</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>Goals progressing well</div>
          </div>
          <div className="card card-gold" id="goals-net-progress">
            <div className="card-title">Net Progress</div>
            <div className="card-value mono" style={{ marginTop: 8, color: 'var(--accent-gold)' }}>{netProgress}%</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>Avg across all goals</div>
          </div>
        </div>

        {/* Goals Grid */}
        <div className="grid-3 animate-fadeUp delay-100" style={{ marginBottom: 'var(--space-6)' }}>
          {goalList.map((g, i) => {
            const pct = Math.round((g.current / g.target) * 100);
            const remaining = g.target - g.current;
            return (
              <div key={g.id} id={g.id} className="card" style={{ animationDelay: `${i * 0.08}s` }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
                  <div>
                    <div style={{ fontSize: 28, marginBottom: 'var(--space-2)' }}>{g.icon}</div>
                    <h4 style={{ color: 'var(--text-primary)', fontSize: 14 }}>{g.title}</h4>
                    <span className="badge badge-muted" style={{ marginTop: 4, fontSize: 10 }}>{g.category}</span>
                  </div>
                  <div className="mono" style={{ fontSize: 22, fontWeight: 700, color: g.color }}>{pct}%</div>
                </div>

                <div className="progress-track" style={{ marginBottom: 'var(--space-3)' }}>
                  <div className="progress-fill" style={{ width: `${pct}%`, background: g.color }} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                  <span className="mono" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                    ${g.current.toLocaleString()}
                  </span>
                  <span style={{ color: 'var(--text-muted)' }}>of ${g.target.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginTop: 6 }}>
                  <span style={{ color: 'var(--text-muted)' }}>Remaining: <span className="mono" style={{ color: 'var(--text-secondary)' }}>${remaining.toLocaleString()}</span></span>
                  <span style={{ color: 'var(--text-muted)' }}>By {g.deadline}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Milestone Timeline */}
        <div className="card animate-fadeUp delay-200">
          <div className="card-header">
            <div className="card-title">Life Milestones</div>
            <span className="badge badge-gold" style={{ fontSize: 10 }}>3 of 6 reached</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, overflowX: 'auto', padding: 'var(--space-4) 0' }}>
            {milestones.map((m, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 120 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-2)', flex: 1 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%',
                    background: m.done ? 'var(--color-success-glow)' : 'var(--bg-elevated)',
                    border: `2px solid ${m.done ? 'var(--color-success)' : 'var(--border-default)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 20, position: 'relative',
                    transition: 'all 0.3s ease',
                  }}>
                    {m.icon}
                    {m.done && (
                      <div style={{
                        position: 'absolute', bottom: -2, right: -2,
                        width: 16, height: 16, borderRadius: '50%',
                        background: 'var(--color-success)', color: 'white',
                        fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 700,
                      }}>✓</div>
                    )}
                  </div>
                  <div style={{ fontSize: 11, textAlign: 'center', color: m.done ? 'var(--text-primary)' : 'var(--text-muted)', fontWeight: m.done ? 600 : 400, maxWidth: 90 }}>{m.label}</div>
                </div>
                {i < milestones.length - 1 && (
                  <div style={{ height: 2, flex: 1, maxWidth: 60, background: m.done ? 'var(--color-success)' : 'var(--border-subtle)', transition: 'background 0.3s' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

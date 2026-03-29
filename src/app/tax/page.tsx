'use client';
import AppLayout from '@/components/AppLayout';
import { useState } from 'react';

const taxEvents = [
  { id: 'te1', asset: 'AAPL', type: 'Long-Term Gain',  date: 'Feb 14', proceeds: 4200.00, basis: 3180.00, gain: 1020.00 },
  { id: 'te2', asset: 'MSFT', type: 'Long-Term Gain',  date: 'Jan 22', proceeds: 3320.00, basis: 2320.00, gain: 1000.00 },
  { id: 'te3', asset: 'BTC',  type: 'Short-Term Gain', date: 'Mar 10', proceeds: 5940.00, basis: 4200.00, gain: 1740.00 },
  { id: 'te4', asset: 'ARKK', type: 'Short-Term Loss',  date: 'Mar 05', proceeds: 880.00,  basis: 1200.00, gain: -320.00 },
  { id: 'te5', asset: 'VOO',  type: 'Long-Term Gain',  date: 'Dec 20', proceeds: 5920.00, basis: 4560.00, gain: 1360.00 },
];

const deductions = [
  { id: 'd1', category: 'Home Office',       amount: 2400, icon: '🏠' },
  { id: 'd2', category: 'Business Travel',   amount: 1840, icon: '✈️' },
  { id: 'd3', category: 'Software & Tools',  amount: 960,  icon: '💻' },
  { id: 'd4', category: 'Charitable Giving', amount: 1200, icon: '❤️' },
  { id: 'd5', category: 'Health Insurance',  amount: 3600, icon: '🏥' },
];

const brackets = [
  { range: '$0 – $11,000',        rate: '10%', color: 'var(--color-success)', active: false },
  { range: '$11,001 – $44,725',   rate: '12%', color: 'var(--color-success)', active: false },
  { range: '$44,726 – $95,375',   rate: '22%', color: 'var(--color-warning)', active: true  },
  { range: '$95,376 – $182,050',  rate: '24%', color: 'var(--color-warning)', active: false },
  { range: '$182,051 – $231,250', rate: '32%', color: 'var(--color-danger)',  active: false },
  { range: '$231,251+',           rate: '37%', color: 'var(--color-danger)',  active: false },
];

const defaultForm = { category: '', amount: '', icon: '📄' };

export default function TaxPage() {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [deductionList, setDeductionList] = useState(deductions);

  const totalLtGain  = taxEvents.filter(e => e.type === 'Long-Term Gain').reduce((a, e) => a + e.gain, 0);
  const totalStGain  = taxEvents.filter(e => e.type === 'Short-Term Gain').reduce((a, e) => a + e.gain, 0);
  const totalLoss    = Math.abs(taxEvents.filter(e => e.gain < 0).reduce((a, e) => a + e.gain, 0));
  const netGain      = totalLtGain + totalStGain - totalLoss;
  const estimatedTax = Math.max(0, (totalLtGain * 0.15 + totalStGain * 0.22) - (deductionList.reduce((a, d) => a + d.amount, 0) * 0.22)); // Simple estimate reduction
  const totalDeductions = deductionList.reduce((a, d) => a + d.amount, 0);

  const handleSubmit = () => {
    if (!form.category || !form.amount) return;
    const icons: Record<string, string> = { 'Home Office': '🏠', 'Business Travel': '✈️', 'Software & Tools': '💻', 'Charitable Giving': '❤️', 'Health Insurance': '🏥', 'Education': '🎓', 'Other': '📄' };
    const newDeduction = {
      id: `d${Date.now()}`,
      category: form.category,
      amount: parseFloat(form.amount),
      icon: icons[form.category] || form.icon
    };
    setDeductionList(prev => [newDeduction, ...prev]);
    setForm(defaultForm);
    setShowAdd(false);
  };

  return (
    <AppLayout>
      {/* ADD DEDUCTION MODAL */}
      {showAdd && (
        <div
          id="add-deduction-overlay"
          onClick={(e) => e.target === e.currentTarget && setShowAdd(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 'var(--z-modal)' as never,
            background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <div id="add-deduction-modal" style={{
            background: 'var(--bg-card)', border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-xl)', padding: 'var(--space-8)',
            width: 440, boxShadow: 'var(--shadow-lg)',
            animation: 'fadeUp 0.25s var(--ease-smooth)',
          }}>
            {/* Modal Header */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'var(--space-6)' }}>
              <div>
                <h3 style={{ color:'var(--text-primary)', fontSize:18 }}>Add Tax Deduction</h3>
                <p style={{ fontSize:12, color:'var(--text-muted)', marginTop:2 }}>Track a new tax-deductible expense</p>
              </div>
              <button id="close-modal-btn" onClick={() => setShowAdd(false)}
                style={{ background:'var(--bg-elevated)', border:'1px solid var(--border-default)', borderRadius:'var(--radius-md)', width:32, height:32, cursor:'pointer', color:'var(--text-secondary)', fontSize:16, display:'flex', alignItems:'center', justifyContent:'center' }}>
                ✕
              </button>
            </div>

            {/* Fields */}
            <div className="form-group">
              <label className="form-label">Category</label>
              <select id="deduction-category" className="form-select" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                <option value="">Select Category</option>
                {['Home Office','Business Travel','Software & Tools','Charitable Giving','Health Insurance','Education','Other'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Amount (USD)</label>
              <input id="deduction-amount" className="form-input mono" placeholder="0.00" type="number" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} autoFocus />
            </div>

            <div className="form-group" style={{ marginBottom:'var(--space-6)' }}>
              <label className="form-label">Custom Icon (Optional)</label>
              <input id="deduction-icon" className="form-input" placeholder="📄" value={form.icon} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))} />
            </div>

            {/* Actions */}
            <div style={{ display:'flex', gap:'var(--space-3)' }}>
              <button className="btn btn-ghost" style={{ flex:1 }} onClick={() => setShowAdd(false)}>Cancel</button>
              <button id="submit-deduction-btn" className="btn btn-gold" style={{ flex:2 }} onClick={handleSubmit}>
                Save Deduction
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="page-content">
        <div className="page-header flex items-center justify-between">
          <div>
            <h1 className="page-title">Tax Optimization</h1>
            <p className="page-subtitle">Capital gains tracking, deductions, and tax-saving strategies</p>
          </div>
          <button className="btn btn-gold btn-sm" id="tax-download-report">↓ Download Tax Report</button>
        </div>

        {/* Summary Cards */}
        <div className="grid-4 animate-fadeUp" style={{ marginBottom: 'var(--space-6)' }}>
          <div className="card" id="tax-lt-gain">
            <div className="card-title">Long-Term Gains</div>
            <div className="card-value mono" style={{ marginTop: 8, color: 'var(--color-success)' }}>+${totalLtGain.toLocaleString()}</div>
            <span className="badge badge-success" style={{ marginTop: 8, fontSize: 10 }}>15% Rate</span>
          </div>
          <div className="card" id="tax-st-gain">
            <div className="card-title">Short-Term Gains</div>
            <div className="card-value mono" style={{ marginTop: 8, color: 'var(--color-warning)' }}>+${totalStGain.toLocaleString()}</div>
            <span className="badge badge-warning" style={{ marginTop: 8, fontSize: 10 }}>22% Rate</span>
          </div>
          <div className="card" id="tax-losses">
            <div className="card-title">Harvested Losses</div>
            <div className="card-value mono" style={{ marginTop: 8, color: 'var(--color-danger)' }}>-${totalLoss.toLocaleString()}</div>
            <span className="badge badge-danger" style={{ marginTop: 8, fontSize: 10 }}>Tax Offset</span>
          </div>
          <div className="card card-gold" id="tax-estimate">
            <div className="card-title">Estimated Tax Due</div>
            <div className="card-value mono" style={{ marginTop: 8, color: 'var(--accent-gold)' }}>${estimatedTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>YTD after deductions</div>
          </div>
        </div>

        {/* Harvesting Opportunity */}
        <div className="ai-card animate-fadeUp delay-100" style={{ marginBottom: 'var(--space-6)' }} id="tax-harvest-tip">
          <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-start' }}>
            <div style={{ fontSize: 28 }}>💡</div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
                Tax-Loss Harvesting Opportunity
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-primary)' }}>
                You have an unrealized loss of <strong style={{ color: 'var(--color-danger)' }}>$1,800</strong> in ARKK.
                Selling now would offset your short-term gains and reduce your estimated tax by approximately <strong style={{ color: 'var(--color-success)' }}>$396</strong>.
                You can repurchase after 30 days to avoid the wash-sale rule.
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 12 }}>
                <button className="btn btn-gold btn-sm" id="harvest-cta">Harvest Now</button>
                <button className="btn btn-ghost btn-sm">Learn More</button>
              </div>
            </div>
          </div>
        </div>

        {/* Tax Events + Deductions */}
        <div className="grid-2 animate-fadeUp delay-200" style={{ marginBottom: 'var(--space-6)' }}>
          {/* Capital Gains Table */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Capital Events</div>
              <span className="badge badge-muted" style={{ fontSize: 10 }}>YTD 2025</span>
            </div>
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr><th>Asset</th><th>Type</th><th>Date</th><th style={{ textAlign: 'right' }}>Gain/Loss</th></tr>
                </thead>
                <tbody>
                  {taxEvents.map(e => (
                    <tr key={e.id} id={e.id}>
                      <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{e.asset}</td>
                      <td>
                        <span className={`badge ${e.gain > 0 ? (e.type.includes('Long') ? 'badge-success' : 'badge-warning') : 'badge-danger'}`} style={{ fontSize: 10 }}>
                          {e.type}
                        </span>
                      </td>
                      <td style={{ color: 'var(--text-muted)' }}>{e.date}</td>
                      <td style={{ textAlign: 'right' }}>
                        <span className="mono" style={{ fontWeight: 600, fontSize: 13, color: e.gain > 0 ? 'var(--color-success)' : 'var(--color-danger)' }}>
                          {e.gain > 0 ? '+' : ''}${e.gain.toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: 'var(--space-4)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Net Taxable Gain</span>
              <span className="mono" style={{ fontWeight: 700, color: 'var(--color-success)' }}>+${netGain.toLocaleString()}</span>
            </div>
          </div>

          {/* Deductions Tracker */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Deduction Tracker</div>
              <button className="btn btn-ghost btn-sm" id="add-deduction" onClick={() => setShowAdd(true)}>+ Add</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {deductionList.map(d => (
                <div key={d.id} id={d.id} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-md)', background: 'var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{d.icon}</div>
                  <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{d.category}</span>
                  <span className="mono" style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-success)' }}>-${d.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 'var(--space-4)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Total Deductions</span>
              <span className="mono" style={{ fontWeight: 700, color: 'var(--accent-gold)' }}>-${totalDeductions.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Tax Bracket Visualizer */}
        <div className="card animate-fadeUp delay-300" id="tax-bracket-vis">
          <div className="card-header">
            <div className="card-title">Tax Bracket Visualizer</div>
            <span className="badge badge-primary" style={{ fontSize: 10 }}>2025 Federal</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {brackets.map((b, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 'var(--space-4)',
                padding: 'var(--space-3) var(--space-4)',
                borderRadius: 'var(--radius-md)',
                background: b.active ? 'var(--bg-elevated)' : 'transparent',
                border: b.active ? '1px solid var(--border-default)' : '1px solid transparent',
              }}>
                <div className="mono" style={{ fontSize: 16, fontWeight: 700, color: b.color, width: 44, flexShrink: 0 }}>{b.rate}</div>
                <div style={{ flex: 1, height: 8, background: 'var(--bg-elevated)', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ width: b.active ? '38%' : [100,80,60,40,20,10][i] + '%', height: '100%', background: b.color, borderRadius: 4, opacity: b.active ? 1 : 0.3 }} />
                </div>
                <div style={{ fontSize: 12, color: b.active ? 'var(--text-primary)' : 'var(--text-muted)', width: 180, flexShrink: 0 }}>{b.range}</div>
                {b.active && <span className="badge badge-warning" style={{ fontSize: 10 }}>Your Bracket</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

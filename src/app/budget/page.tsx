'use client';
import AppLayout from '@/components/AppLayout';
import { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const categories = [
  { id: 'c1', name: 'Housing',       icon: '🏠', budget: 1800, spent: 1800, color: '#6c8cff' },
  { id: 'c2', name: 'Food & Dining', icon: '🍽️', budget: 700,  spent: 620,  color: '#22d3a0' },
  { id: 'c3', name: 'Transport',     icon: '🚗', budget: 400,  spent: 340,  color: '#f5c842' },
  { id: 'c4', name: 'Healthcare',    icon: '💊', budget: 300,  spent: 280,  color: '#f9546a' },
  { id: 'c5', name: 'Entertainment', icon: '🎬', budget: 250,  spent: 210,  color: '#a78bfa' },
  { id: 'c6', name: 'Shopping',      icon: '🛍️', budget: 500,  spent: 450,  color: '#38bdf8' },
  { id: 'c7', name: 'Subscriptions', icon: '📱', budget: 150,  spent: 142,  color: '#fb923c' },
  { id: 'c8', name: 'Savings',       icon: '💰', budget: 3000, spent: 2400, color: '#34d399' },
];

const transactions = [
  { id: 'tx1',  date: 'Mar 29', name: 'Whole Foods Market',     cat: 'Food & Dining', amount: -87.40,  icon: '🛒' },
  { id: 'tx2',  date: 'Mar 29', name: 'Netflix',                cat: 'Subscriptions', amount: -15.99,  icon: '🎬' },
  { id: 'tx3',  date: 'Mar 28', name: 'Salary Deposit',         cat: 'Income',        amount: 9200.00, icon: '💵' },
  { id: 'tx4',  date: 'Mar 28', name: 'Uber',                   cat: 'Transport',     amount: -23.50,  icon: '🚗' },
  { id: 'tx5',  date: 'Mar 27', name: 'Amazon Purchase',        cat: 'Shopping',      amount: -134.00, icon: '📦' },
  { id: 'tx6',  date: 'Mar 27', name: 'Gym Membership',         cat: 'Healthcare',    amount: -49.99,  icon: '💪' },
  { id: 'tx7',  date: 'Mar 26', name: 'Electricity Bill',       cat: 'Housing',       amount: -142.00, icon: '⚡' },
  { id: 'tx8',  date: 'Mar 26', name: 'Freelance Payment',      cat: 'Income',        amount: 1200.00, icon: '💻' },
  { id: 'tx9',  date: 'Mar 25', name: 'Starbucks',              cat: 'Food & Dining', amount: -8.75,   icon: '☕' },
  { id: 'tx10', date: 'Mar 25', name: 'Spotify Premium',        cat: 'Subscriptions', amount: -9.99,   icon: '🎵' },
];

const chartOptions = {
  responsive: true, maintainAspectRatio: false, indexAxis: 'y' as const,
  plugins: { legend: { display: false }, tooltip: { backgroundColor: '#1a2135', borderColor: '#ffffff18', borderWidth: 1, titleColor: '#eef0f8', bodyColor: '#8891b0', padding: 10 } },
  scales: {
    x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#8891b0', font: { size: 11 } } },
    y: { grid: { display: false }, ticks: { color: '#8891b0', font: { size: 11 } } },
  },
};

const defaultForm = { name: '', amount: '', category: 'Food & Dining', type: 'expense', date: 'Mar 29' };

export default function BudgetPage() {
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [txList, setTxList] = useState(transactions);

  const totalBudget = categories.reduce((a, c) => a + c.budget, 0);
  const totalSpent  = categories.reduce((a, c) => a + c.spent,  0);
  const remaining   = totalBudget - totalSpent;

  const filtered = txList.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.cat.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = () => {
    if (!form.name.trim() || !form.amount) return;
    const amt = parseFloat(form.amount);
    const signed = form.type === 'expense' ? -Math.abs(amt) : Math.abs(amt);
    const icons: Record<string,string> = { 'Food & Dining':'🍽️', Transport:'🚗', Shopping:'🛍️', Healthcare:'💊', Entertainment:'🎬', Subscriptions:'📱', Savings:'💰', Housing:'🏠', Income:'💵', Business:'💻', Other:'📌' };
    const newTx = { id: `tx${Date.now()}`, date: form.date, name: form.name, cat: form.category, amount: signed, icon: icons[form.category] || '📌' };
    setTxList(prev => [newTx, ...prev]);
    setForm(defaultForm);
    setShowAddModal(false);
  };

  const barData = {
    labels: categories.map(c => c.name),
    datasets: [
      { label: 'Spent', data: categories.map(c => c.spent), backgroundColor: categories.map(c => c.color + 'cc'), borderRadius: 4, borderSkipped: false },
      { label: 'Budget', data: categories.map(c => c.budget), backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 4, borderSkipped: false },
    ],
  };

  return (
    <AppLayout>
      {/* ADD TRANSACTION MODAL */}
      {showAddModal && (
        <div
          id="add-tx-overlay"
          onClick={(e) => e.target === e.currentTarget && setShowAddModal(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 'var(--z-modal)' as never,
            background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <div id="add-tx-modal" style={{
            background: 'var(--bg-card)', border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-xl)', padding: 'var(--space-8)',
            width: 480, boxShadow: 'var(--shadow-lg)',
            animation: 'fadeUp 0.25s var(--ease-smooth)',
          }}>
            {/* Modal Header */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'var(--space-6)' }}>
              <div>
                <h3 style={{ color:'var(--text-primary)', fontSize:18 }}>Add Transaction</h3>
                <p style={{ fontSize:12, color:'var(--text-muted)', marginTop:2 }}>Record a new income or expense</p>
              </div>
              <button id="close-modal-btn" onClick={() => setShowAddModal(false)}
                style={{ background:'var(--bg-elevated)', border:'1px solid var(--border-default)', borderRadius:'var(--radius-md)', width:32, height:32, cursor:'pointer', color:'var(--text-secondary)', fontSize:16, display:'flex', alignItems:'center', justifyContent:'center' }}>
                ✕
              </button>
            </div>

            {/* Type toggle */}
            <div style={{ display:'flex', gap:'var(--space-3)', marginBottom:'var(--space-5)' }}>
              {(['expense','income'] as const).map(t => (
                <button key={t} id={`type-${t}`}
                  onClick={() => setForm(f => ({ ...f, type: t }))}
                  style={{
                    flex:1, padding:'10px', borderRadius:'var(--radius-md)', fontSize:13, fontWeight:600, cursor:'pointer',
                    background: form.type===t ? (t==='expense' ? 'var(--color-danger-glow)' : 'var(--color-success-glow)') : 'var(--bg-elevated)',
                    color: form.type===t ? (t==='expense' ? 'var(--color-danger)' : 'var(--color-success)') : 'var(--text-secondary)',
                    border: `1px solid ${form.type===t ? (t==='expense' ? 'var(--color-danger)' : 'var(--color-success)') : 'var(--border-default)'}`,
                    transition:'all 0.2s',
                  }}>
                  {t==='expense' ? '↓ Expense' : '↑ Income'}
                </button>
              ))}
            </div>

            {/* Fields */}
            <div className="form-group">
              <label className="form-label">Transaction Name</label>
              <input id="tx-name" className="form-input" placeholder="e.g. Whole Foods, Salary..." value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} autoFocus />
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'var(--space-4)' }}>
              <div className="form-group">
                <label className="form-label">Amount (USD)</label>
                <input id="tx-amount" className="form-input mono" placeholder="0.00" type="number" min="0" step="0.01" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">Date</label>
                <input id="tx-date" className="form-input" placeholder="Mar 29" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
              </div>
            </div>
            <div className="form-group" style={{ marginBottom:'var(--space-6)' }}>
              <label className="form-label">Category</label>
              <select id="tx-category" className="form-select" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                {['Food & Dining','Transport','Shopping','Healthcare','Entertainment','Subscriptions','Savings','Housing','Income','Business','Other'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Actions */}
            <div style={{ display:'flex', gap:'var(--space-3)' }}>
              <button className="btn btn-ghost" style={{ flex:1 }} onClick={() => setShowAddModal(false)}>Cancel</button>
              <button id="submit-tx-btn" className="btn btn-gold" style={{ flex:2 }} onClick={handleSubmit}>
                + Add Transaction
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="page-content">
        <div className="page-header flex items-center justify-between">
          <div>
            <h1 className="page-title">Smart Budget</h1>
            <p className="page-subtitle">Monitor spending and stay on track with your budget goals</p>
          </div>
          <button className="btn btn-gold" id="add-transaction-btn" onClick={() => setShowAddModal(true)}>
            + Add Transaction
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid-3 animate-fadeUp" style={{ marginBottom: 'var(--space-6)' }}>
          <div className="card" id="budget-total">
            <div className="card-title">Monthly Budget</div>
            <div className="card-value mono" style={{ marginTop: 8 }}>${totalBudget.toLocaleString()}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>March 2025</div>
          </div>
          <div className="card" id="budget-spent">
            <div className="card-title">Total Spent</div>
            <div className="card-value mono" style={{ marginTop: 8, color: 'var(--color-danger)' }}>${totalSpent.toLocaleString()}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{Math.round((totalSpent/totalBudget)*100)}% of budget used</div>
          </div>
          <div className="card card-gold" id="budget-remaining">
            <div className="card-title">Remaining</div>
            <div className="card-value mono" style={{ marginTop: 8, color: 'var(--accent-gold)' }}>${remaining.toLocaleString()}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>2 days left in month</div>
          </div>
        </div>

        {/* Charts + Categories */}
        <div className="grid-2 animate-fadeUp delay-100" style={{ marginBottom: 'var(--space-6)' }}>
          {/* Bar Chart */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Budget vs Spent</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <span className="badge badge-primary" style={{ fontSize: 10 }}>Spent</span>
                <span className="badge badge-muted"   style={{ fontSize: 10 }}>Budget</span>
              </div>
            </div>
            <div className="chart-container" style={{ height: 280 }}>
              <Bar data={barData} options={chartOptions} />
            </div>
          </div>

          {/* Category breakdown */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Category Breakdown</div>
              <span className="badge badge-muted" style={{ fontSize: 10 }}>8 categories</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {categories.map(cat => {
                const pct = Math.min((cat.spent / cat.budget) * 100, 100);
                const over = cat.spent > cat.budget;
                return (
                  <div key={cat.id} id={cat.id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <span style={{ fontSize: 14 }}>{cat.icon}</span>
                        <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{cat.name}</span>
                      </div>
                      <div style={{ fontSize: 12, color: over ? 'var(--color-danger)' : 'var(--text-secondary)' }} className="mono">
                        ${cat.spent} / ${cat.budget}
                      </div>
                    </div>
                    <div className="progress-track">
                      <div className="progress-fill" style={{
                        width: `${pct}%`,
                        background: over ? 'var(--color-danger)' : `linear-gradient(90deg, ${cat.color}, ${cat.color}99)`,
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="card animate-fadeUp delay-200">
          <div className="card-header">
            <div className="card-title">Transactions</div>
            <input
              id="tx-search"
              className="form-input"
              placeholder="Search transactions..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: 220 }}
            />
          </div>
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Transaction</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th style={{ textAlign: 'right' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(tx => (
                  <tr key={tx.id} id={tx.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--bg-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>{tx.icon}</div>
                        <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{tx.name}</span>
                      </div>
                    </td>
                    <td><span className="badge badge-muted">{tx.cat}</span></td>
                    <td style={{ color: 'var(--text-muted)' }}>{tx.date}</td>
                    <td style={{ textAlign: 'right' }}>
                      <span className="mono" style={{ color: tx.amount > 0 ? 'var(--color-success)' : 'var(--text-primary)', fontWeight: 600, fontSize: 13 }}>
                        {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

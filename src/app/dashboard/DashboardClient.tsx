'use client';

import { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Filler, Tooltip, Legend } from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Filler, Tooltip, Legend);

interface DashboardClientProps {
  userName: string;
}

export default function DashboardClient({ userName }: DashboardClientProps) {
  const [insightIdx, setInsightIdx] = useState(0);
  const [showTxModal, setShowTxModal] = useState(false);
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [txForm, setTxForm] = useState({ name: '', amount: '', category: 'Food', type: 'expense', date: 'Mar 29' });
  const [assetForm, setAssetForm] = useState({ symbol: '', name: '', type: 'Stock', qty: '', avgCost: '' });

  const aiInsights = [
    { title: "Smart Tax Move", desc: "You've reached $6k in 401k. Max out to save $1.2k more." },
    { title: "Portfolio Insight", desc: "Tech is 45% of your asset allocation. Consider diversifying." },
    { title: "Budget Alert", desc: "Dining out is 15% higher than Feb. Stick to $400/mo." }
  ];

  const handleTxSubmit = () => {
    if (!txForm.name || !txForm.amount) return;
    setShowTxModal(false);
    setTxForm({ name: '', amount: '', category: 'Food', type: 'expense', date: 'Mar 29' });
  };

  const handleAssetSubmit = () => {
    if (!assetForm.symbol || !assetForm.qty) return;
    setShowAssetModal(false);
    setAssetForm({ symbol: '', name: '', type: 'Stock', qty: '', avgCost: '' });
  };

  return (
    <div className="dashboard-content fadeUp">
      {/* Header */}
      <div className="page-header flex items-center justify-between">
        <div>
          <h1 className="page-title">Good evening, {userName} 👋</h1>
          <p className="page-subtitle">Here's your financial snapshot for Sunday, Mar 29, 2026</p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <button className="btn btn-secondary" onClick={() => setShowAssetModal(true)}>+ Add Asset</button>
          <button className="btn btn-primary" onClick={() => setShowTxModal(true)}>+ Add Transaction</button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Main Stats */}
        <div className="col-span-12 md:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card glass-card">
              <span className="text-muted text-xs uppercase tracking-wider">Net Worth</span>
              <div className="flex items-end gap-2 mt-1">
                <h2 className="text-2xl font-black">$245,670</h2>
                <span className="text-success text-xs font-bold mb-1">+4.2%</span>
              </div>
            </div>
            <div className="card glass-card">
              <span className="text-muted text-xs uppercase tracking-wider">Portfolio</span>
              <div className="flex items-end gap-2 mt-1">
                <h2 className="text-2xl font-black">$182,430</h2>
                <span className="text-success text-xs font-bold mb-1">+12.5%</span>
              </div>
            </div>
            <div className="card glass-card">
              <span className="text-muted text-xs uppercase tracking-wider">Savings Rate</span>
              <div className="flex items-end gap-2 mt-1">
                <h2 className="text-2xl font-black">28.4%</h2>
                <span className="text-muted text-xs mb-1">vs 25% avg</span>
              </div>
            </div>
          </div>

          <div className="card glass-card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="card-title">Wealth Projection</h3>
              <div className="badge badge-primary">Pro Projection</div>
            </div>
            <div style={{ height: 300 }}>
              <Line 
                data={{
                  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                  datasets: [{
                    label: 'Net Worth',
                    data: [190000, 205000, 220000, 235000, 240000, 245670],
                    borderColor: '#f5c842',
                    backgroundColor: 'rgba(245, 200, 66, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0
                  }]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: {
                    y: { grid: { color: 'rgba(255,255,255,0.05)' }, border: { display: false }, ticks: { display: false } },
                    x: { grid: { display: false }, border: { display: false } }
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="col-span-12 md:col-span-4 space-y-6">
          <div className="card glass-card" style={{ background: 'linear-gradient(135deg, var(--bg-card) 0%, rgba(245, 200, 66, 0.05) 100%)' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="card-title" style={{ color: 'var(--accent-gold)' }}>AI Advantage</h3>
              <div className="pulse-dot" />
            </div>
            <div key={insightIdx} className="animate-fadeIn">
              <p className="font-bold text-sm mb-1">{aiInsights[insightIdx].title}</p>
              <p className="text-muted text-xs leading-relaxed">{aiInsights[insightIdx].desc}</p>
            </div>
            <button className="btn btn-ghost w-full mt-4 text-xs" onClick={() => setInsightIdx((i) => (i + 1) % aiInsights.length)}>
              Next Insight
            </button>
          </div>

          <div className="card glass-card">
            <h3 className="card-title mb-4">Allocation</h3>
            <div style={{ height: 200 }}>
              <Doughnut 
                data={{
                  labels: ['Stocks', 'Crypto', 'Real Estate', 'Cash'],
                  datasets: [{
                    data: [65, 15, 12, 8],
                    backgroundColor: ['#f5c842', '#3b82f6', '#10b981', '#6366f1'],
                    borderWidth: 0,
                    hoverOffset: 10
                  }]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  cutout: '80%',
                  plugins: { legend: { display: false } }
                }}
              />
            </div>
            <div className="space-y-3 mt-6">
              {[
                { label: 'Stocks', value: '65%', color: '#f5c842' },
                { label: 'Crypto', value: '15%', color: '#3b82f6' }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div style={{ width: 8, height: 8, borderRadius: 2, background: item.color }} />
                    <span className="text-xs text-muted">{item.label}</span>
                  </div>
                  <span className="text-xs font-bold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Modal */}
      {showTxModal && (
        <div className="modal-overlay" onClick={() => setShowTxModal(false)}>
          <div className="modal-card animate-fadeUp" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-6">New Transaction</h2>
            <div className="space-y-4">
              <div className="form-group">
                <label className="form-label">Merchant / Description</label>
                <input className="form-input" placeholder="Starbucks, etc." value={txForm.name} onChange={(e) => setTxForm({...txForm, name: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Amount</label>
                  <input className="form-input" type="number" placeholder="25.00" value={txForm.amount} onChange={(e) => setTxForm({...txForm, amount: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select className="form-input" value={txForm.category} onChange={(e) => setTxForm({...txForm, category: e.target.value})}>
                    <option>Food</option>
                    <option>Transport</option>
                    <option>Housing</option>
                    <option>Entertainment</option>
                  </select>
                </div>
              </div>
              <button className="btn btn-primary w-full mt-4" onClick={handleTxSubmit}>Record Transaction</button>
            </div>
          </div>
        </div>
      )}

      {/* Asset Modal */}
      {showAssetModal && (
        <div className="modal-overlay" onClick={() => setShowAssetModal(false)}>
          <div className="modal-card animate-fadeUp" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-6">Link New Asset</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Symbol</label>
                  <input className="form-input" placeholder="AAPL" value={assetForm.symbol} onChange={(e) => setAssetForm({...assetForm, symbol: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Asset Type</label>
                  <select className="form-input" value={assetForm.type} onChange={(e) => setAssetForm({...assetForm, type: e.target.value})}>
                    <option>Stock</option>
                    <option>Crypto</option>
                    <option>Commodity</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Quantity</label>
                  <input className="form-input" type="number" placeholder="10.5" value={assetForm.qty} onChange={(e) => setAssetForm({...assetForm, qty: e.target.value})} />
                </div>
                <div className="form-group">
                  <label className="form-label">Avg. Cost</label>
                  <input className="form-input" type="number" placeholder="150.00" value={assetForm.avgCost} onChange={(e) => setAssetForm({...assetForm, avgCost: e.target.value})} />
                </div>
              </div>
              <button className="btn btn-primary w-full mt-4" onClick={handleAssetSubmit}>Add to Portfolio</button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(8px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .modal-card {
          width: 100%;
          max-width: 440px;
          background: var(--bg-card);
          padding: 40px;
          border-radius: var(--radius-xl);
          border: 1px solid var(--border-subtle);
          box-shadow: var(--shadow-xl);
        }
      `}</style>
    </div>
  );
}

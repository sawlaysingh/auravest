'use client';
import AppLayout from '@/components/AppLayout';
import { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Filler, Tooltip } from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Filler, Tooltip);

const holdings = [
  { id: 'h1', symbol: 'AAPL', name: 'Apple Inc.',         type: 'Stock', qty: 15,   avgCost: 158.40, price: 182.63, color: '#6c8cff' },
  { id: 'h2', symbol: 'MSFT', name: 'Microsoft Corp.',    type: 'Stock', qty: 8,    avgCost: 290.10, price: 415.32, color: '#22d3a0' },
  { id: 'h3', symbol: 'BTC',  name: 'Bitcoin',            type: 'Crypto',qty: 0.42,  avgCost: 42000,  price: 67400,  color: '#f5c842' },
  { id: 'h4', symbol: 'VOO',  name: 'Vanguard S&P 500',  type: 'ETF',   qty: 12,   avgCost: 380.00, price: 501.20, color: '#f9546a' },
  { id: 'h5', symbol: 'ETH',  name: 'Ethereum',           type: 'Crypto',qty: 2.5,  avgCost: 2200,   price: 3580,   color: '#a78bfa' },
  { id: 'h6', symbol: 'QQQ',  name: 'Invesco QQQ Trust', type: 'ETF',   qty: 6,    avgCost: 350.00, price: 479.80, color: '#38bdf8' },
];

const perfMonths = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
const perfData = {
  labels: perfMonths,
  datasets: [{
    label: 'Portfolio Value',
    data: [118000, 124000, 131000, 126000, 135000, 142320],
    borderColor: 'rgba(108,140,255,1)',
    backgroundColor: 'rgba(108,140,255,0.08)',
    borderWidth: 2.5, fill: true, tension: 0.4,
    pointRadius: 4, pointBackgroundColor: '#6c8cff', pointBorderColor: '#0a0d14', pointBorderWidth: 2,
  }],
};

const chartOpts = {
  responsive: true, maintainAspectRatio: false,
  plugins: { legend: { display: false }, tooltip: { backgroundColor: '#1a2135', borderColor: '#ffffff18', borderWidth: 1, titleColor: '#eef0f8', bodyColor: '#8891b0', padding: 12 } },
  scales: {
    x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#8891b0', font: { size: 11 } } },
    y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#8891b0', font: { size: 11 }, callback: (v: string | number) => `$${(+v / 1000).toFixed(0)}k` } },
  },
};

const donutOpts = {
  responsive: true, maintainAspectRatio: false, cutout: '70%',
  plugins: {
    legend: { position: 'right' as const, labels: { color: '#8891b0', padding: 14, font: { size: 11 } } },
    tooltip: { backgroundColor: '#1a2135', borderColor: '#ffffff18', borderWidth: 1, padding: 12 },
  },
};

const defaultForm = { symbol: '', name: '', type: 'Stock', qty: '', avgCost: '', price: '' };

export default function PortfolioPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [assetList, setAssetList] = useState(holdings);

  const totalValue = assetList.reduce((a, h) => a + h.price * h.qty, 0);
  const totalCost  = assetList.reduce((a, h) => a + h.avgCost * h.qty, 0);
  const totalGain  = totalValue - totalCost;
  const gainPct    = totalCost > 0 ? ((totalGain / totalCost) * 100).toFixed(2) : '0.00';

  const handleSubmit = () => {
    if (!form.symbol || !form.qty || !form.avgCost) return;
    
    const qty = parseFloat(form.qty);
    const avgCost = parseFloat(form.avgCost);
    const price = form.price ? parseFloat(form.price) : avgCost; // Default price to cost if not provided
    
    const colors: Record<string, string> = { Stock: '#6c8cff', Crypto: '#f5c842', ETF: '#22d3a0', Other: '#a78bfa' };
    
    const newAsset = {
      id: `h${Date.now()}`,
      symbol: form.symbol.toUpperCase(),
      name: form.name || form.symbol.toUpperCase(),
      type: form.type,
      qty,
      avgCost,
      price,
      color: colors[form.type] || '#8891b0'
    };

    setAssetList(prev => [newAsset, ...prev]);
    setForm(defaultForm);
    setShowAddModal(false);
  };

  const dynamicAllocationData = {
    labels: assetList.map(h => h.symbol),
    datasets: [{
      data: assetList.map(h => +(h.price * h.qty).toFixed(0)),
      backgroundColor: assetList.map(h => h.color),
      borderWidth: 0, hoverOffset: 8,
    }],
  };

  return (
    <AppLayout>
      {/* ADD ASSET MODAL */}
      {showAddModal && (
        <div
          id="add-asset-overlay"
          onClick={(e) => e.target === e.currentTarget && setShowAddModal(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 'var(--z-modal)' as never,
            background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <div id="add-asset-modal" style={{
            background: 'var(--bg-card)', border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-xl)', padding: 'var(--space-8)',
            width: 480, boxShadow: 'var(--shadow-lg)',
            animation: 'fadeUp 0.25s var(--ease-smooth)',
          }}>
            {/* Modal Header */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'var(--space-6)' }}>
              <div>
                <h3 style={{ color:'var(--text-primary)', fontSize:18 }}>Add New Asset</h3>
                <p style={{ fontSize:12, color:'var(--text-muted)', marginTop:2 }}>Track a new position in your portfolio</p>
              </div>
              <button id="close-modal-btn" onClick={() => setShowAddModal(false)}
                style={{ background:'var(--bg-elevated)', border:'1px solid var(--border-default)', borderRadius:'var(--radius-md)', width:32, height:32, cursor:'pointer', color:'var(--text-secondary)', fontSize:16, display:'flex', alignItems:'center', justifyContent:'center' }}>
                ✕
              </button>
            </div>

            {/* Fields */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'var(--space-4)' }}>
              <div className="form-group">
                <label className="form-label">Symbol</label>
                <input id="asset-symbol" className="form-input mono" placeholder="AAPL, BTC..." value={form.symbol} onChange={e => setForm(f => ({ ...f, symbol: e.target.value }))} autoFocus />
              </div>
              <div className="form-group">
                <label className="form-label">Asset Type</label>
                <select id="asset-type" className="form-select" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                  <option value="Stock">Stock</option>
                  <option value="Crypto">Crypto</option>
                  <option value="ETF">ETF</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Asset Name</label>
              <input id="asset-name" className="form-input" placeholder="e.g. Apple Inc." value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </div>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'var(--space-4)' }}>
              <div className="form-group">
                <label className="form-label">Quantity</label>
                <input id="asset-qty" className="form-input mono" placeholder="0.00" type="number" step="any" value={form.qty} onChange={e => setForm(f => ({ ...f, qty: e.target.value }))} />
              </div>
              <div className="form-group">
                <label className="form-label">Avg. Cost (USD)</label>
                <input id="asset-cost" className="form-input mono" placeholder="0.00" type="number" step="0.01" value={form.avgCost} onChange={e => setForm(f => ({ ...f, avgCost: e.target.value }))} />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom:'var(--space-6)' }}>
              <label className="form-label">Current Price (Optional)</label>
              <input id="asset-price" className="form-input mono" placeholder="Leave empty to use cost" type="number" step="0.01" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
            </div>

            {/* Actions */}
            <div style={{ display:'flex', gap:'var(--space-3)' }}>
              <button className="btn btn-ghost" style={{ flex:1 }} onClick={() => setShowAddModal(false)}>Cancel</button>
              <button id="submit-asset-btn" className="btn btn-gold" style={{ flex:2 }} onClick={handleSubmit}>
                + Add to Portfolio
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="page-content">
        <div className="page-header flex items-center justify-between">
          <div>
            <h1 className="page-title">Investment Portfolio</h1>
            <p className="page-subtitle">Real-time performance across all your assets</p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn btn-ghost btn-sm" id="portfolio-import">↑ Import CSV</button>
            <button className="btn btn-gold btn-sm" id="portfolio-add-asset" onClick={() => setShowAddModal(true)}>+ Add Asset</button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid-4 animate-fadeUp" style={{ marginBottom: 'var(--space-6)' }}>
          <div className="card" id="port-total-value">
            <div className="card-title">Total Value</div>
            <div className="card-value mono" style={{ marginTop: 8 }}>${totalValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
            <div className="card-change positive" style={{ marginTop: 8 }}>▲ All time</div>
          </div>
          <div className="card" id="port-total-gain">
            <div className="card-title">Total Gain</div>
            <div className="card-value mono" style={{ marginTop: 8, color: 'var(--color-success)' }}>+${totalGain.toLocaleString('en-US', { maximumFractionDigits: 0 })}</div>
            <div className="card-change positive" style={{ marginTop: 8 }}>▲ {gainPct}% return</div>
          </div>
          <div className="card" id="port-today-change">
            <div className="card-title">Today's Change</div>
            <div className="card-value mono" style={{ marginTop: 8, color: 'var(--color-success)' }}>+$1,284</div>
            <div className="card-change positive" style={{ marginTop: 8 }}>▲ +0.91% today</div>
          </div>
          <div className="card" id="port-risk-score">
            <div className="card-title">Risk Score</div>
            <div className="card-value mono" style={{ marginTop: 8, color: 'var(--color-warning)' }}>72 <span style={{ fontSize: 14, fontWeight: 400, color: 'var(--text-muted)' }}>/100</span></div>
            <span className="badge badge-warning" style={{ marginTop: 8 }}>Moderate-High</span>
          </div>
        </div>

        {/* Charts */}
        <div className="grid-2 animate-fadeUp delay-100" style={{ marginBottom: 'var(--space-6)' }}>
          <div className="card">
            <div className="card-header">
              <div className="card-title">Portfolio Performance</div>
              <span className="badge badge-primary" style={{ fontSize: 10 }}>6 Months</span>
            </div>
            <div className="chart-container" style={{ height: 220 }}>
              <Line data={perfData} options={chartOpts} />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <div className="card-title">Asset Allocation</div>
              <span className="badge badge-muted" style={{ fontSize: 10 }}>{holdings.length} Positions</span>
            </div>
            <div className="chart-container" style={{ height: 220 }}>
              <Doughnut data={dynamicAllocationData} options={donutOpts} />
            </div>
          </div>
        </div>

        {/* Holdings Table */}
        <div className="card animate-fadeUp delay-200">
          <div className="card-header">
            <div className="card-title">Holdings</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <span className="badge badge-primary" style={{ fontSize: 10 }}>Stocks</span>
              <span className="badge badge-gold" style={{ fontSize: 10 }}>Crypto</span>
              <span className="badge badge-success" style={{ fontSize: 10 }}>ETFs</span>
            </div>
          </div>
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Asset</th>
                  <th>Type</th>
                  <th>Qty</th>
                  <th>Avg Cost</th>
                  <th>Current Price</th>
                  <th>Market Value</th>
                  <th style={{ textAlign: 'right' }}>Gain / Loss</th>
                </tr>
              </thead>
              <tbody>
                {assetList.map(h => {
                  const value = h.price * h.qty;
                  const cost  = h.avgCost * h.qty;
                  const gain  = value - cost;
                  const pct   = ((gain / cost) * 100).toFixed(2);
                  return (
                    <tr key={h.id} id={h.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 34, height: 34, borderRadius: 8, background: h.color + '22', border: `1px solid ${h.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 11, color: h.color }}>
                            {h.symbol.slice(0, 3)}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 13 }}>{h.symbol}</div>
                            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{h.name}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="badge" style={{ background: h.color + '22', color: h.color, fontSize: 10 }}>{h.type}</span>
                      </td>
                      <td className="mono" style={{ fontSize: 13 }}>{h.qty}</td>
                      <td className="mono" style={{ fontSize: 13 }}>${h.avgCost.toLocaleString()}</td>
                      <td className="mono" style={{ fontSize: 13 }}>${h.price.toLocaleString()}</td>
                      <td className="mono" style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 13 }}>${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}</td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
                          <span className="mono" style={{ fontSize: 13, fontWeight: 600, color: gain >= 0 ? 'var(--color-success)' : 'var(--color-danger)' }}>
                            {gain >= 0 ? '+' : ''}{gain.toLocaleString('en-US', { maximumFractionDigits: 0, style: 'currency', currency: 'USD' })}
                          </span>
                          <span className={`badge ${gain >= 0 ? 'badge-success' : 'badge-danger'}`} style={{ fontSize: 10 }}>
                            {gain >= 0 ? '▲' : '▼'} {Math.abs(+pct)}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

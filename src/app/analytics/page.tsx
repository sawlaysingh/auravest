'use client';
import AppLayout from '@/components/AppLayout';
import { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

const months12 = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
const baseValues = [142320, 148000, 155000, 151000, 160000, 168000, 165000, 175000, 183000, 179000, 188000, 197000];
const optimisticValues = baseValues.map(v => Math.round(v * 1.12));
const pessimisticValues = baseValues.map(v => Math.round(v * 0.88));

const forecastData = {
  labels: months12,
  datasets: [
    {
      label: 'Optimistic',
      data: optimisticValues,
      borderColor: 'rgba(34,211,160,0.5)', backgroundColor: 'rgba(34,211,160,0.05)',
      borderWidth: 1.5, borderDash: [4, 4], fill: false, tension: 0.4, pointRadius: 0,
    },
    {
      label: 'Base Case',
      data: baseValues,
      borderColor: 'rgba(108,140,255,1)', backgroundColor: 'rgba(108,140,255,0.1)',
      borderWidth: 2.5, fill: true, tension: 0.4, pointRadius: 4,
      pointBackgroundColor: '#6c8cff', pointBorderColor: '#0a0d14', pointBorderWidth: 2,
    },
    {
      label: 'Pessimistic',
      data: pessimisticValues,
      borderColor: 'rgba(249,84,106,0.5)', backgroundColor: 'rgba(249,84,106,0.05)',
      borderWidth: 1.5, borderDash: [4, 4], fill: false, tension: 0.4, pointRadius: 0,
    },
  ],
};

const spendForecast = {
  labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  datasets: [{
    label: 'Predicted Spend',
    data: [5100, 5350, 5200, 5800, 5600, 5400],
    borderColor: 'rgba(245,200,66,0.9)', backgroundColor: 'rgba(245,200,66,0.08)',
    borderWidth: 2, fill: true, tension: 0.4, pointRadius: 4,
    pointBackgroundColor: '#f5c842', pointBorderColor: '#0a0d14', pointBorderWidth: 2,
  }],
};

const chartOpts = (yFmt = (v: string | number) => `$${(+v / 1000).toFixed(0)}k`) => ({
  responsive: true, maintainAspectRatio: false,
  plugins: { legend: { display: false }, tooltip: { backgroundColor: '#1a2135', borderColor: '#ffffff18', borderWidth: 1, titleColor: '#eef0f8', bodyColor: '#8891b0', padding: 12 } },
  scales: {
    x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#8891b0', font: { size: 11 } } },
    y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#8891b0', font: { size: 11 }, callback: yFmt } },
  },
});

const alerts = [
  { id: 'alert-1', icon: '⚠️', color: 'var(--color-warning)', title: 'High Tech Concentration', desc: 'Tech stocks represent 58% of your portfolio — above the recommended 40% threshold.', action: 'Rebalance' },
  { id: 'alert-2', icon: '💡', color: 'var(--color-primary)', title: 'Tax-Loss Opportunity', desc: 'ARKK is down 12%. Selling may offset ~$1,800 in capital gains before year end.', action: 'View' },
  { id: 'alert-3', icon: '🚀', color: 'var(--color-success)', title: 'Savings Milestone Ahead', desc: 'At current pace, you\'ll hit your $300K net worth goal 2 months early.', action: 'View Goal' },
  { id: 'alert-4', icon: '📉', color: 'var(--color-danger)', title: 'Volatility Alert', desc: 'BTC has experienced 14% volatility this week. Consider reviewing your crypto allocation.', action: 'Review' },
];

const [qaHistory] = [
  [
    { role: 'ai', text: 'Hello! I\'m your Auravest AI. Ask me anything about your portfolio, spending, or financial strategy.' },
  ]
];

const riskMetrics = [
  { label: 'Overall Risk Score', value: 72, max: 100, color: 'var(--color-warning)', suffix: '/100' },
  { label: 'Portfolio Volatility', value: 62, max: 100, color: 'var(--color-danger)', suffix: '% σ' },
  { label: 'Diversification',     value: 58, max: 100, color: 'var(--color-primary)', suffix: '%' },
  { label: 'Liquidity Ratio',     value: 85, max: 100, color: 'var(--color-success)', suffix: '%' },
];

export default function AnalyticsPage() {
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState(qaHistory);

  const handleChat = () => {
    if (!chatInput.trim()) return;
    const user = chatInput.trim();
    setChatInput('');
    const replies: Record<string, string> = {
      'drop': 'A 10% market drop would reduce your portfolio by approximately $14,232, bringing it to ~$128,088. Your bonds (8%) would act as a buffer.',
      'rebalance': 'To rebalance, consider selling $25,000 of AAPL/MSFT and redistributing into international ETFs (e.g., VEU) and bonds (e.g., BND).',
      'risk': 'Your current risk score is 72/100 — Moderate-High. The main driver is 58% tech concentration and 15% crypto exposure.',
    };
    const key = Object.keys(replies).find(k => user.toLowerCase().includes(k)) ?? '';
    const aiReply = replies[key] ?? 'Great question! Based on your current portfolio composition, I\'d recommend reviewing your asset allocation quarterly and maintaining an emergency fund of 3–6 months of expenses.';
    setMessages(prev => [...prev, { role: 'user', text: user }, { role: 'ai', text: aiReply }]);
  };

  return (
    <AppLayout>
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">AI Analytics</h1>
          <p className="page-subtitle">Predictive insights, risk assessment, and personalized recommendations</p>
        </div>

        {/* Risk Metrics */}
        <div className="grid-4 animate-fadeUp" style={{ marginBottom: 'var(--space-6)' }}>
          {riskMetrics.map((m, i) => (
            <div key={m.label} className="card" style={{ animationDelay: `${i * 0.07}s` }}>
              <div className="card-title" style={{ marginBottom: 12 }}>{m.label}</div>
              <div className="mono" style={{ fontSize: '1.8rem', fontWeight: 700, color: m.color }}>
                {m.value}<span style={{ fontSize: 14, fontWeight: 400, color: 'var(--text-muted)' }}>{m.suffix}</span>
              </div>
              <div className="progress-track" style={{ marginTop: 12 }}>
                <div className="progress-fill" style={{ width: `${m.value}%`, background: m.color }} />
              </div>
            </div>
          ))}
        </div>

        {/* Forecast Charts */}
        <div className="grid-2 animate-fadeUp delay-100" style={{ marginBottom: 'var(--space-6)' }}>
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">Portfolio Forecast (12-Month)</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>Monte Carlo simulation — 3 scenarios</div>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <span className="badge badge-success" style={{ fontSize: 9 }}>Bull</span>
                <span className="badge badge-primary" style={{ fontSize: 9 }}>Base</span>
                <span className="badge badge-danger"  style={{ fontSize: 9 }}>Bear</span>
              </div>
            </div>
            <div className="chart-container" style={{ height: 240 }}>
              <Line data={forecastData} options={chartOpts()} />
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <div>
                <div className="card-title">Spending Forecast (6-Month)</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>Based on your historical patterns</div>
              </div>
              <span className="badge badge-gold" style={{ fontSize: 10 }}>AI Predicted</span>
            </div>
            <div className="chart-container" style={{ height: 240 }}>
              <Line data={spendForecast} options={chartOpts((v) => `$${(+v / 1000).toFixed(1)}k`)} />
            </div>
          </div>
        </div>

        {/* Alerts + AI Chat */}
        <div className="grid-2 animate-fadeUp delay-200">
          {/* Smart Alerts */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Smart Alerts</div>
              <span className="badge badge-danger" style={{ fontSize: 10 }}>4 Active</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {alerts.map(a => (
                <div key={a.id} id={a.id} style={{
                  display: 'flex', gap: 'var(--space-3)', padding: 'var(--space-4)',
                  borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-subtle)',
                }}>
                  <div style={{ fontSize: 20, flexShrink: 0 }}>{a.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>{a.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6 }}>{a.desc}</div>
                  </div>
                  <button className="btn btn-ghost btn-sm" style={{ flexShrink: 0, alignSelf: 'flex-start' }}>{a.action}</button>
                </div>
              ))}
            </div>
          </div>

          {/* AI Chat */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="card-header">
              <div>
                <div className="card-title">AI Financial Advisor</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Ask anything about your finances</div>
              </div>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--color-success)', boxShadow: '0 0 8px var(--color-success)' }} />
            </div>

            <div id="ai-chat-messages" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBottom: 'var(--space-4)', maxHeight: 320 }}>
              {messages.map((m, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 'var(--space-3)',
                  justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
                }}>
                  {m.role === 'ai' && (
                    <div style={{ width: 30, height: 30, borderRadius: 8, background: 'var(--color-primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>🤖</div>
                  )}
                  <div style={{
                    maxWidth: '80%', padding: '10px 14px', borderRadius: 12,
                    background: m.role === 'ai' ? 'var(--bg-elevated)' : 'var(--color-primary)',
                    color: m.role === 'ai' ? 'var(--text-primary)' : 'white',
                    fontSize: 13, lineHeight: 1.6,
                    borderBottomLeftRadius: m.role === 'ai' ? 4 : 12,
                    borderBottomRightRadius: m.role === 'user' ? 4 : 12,
                  }}>{m.text}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <input
                id="ai-chat-input"
                className="form-input"
                placeholder='e.g. "What if the market drops 10%?"'
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleChat()}
                style={{ flex: 1 }}
              />
              <button className="btn btn-primary btn-sm" id="ai-chat-send" onClick={handleChat}>Send</button>
            </div>
            <div style={{ marginTop: 8, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {['What is my risk?', 'How to rebalance?', 'Market drop impact?'].map(q => (
                <button key={q} onClick={() => { setChatInput(q); }} className="btn btn-ghost" style={{ fontSize: 10, padding: '4px 10px' }}>{q}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

'use client';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import AppLayout from '@/components/AppLayout';

const notificationSettings = [
  { id: 'n1', label: 'Budget Alerts',         desc: 'Notify when approaching budget limits', enabled: true  },
  { id: 'n2', label: 'Portfolio Updates',      desc: 'Daily portfolio performance summary',   enabled: true  },
  { id: 'n3', label: 'AI Insights',            desc: 'Weekly personalized recommendations',   enabled: true  },
  { id: 'n4', label: 'Tax Reminders',          desc: 'Upcoming tax deadlines and actions',    enabled: false },
  { id: 'n5', label: 'Goal Milestones',        desc: 'Celebrate when you hit a goal target',  enabled: true  },
  { id: 'n6', label: 'Leaderboard Updates',    desc: 'Rank changes and challenge alerts',     enabled: false },
];

const connectedAccounts = [
  { id: 'acc1', name: 'Chase Checking',  type: 'Bank',    icon: '🏦', balance: '$12,840', status: 'Connected',    statusColor: 'var(--color-success)' },
  { id: 'acc2', name: 'Fidelity IRA',    type: 'Broker',  icon: '📊', balance: '$88,420', status: 'Connected',    statusColor: 'var(--color-success)' },
  { id: 'acc3', name: 'Coinbase',        type: 'Crypto',  icon: '🪙', balance: '$34,200', status: 'Connected',    statusColor: 'var(--color-success)' },
  { id: 'acc4', name: 'Amex Gold Card',  type: 'Credit',  icon: '💳', balance: '-$2,340', status: 'Reconnect',    statusColor: 'var(--color-warning)' },
];

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div
      onClick={() => onChange(!checked)}
      style={{
        width: 42, height: 24, borderRadius: 12,
        background: checked ? 'var(--color-primary)' : 'var(--bg-elevated)',
        border: `1px solid ${checked ? 'var(--color-primary)' : 'var(--border-default)'}`,
        cursor: 'pointer', position: 'relative',
        transition: 'all 0.25s ease', flexShrink: 0,
      }}
    >
      <div style={{
        position: 'absolute', top: 3, left: checked ? 20 : 3,
        width: 16, height: 16, borderRadius: '50%', background: 'white',
        transition: 'left 0.25s ease', boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
      }} />
    </div>
  );
}

export default function SettingsPage() {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState(notificationSettings);
  const [currency, setCurrency] = useState('USD');
  const [saved, setSaved] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [accountList, setAccountList] = useState(connectedAccounts);
  const [linking, setLinking] = useState(false);

  const userName = session?.user?.name || session?.user?.email?.split('@')[0] || 'Member';
  const userEmail = session?.user?.email || 'user@example.com';
  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const toggleNotification = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, enabled: !n.enabled } : n));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleLinkSuccess = () => {
    setLinking(true);
    setTimeout(() => {
      const newAcc = { id: `acc${Date.now()}`, name: 'Bank of America', type: 'Bank', icon: '🏦', balance: '$2,450', status: 'Connected', statusColor: 'var(--color-success)' };
      setAccountList(prev => [newAcc, ...prev]);
      setLinking(false);
      setShowLinkModal(false);
    }, 1500);
  };

  return (
    <AppLayout>
      {/* LINK ACCOUNT MODAL */}
      {showLinkModal && (
        <div id="link-modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowLinkModal(false)} style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="card" style={{ width: 400, padding: 'var(--space-8)', textAlign: 'center', animation: 'fadeUp 0.3s ease-out' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🏦</div>
            <h3 style={{ marginBottom: 8 }}>Link with Auravest</h3>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 24 }}>Connect your bank safely with bank-grade encryption</p>
            
            {linking ? (
              <div style={{ padding: '20px 0' }}>
                <div className="spinner" style={{ margin: '0 auto 16px' }} />
                <p style={{ fontSize: 12, color: 'var(--color-primary)', fontWeight: 600 }}>Connecting to Bank of America...</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <button className="btn btn-primary" onClick={handleLinkSuccess} style={{ height: 48 }}>Continue</button>
                <button className="btn btn-ghost" onClick={() => setShowLinkModal(false)}>Cancel</button>
              </div>
            )}
            <div style={{ marginTop: 24, fontSize: 10, color: 'var(--text-muted)' }}>
              By clicking continue, you agree to our terms of service and privacy policy regarding financial data sharing.
            </div>
          </div>
        </div>
      )}
      <div className="page-content">
        <div className="page-header flex items-center justify-between">
          <div>
            <h1 className="page-title">Settings</h1>
            <p className="page-subtitle">Manage your profile, accounts, and preferences</p>
          </div>
          <button className="btn btn-gold" id="save-settings-btn" onClick={handleSave}>
            {saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)' }}>
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>

            {/* Profile */}
            <div className="card animate-fadeUp" id="settings-profile">
              <div className="card-title" style={{ marginBottom: 'var(--space-5)' }}>Profile</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--accent-gold), var(--color-primary))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24, fontWeight: 800, color: '#0a0d14',
                  boxShadow: 'var(--shadow-gold)',
                }}>{initials}</div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 16 }}>{userName}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Pro Plan · Member since Mar 2026</div>
                  <button className="btn btn-ghost btn-sm" id="change-avatar-btn" style={{ marginTop: 6 }}>Change Avatar</button>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input id="settings-name" className="form-input" defaultValue={userName} />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input id="settings-email" className="form-input" defaultValue={userEmail} type="email" />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Currency</label>
                <select id="settings-currency" className="form-select" value={currency} onChange={e => setCurrency(e.target.value)}>
                  <option value="USD">USD — US Dollar</option>
                  <option value="EUR">EUR — Euro</option>
                  <option value="GBP">GBP — British Pound</option>
                  <option value="SGD">SGD — Singapore Dollar</option>
                  <option value="MYR">MYR — Malaysian Ringgit</option>
                  <option value="JPY">JPY — Japanese Yen</option>
                </select>
              </div>
            </div>

            {/* Security */}
            <div className="card animate-fadeUp delay-100" id="settings-security">
              <div className="card-title" style={{ marginBottom: 'var(--space-5)' }}>Security</div>
              <div className="form-group">
                <label className="form-label">Current Password</label>
                <input id="settings-cur-pass" className="form-input" type="password" placeholder="••••••••" />
              </div>
              <div className="form-group">
                <label className="form-label">New Password</label>
                <input id="settings-new-pass" className="form-input" type="password" placeholder="••••••••" />
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: 24 }}>🔐</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>Two-Factor Authentication</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Add an extra layer of security</div>
                </div>
                <button className="btn btn-primary btn-sm" id="enable-2fa-btn">Enable</button>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>

            {/* Connected Accounts */}
            <div className="card animate-fadeUp delay-100" id="settings-accounts">
              <div className="card-header">
                <div className="card-title">Connected Accounts</div>
                <button className="btn btn-ghost btn-sm" id="link-account-btn" onClick={() => setShowLinkModal(true)}>+ Link Account</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {accountList.map(acc => (
                  <div key={acc.id} id={acc.id} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontSize: 24, width: 40, textAlign: 'center' }}>{acc.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{acc.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{acc.type} · {acc.balance}</div>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 600, color: acc.statusColor }}>{acc.status}</span>
                    <button className="btn btn-ghost btn-sm" style={{ fontSize: 11, padding: '4px 10px' }}>Manage</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="card animate-fadeUp delay-200" id="settings-notifications">
              <div className="card-title" style={{ marginBottom: 'var(--space-5)' }}>Notifications</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {notifications.map(n => (
                  <div key={n.id} id={n.id} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{n.label}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{n.desc}</div>
                    </div>
                    <Toggle checked={n.enabled} onChange={() => toggleNotification(n.id)} />
                  </div>
                ))}
              </div>
            </div>

            {/* Danger Zone */}
            <div className="card animate-fadeUp delay-300" id="settings-danger" style={{ border: '1px solid var(--color-danger-glow)', background: 'rgba(249,84,106,0.03)' }}>
              <div className="card-title" style={{ color: 'var(--color-danger)', marginBottom: 'var(--space-4)' }}>Danger Zone</div>
              <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                <button className="btn btn-ghost btn-sm" id="export-data-btn" style={{ flex: 1 }}>Export All Data</button>
                <button className="btn btn-danger btn-sm" id="delete-account-btn" style={{ flex: 1 }}>Delete Account</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

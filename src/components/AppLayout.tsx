'use client';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

const navItems = [
  { href: '/dashboard',  icon: '⬡',  label: 'Dashboard',  id: 'nav-dashboard'  },
  { href: '/budget',     icon: '💳',  label: 'Budget',     id: 'nav-budget'     },
  { href: '/portfolio',  icon: '📊',  label: 'Portfolio',  id: 'nav-portfolio'  },
  { href: '/analytics',  icon: '🤖',  label: 'Analytics',  id: 'nav-analytics'  },
  { href: '/tax',        icon: '🧾',  label: 'Tax Center', id: 'nav-tax'        },
  { href: '/goals',      icon: '🎯',  label: 'Goals',      id: 'nav-goals'      },
  { href: '/learn',      icon: '🎮',  label: 'Learn',      id: 'nav-learn',     badge: 'NEW' },
  { href: '/settings',   icon: '⚙️',  label: 'Settings',   id: 'nav-settings'   },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const { data: session } = useSession();

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
  };

  const userName = session?.user?.name || session?.user?.email?.split('@')[0] || 'Member';
  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-mark">A</div>
          <span className="sidebar-logo-text">Auravest</span>
        </div>

        <nav className="sidebar-nav">
          <div className="sidebar-section-label">Main</div>
          {navItems.slice(0, 6).map((item) => (
            <Link key={item.href} href={item.href} id={item.id}
              className={`sidebar-link ${pathname === item.href ? 'active' : ''}`}>
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              <span>{item.label}</span>
              {item.badge && <span className="sidebar-badge">{item.badge}</span>}
            </Link>
          ))}
          <div className="sidebar-section-label" style={{ marginTop: 8 }}>Growth</div>
          {navItems.slice(6).map((item) => (
            <Link key={item.href} href={item.href} id={item.id}
              className={`sidebar-link ${pathname === item.href ? 'active' : ''}`}>
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              <span>{item.label}</span>
              {item.badge && <span className="sidebar-badge">{item.badge}</span>}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button onClick={toggleTheme} className="btn btn-ghost btn-sm" id="theme-toggle"
            style={{ width: '100%', marginBottom: 'var(--space-3)', justifyContent: 'flex-start', gap: 'var(--space-3)' }}>
            <span>{theme === 'dark' ? '☀️' : '🌙'}</span>
            <span style={{ fontSize: 12 }}>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          <div className="sidebar-user">
            <div className="sidebar-avatar">{initials}</div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{userName}</div>
              <div className="sidebar-user-role">Pro Plan ✦</div>
            </div>
            <button 
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="btn btn-ghost btn-sm"
              title="Sign Out"
              style={{ marginLeft: 'auto', padding: 4, width: 'fit-content' }}
            >
              🚪
            </button>
          </div>
        </div>
      </aside>

      <main className="app-main">{children}</main>
    </div>
  );
}

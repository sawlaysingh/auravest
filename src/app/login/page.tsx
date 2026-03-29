'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get('registered');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password. Please try again.');
        setIsLoading(false);
      } else {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-overlay" />
      <div className="auth-container animate-fadeUp">
        {/* Branding */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
          <div className="nav-logo" style={{ fontSize: 32, fontWeight: 900, justifyContent: 'center' }}>
            A<span style={{ color: 'var(--accent-gold)' }}>V</span>
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 800, marginTop: 12, color: 'var(--text-primary)' }}>Welcome Back</h1>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>Access your private financial oasis</p>
        </div>

        {/* Status Messages */}
        {registered && (
          <div className="badge badge-success" style={{ width: '100%', padding: '10px 14px', borderRadius: 8, fontSize: 12, marginBottom: 16, textAlign: 'center', display: 'block' }}>
            Account created! Please sign in.
          </div>
        )}

        {error && (
          <div className="badge badge-danger" style={{ width: '100%', padding: '10px 14px', borderRadius: 8, fontSize: 12, marginBottom: 16, textAlign: 'center', display: 'block', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            ⚠️ {error}
          </div>
        )}

        {/* Social Logins */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
          <button 
            type="button"
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            className="btn btn-ghost" 
            style={{ width: '100%', height: 44, fontSize: 13, gap: 10 }}
          >
             <img src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" alt="Google" style={{ width: 18, height: 18 }} />
             Sign in with Google
          </button>
          <button 
            type="button"
            onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
            className="btn btn-ghost" 
            style={{ width: '100%', height: 44, fontSize: 13, gap: 10 }}
          >
             <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" style={{ width: 18, height: 18, filter: 'invert(1)' }} />
             Sign in with GitHub
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 'var(--space-6)' }}>
          <div style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }} />
          <span style={{ fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>or</span>
          <div style={{ flex: 1, height: 1, background: 'var(--border-subtle)' }} />
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label" style={{ fontSize: 12, marginBottom: 6 }}>Email Address</label>
            <input 
              className="form-input" 
              type="email" 
              placeholder="jane@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: 4 }}>
            <label className="form-label" style={{ fontSize: 12, marginBottom: 6 }}>Password</label>
            <input 
              className="form-input" 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 'var(--space-6)' }}>
            <Link href="#" style={{ fontSize: 11, color: 'var(--accent-gold)' }}>Forgot Password?</Link>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', height: 46, fontSize: 14, fontWeight: 700 }}
            disabled={isLoading}
          >
            {isLoading ? <div className="spinner" style={{ width: 20, height: 20, border: '2px solid rgba(255,255,255,0.2)', borderTopColor: 'white' }} /> : 'Access Account'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-muted)', marginTop: 'var(--space-8)' }}>
          Don&apos;t have an account? <Link href="/register" style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>Create One</Link>
        </p>
      </div>

      <style jsx>{`
        .auth-page {
          min-height: 100vh;
          width: 100%;
          background: #0a0d14;
          background-image: 
            radial-gradient(circle at 0% 0%, rgba(108, 140, 255, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 100% 100%, rgba(245, 200, 66, 0.08) 0%, transparent 40%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        .auth-overlay {
          position: absolute;
          inset: 0;
          background-image: url('https://www.transparenttextures.com/patterns/cubes.png');
          opacity: 0.03;
          pointer-events: none;
        }
        .auth-container {
          width: 440px;
          background: rgba(26, 33, 53, 0.6);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 32px;
          padding: 60px 48px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          position: relative;
          z-index: 1;
        }
        .spinner {
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

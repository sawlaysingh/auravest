'use client';

import { useState } from 'react';
import Link from 'next/link';
import { registerUser } from './actions';

export default function RegisterPage() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    setError('');
    const result = await registerUser(formData);
    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-overlay" />
      <div className="auth-container animate-fadeUp">
        {/* Branding */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
          <div className="nav-logo" style={{ fontSize: 32, fontWeight: 900, justifyContent: 'center' }}>
            A<span style={{ color: 'var(--accent-gold)' }}>V</span>
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 800, marginTop: 12, color: 'var(--text-primary)' }}>Create Your Oasis</h1>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>Begin your journey to financial freedom</p>
        </div>

        {/* Credentials Form */}
        <form action={handleSubmit}>
          {error && (
            <div className="badge badge-danger" style={{ width: '100%', padding: '10px 14px', borderRadius: 8, fontSize: 12, marginBottom: 16, textAlign: 'center', display: 'block' }}>
              ⚠️ {error}
            </div>
          )}

          <div className="form-group">
            <label className="form-label" style={{ fontSize: 11, marginBottom: 4 }}>Full Name</label>
            <input 
              className="form-input" 
              name="name"
              type="text" 
              placeholder="Jane Doe"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontSize: 11, marginBottom: 4 }}>Email Address</label>
            <input 
              className="form-input" 
              name="email"
              type="email" 
              placeholder="jane@example.com"
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: 'var(--space-6)' }}>
            <label className="form-label" style={{ fontSize: 11, marginBottom: 4 }}>Create Password</label>
            <input 
              className="form-input" 
              name="password"
              type="password" 
              placeholder="••••••••"
              required
            />
            <p style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 8 }}>
              At least 8 characters, 1 number, and 1 symbol.
            </p>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', height: 46, fontSize: 14, fontWeight: 700 }}
            disabled={isLoading}
          >
            {isLoading ? <div className="spinner" style={{ width: 20, height: 20, border: '2px solid rgba(255,255,255,0.2)', borderTopColor: 'white' }} /> : 'Initialize Portfolio'}
          </button>
        </form>

        <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-muted)', marginTop: 'var(--space-8)' }}>
          Already have an account? <Link href="/login" style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>Sign In</Link>
        </p>
      </div>

      <style jsx>{`
        .auth-page {
          min-height: 100vh;
          width: 100%;
          background: #0a0d14;
          background-image: 
            radial-gradient(circle at 100% 0%, rgba(108, 140, 255, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 0% 100%, rgba(245, 200, 66, 0.08) 0%, transparent 40%);
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


import React, { FormEvent, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useLocation, Link } from 'react-router-dom'

export default function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const location = useLocation() as any
  const from = location.state?.from?.pathname || '/books'

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!email || !password) {
      setError('Email and password are required')
      return
    }
    setLoading(true)
    try {
      await login(email, password)
    } catch (err: any) {
  setError(err?.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="auth-page">
      <div className="auth-card">
        <header className="auth-header">
          <h2 className="auth-title">Welcome back</h2>
          <p className="auth-sub">Sign in to continue to your account</p>
        </header>

        {location.state?.from && <div className="toast">Please login to access: <strong>{from}</strong></div>}

        <form onSubmit={onSubmit} className="form">
          <label className="label" htmlFor="email">Email</label>
          <input id="email" className="input" placeholder="you@example.com" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value)} type="email" autoComplete="email" />

          <label className="label" htmlFor="password">Password</label>
          <input id="password" className="input" placeholder="Enter your password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value)} type="password" autoComplete="current-password" />

          <button className="primary" type="submit" disabled={loading}>{loading ? 'Processing...' : 'Sign in'}</button>
          {error && <p className="error">{error}</p>}
        </form>

        <div className="auth-footer">
          <span>Don't have an account?</span>
          <Link to="/register" className="ghost">Create account</Link>
        </div>
      </div>
    </div>
  )
}

const styles: Record<string, any> = {
  pageModern: { minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, background: 'linear-gradient(180deg,#f8fafc 0%, #eef2ff 60%)' },
  cardModern: { width: 'min(520px, 96%)', padding: 28, borderRadius: 14, boxShadow: '0 10px 30px rgba(2,6,23,0.08)', background: '#ffffff' },
  header: { marginBottom: 6, textAlign: 'center' },
  logo: { fontWeight: 700, color: '#111827', marginBottom: 6 },
  title: { margin: 0, fontSize: 22, color: '#0f172a' },
  subtitle: { marginTop: 6, color: '#475569', fontSize: 13 },
  toast: { margin: '12px 0', padding: 10, background: '#f1f5f9', borderRadius: 8, color: '#334155', fontSize: 13 },
  form: { display: 'grid', gap: 10, marginTop: 14 },
  label: { fontSize: 13, color: '#475569', marginBottom: 6 },
  inputModern: { padding: '12px 14px', borderRadius: 10, border: '1px solid #e6eef8', outline: 'none', fontSize: 14, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6)' },
  primaryButton: { marginTop: 6, padding: '12px 14px', borderRadius: 10, color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 700, background: 'linear-gradient(90deg,#2563eb,#4f46e5)' },
  error: { color: '#dc2626', marginTop: 8, textAlign: 'center' },
  footerModern: { display: 'flex', justifyContent: 'center', gap: 12, alignItems: 'center', marginTop: 16 },
  ghostButton: { padding: '8px 12px', borderRadius: 8, background: 'transparent', border: '1px solid #e6eef8', color: '#2563eb', textDecoration: 'none' }
}

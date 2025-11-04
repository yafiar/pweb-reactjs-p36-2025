
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
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome back</h2>
  <p style={{ marginTop: 0, color: '#555' }}>Sign in to continue to your account.</p>
  {location.state?.from && <p style={{ opacity: 0.8, fontSize: 13 }}>Please login to access: <strong>{from}</strong></p>}

        <form onSubmit={onSubmit} style={styles.form}>
          <input style={styles.input} placeholder="Email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value)} type="email" />
          <input style={styles.input} placeholder="Password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value)} type="password" />
          <button style={{ ...styles.button, background: '#2563eb' }} type="submit" disabled={loading}>{loading ? 'Processing...' : 'Login'}</button>
          {error && <p style={{ color: 'crimson', textAlign: 'center' }}>{error}</p>}
        </form>

        <div style={styles.footer}>
          <span style={{ color: '#555' }}>Don't have an account?</span>
          <Link to="/register" style={styles.linkButton}>Register</Link>
        </div>
      </div>
    </div>
  )
}

const styles: Record<string, any> = {
  page: { display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px 16px' },
  card: { width: 380, padding: 24, borderRadius: 12, boxShadow: '0 6px 18px rgba(15,23,42,0.08)', background: '#fff' },
  title: { margin: 0, marginBottom: 6 },
  form: { display: 'grid', gap: 12, marginTop: 12 },
  input: { padding: '10px 12px', borderRadius: 8, border: '1px solid #e5e7eb', outline: 'none', fontSize: 14 },
  button: { padding: '10px 12px', borderRadius: 8, color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 600 },
  footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  linkButton: { padding: '8px 12px', background: 'transparent', border: '1px solid #2563eb', color: '#2563eb', borderRadius: 8, textDecoration: 'none', marginLeft: 8 }
}

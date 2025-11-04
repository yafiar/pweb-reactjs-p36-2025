
import React, { FormEvent, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate, useLocation, Link } from 'react-router-dom'

export default function Register() {
  const { register } = useAuth()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const location = useLocation() as any

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!username.trim() || !email || !password) {
      setError('Username, email and password are required')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    setLoading(true)
    try {
      await register(email, password, username.trim())
      // provider will navigate to /books on success
    } catch (err: any) {
  setError(err?.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create an account</h2>
        <p style={{ marginTop: 0, color: '#555' }}>Register a new account to get started.</p>

        <form onSubmit={onSubmit} style={styles.form}>
          <input style={styles.input} placeholder="Username" value={username} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setUsername(e.target.value)} />
          <input style={styles.input} placeholder="Email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value)} type="email" />
          <input style={styles.input} placeholder="Password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value)} type="password" />
          <button style={{ ...styles.button, background: '#059669' }} type="submit" disabled={loading}>{loading ? 'Memproses...' : 'Register'}</button>
          {error && <p style={{ color: 'crimson', textAlign: 'center' }}>{error}</p>}
        </form>

        <div style={styles.footer}>
          <span style={{ color: '#555' }}>Already have an account?</span>
          <Link to="/login" style={styles.linkButton}>Login</Link>
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
  linkButton: { padding: '8px 12px', background: 'transparent', border: '1px solid #059669', color: '#059669', borderRadius: 8, textDecoration: 'none', marginLeft: 8 }
}

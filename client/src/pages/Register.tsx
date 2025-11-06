
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
  const [success, setSuccess] = useState<string | null>(null)
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
      const res = await register(email, password, username.trim())
      // if server returned a token we are already logged in (AuthContext stores it).
      if (res?.token) {
        const to = location.state?.from?.pathname || '/books'
        navigate(to, { replace: true })
        return
      }

      // otherwise show a success message and redirect to login
      setSuccess('Account created successfully.')
      setTimeout(() => {
        navigate('/login', { replace: true })
      }, 900)
    } catch (err: any) {
  setError(err?.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <header className="auth-header">
          <h2 className="auth-title">Create an account</h2>
          <p className="auth-sub">Register a new account to get started</p>
        </header>

        <form onSubmit={onSubmit} className="form">
          <label className="label" htmlFor="username">Username</label>
          <div className="input-group">
            <span className="input-icon">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-5 0-9 2.5-9 5v1h18v-1c0-2.5-4-5-9-5z" />
              </svg>
            </span>
            <input id="username" className="input with-icon" placeholder="Choose a username" value={username} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setUsername(e.target.value)} />
          </div>

          <label className="label" htmlFor="email">Email</label>
          <div className="input-group">
            <span className="input-icon">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M2 6.5A2.5 2.5 0 014.5 4h15A2.5 2.5 0 0122 6.5v11A2.5 2.5 0 0119.5 20h-15A2.5 2.5 0 012 17.5v-11zM4.5 6A.5.5 0 004 6.5v.637l7 4.375 7-4.375V6.5a.5.5 0 00-.5-.5h-13z" />
              </svg>
            </span>
            <input id="email" className="input with-icon" placeholder="you@example.com" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value)} type="email" />
          </div>

          <label className="label" htmlFor="password">Password</label>
          <div className="input-group">
            <span className="input-icon">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M17 8h-1V7a4 4 0 10-8 0v1H7a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2v-7a2 2 0 00-2-2zM9 7a2 2 0 114 0v1H9V7z" />
              </svg>
            </span>
            <input id="password" className="input with-icon" placeholder="At least 6 characters" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value)} type="password" />
          </div>

          <button className="full-btn" type="submit" disabled={loading} aria-disabled={loading}>{loading ? 'Creating account...' : 'Create account'}</button>
          {error && <p className="error">{error}</p>}
          {success && <div className="toast" style={{ background: '#ecfdf5', color: '#065f46' }}>{success}</div>}
        </form>

        <div className="auth-footer">
          <span>Already have an account?</span>
          <Link to="/login" className="ghost">Sign in</Link>
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

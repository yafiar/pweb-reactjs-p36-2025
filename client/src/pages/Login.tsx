
import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useLocation, Link, useNavigate } from 'react-router-dom'

type FormState = { email: string; password: string; remember: boolean }
type Errors = { email?: string; password?: string; global?: string }

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation() as any
  const from = location.state?.from?.pathname || '/books'

  const [form, setForm] = useState<FormState>({ email: '', password: '', remember: true })
  const [errors, setErrors] = useState<Errors>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)

  const validate = () => {
    const e: Errors = {}
    if (!emailRegex.test(form.email)) e.email = 'Enter a valid email'
    // Server expects minimum 6 characters for password; validate client-side as well
    if (form.password.length < 6) e.password = 'Minimum 6 characters'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    setErrors({})
    if (!validate()) return
    setLoading(true)
    try {
      const res = await login(form.email, form.password)
      setSuccess('Logged in! Welcome back')
      // small delay so user sees the success toast
      setTimeout(() => {
        navigate(from, { replace: true })
      }, 400)
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || 'Login failed'
      setErrors({ global: msg })
    } finally {
      setLoading(false)
      setTimeout(() => setSuccess(null), 2000)
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
        {success && <div className="toast" style={{ background: '#ecfdf5', color: '#065f46' }}>{success}</div>}

        <form onSubmit={onSubmit} className="form">
          <div className="input-group">
            <span className="input-icon" aria-hidden>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 6.5A2.5 2.5 0 014.5 4h15A2.5 2.5 0 0122 6.5v11A2.5 2.5 0 0119.5 20h-15A2.5 2.5 0 012 17.5v-11zM4.5 6A.5.5 0 004 6.5v.637l7 4.375 7-4.375V6.5a.5.5 0 00-.5-.5h-13z" />
              </svg>
            </span>
            <input
              id="email"
              className="input with-icon"
              placeholder="you@company.com"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              type="email"
              autoComplete="email"
            />
          </div>
          {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}

          <div className="input-group">
            <span className="input-icon" aria-hidden>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 8h-1V7a4 4 0 10-8 0v1H7a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2v-7a2 2 0 00-2-2zM9 7a2 2 0 114 0v1H9V7z" />
              </svg>
            </span>
            <input
              id="password"
              className="input with-icon"
              placeholder="********"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              type="password"
              autoComplete="current-password"
            />
          </div>
          {errors.password && <p className="text-xs text-red-600">{errors.password}</p>}

          <div className="row-between">
            <label className="remember">
              <input
                type="checkbox"
                className="checkbox"
                checked={form.remember}
                onChange={(e) => setForm((f) => ({ ...f, remember: e.target.checked }))}
              />{' '}
              Remember me
            </label>
            <Link to="#" className="small-link">Forgot password?</Link>
          </div>

          <button className="full-btn" type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'} &nbsp;→</button>

          {errors.global && <p className="error">{errors.global}</p>}
        </form>

        <div className="auth-footer">
          <span>Don't have an account?</span>
          <Link to="/register" className="ghost">Create account</Link>
        </div>
      </div>
    </div>
  )
}

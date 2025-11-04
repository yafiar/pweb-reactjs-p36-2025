
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth()
  const location = useLocation()
  const isAuthPage = ['/login', '/register'].includes(location.pathname)
  if (isAuthPage) return null

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, padding: '12px 16px', background: '#f8fafc', borderRadius: 8 }}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <Link to="/books" style={{ fontWeight: 600, color: '#111827' }}>Books</Link>
        <Link to="/transactions" style={{ color: '#374151' }}>Transactions</Link>
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        {isAuthenticated && user ? (
          <>
            <span style={{ opacity: 0.9, fontWeight: 600 }}>{(user as any).username || user.email}</span>
            <button onClick={logout} style={{ padding: '6px 10px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer' }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: '#2563eb' }}>Login</Link>
            <Link to="/register" style={{ color: '#059669' }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}

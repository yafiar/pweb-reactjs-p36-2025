
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth()
  const location = useLocation()
  const isAuthPage = ['/login', '/register'].includes(location.pathname)
  if (isAuthPage) return null

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/books">Books</Link>
        <Link to="/transactions">Transactions</Link>
      </div>
      <div className="nav-right">
        {isAuthenticated && user ? (
          <>
            <span className="user-badge">{(user as any).username || user.email}</span>
            <button onClick={logout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}

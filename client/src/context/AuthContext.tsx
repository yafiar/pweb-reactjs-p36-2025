
import React, { createContext, useContext, useMemo, useState } from 'react'
import { api } from '../lib/api'
import { AuthUser, getUser, setUser, isAuthenticated as isAuth, setToken, removeToken, removeUser } from '../lib/auth'
import { useNavigate } from 'react-router-dom'

type AuthContextType = {
  user: AuthUser | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<any>
  register: (email: string, password: string, username?: string) => Promise<any>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<AuthUser | null>(getUser())
  const navigate = useNavigate()

  const login = async (email: string, password: string) => {
    const res = await api.post('/auth/login', { email, password })
    const { token, user } = res.data
    setToken(token)
    if (user) {
      setUser(user)
      setUserState(user)
    }
    return res.data
  }

  const register = async (email: string, password: string, username?: string) => {
    const payload: any = { email, password }
    if (username) payload.username = username
    const res = await api.post('/auth/register', payload)
    const { token, user } = res.data || {}
    if (token) {
      setToken(token)
      if (user) {
        setUser(user)
        setUserState(user)
      }
    }
    return res.data
  }

  const logout = () => {
    removeToken()
    removeUser()
    setUserState(null)
    navigate('/login', { replace: true })
  }

  const value = useMemo(() => ({
    user,
    isAuthenticated: isAuth(),
    login,
    register,
    logout
  }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

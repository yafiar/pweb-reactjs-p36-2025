
import axios from 'axios'
import { getToken } from './auth'

export const api = axios.create({
  // Server runs on http://localhost:3000 and exposes routes like /auth, /books, /transactions
  // Keep VITE_API_BASE_URL override for deployment if needed.
  baseURL: ((import.meta as any)?.env?.VITE_API_BASE_URL) || 'http://localhost:3000',
})

api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})


export type AuthUser = { id?: string; username?: string; email: string }
const TOKEN_KEY = 'token'
const USER_KEY = 'user'

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}
export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token)
}
export function removeToken() {
  localStorage.removeItem(TOKEN_KEY)
}
export function getUser(): AuthUser | null {
  const raw = localStorage.getItem(USER_KEY)
  return raw ? JSON.parse(raw) as AuthUser : null
}
export function setUser(user: AuthUser) {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}
export function removeUser() {
  localStorage.removeItem(USER_KEY)
}
export function isAuthenticated(): boolean {
  return !!getToken()
}

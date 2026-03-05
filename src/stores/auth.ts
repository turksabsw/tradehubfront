import Alpine from 'alpinejs'

export interface User {
  email: string
  name: string
}

const AUTH_KEY = 'tradehub_auth'

Alpine.store('auth', {
  user: null as User | null,
  token: localStorage.getItem(AUTH_KEY),

  get isLoggedIn(): boolean {
    return (this as any).token !== null
  },

  init() {
    if ((this as any).token) {
      try {
        (this as any).user = JSON.parse((this as any).token) as User
      } catch {
        (this as any).user = null
      }
    }
  },

  login(email: string) {
    const name = email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    const user: User = { email, name }
    ;(this as any).token = JSON.stringify(user)
    ;(this as any).user = user
    localStorage.setItem(AUTH_KEY, JSON.stringify(user))
  },

  logout() {
    (this as any).token = null
    ;(this as any).user = null
    localStorage.removeItem(AUTH_KEY)
    window.location.href = '/pages/auth/login.html'
  },
})

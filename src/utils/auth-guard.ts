export function requireAuth() {
  const token = localStorage.getItem('tradehub_auth')
  if (!token) {
    window.location.href = '/pages/auth/login.html'
  }
}

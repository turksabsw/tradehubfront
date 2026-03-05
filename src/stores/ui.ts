import Alpine from 'alpinejs'

Alpine.store('ui', {
  sidebarOpen: false,
  mobileMenuOpen: false,
  darkMode: localStorage.getItem('tradehub_dark') === 'true',

  toggleSidebar() {
    (this as any).sidebarOpen = !(this as any).sidebarOpen
  },

  toggleMobileMenu() {
    (this as any).mobileMenuOpen = !(this as any).mobileMenuOpen
  },

  toggleDarkMode() {
    (this as any).darkMode = !(this as any).darkMode
    localStorage.setItem('tradehub_dark', String((this as any).darkMode))
    document.documentElement.classList.toggle('dark', (this as any).darkMode)
  },
})

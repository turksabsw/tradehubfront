/**
 * Login Page — Entry Point
 * Assembles AuthLayout with LoginPage content for the login flow.
 */

import './style.css'
import { initFlowbite } from 'flowbite'

// Auth components
import { AuthLayout, initAuthLayout, LoginPage, initLoginPage } from './components/auth'

/* ── App Setup ───────────────────────────────────────── */

const appEl = document.querySelector<HTMLDivElement>('#app')!
appEl.innerHTML = AuthLayout(LoginPage(), {
  title: 'Giriş yap veya hesap oluştur',
  showBackButton: true,
})

/* ── Initialize Behaviors ─────────────────────────────── */

// Initialize Flowbite components (dropdowns, modals, etc.)
initFlowbite()

// Initialize auth layout (back button handler)
initAuthLayout()

// Initialize login page interactivity (social buttons, links)
initLoginPage()

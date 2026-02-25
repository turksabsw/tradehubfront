/**
 * Forgot Password Page — Entry Point
 * 3-step password reset: find account → verify code → set new password.
 */

import './style.css'

import { ForgotPasswordPage, initForgotPasswordPage } from './components/auth'

const appEl = document.querySelector<HTMLDivElement>('#app')!;
appEl.innerHTML = ForgotPasswordPage();

initForgotPasswordPage();

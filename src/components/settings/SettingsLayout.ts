/**
 * SettingsLayout Component
 * Account settings page with profile header and settings cards.
 * Supports hash routing for sub-sections:
 *   #profilim, #vergi, #bagli-hesaplar, #gizlilik, #reklam, #eposta, #sifre, #eposta-degistir, #telefon
 */

import { SettingsAccountEdit, initSettingsAccountEdit } from './SettingsAccountEdit';
import { SettingsTaxInfo, initSettingsTaxInfo } from './SettingsTaxInfo';
import { SettingsLinkedAccounts, initSettingsLinkedAccounts } from './SettingsLinkedAccounts';
import { SettingsPrivacy, initSettingsPrivacy } from './SettingsPrivacy';
import { SettingsAdPreferences, initSettingsAdPreferences } from './SettingsAdPreferences';
import { SettingsEmailPreferences, initSettingsEmailPreferences } from './SettingsEmailPreferences';
import { SettingsChangePassword, initSettingsChangePassword } from './SettingsChangePassword';
import { SettingsChangeEmail, initSettingsChangeEmail } from './SettingsChangeEmail';
import { SettingsChangePhone, initSettingsChangePhone } from './SettingsChangePhone';
import { SettingsDeleteAccount, initSettingsDeleteAccount } from './SettingsDeleteAccount';

// ── SVG Icons ────────────────────────────────────────────────────

const ICONS = {
  accountInfo: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7" r="3.5" stroke="currentColor" stroke-width="1.5"/><path d="M3 17c0-3.3 2.7-6 6-6h2c3.3 0 6 2.7 6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  security: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 1.5L3 4.5v4c0 4.5 3 8.5 7 10 4-1.5 7-5.5 7-10v-4L10 1.5z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M7 10l2 2 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  preferences: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="7" cy="5" r="1.5" fill="currentColor"/><circle cx="13" cy="10" r="1.5" fill="currentColor"/><circle cx="9" cy="15" r="1.5" fill="currentColor"/></svg>`,
  chevron: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="#9CA3AF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  back: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12l-4-4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  google: `<svg width="18" height="18" viewBox="0 0 18 18"><path d="M17.64 9.2c0-.63-.06-1.25-.16-1.84H9v3.49h4.84a4.14 4.14 0 01-1.8 2.71v2.26h2.92a8.78 8.78 0 002.68-6.62z" fill="#4285F4"/><path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.83.86-3.04.86-2.34 0-4.33-1.58-5.04-3.71H.96v2.33A9 9 0 009 18z" fill="#34A853"/><path d="M3.96 10.71A5.41 5.41 0 013.68 9c0-.59.1-1.17.28-1.71V4.96H.96A9 9 0 000 9c0 1.45.35 2.82.96 4.04l3-2.33z" fill="#FBBC05"/><path d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.59C13.46.89 11.43 0 9 0A9 9 0 00.96 4.96l3 2.33C4.67 5.16 6.66 3.58 9 3.58z" fill="#EA4335"/></svg>`,
  camera: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M5.5 3L4.5 4.5H2.5a1 1 0 00-1 1v6a1 1 0 001 1h11a1 1 0 001-1v-6a1 1 0 00-1-1h-2l-1-1.5h-4z" stroke="currentColor" stroke-width="1.2"/><circle cx="8" cy="8" r="2" stroke="currentColor" stroke-width="1.2"/></svg>`,
  edit: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M10.5 1.5l2 2L4.5 11.5H2.5v-2l8-8z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  copy: `<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="4.5" y="4.5" width="7" height="7" rx="1" stroke="currentColor" stroke-width="1.2"/><path d="M2.5 9.5v-7a1 1 0 011-1h7" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>`,
};

// ── Settings Item Renderer ───────────────────────────────────────

interface SettingsItem {
  label: string;
  href: string;
  rightIcon?: string;
  rightText?: string;
}

function renderSettingsItem(item: SettingsItem): string {
  const rightContent = item.rightIcon
    ? `<span class="flex items-center">${item.rightIcon}</span>`
    : item.rightText
      ? `<span class="text-[13px]" style="color:var(--color-text-placeholder, #999999)">${item.rightText}</span>`
      : '';

  return `
    <a href="${item.href}" class="flex items-center justify-between py-3 no-underline transition-colors rounded -mx-2 px-2 hover:bg-(--color-surface-muted,#fafafa) group">
      <span class="text-sm" style="color:var(--color-text-body, #333333); group-hover:color:var(--color-text-heading, #111827)">${item.label}</span>
      <span class="flex items-center gap-2">
        ${rightContent}
        ${ICONS.chevron}
      </span>
    </a>
  `;
}

// ── Settings Card Renderer ───────────────────────────────────────

interface SettingsCard {
  icon: string;
  title: string;
  items: SettingsItem[];
}

function renderSettingsCard(card: SettingsCard): string {
  return `
    <div class="bg-white rounded-lg p-6 max-sm:p-4">
      <div class="flex items-center gap-2.5">
        <span class="flex items-center justify-center" style="color:var(--color-text-body, #333333)">${card.icon}</span>
        <h2 class="text-base font-bold m-0" style="color:var(--color-text-heading, #111827)">${card.title}</h2>
      </div>
      <div class="h-px bg-gray-200 my-4"></div>
      <div class="flex flex-col">
        ${card.items.map(renderSettingsItem).join('')}
      </div>
    </div>
  `;
}

// ── Profile Header ───────────────────────────────────────────────

function renderProfileHeader(): string {
  return `
    <div class="flex items-center justify-between gap-6 bg-white rounded-lg py-6 px-8 max-md:flex-col max-md:items-start max-md:p-5 max-md:gap-4">
      <div class="flex items-center gap-5 max-sm:flex-col max-sm:items-start">
        <div class="relative flex-shrink-0">
          <div class="w-[72px] h-[72px] rounded-full flex items-center justify-center border-3 border-primary-200" style="background:linear-gradient(135deg, var(--color-primary-400, #e6b212) 0%, var(--color-primary-500, #cc9900) 100%)">
            <span class="text-[32px] font-bold text-white lowercase leading-none">m</span>
          </div>
          <button class="absolute -bottom-0.5 -left-0.5 w-7 h-7 rounded-full bg-white border border-border-default flex items-center justify-center cursor-pointer transition-all hover:bg-surface-raised" style="color:var(--color-text-muted, #666666)" title="Fotoğraf değiştir">
            ${ICONS.camera}
          </button>
        </div>
        <div class="flex flex-col gap-1">
          <h2 class="text-lg font-bold mb-1 m-0" style="color:var(--color-text-heading, #111827)">Metin K.</h2>
          <div class="flex items-center gap-2 text-[13px]">
            <span style="color:var(--color-text-placeholder, #999999); min-width:110px; max-md:min-width:90px">E-posta</span>
            <span class="font-mono" style="color:var(--color-text-body, #333333)">met***@gmail.com</span>
            <button class="inline-flex items-center justify-center w-6 h-6 border-none bg-none rounded cursor-pointer transition-all hover:bg-surface-raised" style="color:var(--color-text-placeholder, #999999)" title="E-postayı düzenle">${ICONS.edit}</button>
          </div>
          <div class="flex items-center gap-2 text-[13px]">
            <span style="color:var(--color-text-placeholder, #999999); min-width:110px; max-md:min-width:90px">Üyelik numarası</span>
            <span class="font-mono" style="color:var(--color-text-body, #333333)">tr29243492599miuy</span>
            <button class="settings-profile__copy-btn inline-flex items-center justify-center w-6 h-6 border-none bg-none rounded cursor-pointer transition-all hover:bg-surface-raised" style="color:var(--color-text-placeholder, #999999)" title="Kopyala">${ICONS.copy}</button>
          </div>
        </div>
      </div>
      <div class="flex items-center gap-4 flex-shrink-0 max-md:w-full">
        <a href="#profilim" class="inline-flex items-center justify-center px-6 h-10 rounded-full text-sm font-semibold no-underline transition-all whitespace-nowrap text-white max-md:flex-1 max-md:text-center" style="background:var(--color-text-heading)">Profilimi düzenle</a>
        <a href="/login.html" class="inline-flex items-center justify-center px-6 h-10 rounded-full text-sm font-semibold no-underline transition-all whitespace-nowrap bg-none hover:underline max-md:flex-1 max-md:text-center" style="color:var(--color-text-body, #333333)">Çıkış yap</a>
      </div>
    </div>
  `;
}

// ── Card Data ────────────────────────────────────────────────────

const accountInfoCard: SettingsCard = {
  icon: ICONS.accountInfo,
  title: 'Hesap bilgileri',
  items: [
    { label: 'Profilim', href: '#profilim' },
    { label: 'Üyelik hesabım', href: '#' },
    { label: 'Bağlı hesaplar', href: '#bagli-hesaplar', rightIcon: ICONS.google },
    { label: 'Vergi bilgileri', href: '#vergi' },
  ],
};

const securityCard: SettingsCard = {
  icon: ICONS.security,
  title: 'Hesap güvenliği',
  items: [
    { label: 'Şifreyi değiştir', href: '#sifre' },
    { label: 'E-postayı değiştir', href: '#eposta-degistir', rightText: 'met***@gmail.com' },
    { label: 'Telefon numarasını değiştir', href: '#telefon' },
    { label: 'Hesabı sil', href: '#hesabi-sil' },
  ],
};

const preferencesCard: SettingsCard = {
  icon: ICONS.preferences,
  title: 'Tercihler',
  items: [
    { label: 'Gizlilik ayarları', href: '#gizlilik' },
    { label: 'E-posta tercihleri', href: '#eposta' },
    { label: 'Reklam tercihleri', href: '#reklam' },
  ],
};

// ── Sub-section back header ──────────────────────────────────────

function renderBackHeader(): string {
  return `
    <a href="#" class="inline-flex items-center gap-1.5 text-[13px] text-blue-600 no-underline font-medium mb-4 transition-colors hover:text-blue-700">
      ${ICONS.back}
      <span>Hesap ayarlarına dön</span>
    </a>
  `;
}

// ── Default View (cards) ─────────────────────────────────────────

function renderDefaultView(): string {
  return `
    ${renderProfileHeader()}
    <div class="flex gap-5 items-start max-md:flex-col">
      <div class="flex-1 min-w-0 flex flex-col gap-5">
        ${renderSettingsCard(accountInfoCard)}
        ${renderSettingsCard(preferencesCard)}
      </div>
      <div class="flex-1 min-w-0">
        ${renderSettingsCard(securityCard)}
      </div>
    </div>
  `;
}

// ── Hash-section mapping ─────────────────────────────────────────

const SECTION_MAP: Record<string, { title: string; render: () => string }> = {
  '#profilim': { title: 'Profilim', render: () => SettingsAccountEdit() },
  '#vergi': { title: 'Vergi bilgileri', render: () => SettingsTaxInfo() },
  '#bagli-hesaplar': { title: 'Bağlı hesaplar', render: () => SettingsLinkedAccounts() },
  '#gizlilik': { title: 'Gizlilik ayarları', render: () => SettingsPrivacy() },
  '#reklam': { title: 'Reklam tercihleri', render: () => SettingsAdPreferences() },
  '#eposta': { title: 'E-posta tercihleri', render: () => SettingsEmailPreferences() },
  '#sifre': { title: 'Şifreyi değiştir', render: () => SettingsChangePassword() },
  '#eposta-degistir': { title: 'E-postayı değiştir', render: () => SettingsChangeEmail() },
  '#telefon': { title: 'Telefon numarasını değiştir', render: () => SettingsChangePhone() },
  '#hesabi-sil': { title: 'Hesabı sil', render: () => SettingsDeleteAccount() },
};

const INIT_MAP: Record<string, () => void> = {
  '#profilim': initSettingsAccountEdit,
  '#vergi': initSettingsTaxInfo,
  '#bagli-hesaplar': initSettingsLinkedAccounts,
  '#gizlilik': initSettingsPrivacy,
  '#reklam': initSettingsAdPreferences,
  '#eposta': initSettingsEmailPreferences,
  '#sifre': initSettingsChangePassword,
  '#eposta-degistir': initSettingsChangeEmail,
  '#telefon': initSettingsChangePhone,
  '#hesabi-sil': initSettingsDeleteAccount,
};

// ── Main Layout ──────────────────────────────────────────────────

export function SettingsLayout(): string {
  return `<div class="flex flex-col gap-5 py-4" id="settings-root"></div>`;
}

// ── Init ─────────────────────────────────────────────────────────

export function initSettingsLayout(): void {
  const root = document.getElementById('settings-root');
  if (!root) return;

  function renderCurrentSection() {
    const hash = window.location.hash;
    const section = SECTION_MAP[hash];

    if (section) {
      root!.innerHTML = `
        ${renderBackHeader()}
        ${section.render()}
      `;
      INIT_MAP[hash]?.();
    } else {
      root!.innerHTML = renderDefaultView();
      // Init copy button on default view
      const copyBtn = document.querySelector<HTMLButtonElement>('.settings-profile__copy-btn');
      if (copyBtn) {
        copyBtn.addEventListener('click', () => {
          navigator.clipboard.writeText('tr29243492599miuy').then(() => {
            copyBtn.title = 'Kopyalandı!';
            setTimeout(() => { copyBtn.title = 'Kopyala'; }, 2000);
          });
        });
      }
    }
  }

  renderCurrentSection();
  window.addEventListener('hashchange', renderCurrentSection);
}

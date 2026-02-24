/**
 * UserInfoCard Component
 * Avatar (48px round), username (bold, #333), profile link (blue #2563EB),
 * '24H Çevrimiçi destek' badge (top-right), 3-column stats grid with vertical dividers.
 */

import type { UserProfile, UserStat } from '../../types/buyerDashboard';

export interface UserInfoCardProps {
  user: UserProfile;
  stats: UserStat[];
}

function renderStatItem(stat: UserStat, index: number, total: number): string {
  const divider = index < total - 1
    ? '<div class="user-info-card__stat-divider"></div>'
    : '';

  return `
    <a href="${stat.href}" class="user-info-card__stat" aria-label="${stat.label}: ${stat.count}">
      <span class="user-info-card__stat-count">${stat.count}</span>
      <span class="user-info-card__stat-label">${stat.label}</span>
    </a>
    ${divider}
  `;
}

export function UserInfoCard(props: UserInfoCardProps): string {
  const { user, stats } = props;

  return `
    <div class="user-info-card">
      <!-- 24H Online Support Badge -->
      <div class="user-info-card__support-badge" aria-label="24 saat çevrimiçi destek">
        <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span>24H Çevrimiçi destek</span>
      </div>

      <!-- User Profile Row -->
      <div class="user-info-card__profile">
        <div class="user-info-card__avatar" aria-hidden="true">
          ${user.avatar
            ? `<img src="${user.avatar}" alt="${user.username}" class="w-full h-full object-cover rounded-full" />`
            : `<svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
              </svg>`
          }
        </div>
        <div class="user-info-card__info">
          <span class="user-info-card__username" title="${user.username}">${user.username}</span>
          <a href="${user.profileHref}" class="user-info-card__profile-link">
            Profili görüntüle
            <svg class="w-3 h-3 ml-1 inline-block" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="user-info-card__stats" role="list" aria-label="Kullanıcı istatistikleri">
        ${stats.map((stat, i) => renderStatItem(stat, i, stats.length)).join('')}
      </div>
    </div>
  `;
}

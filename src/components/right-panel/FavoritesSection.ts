/**
 * FavoritesSection Component
 * Right panel section showing favorites empty state with package+heart icon.
 */

import { SectionCard } from '../shared/SectionCard';
import { SectionHeader } from '../shared/SectionHeader';
import { EmptyState } from '../shared/EmptyState';
import { favoritesConfig, favoritesEmptyState } from './rightPanelData';

export function FavoritesSection(): string {
  return SectionCard({
    children: `
      ${SectionHeader({ title: favoritesConfig.title })}
      ${EmptyState({
        icon: favoritesEmptyState.icon,
        text: favoritesEmptyState.text,
        linkText: favoritesEmptyState.linkText,
        linkHref: favoritesEmptyState.linkHref,
        linkColor: '#E67A00',
      })}
    `,
  });
}

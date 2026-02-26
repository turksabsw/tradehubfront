/**
 * Shared Breadcrumb Component
 * Reusable breadcrumb navigation for all pages (except homepage).
 * Always starts with "Ana Sayfa" → ... → current page.
 */

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

/**
 * Render a breadcrumb navigation bar.
 * @param items - Array of breadcrumb items. Last item is rendered as plain text (current page).
 *                "Ana Sayfa" is automatically prepended.
 */
export function Breadcrumb(items: BreadcrumbItem[]): string {
  const allItems: BreadcrumbItem[] = [
    { label: 'Ana Sayfa', href: '/' },
    ...items,
  ];

  const crumbs = allItems.map((item, i) => {
    const isLast = i === allItems.length - 1;

    if (isLast) {
      return `<span class="text-sm truncate max-w-[200px] text-gray-500 dark:text-gray-400">${item.label}</span>`;
    }

    return `
      <a href="${item.href ?? '#'}" class="text-sm hover:underline whitespace-nowrap text-primary-500 dark:text-primary-400">${item.label}</a>
      <svg class="h-3 w-3 flex-shrink-0 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
      </svg>
    `;
  });

  return `
    <nav aria-label="Breadcrumb" class="py-3">
      <ol class="flex items-center gap-2 flex-wrap">
        ${crumbs.map(c => `<li class="flex items-center gap-2">${c}</li>`).join('')}
      </ol>
    </nav>
  `;
}

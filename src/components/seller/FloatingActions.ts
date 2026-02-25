/**
 * C13: Floating Action Buttons
 * Fixed right-side Contact Supplier + Chat Now buttons
 * Mobile bottom bar transformation via CSS
 */
import type { FloatingActionsData } from '../../types/seller/types';

export function FloatingActions(data: FloatingActionsData): string {
  const topPosition = data.topPosition || '40%';

  return `
    <div id="floating-actions"
         class="floating-actions fixed right-0 z-[var(--z-fixed)] flex flex-col"
         style="top: ${topPosition}"
         aria-label="Hızlı erişim butonları">
      ${data.buttons.map((btn, index) => {
        const isFirst = index === 0;
        const isLast = index === data.buttons.length - 1;
        const roundedClasses = isFirst && isLast
          ? 'rounded-tl-[var(--radius-md)] rounded-bl-[var(--radius-md)]'
          : isFirst
            ? 'rounded-tl-[var(--radius-md)]'
            : isLast
              ? 'rounded-bl-[var(--radius-md)]'
              : '';

        // Split label for 2-line display on desktop
        const labelParts = btn.label.split(' ');
        const labelHtml = labelParts.length > 1
          ? `${labelParts[0]}<br/>${labelParts.slice(1).join(' ')}`
          : btn.label;

        return `
          <button class="floating-actions__btn floating-actions__btn--${btn.id} ${btn.bgColor} ${btn.hoverColor} text-white w-[56px] h-[80px] ${roundedClasses} flex flex-col items-center justify-center gap-1 transition-colors shadow-lg dark:shadow-xl cursor-pointer border-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                  aria-label="${btn.ariaLabel}"
                  data-action="${btn.action}">
            ${btn.icon}
            <span class="text-[9px] font-medium leading-tight text-center">${labelHtml}</span>
          </button>
        `;
      }).join('')}
    </div>
  `;
}

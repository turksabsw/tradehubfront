/**
 * MessageContent Component
 * Right panel: empty state (illustration + text + CTA button) or selected message content.
 */

export function MessageContent(): string {
  return `
    <div class="flex-1 flex items-center justify-center bg-[var(--color-surface,#ffffff)] min-w-0 max-md:hidden">
      <div class="flex flex-col items-center gap-5 p-10 text-center">
        <!-- Illustration: laptop + shield + chat bubble -->
        <div class="w-[160px] h-[120px]">
          <svg width="160" height="120" viewBox="0 0 160 120" fill="none">
            <!-- Laptop -->
            <rect x="20" y="20" width="90" height="60" rx="4" fill="#F3F4F6" stroke="#D1D5DB" stroke-width="1.5"/>
            <rect x="28" y="28" width="74" height="44" rx="2" fill="#fff"/>
            <path d="M10 80h110c0 4-4 8-8 8H18c-4 0-8-4-8-8z" fill="#E5E7EB"/>
            <!-- Shield with check -->
            <circle cx="100" cy="75" r="20" fill="#FFF7ED"/>
            <path d="M100 58l12 6v10c0 8-5 15-12 18-7-3-12-10-12-18V64l12-6z" fill="#F97316" opacity="0.15"/>
            <path d="M100 58l12 6v10c0 8-5 15-12 18-7-3-12-10-12-18V64l12-6z" stroke="#F97316" stroke-width="1.5" fill="none"/>
            <path d="M94 74l4 4 8-8" stroke="#F97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <!-- Chat bubble -->
            <rect x="115" y="30" width="35" height="24" rx="4" fill="#FFEDD5" stroke="#FB923C" stroke-width="1"/>
            <circle cx="125" cy="42" r="2" fill="#FB923C"/>
            <circle cx="132" cy="42" r="2" fill="#FB923C"/>
            <circle cx="139" cy="42" r="2" fill="#FB923C"/>
            <polygon points="120,54 126,54 120,60" fill="#FFEDD5" stroke="#FB923C" stroke-width="1"/>
          </svg>
        </div>

        <p class="text-sm text-[var(--color-text-body,#333333)] leading-relaxed">
          TradeHub'da sohbet ederek ve ticaret yaparak<br>
          keyifli bir alışveriş deneyimi yaşayın
        </p>

        <a href="/help" class="inline-block px-6 py-2 border border-[var(--color-border-medium,#d1d5db)] rounded-full text-sm text-[var(--color-text-body,#333333)] no-underline transition-[border-color,background] duration-150 hover:border-[var(--color-text-placeholder)] hover:bg-[var(--color-surface-muted,#fafafa)]">Daha fazla bilgi</a>
      </div>
    </div>
  `;
}

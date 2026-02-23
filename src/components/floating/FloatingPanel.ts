/**
 * FloatingPanel Component
 * Fixed right-bottom panel with chat button (badge showing 9+),
 * visual search lens button, and scroll-to-top button
 */

/**
 * Generates the chat button with message badge
 */
function renderChatButton(): string {
  const messageCount = '9+';

  return `
    <button
      type="button"
      id="floating-chat-btn"
      class="th-btn relative flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2"
      style="border-radius:9999px"
      aria-label="Open chat, ${messageCount} new messages"
      data-tooltip-target="tooltip-chat"
      data-tooltip-placement="left"
    >
      <!-- Chat Icon -->
      <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
      </svg>
      <!-- Badge -->
      <span class="th-badge absolute -top-1 -right-1 flex items-center justify-center min-w-5 h-5 px-1" style="background:var(--color-error-500);color:#fff">
        ${messageCount}
      </span>
    </button>
    <div id="tooltip-chat" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-md shadow-sm opacity-0 tooltip dark:bg-gray-700">
      Chat Support
      <div class="tooltip-arrow" data-popper-arrow></div>
    </div>
  `;
}

/**
 * Generates the visual search lens button
 */
function renderLensButton(): string {
  return `
    <button
      type="button"
      id="floating-lens-btn"
      class="flex items-center justify-center w-12 h-12 bg-white hover:bg-gray-50 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 rounded-full shadow-lg border border-gray-200 dark:border-gray-600 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2"
      aria-label="Visual search"
      data-tooltip-target="tooltip-lens"
      data-tooltip-placement="left"
    >
      <!-- Camera/Lens Icon -->
      <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
      </svg>
    </button>
    <div id="tooltip-lens" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-md shadow-sm opacity-0 tooltip dark:bg-gray-700">
      Search by Image
      <div class="tooltip-arrow" data-popper-arrow></div>
    </div>
  `;
}

/**
 * Generates the scroll-to-top button
 */
function renderScrollToTopButton(): string {
  return `
    <button
      type="button"
      id="scroll-to-top-btn"
      class="hidden items-center justify-center w-12 h-12 bg-white hover:bg-gray-50 text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 rounded-full shadow-lg border border-gray-200 dark:border-gray-600 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2"
      aria-label="Scroll to top"
      data-tooltip-target="tooltip-scroll-top"
      data-tooltip-placement="left"
    >
      <!-- Arrow Up Icon -->
      <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
      </svg>
    </button>
    <div id="tooltip-scroll-top" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-md shadow-sm opacity-0 tooltip dark:bg-gray-700">
      Back to Top
      <div class="tooltip-arrow" data-popper-arrow></div>
    </div>
  `;
}

/**
 * FloatingPanel Component
 * Renders a fixed positioned panel at the bottom-right of the viewport containing:
 * - Chat button with badge showing 9+ messages
 * - Visual search lens button
 * - Scroll-to-top button (hidden until scrolled > 300px)
 */
export function FloatingPanel(): string {
  return `
    <div
      id="floating-panel"
      class="fixed bottom-6 right-6 z-[var(--z-sidebar)] flex flex-col items-center gap-3"
      aria-label="Quick actions panel"
    >
      <!-- Scroll to Top Button (hidden by default, shown on scroll > 300px) -->
      ${renderScrollToTopButton()}

      <!-- Visual Search Lens Button -->
      ${renderLensButton()}

      <!-- Chat Button with Badge -->
      ${renderChatButton()}
    </div>
  `;
}

/**
 * Initializes the FloatingPanel scroll behavior
 * Shows/hides the scroll-to-top button based on scroll position
 * Should be called after DOM is ready
 */
export function initFloatingPanel(): void {
  const scrollToTopBtn = document.getElementById('scroll-to-top-btn');
  const SCROLL_THRESHOLD = 300;

  if (!scrollToTopBtn) {
    return;
  }

  // Handle scroll event to show/hide scroll-to-top button
  const handleScroll = (): void => {
    if (window.scrollY > SCROLL_THRESHOLD) {
      scrollToTopBtn.classList.remove('hidden');
      scrollToTopBtn.classList.add('flex');
    } else {
      scrollToTopBtn.classList.remove('flex');
      scrollToTopBtn.classList.add('hidden');
    }
  };

  // Handle click on scroll-to-top button
  const handleScrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Add event listeners
  window.addEventListener('scroll', handleScroll, { passive: true });
  scrollToTopBtn.addEventListener('click', handleScrollToTop);

  // Initial check in case page is already scrolled
  handleScroll();

  // --- Chat Button Handler ---
  const chatBtn = document.getElementById('floating-chat-btn');
  if (chatBtn) {
    chatBtn.addEventListener('click', () => {
      openChatDrawer();
    });
  }

  // --- Lens Button Handler ---
  const lensBtn = document.getElementById('floating-lens-btn');
  if (lensBtn) {
    lensBtn.addEventListener('click', () => {
      openLensModal();
    });
  }
}

/**
 * Opens a chat support drawer on the right side of the screen
 */
function openChatDrawer(): void {
  // Prevent duplicate drawers
  if (document.getElementById('chat-drawer-backdrop')) return;

  // Create backdrop
  const backdrop = document.createElement('div');
  backdrop.id = 'chat-drawer-backdrop';
  backdrop.className = 'fixed inset-0 z-[var(--z-popover)] bg-black/50 transition-opacity duration-300 opacity-0';
  backdrop.setAttribute('aria-hidden', 'true');

  // Create drawer
  const drawer = document.createElement('div');
  drawer.id = 'chat-drawer';
  drawer.className = 'fixed top-0 right-0 z-[var(--z-toast)] h-full w-full max-w-sm bg-white dark:bg-gray-800 shadow-2xl flex flex-col transition-transform duration-300 translate-x-full';
  drawer.setAttribute('role', 'dialog');
  drawer.setAttribute('aria-modal', 'true');
  drawer.setAttribute('aria-label', 'Chat Support');

  drawer.innerHTML = `
    <!-- Header -->
    <div class="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Chat Support</h2>
      <button
        id="chat-drawer-close-btn"
        type="button"
        class="flex items-center justify-center w-9 h-9 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400"
        aria-label="Close chat"
      >
        <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <!-- Message Area -->
    <div class="flex-1 flex items-center justify-center p-6">
      <div class="text-center">
        <div class="mx-auto mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30">
          <svg class="w-8 h-8 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
          </svg>
        </div>
        <p class="text-gray-500 dark:text-gray-400 text-sm">Chat functionality coming soon...</p>
      </div>
    </div>
  `;

  document.body.appendChild(backdrop);
  document.body.appendChild(drawer);

  // Prevent body scroll
  document.body.style.overflow = 'hidden';

  // Close handler
  const closeDrawer = (): void => {
    drawer.classList.add('translate-x-full');
    backdrop.classList.add('opacity-0');
    backdrop.classList.remove('opacity-100');
    setTimeout(() => {
      backdrop.remove();
      drawer.remove();
      document.body.style.overflow = '';
    }, 300);
  };

  // Animate in on next frame
  requestAnimationFrame(() => {
    backdrop.classList.remove('opacity-0');
    backdrop.classList.add('opacity-100');
    drawer.classList.remove('translate-x-full');
    drawer.classList.add('translate-x-0');
    // Focus the close button for accessibility
    const closeBtn = document.getElementById('chat-drawer-close-btn');
    closeBtn?.focus();
  });

  // Close on backdrop click
  backdrop.addEventListener('click', closeDrawer);

  // Close on close button click
  const closeBtn = document.getElementById('chat-drawer-close-btn');
  closeBtn?.addEventListener('click', closeDrawer);

  // Close on Escape key
  const handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      closeDrawer();
      document.removeEventListener('keydown', handleKeyDown);
    }
  };
  document.addEventListener('keydown', handleKeyDown);
}

/**
 * Opens a visual search / image upload modal
 */
function openLensModal(): void {
  // Prevent duplicate modals
  if (document.getElementById('lens-modal-backdrop')) return;

  // Create backdrop
  const backdrop = document.createElement('div');
  backdrop.id = 'lens-modal-backdrop';
  backdrop.className = 'fixed inset-0 z-[var(--z-popover)] bg-black/50 flex items-center justify-center transition-opacity duration-300 opacity-0';
  backdrop.setAttribute('aria-hidden', 'true');

  // Create modal
  const modal = document.createElement('div');
  modal.id = 'lens-modal';
  modal.className = 'relative z-[var(--z-toast)] w-full max-w-md mx-4 bg-white dark:bg-gray-800 rounded-md shadow-2xl transition-all duration-300 scale-95 opacity-0';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-label', 'Search by Image');

  modal.innerHTML = `
    <!-- Header -->
    <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Search by Image</h2>
      <button
        id="lens-modal-close-btn"
        type="button"
        class="flex items-center justify-center w-9 h-9 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400"
        aria-label="Close modal"
      >
        <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <!-- Drop Zone -->
    <div class="p-6">
      <div
        id="lens-drop-zone"
        class="flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md cursor-pointer hover:border-primary-400 hover:bg-primary-50/50 dark:hover:border-primary-500 dark:hover:bg-primary-900/10 transition-colors"
        role="button"
        tabindex="0"
        aria-label="Click to upload an image or drag and drop"
      >
        <div class="flex items-center justify-center w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-700">
          <svg class="w-7 h-7 text-gray-400 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
          </svg>
        </div>
        <p class="text-sm font-medium text-gray-700 dark:text-gray-300">Drop an image here or click to upload</p>
        <p class="text-xs text-gray-400 dark:text-gray-500">PNG, JPG, WEBP up to 10MB</p>
      </div>
      <input
        id="lens-file-input"
        type="file"
        accept="image/*"
        class="hidden"
        aria-label="Upload image for visual search"
      />
    </div>
  `;

  backdrop.appendChild(modal);
  document.body.appendChild(backdrop);

  // Prevent body scroll
  document.body.style.overflow = 'hidden';

  // Close handler
  const closeModal = (): void => {
    modal.classList.remove('scale-100', 'opacity-100');
    modal.classList.add('scale-95', 'opacity-0');
    backdrop.classList.remove('opacity-100');
    backdrop.classList.add('opacity-0');
    setTimeout(() => {
      backdrop.remove();
      document.body.style.overflow = '';
    }, 300);
  };

  // Animate in on next frame
  requestAnimationFrame(() => {
    backdrop.classList.remove('opacity-0');
    backdrop.classList.add('opacity-100');
    modal.classList.remove('scale-95', 'opacity-0');
    modal.classList.add('scale-100', 'opacity-100');
    // Focus the close button for accessibility
    const closeBtn = document.getElementById('lens-modal-close-btn');
    closeBtn?.focus();
  });

  // Close on backdrop click (but not modal click)
  backdrop.addEventListener('click', (e: Event) => {
    if (e.target === backdrop) {
      closeModal();
    }
  });

  // Close button
  const closeBtn = document.getElementById('lens-modal-close-btn');
  closeBtn?.addEventListener('click', closeModal);

  // Drop zone triggers file input
  const dropZone = document.getElementById('lens-drop-zone');
  const fileInput = document.getElementById('lens-file-input') as HTMLInputElement | null;

  if (dropZone && fileInput) {
    dropZone.addEventListener('click', () => {
      fileInput.click();
    });

    dropZone.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        fileInput.click();
      }
    });
  }

  // Close on Escape key
  const handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', handleKeyDown);
    }
  };
  document.addEventListener('keydown', handleKeyDown);
}

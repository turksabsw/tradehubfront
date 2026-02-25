/**
 * C12: Contact / Inquiry Form
 * 800px max-width card with textarea, character counter, send button
 */
import type { ContactFormData } from '../../types/seller/types';

export function ContactForm(data: ContactFormData): string {
  const title = data.title || 'Send message to supplier';
  const maxLength = data.maxLength || 8000;
  const placeholder = data.placeholder || 'Enter your inquiry details such as product name, color, size, quantity, material, etc.';

  return `
    <section id="contact-form" class="contact-form py-12" aria-label="İletişim formu">
      <div class="max-w-[800px] sm:max-w-full mx-auto px-8 sm:px-6 xs:px-4">
        <div class="contact-form__card bg-white dark:bg-gray-800 border border-[var(--card-border-color)] dark:border-gray-700 rounded-[var(--radius-lg)] shadow-md dark:shadow-lg p-8 sm:p-6 xs:p-4">

          <!-- Title -->
          <h2 class="contact-form__title text-[18px] font-bold text-[#111827] dark:text-gray-50 text-center mb-6">
            ${title}
          </h2>

          <!-- Recipient -->
          <div class="contact-form__recipient flex items-center gap-2 mb-4">
            <span class="text-[14px] text-[#6b7280] dark:text-gray-400">To:</span>
            <span class="text-[14px] text-[#111827] dark:text-gray-50 font-semibold">${data.recipient.name}</span>
            ${data.recipient.title ? `<span class="text-[12px] text-[#9ca3af]">— ${data.recipient.title}</span>` : ''}
          </div>

          <!-- Message Area -->
          <div class="contact-form__message-wrapper mb-4">
            <label class="text-[14px] text-[#6b7280] dark:text-gray-400 mb-1 block" for="contact-textarea">
              <span class="text-red-500">*</span> Message:
            </label>
            <div class="relative">
              <textarea
                id="contact-textarea"
                class="contact-form__textarea w-full border border-[var(--input-border-color)] dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-[var(--radius-input)] p-3 text-[14px] text-[#374151] min-h-[120px] sm:min-h-[100px] xs:min-h-[80px] resize-y focus:border-[var(--input-focus-border-color)] focus:outline-none focus:ring-2 focus:ring-[#cc9900]/20 transition-colors"
                placeholder="${placeholder}"
                maxlength="${maxLength}"
                aria-required="true"
                aria-describedby="char-counter"
                rows="5"
              ></textarea>
              <span id="char-counter" class="contact-form__counter absolute right-3 bottom-3 text-[12px] text-[#9ca3af] dark:text-gray-500">0/${maxLength}</span>
            </div>
          </div>

          <!-- Send Button -->
          <div class="flex justify-center mb-4">
            <button class="contact-form__send bg-[#f97316] hover:bg-[#ea580c] text-white font-semibold text-[14px] rounded-[var(--radius-button)] px-8 py-2 xs:w-full xs:py-3 transition-colors cursor-pointer">
              Send
            </button>
          </div>

          <!-- Business Card Checkbox -->
          <div class="contact-form__checkbox flex items-center gap-2 justify-center">
            <input type="checkbox" id="business-card"
                   class="w-4 h-4 text-[#f97316] border-[#d1d5db] rounded focus:ring-[#f97316]"
                   ${data.businessCardDefault !== false ? 'checked' : ''} />
            <label for="business-card" class="text-[13px] text-[#6b7280] dark:text-gray-400">
              I agree to share my Business Card to the supplier.
            </label>
          </div>

        </div>
      </div>
    </section>
  `;
}

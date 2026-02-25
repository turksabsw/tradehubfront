/**
 * C12: Contact / Inquiry Form
 * 800px max-width card with textarea, character counter, send button
 */
import type { ContactFormData } from '../../types/seller/types';

export function ContactForm(data: ContactFormData): string {
  const title = data.title || 'Tedarikçiye mesaj gönder';
  const maxLength = data.maxLength || 8000;
  const placeholder = data.placeholder || 'Ürün adı, renk, boyut, miktar, malzeme vb. gibi sorgu detaylarınızı yazın.';

  return `
    <section id="contact-form" class="contact-form py-12" aria-label="İletişim formu">
      <div class="max-w-[800px] mx-auto px-4 lg:px-8">
        <div class="contact-form__card bg-white border border-[var(--card-border-color)] rounded-[var(--radius-lg)] shadow-md p-6 lg:p-8">
          <h2 class="contact-form__title text-[18px] font-bold text-[#111827] text-center mb-6">
            ${title}
          </h2>

          <!-- Recipient -->
          <div class="contact-form__recipient flex items-center gap-2 mb-4">
            <span class="text-[14px] text-[#6b7280]">To:</span>
            <span class="text-[14px] text-[#111827] font-semibold">${data.recipient.name}</span>
            ${data.recipient.title ? `<span class="text-[12px] text-[#9ca3af]">— ${data.recipient.title}</span>` : ''}
          </div>

          <!-- Message Label -->
          <label class="text-[14px] text-[#6b7280] mb-1 block" for="contact-textarea">
            Message <span class="text-red-500">*</span>
          </label>

          <!-- Textarea Container -->
          <div class="relative mb-4">
            <textarea
              id="contact-textarea"
              class="contact-form__textarea w-full border border-[var(--input-border-color)] rounded-[var(--radius-input)] p-3 text-[14px] text-[#374151] min-h-[120px] resize-y focus:border-[var(--input-focus-border-color)] focus:outline-none focus:ring-2 focus:ring-[#cc9900]/20 transition-colors"
              placeholder="${placeholder}"
              maxlength="${maxLength}"
              rows="5"
            ></textarea>
            <span class="contact-form__counter absolute right-3 bottom-3 text-[12px] text-[#9ca3af]">0/${maxLength}</span>
          </div>

          <!-- Actions Row -->
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <!-- Business Card Checkbox -->
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" class="w-4 h-4 text-[#f97316] border-[#d1d5db] rounded focus:ring-[#f97316]"
                     ${data.businessCardDefault !== false ? 'checked' : ''} />
              <span class="text-[13px] text-[#6b7280]">Kartvizitimi paylaş</span>
            </label>

            <!-- Send Button -->
            <button class="contact-form__send bg-[#f97316] hover:bg-[#ea580c] text-white font-semibold text-[14px] rounded-[var(--radius-button)] px-8 py-2 transition-colors cursor-pointer">
              Gönder
            </button>
          </div>
        </div>
      </div>
    </section>
  `;
}

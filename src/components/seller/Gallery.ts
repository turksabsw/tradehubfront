/**
 * C11: Gallery / Factory Photos (Optional)
 * 3-column photo grid with hover overlay (gradient + caption slide-up + image zoom)
 */
import type { GalleryPhoto } from '../../types/seller/types';

export function Gallery(photos: GalleryPhoto[], title?: string): string {
  if (!photos || !photos.length) return '';

  const sectionTitle = title || 'MORE';

  return `
    <section id="gallery" class="gallery py-12" aria-label="Fabrika fotoğrafları">
      <div class="max-w-[var(--container-lg)] mx-auto px-4 lg:px-6 xl:px-8">
        <h2 class="gallery__title text-[28px] font-bold text-[#1e3a5f] uppercase text-center mb-8">
          ${sectionTitle}
        </h2>
        <div class="gallery__grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          ${photos.map(photo => `
            <div class="gallery__item relative rounded-[var(--radius-md)] overflow-hidden aspect-[4/3] group cursor-pointer">
              <img src="${photo.image}" alt="${photo.caption || ''}"
                   class="gallery__image w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                   loading="lazy"
                   onerror="this.parentElement.style.background='#f3f4f6'" />
              <div class="gallery__overlay absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                ${photo.caption ? `
                  <span class="gallery__caption text-white text-[13px] font-medium px-4 py-3 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    ${photo.caption}
                  </span>
                ` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

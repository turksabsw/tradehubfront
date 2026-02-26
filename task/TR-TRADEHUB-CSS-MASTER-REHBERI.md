# TR TradeHub — CSS Optimizasyon & Dinamik Tema Rehberi

> **Tek kaynak doküman** — Renk dönüşümü, token mimarisi, Tailwind-first strateji, panel kontrolü.
> Gerçek `style.css` (~6900 satır) ve `seller-storefront.css` (~380 satır) analizi temel alınmıştır.
> Tailwind CSS v4 + Flowbite · Tek `style.css` dosyası korunur.

---

## İçindekiler

1. [Mevcut Durum Analizi](#1-mevcut-durum)
2. [Renk Dönüşüm Haritası — Turuncu → Altın](#2-renk-donusum)
3. [Token Mimarisi — 3 Katman](#3-token-mimarisi)
4. [Hardcoded Hex → Token Tablosu](#4-hardcoded-token)
5. [Tailwind-First Strateji](#5-tailwind-first)
6. [Panel Kontrol Sistemi](#6-panel-kontrol)
7. [Migrasyon Planı — 6 Faz](#7-migrasyon)
8. [Tahmini Sonuç & PR Checklist](#8-sonuc)
9. [Hızlı Referans — Renk Paleti](#9-referans)

---

## 1. Mevcut Durum Analizi {#1-mevcut-durum}

### style.css Genel Görünüm

| Metrik | Değer |
|--------|-------|
| Toplam satır | ~6900 |
| @theme token | ~210+ custom property |
| Component class (`th-*`) | 28 (btn, card, input, badge, nav, header-icon, subheader, footer, search-tab, mega-*, catpopup-*, topdeals, topranking, tailored) |
| Sayfa bölümü | 18 (TopBar Search, Product Card hFR19/fy26, PD Layout, Gallery+Lightbox, Reviews, Cart Drawer, Mobile PD, Auth, Dashboard+Sidebar, Messages, Inquiries, Contacts, Orders, Favorites, Subscription, Logistics, Payment, Dropshipping) |
| `:root` ek değişkenler | ~70 (Dashboard-specific) |
| Keyframe animasyon | 5 (`searchGradientShift`, `fade-in`, `fade-out`, `osModalIn`, `favModalIn`, `payModalIn`, `badge-pulse`) |

### Tespit Edilen Sorunlar

**S1 — Turuncu CTA hâlâ aktif:** @theme'de 11 token + CSS rule'larında ~65 yerde `#ea580c`, `#e85d04`, `#ff6600`, `#F97316`, `#E65C00`, `#e8540c`, `#f97316` kullanılıyor.

**S2 — Token'a bağlı olmayan hardcoded hex:** `#222222`, `#333333`, `#666666`, `#999999`, `#e5e7eb`, `#f0f0f0`, `#f5f5f5`, `#f9fafb` gibi renkler yüzlerce yerde doğrudan yazılmış. Panel bu değerleri kontrol edemiyor.

**S3 — Layout CSS Tailwind ile yapılabilir:** Empty state (9×), modal overlay (7×), tab (10×), close button (10×), pill/chip (5×), search box (6×), sidebar nav (3×), dropdown (4×) pattern'leri custom CSS olarak yazılmış.

**S4 — `:root` ve `@theme` ayrışması:** Dashboard token'ları `:root` bloğunda, diğerleri `@theme` bloğunda. Tutarsız.

---

## 2. Renk Dönüşüm Haritası — Turuncu → Altın {#2-renk-donusum}

### 2.1 Altın Renk Paleti

| Kademe | Hex | Kullanım |
|--------|-----|----------|
| Primary-50 | `#fef9e7` | Active tint bg, chip active bg |
| Primary-100 | `#fdf0c3` | Light hover bg |
| Primary-200 | `#fbe08a` | Border tint |
| Primary-300 | `#f6c94d` | Disabled CTA, light accent |
| Primary-400 | `#e6b212` | CTA light, hover tint |
| **Primary-500** | **`#cc9900`** | **Ana CTA rengi** |
| Primary-600 | `#b38600` | CTA hover |
| Primary-700 | `#8a6800` | CTA pressed |

### 2.2 @theme Token Değişiklikleri

```
TOKEN                          ESKİ             YENİ
─────────────────────────────  ───────────────  ──────────────
--auth-btn-bg                  #FF6600          #cc9900
--auth-btn-hover               #E65C00          #b38600
--auth-accent                  #FF6600          #cc9900
--auth-input-focus             #FF6600          #cc9900
--auth-header-border           #FF6600          #cc9900
--search-btn-gradient-start    #f5a623          #e6b212
--search-btn-gradient-end      #e8740c          #b38600
--footer-link-hover-color      #FF6A00          #cc9900
--color-store-nav-bg           #e8540c          #b38600
--color-store-accent           #f97316          #cc9900
--color-store-accent-hover     #ea580c          #b38600
```

### 2.3 CSS Rule İçindeki Hardcoded Turuncu → Değişiklik Tablosu

Her satır gerçek CSS'ten tespit edilmiştir. **Eski** sütunu o selector'da bulunan gerçek hex'tir.

#### Topbar Search

| Selector | Property | Eski | Yeni |
|----------|----------|------|------|
| `.topbar-search-submit` | background | `#ff6600` | `var(--color-cta-primary, #cc9900)` |
| `.topbar-search-submit:hover` | background | `#f15f00` | `var(--color-cta-primary-hover, #b38600)` |
| `.topbar-search-submit:focus-visible` | outline-color | `#ff6600` | `var(--color-primary-500)` |

#### Product Detail (Desktop)

| Selector | Property | Eski | Yeni |
|----------|----------|------|------|
| `.pd-card-tab.active` | border-top-color | `#e85d04` | `var(--color-cta-primary, #cc9900)` |
| `.pd-cta-primary` | background | `var(--pd-cta-primary-bg, #e85d04)` | fallback → `#cc9900` |
| `.pd-cta-primary:hover` | background | `var(--pd-cta-primary-hover, #d45303)` | fallback → `#b38600` |
| `.pd-shipping-card-change` | color | `var(--pd-price-color, #ea580c)` | fallback → `#cc9900` |

#### Product Detail (Mobile — `#pdm-*`)

| Selector | Property | Eski | Yeni |
|----------|----------|------|------|
| `.pdm-section-tab-active` | color + border-bottom-color | `#ea580c` | `var(--color-cta-primary, #cc9900)` |
| `.pdm-badge-orange` | border + color | `#e85d04` | `var(--color-cta-primary, #cc9900)` |
| `.pdm-bar-order-btn` | background | `#e85d04` | `var(--color-cta-primary, #cc9900)` |
| `.pdm-bar-order-btn:active` | background | `#d45303` | `var(--color-cta-primary-hover, #b38600)` |
| `.pdm-shipping-method-card.active` | border-color | `#e85d04` | `var(--color-cta-primary, #cc9900)` |
| `.pdm-trade-badge` | color | `#e85d04` | `var(--color-cta-primary, #cc9900)` |

#### Cart Drawer

| Selector | Property | Eski | Yeni |
|----------|----------|------|------|
| `.cart-color-grid-item.active` | border-color | `var(--color-primary-500, #ea580c)` | fallback → `#cc9900` |
| `.cart-color-grid-item:hover` | border-color | `var(--color-primary-400, #f97316)` | fallback → `#e6b212` |
| `.cart-current-price` | color | `var(--pd-price-color, #ea580c)` | fallback → `#cc9900` |
| `.cart-add-btn` | background | `var(--pd-price-color, #ea580c)` | fallback → `#cc9900` |
| `.cart-ship-apply` | background | `var(--pd-price-color, #ea580c)` | fallback → `#cc9900` |
| `#cart-ship-change` | color | `var(--pd-price-color, #ea580c)` | fallback → `#cc9900` |
| `.cart-subtotal-price` | color | `var(--pd-price-color, #ea580c)` | fallback → `#cc9900` |

#### Settings & Account Pages

| Selector | Property | Eski | Yeni |
|----------|----------|------|------|
| `.settings-profile__avatar` | background gradient | `#fb923c → #ea580c` | `#e6b212 → #cc9900` |
| `.settings-profile__avatar` | border | `#fed7aa` | `var(--color-primary-200, #fbe08a)` |
| `.privacy__save-btn` | background | `#ea580c` | `var(--color-cta-primary, #cc9900)` |
| `.privacy__save-btn:hover` | background | `#c2410c` | `var(--color-cta-primary-hover, #b38600)` |
| `.privacy__radio input` | accent-color | `#ea580c` | `var(--color-cta-primary, #cc9900)` |
| `.acc-edit__verified` | color | `#ea580c` | `var(--color-cta-primary, #cc9900)` |
| `.acc-edit__btn--edit` | border | `#d97706` | `var(--color-primary-600, #b38600)` |
| `.acc-edit__btn--submit` | border | `#d97706` | `var(--color-primary-600, #b38600)` |
| `.profile-form__submit` | border | `#d97706` | `var(--color-primary-600, #b38600)` |
| `.profile-form__verified` | color | `#ea580c` | `var(--color-cta-primary, #cc9900)` |
| `.linked-acc__remove` | color | `#ea580c` | `var(--color-cta-primary, #cc9900)` |

#### Toggle Switches

| Selector | Property | Eski | Yeni |
|----------|----------|------|------|
| `.ad-pref__toggle input:checked + slider` | background | `#ea580c` | `var(--color-cta-primary, #cc9900)` |
| `.email-pref__toggle input:checked + slider` | background | `#ea580c` | `var(--color-cta-primary, #cc9900)` |

#### Password & Email/Phone Change

| Selector | Property | Eski | Yeni |
|----------|----------|------|------|
| `.pw-stepper__num--active` | background | `#ea580c` | `var(--color-cta-primary, #cc9900)` |
| `.pw-stepper__step--active .pw-stepper__label` | color | `#ea580c` | `var(--color-cta-primary, #cc9900)` |
| `.pw-card__timer` | border + color | `#ea580c` | `var(--color-cta-primary, #cc9900)` |
| `.pw-card__btn--primary` | background | `#ea580c` | `var(--color-cta-primary, #cc9900)` |
| `.pw-card__btn--primary:hover` | background | `#c2410c` | `var(--color-cta-primary-hover, #b38600)` |
| `.pw-card__code-input:focus` | border-color | `#ea580c` | `var(--color-cta-primary, #cc9900)` |
| `.pw-card__form-input:focus` | border-color | `#ea580c` | `var(--color-cta-primary, #cc9900)` |
| `.phone-change__submit-btn` | background | `#ea580c` | `var(--color-cta-primary, #cc9900)` |
| `.phone-change__submit-btn:hover` | background | `#c2410c` | `var(--color-cta-primary-hover, #b38600)` |
| `.phone-change__timer` | border + color | `#ea580c` | `var(--color-cta-primary, #cc9900)` |
| `.phone-change__code-input:focus` | border-color | `#ea580c` → `#111827` | (zaten siyah — değişmez) |
| `.email-change__submit-btn` | background | `#f9a87c` | `var(--color-primary-300, #f6c94d)` |
| `.email-change__submit-btn:hover` | background | `#ea580c` | `var(--color-cta-primary, #cc9900)` |
| `.del-acc__reason-select:focus` | border+shadow | `#ea580c` | `var(--color-cta-primary, #cc9900)` |
| `.del-acc__reason-other:focus` | border+shadow | `#ea580c` | `var(--color-cta-primary, #cc9900)` |
| `.del-acc__btn--primary` | background | `#ea580c` | `var(--color-cta-primary, #cc9900)` |
| `.del-acc__btn--primary:hover` | background | `#c2410c` | `var(--color-cta-primary-hover, #b38600)` |

#### Orders — Tax Modals (`.os-modal__*`)

| Selector | Property | Eski | Yeni |
|----------|----------|------|------|
| `.os-modal__input:focus` | border + shadow | `#F97316` | `var(--color-cta-primary, #cc9900)` |
| `.os-modal__select:focus` | border + shadow | `#F97316` | `var(--color-cta-primary, #cc9900)` |
| `.os-modal__radio checked` | border + `::after` bg | `#F97316` | `var(--color-cta-primary, #cc9900)` |
| `.os-modal__checkbox checked` | bg + border | `#F97316` | `var(--color-cta-primary, #cc9900)` |
| `.os-modal__btn--primary` | background | `#F97316` | `var(--color-cta-primary, #cc9900)` |
| `.os-modal__btn--primary:hover` | background | `#EA580C` | `var(--color-cta-primary-hover, #b38600)` |
| `.os-modal__link` | color | `#F97316` | `var(--color-cta-primary, #cc9900)` |
| `.os-modal__info-banner` | bg | `#FFF7ED` | `var(--color-primary-50, #fef9e7)` |
| `.os-modal__info-banner` | border | `#FED7AA` | `var(--color-primary-200, #fbe08a)` |
| `.os-modal__info-banner` | color | `#92400E` | `var(--color-primary-800, #6b5100)` |

#### Favorites Modal

| Selector | Property | Eski | Yeni |
|----------|----------|------|------|
| `.fav-modal__btn--save:not(:disabled)` | bg + border | `#F97316` | `var(--color-cta-primary, #cc9900)` |
| `.fav-modal__btn--save:hover` | background | `#EA580C` | `var(--color-cta-primary-hover, #b38600)` |

#### Subscription

| Selector | Property | Eski | Yeni |
|----------|----------|------|------|
| `.sub-pricing__badge` | color | `#F97316` | `var(--color-cta-primary, #cc9900)` |
| `.sub-pricing__badge` | background | `#FFF3E8` | `var(--color-primary-50, #fef9e7)` |
| `.sub-pricing__btn--primary` | background | `#F97316` | `var(--color-cta-primary, #cc9900)` |
| `.sub-pricing__btn--primary:hover` | background | `#EA580C` | `var(--color-cta-primary-hover, #b38600)` |
| `.sub-plan-card__banner` | background | `#FFF3E8` | `var(--color-primary-50, #fef9e7)` |
| `.sub-billing-toggle__save` | color | `#F97316` | `var(--color-cta-primary, #cc9900)` |

#### Dropshipping (`.ds-*`)

| Selector | Property | Eski | Yeni |
|----------|----------|------|------|
| `.ds-hero__search` | border | `2px solid #ea580c` | `2px solid var(--color-cta-primary, #cc9900)` |
| `.ds-hero__search-btn` | background | `#ea580c` | `var(--color-cta-primary, #cc9900)` |
| `.ds-hero__search-btn:hover` | background | `#c2410c` | `var(--color-cta-primary-hover, #b38600)` |
| `.ds-hero__title strong` | color | `#ea580c` | `var(--color-cta-primary, #cc9900)` |
| `.ds-chip--active` | border + color | `#ea580c` | `var(--color-cta-primary, #cc9900)` |
| `.ds-chip--active` | background | `#fff7ed` | `var(--color-primary-50, #fef9e7)` |
| `.ds-chip--orange` | bg + border | `#ea580c` | `var(--color-cta-primary, #cc9900)` |
| `.ds-card:hover .ds-card__title` | color | `#ea580c` | `var(--color-cta-primary, #cc9900)` |
| `.ds-category-tag--active` | border + color | `#ea580c` | `var(--color-cta-primary, #cc9900)` |
| `.ds-category-tag--active` | background | `#fff7ed` | `var(--color-primary-50, #fef9e7)` |
| `.ds-category-toggle` | color | `#ea580c` | `var(--color-cta-primary, #cc9900)` |
| `.ds-active-chip` | border + color | `#ea580c` | `var(--color-cta-primary, #cc9900)` |
| `.ds-active-chip` | background | `#fff7ed` | `var(--color-primary-50, #fef9e7)` |
| `.ds-active-chip:hover` | background | `#fed7aa` | `var(--color-primary-200, #fbe08a)` |
| `.ds-empty__cta` | background | `#ea580c` | `var(--color-cta-primary, #cc9900)` |
| `.ds-empty__cta:hover` | background | `#c2410c` | `var(--color-cta-primary-hover, #b38600)` |
| `.ds-toggle--on .ds-toggle__track` | background | `#ea580c` | `var(--color-cta-primary, #cc9900)` |
| `.ds-modal__btn--primary` | bg + border | `#ea580c` | `var(--color-cta-primary, #cc9900)` |
| `.ds-modal__btn--primary:hover` | bg + border | `#c2410c` | `var(--color-cta-primary-hover, #b38600)` |
| `.ds-modal__checkbox input` | accent-color | `#ea580c` | `var(--color-cta-primary, #cc9900)` |
| `.ds-orders__tab--active` | color + border | `#ea580c` | `var(--color-cta-primary, #cc9900)` |
| `.ds-page__nav-link--active` | color + border | `#ea580c` | `var(--color-cta-primary, #cc9900)` |

#### Reviews & Diğer

| Selector | Property | Eski | Yeni |
|----------|----------|------|------|
| `.rv-hidden-reviews-link` | color | `#f97316` | `var(--color-cta-primary, #cc9900)` |
| `.rv-login-banner` | gradient | `#fff1f2 → #ffe4e6` | `#fef9e7 → #fdf0c3` |
| `.searchx-product-e-title a:hover` | color | `#e65100` | `var(--color-cta-primary-hover, #b38600)` |
| `.auth-account-type-card:focus-visible` | outline | `#f97316` | `var(--color-primary-500)` |

#### Bazı Sayfalarda `#E67A00` Kullanımı

| Selector | Property | Eski | Yeni |
|----------|----------|------|------|
| `.msg-inbox__search-input:focus` | border-color | `#E67A00` | `var(--color-cta-primary, #cc9900)` |
| `.inq-actions__checkbox input` | accent-color | `#E67A00` | `var(--color-cta-primary, #cc9900)` |
| `.inq-actions__delete-btn` | color + border | `#E67A00` | `var(--color-cta-primary, #cc9900)` |
| `.inq-actions__search-input:focus` | box-shadow | `#E67A00` | `var(--color-cta-primary, #cc9900)` |
| `.contacts-list__title-btn:hover` | color | `#E67A00` | `var(--color-cta-primary, #cc9900)` |
| `.contacts-list__search-input:focus` | box-shadow | `#E67A00` | `var(--color-cta-primary, #cc9900)` |

### 2.4 seller-storefront.css Değişiklikleri

| Selector | Property | Eski | Yeni |
|----------|----------|------|------|
| `.store-hero__dot--active` | background | `#f97316` | `var(--color-store-accent, #cc9900)` |
| `.certificates__dots .swiper-pagination-bullet-active` | background | `#f97316` | `var(--color-store-accent, #cc9900)` |

> **Not:** seller-storefront.css zaten `var(--color-store-accent)` token'ları kullanıyor. Sadece @theme'deki token değerleri değişince otomatik yansır. Yukarıdaki 2 satır hardcoded fallback.

### 2.5 Korunan Renkler (DEĞİŞMEZ)

| Renk Grubu | Hex Değerleri | Sebep |
|------------|---------------|-------|
| Kırmızı error | `#ef4444`, `#dc2626`, `#b91c1c`, `#e53935` | Hata/validasyon |
| Kırmızı fiyat | `#cc0000`, `#DE0505` | İndirimli fiyat gösterimi |
| Kırmızı discount | `rgb(247,66,30)`, `#ff4d12` | Discount badge |
| Kırmızı delete | `#dc2626` (del-acc) | Hesap silme aksiyonu |
| Yeşil success | `#22c55e`, `#16a34a`, `#15803d`, `#00B96B` | Onay, verified, Trade Assurance |
| Mavi link | `#2563eb`, `#1d4ed8`, `#3b82f6`, `#2080D0` | Navigation linkleri |
| Mavi info | `#0b65c2` | Verified supplier badge |
| Sarı star | `#f59e0b`, `#fbbf24`, `#fcd34d`, `#f5a623` | Rating yıldızları |
| Rose/pink | `#f43f5e`, `#fff1f2`, `#ffe4e6` | Login banner (değişecek → altın tint) |

---

## 3. Token Mimarisi — 3 Katman {#3-token-mimarisi}

### Katman 1 — Primitive (Zaten @theme'de mevcut)

Primary altın skalası, secondary gri, accent turkuaz, semantic (success/warning/error/info), surface, text, border — bunlar mevcut ve dokunulmayacak.

### Katman 2 — Semantic (EKLENECEK)

Aşağıdaki token'lar @theme bloğuna eklenecek:

```css
@theme {
  /* ... mevcut token'lar ... */

  /* ── YENİ: CTA Semantic ── */
  --color-cta-primary:        var(--color-primary-500);   /* #cc9900 */
  --color-cta-primary-hover:  var(--color-primary-600);   /* #b38600 */
  --color-cta-primary-light:  var(--color-primary-400);   /* #e6b212 */
  --color-cta-primary-tint:   var(--color-primary-50);    /* #fef9e7 */

  /* ── YENİ: Text Normalizasyon ── */
  --color-text-heading:       #111827;
  --color-text-body:          #333333;
  --color-text-muted:         #666666;
  --color-text-placeholder:   #999999;

  /* ── YENİ: Border Normalizasyon ── */
  --color-border-light:       #f0f0f0;
  --color-border-medium:      #d1d5db;
}
```

> **Not:** `--color-text-primary` (#0a0a0a) ve `--color-text-secondary` (#525252) zaten var ama sayfa CSS'lerinde `#222222`, `#333333`, `#666666` kullanılıyor. Yeni token'lar bu gap'i kapatır.

### Katman 3 — Component (Panel Kontrolü İçin)

Mevcut eksikler — @theme'e eklenmeli:

```css
/* ── CTA Button Token'ları ── */
--pd-cta-primary-bg:     var(--color-cta-primary);
--pd-cta-primary-hover:  var(--color-cta-primary-hover);
--search-btn-bg:         var(--color-cta-primary);
--search-btn-hover:      var(--color-cta-primary-hover);

/* ── Genel Aksiyon Token'ları ── */
--toggle-active-bg:      var(--color-cta-primary);
--modal-btn-primary-bg:  var(--color-cta-primary);
--stepper-active-bg:     var(--color-cta-primary);
```

---

## 4. Hardcoded Hex → Token Tablosu {#4-hardcoded-token}

CSS rule'ları içinde tekrar eden hardcoded hex değerlerin normalize edilmesi:

### Text Renkleri

| Hardcoded | Gerçek Kullanım | Token |
|-----------|-----------------|-------|
| `#222222`, `#222` | heading, title, name | `var(--color-text-heading, #111827)` |
| `#333333`, `#333` | body text, descriptions | `var(--color-text-body, #333333)` |
| `#444`, `#444444` | alt body text | `var(--color-text-body, #333333)` |
| `#555`, `#555555` | muted body | `var(--color-text-muted, #666666)` |
| `#666666`, `#666` | muted labels | `var(--color-text-muted, #666666)` |
| `#888`, `#888888` | subdued text | `var(--color-text-placeholder, #999999)` |
| `#999999`, `#999` | placeholder, disabled | `var(--color-text-placeholder, #999999)` |
| `#aaa`, `#bbb` | very muted | `var(--color-text-tertiary, #a3a3a3)` |
| `#111827` | Tailwind gray-900 | `var(--color-text-heading, #111827)` |
| `#374151` | Tailwind gray-700 | `var(--color-text-body, #333333)` |
| `#4b5563` | Tailwind gray-600 | `var(--color-text-muted, #666666)` |
| `#6b7280` | Tailwind gray-500 | `var(--color-text-muted, #666666)` |
| `#9ca3af` | Tailwind gray-400 | `var(--color-text-placeholder, #999999)` |

### Border Renkleri

| Hardcoded | Token |
|-----------|-------|
| `#e5e7eb` | `var(--color-border-default, #e5e5e5)` |
| `#e5e5e5` | `var(--color-border-default, #e5e5e5)` |
| `#e8e8e8` | `var(--color-border-default, #e5e5e5)` |
| `#d1d5db` | `var(--color-border-medium, #d1d5db)` |
| `#d9d9d9` | `var(--color-border-medium, #d1d5db)` |
| `#f0f0f0` | `var(--color-border-light, #f0f0f0)` |
| `#f3f4f6` (border) | `var(--color-border-light, #f0f0f0)` |
| `#f5f5f5` (divider) | `var(--color-border-light, #f0f0f0)` |

### Surface/Background Renkleri

| Hardcoded | Token |
|-----------|-------|
| `#ffffff`, `#fff` | `var(--color-surface, #ffffff)` |
| `#fafafa` | `var(--color-surface-muted, #fafafa)` |
| `#f9fafb` | `var(--color-surface-muted, #fafafa)` |
| `#f5f5f5` (bg) | `var(--color-surface-raised, #f5f5f5)` |
| `#f3f4f6` (bg) | `var(--color-surface-raised, #f5f5f5)` |
| `#F4F4F4` | `var(--color-surface-raised, #f5f5f5)` |
| `#F8F8F8` | `var(--color-surface-raised, #f5f5f5)` |
| `#F7F7F7` | `var(--color-surface-raised, #f5f5f5)` |

### Turuncu Tint → Altın Tint

| Eski | Yeni | Kullanım |
|------|------|----------|
| `#FFF7ED` | `var(--color-primary-50, #fef9e7)` | chip active bg |
| `#FFF3E8` | `var(--color-primary-50, #fef9e7)` | subscription banner |
| `#FFF3E0` | `var(--color-primary-50, #fef9e7)` | card badge bg |
| `#fff7ed` | `var(--color-primary-50, #fef9e7)` | DS chip bg |
| `#FED7AA` | `var(--color-primary-200, #fbe08a)` | border tint |
| `#fed7aa` | `var(--color-primary-200, #fbe08a)` | avatar border |
| `#92400E` | `var(--color-primary-800, #6b5100)` | dark tint text |

---

## 5. Tailwind-First Strateji {#5-tailwind-first}

### Üç Kural

| # | Durum | Aksiyon |
|---|-------|---------|
| 1 | Tailwind utility yapabilir | CSS'ten SİL → HTML'de class yaz |
| 2 | Tailwind yapamaz | CSS'te KORU |
| 3 | Token-driven görünüm | CSS'te `var(--token, #fallback)` ile KORU |

### SİLİNECEK Pattern'ler → Tailwind'e Taşınacak (~950 satır)

#### Empty State (9× tekrar)

CSS'te: `.inq-empty`, `.orders__empty`, `.os-empty`, `.ds-empty`, `.pay-empty`, `.fav-empty`, `.msg-content__empty`, `.contacts-list__empty`, `.orders-page__empty`

```html
<!-- Tailwind karşılığı -->
<div class="flex flex-col items-center text-center gap-4 py-16 px-6">
```

#### Modal Overlay (7× tekrar)

CSS'te: `.rv-modal-overlay`, `.rv-login-overlay`, `.cart-ship-modal-overlay`, `.os-modal`, `.fav-modal`, `.pay-modal`, `.ds-modal`

```html
<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
```

#### Tab System (10× tekrar)

CSS'te: `.inq-tabs`, `.fav-tabs`, `.log-tabs`, `.pay-tabs`, `.os-tabs`, `.rv-sub-tabs`, `.tax-info__tabs`, `.orders__tabs`, `.ds-orders__tabs`, `#pd-card-tabs`

```html
<div class="flex border-b border-border-default overflow-x-auto scrollbar-hide">
```

#### Close Button (10× tekrar)

CSS'te: `.rv-modal-close`, `.rv-login-close`, `.cart-drawer-close`, `.cart-ship-modal-close`, `.os-modal__close`, `.fav-modal__close`, `.pay-modal__close`, `.ds-modal__close`, `.pdm-sheet-close`, `.msg-feedback__close`

```html
<button class="size-8 flex items-center justify-center rounded-full hover:bg-surface-raised">
```

#### Search Box (6× tekrar)

CSS'te: `.inq-actions__search`, `.contacts-list__search`, `.os-reviews-toolbar__search`, `.log-review-search__wrap`, `.pay-tt-filters__search`, `.msg-inbox__search`

```html
<div class="flex items-stretch border border-border-medium rounded-md overflow-hidden">
```

#### Sidebar Nav (3× tekrar)

CSS'te: `.orders-page__nav-link`, `.pay-nav__link`, `.os-nav__item`

```html
<a class="block px-5 py-2.5 text-sm border-l-[3px] border-transparent hover:bg-surface-muted">
```

#### Pill/Chip (5× tekrar) + Dropdown Panel (4× tekrar)

Aynı pattern — Tailwind utility ile değiştirilebilir.

### CSS'TE KALACAKLAR (Tailwind Yapamaz)

| Bölüm | Neden | ~Satır |
|-------|-------|--------|
| Product card hFR19/fy26 | Alibaba DOM'una snapshot-matched | ~320 |
| Topbar search expansion | `is-expanded` state orchestration | ~200 |
| Gallery + Lightbox | Zoom transform-origin, fullscreen layout | ~310 |
| Product detail layout | Sticky + overflow scroll combo | ~100 |
| Reviews section | Pseudo-element tabs (`::after`) | ~200 |
| Cart drawer | Bottom sheet transform, safe-area-inset, `::before` drag handle | ~250 |
| Mobile PD | Scroll-snap carousel, bottom sheets | ~280 |
| Swiper integrations | `.swiper-slide`, `.swiper-pagination-bullet` | ~40 |
| Keyframes | 7 animation | ~50 |
| Checkbox pseudo | `::after` checkmark/indeterminate | ~25 |
| Number picker | `::-webkit-inner-spin-button` hide | ~10 |
| Scrollbar custom | `::-webkit-scrollbar` | ~15 |
| Dashboard sidebar | Collapse/expand hover transition (`.ds-sidebar-col`) | ~70 |
| Auth components | `::before` radio circle, password `::before` checkmark SVG | ~60 |
| Hover expand center | `::before` scaleX animation | ~15 |
| Seller storefront | Dot pagination, scrollbar, mobile menu transition, dark mode | ~380 |

### @apply Kısaltma (Component Class'lar)

```css
.th-btn {
  @apply inline-flex items-center justify-center gap-1.5 cursor-pointer transition-all duration-150;
  /* Görünüm → var(--token) ile kalır */
  background: var(--btn-bg);
  color: var(--btn-text);
  border: var(--btn-border-width) solid var(--btn-border-color);
  border-radius: var(--radius-button);
  padding: var(--spacing-button-y) var(--spacing-button-x);
  font-size: var(--btn-font-size);
  font-weight: var(--btn-font-weight);
  box-shadow: var(--btn-shadow);
}
```

> **@apply Kuralı:** SADECE layout/behavior (display, flex, cursor, transition) için. Renk, radius, padding → `var(--token)`.

---

## 6. Panel Kontrol Sistemi {#6-panel-kontrol}

### Panel'den Değiştirilebilecek Token'lar

```javascript
const panelTokens = {
  // Ana Renk
  '--color-primary-500':       { type: 'color',  label: 'Ana Renk' },
  '--color-cta-primary':       { type: 'color',  label: 'CTA Buton Rengi' },

  // Button
  '--btn-bg':                  { type: 'color',  label: 'Buton Arka Plan' },
  '--btn-text':                { type: 'color',  label: 'Buton Yazı' },
  '--radius-button':           { type: 'slider', label: 'Buton Radius', min: 0, max: 32 },

  // Card
  '--card-bg':                 { type: 'color',  label: 'Kart Arka Plan' },
  '--radius-card':             { type: 'slider', label: 'Kart Radius', min: 0, max: 24 },
  '--card-border-width':       { type: 'select', options: ['0px', '1px'] },
  '--shadow-card':             { type: 'select', options: ['none', 'var(--shadow-sm)', 'var(--shadow-md)'] },

  // Product Card
  '--product-card-radius':     { type: 'slider', min: 0, max: 24 },
  '--product-card-border-width': { type: 'select', options: ['0px', '1px'] },
  '--product-card-shadow':     { type: 'select', options: ['none', 'var(--shadow-sm)'] },

  // Input
  '--radius-input':            { type: 'slider', min: 0, max: 16 },

  // Modal
  '--radius-modal':            { type: 'slider', min: 0, max: 32 },

  // Header/Footer
  '--header-bg':               { type: 'color' },
  '--footer-bg':               { type: 'color' },
};
```

### Override Mekanizması

```javascript
function applyTheme(overrides) {
  Object.entries(overrides).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  });
}

// Preset örneği
applyTheme({
  '--radius-card': '16px',
  '--radius-button': '12px',
  '--radius-input': '12px',
  '--product-card-radius': '16px',
});
```

---

## 7. Migrasyon Planı — 6 Faz {#7-migrasyon}

### Faz 1 — Token Ekleme (0 Risk)

@theme bloğuna Bölüm 3'teki semantic token'ları ekle. Hiçbir şey bozulmaz.

### Faz 2 — Renk Dönüşümü (Turuncu → Altın)

1. @theme token değerlerini değiştir (Bölüm 2.2)
2. CSS rule fallback'leri güncelle (Bölüm 2.3 tablosu)
3. seller-storefront.css fallback'leri güncelle (Bölüm 2.4)

**Doğrulama:**
```bash
grep -rn '#ea580c\|#e85d04\|#ff6600\|#FF6600\|#f97316\|#F97316\|#c2410c\|#E65C00\|#e8540c\|#FF6A00\|#f15f00\|#d45303\|#E67A00\|#e65100\|#fb923c\|#f9a87c' style.css
# Sonuç: 0 satır olmalı
```

### Faz 3 — Kolay Sayfalar (Tailwind Migrasyon)

**Sıra:** Messages → Contacts → Inquiries → Favorites → Subscription

Her sayfa için:
1. Empty state class sil → HTML'de Tailwind
2. Tab class sil → HTML'de Tailwind
3. Search box class sil → HTML'de Tailwind
4. Close button class sil → HTML'de Tailwind
5. Test, commit

### Faz 4 — Orta Karmaşıklık

**Sıra:** Orders → Payment → Logistics → Dropshipping → Dashboard

### Faz 5 — Karmaşık Sayfalar

**Sıra:** Product Detail → Cart Drawer (en son)

### Faz 6 — Kalan Hardcoded Hex → Token

Bölüm 4'teki tabloyu uygula. CSS'te kalan tüm hardcoded hex → `var(--token, #fallback)`.

**Doğrulama:**
```bash
grep -n '#[0-9a-fA-F]\{6\}' style.css | grep -v '@theme' | grep -v 'var(' | grep -v 'rgba\|rgb\|linear-gradient\|url('
# Sadece korunan renkler (kırmızı error/fiyat, yeşil, mavi) kalmalı
```

---

## 8. Tahmini Sonuç & PR Checklist {#8-sonuc}

### Satır Tahmini

```
Mevcut:    ~6900 satır (style.css) + ~380 (seller-storefront.css)

Silinen:   ~4600 satır
  ├── Tailwind migrasyon:       ~950 (9 pattern × çoklu sayfa)
  ├── Duplicate birleştirme:    ~600 (7 modal anim → 1, border normalize)
  ├── Hardcoded → token:        ~200 (hex tekrar azalır)
  └── Sayfa layout temizlik:    ~2850 (layout → HTML)

Kalan:     ~2300 satır (style.css) + ~380 (seller-storefront)

Yapı:
  @theme tokens .............. ~350
  Base layer ................. ~30
  Component classes (th-*) ... ~200
  Utilities .................. ~150
  Product card hFR19/fy26 .... ~320
  Topbar search .............. ~200
  Gallery + lightbox ......... ~310
  PD layout + info card ...... ~200
  Reviews .................... ~100
  Cart drawer ................ ~200
  Mobile PD .................. ~150
  Dashboard sidebar .......... ~70
  Auth components ............ ~50
  Keyframes + dark mode ...... ~50
```

### PR Checklist

Her PR'da kontrol edilecekler:

- [ ] Silinen CSS'in Tailwind karşılığı HTML'de var mı?
- [ ] Turuncu hex kalmadı mı? (`grep '#ea580c\|#e85d04\|#ff6600\|#f97316\|#E67A00'`)
- [ ] Kalan CSS'te hardcoded hex token'a bağlı mı? (`grep '#[0-9a-f]{6}' | grep -v '@theme\|var(\|rgba\|rgb\|url('`)
- [ ] Her `var()` çağrısında fallback var mı?
- [ ] `#e5e7eb` doğrudan kullanılmıyor mu? → `var(--color-border-default)`
- [ ] `#222222` doğrudan kullanılmıyor mu? → `var(--color-text-heading)`
- [ ] Modal animation tek keyframe mi? (duplicate yok mu?)
- [ ] Build başarılı mı?
- [ ] Responsive bozulmadı mı? (320px, 768px, 1024px)
- [ ] style.css satır sayısı artmadı mı?

---

## 9. Hızlı Referans — Renk Paleti {#9-referans}

### Primary (Altın)

| Token | Hex | Kullanım |
|-------|-----|----------|
| `--color-primary-50` | `#fef9e7` | Active tint bg |
| `--color-primary-100` | `#fdf0c3` | Light hover |
| `--color-primary-200` | `#fbe08a` | Border tint |
| `--color-primary-300` | `#f6c94d` | Light accent |
| `--color-primary-400` | `#e6b212` | CTA light |
| **`--color-primary-500`** | **`#cc9900`** | **Ana CTA** |
| `--color-primary-600` | `#b38600` | CTA hover |
| `--color-primary-700` | `#8a6800` | CTA pressed |
| `--color-primary-800` | `#6b5100` | Dark accent |
| `--color-primary-900` | `#4d3a00` | Darkest |

### Semantic CTA (YENİ)

| Token | Değer | Kullanım |
|-------|-------|----------|
| `--color-cta-primary` | `var(--color-primary-500)` | Tüm CTA butonları |
| `--color-cta-primary-hover` | `var(--color-primary-600)` | CTA hover |
| `--color-cta-primary-light` | `var(--color-primary-400)` | Light CTA |
| `--color-cta-primary-tint` | `var(--color-primary-50)` | Active tint bg |

### Text Normalizasyon

| Token | Hex | Karşılığı |
|-------|-----|-----------|
| `--color-text-heading` | `#111827` | `#222`, `#222222`, `#111827`, `#1f2937` |
| `--color-text-body` | `#333333` | `#333`, `#374151`, `#444` |
| `--color-text-muted` | `#666666` | `#666`, `#555`, `#6b7280`, `#4b5563` |
| `--color-text-placeholder` | `#999999` | `#999`, `#888`, `#9ca3af`, `#aaa`, `#bbb` |

### Border Normalizasyon

| Token | Hex | Karşılığı |
|-------|-----|-----------|
| `--color-border-default` | `#e5e5e5` | `#e5e5e5`, `#e5e7eb`, `#e8e8e8` |
| `--color-border-medium` | `#d1d5db` | `#d1d5db`, `#d9d9d9` |
| `--color-border-light` | `#f0f0f0` | `#f0f0f0`, `#f3f4f6` (border olarak) |

### Surface Normalizasyon

| Token | Hex | Karşılığı |
|-------|-----|-----------|
| `--color-surface` | `#ffffff` | `#fff`, `#ffffff` |
| `--color-surface-muted` | `#fafafa` | `#fafafa`, `#f9fafb` |
| `--color-surface-raised` | `#f5f5f5` | `#f5f5f5`, `#f3f4f6`, `#F4F4F4`, `#F7F7F7`, `#F8F8F8` |

---

## 10. Yeni CSS Yazma Kuralları

1. **Önce Tailwind** — Layout (flex, grid, gap, padding) → HTML'de utility class
2. **Token zorunlu** — Renk, radius, border, shadow → `var(--token, #fallback)`
3. **Fallback zorunlu** — Her `var()` çağrısında fallback: `var(--btn-bg, #cc9900)`
4. **Namespace** — `--{sayfa}-{element}-{property}` (örn: `--ds-cta-bg`)
5. **Hardcoded hex yasak** — `background: #ea580c` ❌ → `background: var(--color-cta-primary, #cc9900)` ✅
6. **Satır artırmama** — Yeni CSS eklerken eşdeğer miktarı Tailwind'e taşı
7. **Turuncu kullanma** — Hiçbir yerde `#ea580c`, `#ff6600`, `#f97316` gibi turuncu hex kullanma

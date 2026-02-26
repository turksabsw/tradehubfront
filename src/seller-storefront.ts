/**
 * Seller Storefront — Page Orchestrator
 * Imports all components, renders into #app, initializes interactions
 */
import './style.css';
import './styles/seller/seller-storefront.css';
import { initFlowbite } from 'flowbite';
import 'swiper/swiper-bundle.css';

// Components
import {
  StoreHeader,
  StoreNav,
} from './components/seller';

import { CompanyProfileComponent } from './components/seller/CompanyProfile';

// Mock Data
import { sellerData, sellerStats, sellerReviews } from './data/seller/mockData';

// Interactions
import { initSellerStorefront } from './utils/seller/interactions';

// ─── Render ─────────────────────────────────────────────
const appEl = document.querySelector<HTMLDivElement>('#app')!;

appEl.innerHTML = `
  <!-- SITE HEADER BURAYA GELİR -->

  <main class="seller-storefront" data-seller-slug="${sellerData.seller.slug}">
    ${StoreHeader(sellerData.seller)}
    ${StoreNav(sellerData.navData)}

    <!-- PROFILE VIEW -->
    ${CompanyProfileComponent(
  sellerData.seller,
  sellerStats,
  sellerReviews,
  sellerData.hotProducts,
  sellerData.categoryListings || []
)}

  </main>

  <!-- SITE FOOTER BURAYA GELİR -->
`;

// ─── Initialize ─────────────────────────────────────────
initFlowbite();
initSellerStorefront();

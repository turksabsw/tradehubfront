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
  HeroBanner,
  CategoryGrid,
  HotProducts,
  CategoryProductListing,
  CompanyInfoComponent,
  Certificates,
  WhyChooseUs,
  CompanyIntroduction,
  Gallery,
  ContactForm,
  FloatingActions,
} from './components/seller';

// Mock Data
import { sellerData } from './data/seller/mockData';

// Interactions
import { initSellerStorefront } from './utils/seller/interactions';

// ─── Render ─────────────────────────────────────────────
const appEl = document.querySelector<HTMLDivElement>('#app')!;

const isPro = sellerData.seller.verificationBadgeType === 'pro';

appEl.innerHTML = `
  <!-- SITE HEADER BURAYA GELİR -->

  <main class="seller-storefront" data-seller-slug="${sellerData.seller.slug}">
    ${StoreHeader(sellerData.seller)}
    ${StoreNav(sellerData.navData)}
    ${HeroBanner(sellerData.heroBanner)}
    ${sellerData.seller.hasCategoryGrid && sellerData.categoryCards ? CategoryGrid(sellerData.categoryCards) : ''}
    ${HotProducts(sellerData.hotProducts)}
    ${sellerData.seller.hasCategoryListing && sellerData.categoryListings ? CategoryProductListing(sellerData.categoryListings) : ''}
    ${CompanyInfoComponent(sellerData.company, sellerData.seller)}
    ${sellerData.certificates && sellerData.certificates.length ? Certificates(sellerData.certificates) : ''}
    ${WhyChooseUs(sellerData.advantages, sellerData.features, isPro)}
    ${sellerData.companyInfoCells && sellerData.companyInfoCells.length ? CompanyIntroduction(sellerData.seller, sellerData.companyInfoCells, sellerData.companyPhotos || []) : ''}
    ${sellerData.galleryPhotos && sellerData.galleryPhotos.length ? Gallery(sellerData.galleryPhotos) : ''}
    ${ContactForm(sellerData.contactForm)}
  </main>

  ${FloatingActions(sellerData.floatingActions)}

  <!-- SITE FOOTER BURAYA GELİR -->
`;

// ─── Initialize ─────────────────────────────────────────
initFlowbite();
initSellerStorefront();

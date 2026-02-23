/**
 * Footer Components Barrel Export
 * FooterLinks is the main consolidated footer component.
 * Other components are kept for backwards compatibility but return empty strings.
 */

// FooterLinks - consolidated footer (logo, social, columns, payment badges, policy bar)
export { FooterLinks, getFooterColumnsData } from './FooterLinks';

// FooterGroup - payment badges (called internally by FooterLinks)
export { FooterGroup } from './FooterGroup';

// FooterPolicy - bottom bar with policy links + copyright (called internally by FooterLinks)
export { FooterPolicy, getPolicyLinksData } from './FooterPolicy';

// FooterSocial - deprecated, returns empty string (migrated to FooterLinks)
export { FooterSocial, getSocialLinksData, getAppStoreBadgesData } from './FooterSocial';

// FooterCopyright - deprecated, returns empty string (migrated to FooterPolicy)
export { FooterCopyright, getCopyrightConfig } from './FooterCopyright';

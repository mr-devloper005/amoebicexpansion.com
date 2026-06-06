import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'A premium home for polished documents and useful reading.',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: '',
    primaryLinks: [
      { label: 'Library', href: '/pdf' },
      { label: 'Articles', href: '/article' },
      { label: 'Visuals', href: '/image' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Browse the library', href: '/pdf' },
      secondary: { label: 'Get in touch', href: '/contact' },
    },
  },
  footer: {
    tagline: 'Editorial discovery for documents, resources, and visual reading.',
    description:
      'Discover PDFs, articles, image-led posts, bookmarks, profiles, and listings through a calmer platform inspired by premium publishing systems.',
    columns: [
      {
        title: 'Browse',
        links: [
          { label: 'PDF Library', href: '/pdf' },
          { label: 'Articles', href: '/article' },
          { label: 'Images', href: '/image' },
          { label: 'Bookmarks', href: '/sbm' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
          { label: 'Search', href: '/search' },
        ],
      },
    ],
    bottomNote: 'Built for thoughtful reading, polished archives, and connected discovery.',
  },
  commonLabels: {
    readMore: 'Read more',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const

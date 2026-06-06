import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Premium PDF discovery and document reading',
      description: 'Explore PDFs, guides, reference files, and connected editorial content through a polished library-style experience.',
      openGraphTitle: 'Premium PDF discovery and document reading',
      openGraphDescription: 'Discover documents, guides, and editorial resources through a premium archive-inspired interface.',
      keywords: ['pdf library', 'document archive', 'premium reading platform', 'reference documents'],
    },
    hero: {
      badge: 'Document publishing technology for modern readers',
      title: ['Global document discovery for', 'PDF lovers, archive builders, and classic readers.'],
      description:
        'Browse polished PDFs, timeless guides, visual references, and supporting resources through a reading-first platform inspired by premium publishing experiences.',
      primaryCta: { label: 'Browse the PDF library', href: '/pdf' },
      secondaryCta: { label: 'Search the archive', href: '/search' },
      searchPlaceholder: 'Search reports, handbooks, guides, and public documents',
      focusLabel: 'Featured',
      featureCardBadge: 'editorial selection',
      featureCardTitle: 'A homepage shaped like a curated publishing platform.',
      featureCardDescription: 'Large headlines, discovery rails, guided categories, and rich document cards keep the archive feeling elevated.',
    },
    intro: {
      badge: 'Why it works',
      title: 'A premium library feel for practical documents and connected reading.',
      paragraphs: [
        'The platform brings PDFs, articles, listings, profiles, and visuals into one carefully paced interface so readers can move from file to file without losing context.',
        'Instead of treating documents like plain downloads, the experience frames them like part of a larger editorial collection with stronger hierarchy and better browsing flow.',
        'Readers can discover featured files, compare categories, scan archive sections, and continue into related content through consistent visual cues.',
      ],
      sideBadge: 'Highlights',
      sidePoints: [
        'Reading-first interface inspired by premium publishing platforms.',
        'Document-led navigation with archive, search, and category cues.',
        'Multiple card styles so discovery feels curated instead of repetitive.',
        'Mobile-friendly layouts with polished spacing and resilient fallbacks.',
      ],
      primaryLink: { label: 'Open the PDF library', href: '/pdf' },
      secondaryLink: { label: 'Explore articles', href: '/article' },
    },
    cta: {
      badge: 'Start browsing',
      title: 'Explore documents, stories, and references through one elegant archive.',
      description:
        'Move from featured PDFs to topic collections, visual inspiration, supporting articles, and contact lanes without leaving the editorial flow.',
      primaryCta: { label: 'Browse PDFs', href: '/pdf' },
      secondaryCta: { label: 'Contact us', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest additions to this collection.',
    },
  },
  about: {
    badge: 'About the Archive',
    title: 'A reading-first document archive built for clean discovery.',
    description: `${slot4BrandConfig.siteName} is designed around PDFs, guides, reference files, and archive-style browsing so readers can move through practical material with clarity and confidence.`,
    paragraphs: [
      'The site treats documents like a curated collection instead of a plain list of downloads, using strong hierarchy, calm spacing, and connected navigation to keep reading comfortable.',
      'From featured PDFs and topic shelves to search, related content, and supporting pages, every section is organized to help visitors find useful material faster.',
    ],
    values: [
      {
        title: 'Document-led structure',
        description: 'PDFs, resources, and reference files are presented with clear labels, strong headlines, and archive cues that make the collection easier to scan.',
      },
      {
        title: 'Cleaner discovery flow',
        description: 'Search, category blocks, related entries, and featured rails work together so readers can keep moving without losing context.',
      },
      {
        title: 'Editorial presentation',
        description: 'Typography, spacing, and card rhythm are tuned to give practical files a premium publishing feel across desktop and mobile.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'A contact experience designed like a premium publishing platform, not a generic form page.',
    description:
      'Tell us what kind of document, archive, collection, or publishing support you need and we will route the request through the most relevant lane.',
    formTitle: 'Send your note',
  },
  search: {
    metadata: {
      title: 'Search the archive',
      description: 'Search documents, topics, categories, and content types across the full site.',
    },
    hero: {
      badge: 'Archive search',
      title: 'Find documents, visuals, listings, and stories with a cleaner search flow.',
      description: 'Use keywords, categories, and content-type filters to move through the library with speed and confidence.',
      placeholder: 'Search titles, categories, topics, and reference terms',
    },
    resultsTitle: 'Freshly indexed reading and document results',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Create and submit new content for the site.',
    },
    locked: {
      badge: 'Member access',
      title: 'Sign in to add a new entry to the archive.',
      description: 'Use your account to open the submission workspace and draft content for the live sections of the site.',
    },
    hero: {
      badge: 'Submission desk',
      title: 'Create polished entries for every active section.',
      description: 'Choose a content type, add key details, and prepare a clean record with headline, summary, image, links, and main content.',
    },
    formTitle: 'Entry details',
    submitLabel: 'Submit entry',
    successTitle: 'Entry saved successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login page for this site.',
      badge: 'Reader account',
      title: 'Welcome back to the archive.',
      description: 'Sign in to continue exploring, managing submissions, and opening the publishing workspace.',
      formTitle: 'Login',
      submitLabel: 'Continue',
      noAccount: 'No account matched those details. Create an account first, then try again.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Signup page for this site.',
      badge: 'Create access',
      title: 'Open your account and start building the collection.',
      description: 'Create an account to access the submission workspace, save details, and publish across the active sections.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Login',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Suggested reading',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit website',
    },
  },
} as const

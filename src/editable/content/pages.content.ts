import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Ideas that grow, connect, and take new shape',
      description: 'Explore thoughtful stories, emerging ideas, and creative perspectives from Amoebic Expansion.',
      openGraphTitle: 'Ideas that grow, connect, and take new shape',
      openGraphDescription: 'A living collection of thoughtful stories, emerging ideas, and creative perspectives.',
      keywords: ['ideas', 'culture', 'creativity', 'discovery', 'Amoebic Expansion'],
    },
    hero: {
      badge: 'Curiosity without fixed boundaries',
      title: ['Ideas expand.', 'Perspectives evolve.'],
      description:
        'Amoebic Expansion follows compelling ideas as they grow, connect, and take unexpected forms across creativity, culture, technology, and everyday life.',
      primaryCta: { label: 'Start exploring', href: '/search' },
      secondaryCta: { label: 'About us', href: '/about' },
      searchPlaceholder: 'Search ideas, stories, and perspectives',
      focusLabel: 'Featured',
      featureCardBadge: 'editorial selection',
      featureCardTitle: 'A homepage shaped like a curated publishing platform.',
      featureCardDescription: 'Large headlines, guided themes, and varied perspectives make exploration feel open and engaging.',
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
      title: 'Explore ideas, stories, and perspectives that keep moving outward.',
      description:
        'Follow a question, discover an unexpected connection, and find a fresh way to look at the world around you.',
      primaryCta: { label: 'Start exploring', href: '/search' },
      secondaryCta: { label: 'Contact us', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest additions to this collection.',
    },
  },
  about: {
    badge: 'About us',
    title: 'A place for ideas that refuse to stay still.',
    description: `${slot4BrandConfig.siteName} is an independent space for curiosity, connection, and discovery—following ideas as they change shape and lead somewhere new.`,
    paragraphs: [
      'Our name reflects the way curiosity moves: outward, organically, and without a rigid path. We bring together thoughtful stories and perspectives from creativity, culture, technology, and the changing world around us.',
      'We value clear thinking, surprising connections, and work that gives readers room to pause, question, and see familiar subjects differently.',
    ],
    values: [
      {
        title: 'Curiosity first',
        description: 'We begin with questions worth following and stay open to where the exploration leads.',
      },
      {
        title: 'Unexpected connections',
        description: 'The most interesting ideas often live between subjects, disciplines, and points of view.',
      },
      {
        title: 'Room to expand',
        description: 'We make space for thoughtful work to develop, evolve, and spark a new line of inquiry.',
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

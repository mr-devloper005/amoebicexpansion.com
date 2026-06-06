import type { TaskKey } from '@/lib/site-config'

export type TaskPageVoice = {
  eyebrow: string
  headline: string
  description: string
  filterLabel: string
  secondaryNote: string
  chips: string[]
}

export const taskPageVoices = {
  article: {
    eyebrow: 'Editorial reading room',
    headline: 'Long-form articles presented with premium pacing and visual restraint.',
    description: 'Article pages should feel like part of a refined publication with large headlines, generous spacing, and strong reading hierarchy.',
    filterLabel: 'Choose article topic',
    secondaryNote: 'Long reads need calm typography, soft contrast, and fewer interruptions.',
    chips: ['Editorial pacing', 'Long reads', 'Clean hierarchy'],
  },
  classified: {
    eyebrow: 'Offers desk',
    headline: 'Classified posts arranged for quick scanning without losing polish.',
    description: 'Classified layouts should feel immediate and practical, with strong price, condition, and action cues.',
    filterLabel: 'Filter classified category',
    secondaryNote: 'Urgent content still benefits from clear structure and premium presentation.',
    chips: ['Fast scan', 'Action cues', 'Offer details'],
  },
  sbm: {
    eyebrow: 'Reference shelf',
    headline: 'Saved resources arranged like curated shelves of useful links.',
    description: 'Bookmark pages should feel collected, organized, and easy to return to when researching or browsing references.',
    filterLabel: 'Filter collection',
    secondaryNote: 'Reference tools work best when metadata is calm and cards stay concise.',
    chips: ['Resource shelves', 'Reference flow', 'Curated links'],
  },
  profile: {
    eyebrow: 'People and studios',
    headline: 'Profiles with identity, context, and stronger trust cues.',
    description: 'Profile pages should lead with names, roles, and useful context so people and brands feel well-presented rather than buried.',
    filterLabel: 'Filter profile category',
    secondaryNote: 'Identity-first layouts make people easier to understand at a glance.',
    chips: ['Identity first', 'Trust cues', 'Profile discovery'],
  },
  pdf: {
    eyebrow: 'Document library',
    headline: 'PDFs and documents displayed like a premium public archive.',
    description: 'PDF surfaces should feel like a polished library with collection cues, file context, strong metadata, and easy browsing.',
    filterLabel: 'Filter document type',
    secondaryNote: 'Document readers want confidence, order, and clean download paths.',
    chips: ['Documents', 'Archive cues', 'Reference reading'],
  },
  listing: {
    eyebrow: 'Directory collection',
    headline: 'Listings presented for trust, comparison, and practical discovery.',
    description: 'Business directories should show identity, location, and action details through clear cards that remain elegant and mobile-friendly.',
    filterLabel: 'Filter business category',
    secondaryNote: 'A premium directory still needs decisive contact and location cues.',
    chips: ['Directory', 'Compare', 'Trust signals'],
  },
  image: {
    eyebrow: 'Visual gallery',
    headline: 'Image-led posts with a gallery rhythm and editorial framing.',
    description: 'Visual pages should prioritize artwork, screenshots, and reference imagery while keeping text support clear and light.',
    filterLabel: 'Filter visual category',
    secondaryNote: 'Images should lead the eye, but metadata should never disappear.',
    chips: ['Gallery', 'Visual-first', 'Editorial framing'],
  },
} satisfies Record<TaskKey, TaskPageVoice>

import type { CSSProperties } from 'react'

export const editableRootStyle = {
  '--slot4-page-bg': '#f5f1ea',
  '--slot4-page-text': '#093c5d',
  '--slot4-panel-bg': '#ffffff',
  '--slot4-surface-bg': '#fbfaf7',
  '--slot4-muted-text': '#456980',
  '--slot4-soft-muted-text': '#66859a',
  '--slot4-accent': '#3b7597',
  '--slot4-accent-fill': '#093c5d',
  '--slot4-accent-soft': '#e6f8fa',
  '--slot4-accent-bright': '#5df8d8',
  '--slot4-line': 'rgba(9,60,93,0.12)',
  '--slot4-dark-bg': '#0a2940',
  '--slot4-dark-text': '#f8fffe',
  '--slot4-media-bg': '#d8edf1',
  '--slot4-cream': '#f5f1ea',
  '--slot4-warm': '#f8f4ee',
  '--slot4-lavender': '#dff5f7',
  '--slot4-gray': '#eef4f6',
  '--slot4-body-gradient':
    'radial-gradient(circle at top, rgba(93,248,216,0.14), transparent 24%), linear-gradient(180deg, #f8f5ef 0%, #f2eee7 28%, #eef5f6 72%, #f8fbfb 100%)',
  '--editable-container': '1360px',
  '--editable-border': 'rgba(9,60,93,0.12)',
  '--editable-page-bg': '#f5f1ea',
  '--editable-page-text': '#093c5d',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent-bright)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-[color:var(--slot4-line)]',
  darkBorder: 'border-white/15',
  shadow: 'shadow-[0_24px_70px_rgba(9,60,93,0.10)]',
  shadowStrong: 'shadow-[0_28px_88px_rgba(9,60,93,0.20)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(9,60,93,0.06),rgba(9,60,93,0.84))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8',
    sectionY: 'py-14 sm:py-18 lg:py-24',
  },
  layout: {
    safeGrid: 'grid gap-6 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center',
    rail: 'flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[210px] shrink-0 snap-start sm:w-[230px]',
  },
  type: {
    eyebrow: 'text-[11px] font-black uppercase tracking-[0.28em]',
    heroTitle:
      'font-serif text-4xl font-black leading-[0.95] tracking-[-0.05em] sm:text-5xl lg:text-[4.35rem]',
    sectionTitle:
      'font-serif text-3xl font-black leading-[1] tracking-[-0.04em] sm:text-4xl lg:text-[3.15rem]',
    body: 'text-base leading-8',
  },
  surface: {
    card: `rounded-[2rem] border ${editablePalette.border} ${editablePalette.surfaceBg} ${editablePalette.shadow}`,
    soft: `rounded-[2rem] border ${editablePalette.border} bg-white/80 backdrop-blur-sm`,
    dark: `rounded-[2rem] ${editablePalette.darkBg} ${editablePalette.darkText} ${editablePalette.shadowStrong}`,
  },
  button: {
    primary:
      'inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-page-text)] px-7 py-3.5 text-sm font-black uppercase tracking-[0.14em] text-[var(--slot4-dark-text)] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--slot4-accent)]',
    secondary:
      'inline-flex items-center justify-center gap-2 rounded-full border border-[color:var(--slot4-line)] bg-white px-7 py-3.5 text-sm font-black uppercase tracking-[0.14em] text-[var(--slot4-page-text)] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--slot4-accent-soft)]',
    accent:
      'inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-accent-bright)] px-7 py-3.5 text-sm font-black uppercase tracking-[0.14em] text-[var(--slot4-page-text)] transition duration-300 hover:-translate-y-0.5',
  },
  media: {
    frame: `relative overflow-hidden rounded-[1.6rem] ${editablePalette.mediaBg}`,
    ratio: 'aspect-[4/5]',
  },
  motion: {
    lift: 'transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(9,60,93,0.16)]',
    fade: 'transition duration-300 hover:opacity-90',
  },
} as const

export const aiLayoutRules = [
  'Build around the blue-green editorial palette and keep the premium print-inspired tone consistent.',
  'Preserve all fetched content and task routes; only the presentation layer changes.',
  'Use visual variety across cards: featured, compact, horizontal, editorial list, and image-first.',
  'Prefer wide sections, strong hierarchy, and premium spacing over cramped utility layouts.',
  'Keep all fallbacks resilient when summary, category, or image data is missing.',
  'Match the reference spirit with a polished publishing platform feel, not a generic blog template.',
] as const

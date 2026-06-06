import { slot4BrandConfig } from './brand.config'

export type Slot4VisualPreset =
  | 'maritime-ledger'
  | 'luxe-library'
  | 'glass-atlas'
  | 'quiet-catalog'
  | 'studio-index'
  | 'oceanic-review'
  | 'collector-shelf'

export const visualPresets = {
  'maritime-ledger': {
    label: 'Maritime Ledger',
    mood: 'editorial, refined, trustworthy',
    fontDirection: 'classic serif display with crisp sans support',
    colors: {
      background: '#f5f1ea',
      foreground: '#093c5d',
      muted: '#5f7f94',
      primary: '#093c5d',
      accent: '#3b7597',
      surface: '#ffffff',
    },
    shape: 'arched panels, soft cards, and premium spacing',
  },
  'luxe-library': {
    label: 'Luxe Library',
    mood: 'classic prestige and deep contrast',
    fontDirection: 'old-style serif display with elegant caps',
    colors: {
      background: '#0a2940',
      foreground: '#f7f4ef',
      muted: '#b1c8d7',
      primary: '#6fd1d7',
      accent: '#5df8d8',
      surface: '#113a56',
    },
    shape: 'deep panels, bright accents, and gallery framing',
  },
  'glass-atlas': {
    label: 'Glass Atlas',
    mood: 'clean, polished, contemporary',
    fontDirection: 'sharp sans with stately headline moments',
    colors: {
      background: '#eef5f6',
      foreground: '#093c5d',
      muted: '#68899d',
      primary: '#3b7597',
      accent: '#5df8d8',
      surface: '#ffffff',
    },
    shape: 'translucent sections and layered rails',
  },
  'quiet-catalog': {
    label: 'Quiet Catalog',
    mood: 'minimal and composed',
    fontDirection: 'bookish serif with restrained sans',
    colors: {
      background: '#f8f6f1',
      foreground: '#12374f',
      muted: '#678196',
      primary: '#093c5d',
      accent: '#6fd1d7',
      surface: '#fffdfb',
    },
    shape: 'precise grids and understated borders',
  },
  'studio-index': {
    label: 'Studio Index',
    mood: 'bold and purposeful',
    fontDirection: 'display serif with punchy compact labels',
    colors: {
      background: '#f4f7f8',
      foreground: '#082c45',
      muted: '#607f92',
      primary: '#082c45',
      accent: '#3b7597',
      surface: '#ffffff',
    },
    shape: 'offset cards and sculpted content blocks',
  },
  'oceanic-review': {
    label: 'Oceanic Review',
    mood: 'immersive publishing platform',
    fontDirection: 'heroic serif headlines and airy body type',
    colors: {
      background: '#093c5d',
      foreground: '#f8fffe',
      muted: '#b2dde0',
      primary: '#6fd1d7',
      accent: '#5df8d8',
      surface: '#114866',
    },
    shape: 'immersive hero bands and framed story windows',
  },
  'collector-shelf': {
    label: 'Collector Shelf',
    mood: 'warm premium archive',
    fontDirection: 'heritage serif with practical metadata',
    colors: {
      background: '#f2ede4',
      foreground: '#0c3652',
      muted: '#677f90',
      primary: '#093c5d',
      accent: '#3b7597',
      surface: '#ffffff',
    },
    shape: 'shelved modules and elegant dividers',
  },
} as const

export const visualSystem = {
  productKind: slot4BrandConfig.productKind,
  recommendedPreset: 'maritime-ledger',
  radius: {
    sm: '0.9rem',
    md: '1.4rem',
    lg: '2rem',
    xl: '2.8rem',
  },
  motion: {
    pageLoad: 'animate-in fade-in slide-in-from-bottom-4 duration-700',
    cardHover: 'transition duration-300 hover:-translate-y-1 hover:shadow-xl',
    softHover: 'transition duration-300 hover:opacity-90',
    reduceMotionSafe: 'motion-reduce:transform-none motion-reduce:transition-none',
  },
  typography: {
    eyebrow: 'text-[11px] font-black uppercase tracking-[0.28em]',
    heroTitle: 'font-serif text-5xl font-black tracking-[-0.05em] sm:text-6xl lg:text-7xl',
    sectionTitle: 'font-serif text-3xl font-black tracking-[-0.04em] sm:text-4xl',
    body: 'text-base leading-8',
    caption: 'text-[11px] font-black uppercase tracking-[0.2em]',
  },
  surfaces: {
    glass: 'border border-white/15 bg-white/10 backdrop-blur-xl',
    paper: 'border border-[rgba(9,60,93,0.10)] bg-white shadow-[0_24px_70px_rgba(9,60,93,0.08)]',
    quiet: 'border border-[rgba(9,60,93,0.08)] bg-[#f7fbfb]',
    dark: 'border border-white/10 bg-[#0a2940] shadow-[0_24px_70px_rgba(0,0,0,0.25)]',
  },
  layout: {
    page: 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8',
    sectionY: 'py-14 sm:py-18 lg:py-24',
    cardGrid: 'grid gap-5 sm:grid-cols-2 lg:grid-cols-3',
  },
} as const

export function getVisualPreset(name: Slot4VisualPreset = visualSystem.recommendedPreset as Slot4VisualPreset) {
  return visualPresets[name]
}

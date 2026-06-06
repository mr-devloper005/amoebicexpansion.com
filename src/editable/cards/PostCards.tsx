import Link from 'next/link'
import { ArrowRight, Clock3, FileText } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import { editableDesignContract as dc, editablePalette as pal } from '@/editable/layouts/design-contract'

export function getEditablePostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((url): url is string => typeof url === 'string' && Boolean(url))
  const singleImage = ['image', 'featuredImage', 'thumbnail', 'logo', 'avatar']
    .map((key) => content[key])
    .find((value): value is string => typeof value === 'string' && Boolean(value))
  return mediaUrl || contentImage || singleImage || '/placeholder.svg?height=900&width=1400'
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

export function getEditableCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Featured'
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

export function EditorialFeatureCard({ post, href, label = 'Featured read' }: { post: SitePost; href: string; label?: string }) {
  return (
    <Link href={href} className={`group block min-w-0 overflow-hidden rounded-[2.6rem] border ${pal.border} bg-[var(--slot4-dark-bg)] text-white ${dc.motion.lift}`}>
      <div className="relative min-h-[520px] p-6 sm:p-8 lg:min-h-[620px]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-55 transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,60,93,0.12),rgba(9,60,93,0.90))]" />
        <div className="relative z-10 flex h-full min-h-[460px] flex-col justify-end lg:min-h-[560px]">
          <span className={`${dc.type.eyebrow} text-[var(--slot4-accent-bright)]`}>{label}</span>
          <h3 className="mt-5 max-w-3xl font-serif text-4xl font-black leading-[0.92] tracking-[-0.05em] sm:text-5xl lg:text-6xl">{post.title}</h3>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-white/78 sm:text-base">{getEditableExcerpt(post, 190)}</p>
          <span className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-[var(--slot4-page-text)]">
            Read story <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}

export function RailPostCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group ${dc.layout.minRailCard} block overflow-hidden rounded-[2rem] border ${pal.border} bg-white ${dc.motion.lift}`}>
      <div className={`${dc.media.frame} aspect-[4/5]`}>
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_42%,rgba(9,60,93,0.74)_100%)]" />
        <span className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--slot4-page-text)]">
          No. {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className="absolute bottom-4 left-4 right-4 line-clamp-3 font-serif text-2xl font-black leading-tight text-white">{post.title}</h3>
      </div>
      <div className="p-5">
        <p className={`${dc.type.eyebrow} ${pal.accentText}`}>{getEditableCategory(post)}</p>
        <p className={`mt-3 line-clamp-3 text-sm leading-7 ${pal.softMutedText}`}>{getEditableExcerpt(post, 110)}</p>
      </div>
    </Link>
  )
}

export function CompactIndexCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group block min-w-0 rounded-[1.75rem] border ${pal.border} bg-white/85 p-5 backdrop-blur-sm ${dc.motion.lift}`}>
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--slot4-page-text)] text-xs font-black text-white">
          {index + 1}
        </span>
        <div className="min-w-0">
          <p className={`flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.22em] ${pal.accentText}`}>
            <Clock3 className="h-3.5 w-3.5" /> {getEditableCategory(post)}
          </p>
          <h3 className="mt-2 line-clamp-2 font-serif text-xl font-black leading-tight tracking-[-0.03em] text-[var(--slot4-page-text)]">{post.title}</h3>
          <p className={`mt-2 line-clamp-2 text-sm leading-6 ${pal.softMutedText}`}>{getEditableExcerpt(post, 105)}</p>
        </div>
      </div>
    </Link>
  )
}

export function ArticleListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group grid min-w-0 gap-5 overflow-hidden rounded-[2.2rem] border ${pal.border} bg-white p-4 ${dc.motion.lift} sm:grid-cols-[240px_minmax(0,1fr)]`}>
      <div className={`${dc.media.frame} min-h-[210px]`}>
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="min-w-0 p-2 sm:py-4 sm:pr-5">
        <p className={`${dc.type.eyebrow} ${pal.accentText}`}>Entry {String(index + 1).padStart(2, '0')}</p>
        <h2 className="mt-3 line-clamp-3 font-serif text-2xl font-black leading-tight tracking-[-0.04em] text-[var(--slot4-page-text)] sm:text-3xl">{post.title}</h2>
        <p className={`mt-4 line-clamp-3 text-sm leading-7 ${pal.softMutedText}`}>{getEditableExcerpt(post, 180)}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.12em] text-[var(--slot4-page-text)]">
          Open article <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  )
}

export function HorizontalFeatureCard({ post, href, badge }: { post: SitePost; href: string; badge: string }) {
  return (
    <Link href={href} className={`group grid gap-5 overflow-hidden rounded-[2.2rem] border ${pal.border} bg-white p-4 ${dc.motion.lift} md:grid-cols-[0.9fr_1.1fr]`}>
      <div className={`${dc.media.frame} min-h-[240px]`}>
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="flex min-w-0 flex-col justify-center p-2">
        <p className={`${dc.type.eyebrow} ${pal.accentText}`}>{badge}</p>
        <h3 className="mt-3 line-clamp-3 font-serif text-3xl font-black leading-[0.95] tracking-[-0.04em] text-[var(--slot4-page-text)]">{post.title}</h3>
        <p className={`mt-4 line-clamp-3 text-sm leading-7 ${pal.softMutedText}`}>{getEditableExcerpt(post, 160)}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.12em] text-[var(--slot4-page-text)]">
          Continue <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  )
}

export function EditorialListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group grid grid-cols-[64px_minmax(0,1fr)] gap-4 border-b border-[var(--slot4-line)] py-5">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--slot4-accent-soft)] text-sm font-black text-[var(--slot4-page-text)]">
        {String(index + 1).padStart(2, '0')}
      </span>
      <div className="min-w-0">
        <p className={`${dc.type.eyebrow} ${pal.accentText}`}>{getEditableCategory(post)}</p>
        <h3 className="mt-2 line-clamp-2 font-serif text-2xl font-black leading-tight tracking-[-0.03em] text-[var(--slot4-page-text)]">{post.title}</h3>
        <p className={`mt-3 line-clamp-2 text-sm leading-7 ${pal.softMutedText}`}>{getEditableExcerpt(post, 130)}</p>
      </div>
    </Link>
  )
}

export function ImageFirstCard({ post, href, label = 'Visual feature' }: { post: SitePost; href: string; label?: string }) {
  return (
    <Link href={href} className={`group block overflow-hidden rounded-[2rem] border ${pal.border} bg-white ${dc.motion.lift}`}>
      <div className="relative aspect-[1/1.12] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(9,60,93,0.78)_100%)]" />
        <span className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--slot4-page-text)]">
          {label}
        </span>
        <h3 className="absolute bottom-4 left-4 right-4 line-clamp-3 font-serif text-3xl font-black leading-[0.95] text-white">{post.title}</h3>
      </div>
    </Link>
  )
}

export function FallbackThumb() {
  return <div className="flex h-full w-full items-center justify-center bg-[var(--slot4-accent-soft)] text-[var(--slot4-page-text)]"><FileText className="h-10 w-10 opacity-60" /></div>
}

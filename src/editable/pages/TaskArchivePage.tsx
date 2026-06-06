import Link from 'next/link'
import type { CSSProperties } from 'react'
import {
  ArrowRight,
  Bookmark,
  BriefcaseBusiness,
  Building2,
  Camera,
  Download,
  FileText,
  Filter,
  Image as ImageIcon,
  MapPin,
  Megaphone,
  Search,
  UserRound,
} from 'lucide-react'
import { buildTaskMetadata } from '@/lib/seo'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { buildPostUrl, fetchPaginatedTaskPosts } from '@/lib/task-data'
import { getTaskConfig, SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SiteFeedPagination, SitePost } from '@/lib/site-connector'
import { taskPageMetadata } from '@/config/site.content'
import { taskPageVoices } from '@/editable/content/task-pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { getVisualPreset, visualSystem } from '@/editable/theme/visual-system'
import { CompactIndexCard, HorizontalFeatureCard, ImageFirstCard, getEditableCategory, getEditableExcerpt, getEditablePostImage } from '@/editable/cards/PostCards'

export const revalidate = 3

export const taskMetadata = (task: TaskKey, path: string) =>
  buildTaskMetadata(task, {
    path,
    title: taskPageMetadata[task]?.title,
    description: taskPageMetadata[task]?.description,
  })

const getContent = (post: SitePost) => (post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {})
const asText = (value: unknown) => (typeof value === 'string' ? value.trim() : '')
const getField = (post: SitePost, keys: string[]) => {
  const content = getContent(post)
  for (const key of keys) {
    const value = asText(content[key])
    if (value) return value
  }
  return ''
}
const getSummary = (post: SitePost) => getEditableExcerpt(post, 170)

function pageHref(basePath: string, category: string, page: number) {
  const params = new URLSearchParams()
  if (category && category !== 'all') params.set('category', category)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `${basePath}?${query}` : basePath
}

const taskDeck: Record<TaskKey, { icon: typeof FileText; archiveClass: string; promise: string; badge: string }> = {
  article: { icon: FileText, archiveClass: 'grid gap-5', promise: 'Large reading cards keep long-form content spacious and calm.', badge: 'Article' },
  listing: { icon: Building2, archiveClass: 'grid gap-5 xl:grid-cols-2', promise: 'Directory cards focus on brand, location, and decision-ready cues.', badge: 'Listing' },
  classified: { icon: Megaphone, archiveClass: 'grid gap-5 xl:grid-cols-2', promise: 'Offers lead with urgency, price, and clear action paths.', badge: 'Classified' },
  image: { icon: Camera, archiveClass: 'columns-1 gap-5 space-y-5 md:columns-2 xl:columns-3', promise: 'Image-led browsing uses visual rhythm without losing metadata.', badge: 'Image' },
  sbm: { icon: Bookmark, archiveClass: 'grid gap-4 md:grid-cols-2 xl:grid-cols-3', promise: 'Saved resources stay concise, shelf-like, and easy to revisit.', badge: 'Bookmark' },
  pdf: { icon: Download, archiveClass: 'grid gap-5 md:grid-cols-2 xl:grid-cols-3', promise: 'Document cards emphasize file context, archive cues, and readable summaries.', badge: 'PDF' },
  profile: { icon: UserRound, archiveClass: 'grid gap-5 md:grid-cols-2 xl:grid-cols-4', promise: 'Profiles surface identity, role, and quick credibility signals.', badge: 'Profile' },
}

export async function EditableTaskArchiveRoute({
  task,
  searchParams,
  basePath,
}: {
  task: TaskKey
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  const resolved = (await searchParams) || {}
  const page = Math.max(1, Math.floor(Number(resolved.page) || 1))
  const category = resolved.category ? normalizeCategory(resolved.category) : 'all'
  const taskConfig = getTaskConfig(task)
  const { posts, pagination } = await fetchPaginatedTaskPosts(task, { page, limit: 24, category })
  return <TaskArchiveView task={task} posts={posts} pagination={pagination} category={category} basePath={basePath || taskConfig?.route || `/${task}`} />
}

export function TaskArchiveView({
  task,
  posts,
  pagination,
  category,
  basePath,
}: {
  task: TaskKey
  posts: SitePost[]
  pagination: SiteFeedPagination
  category: string
  basePath: string
}) {
  const taskConfig = getTaskConfig(task)
  const voice = taskPageVoices[task]
  const preset = getVisualPreset(visualSystem.recommendedPreset as any)
  const page = pagination.page || 1
  const label = taskConfig?.label || task
  const deck = taskDeck[task]
  const Icon = deck.icon
  const archiveVars = {
    '--archive-bg': preset.colors.background,
    '--archive-text': preset.colors.foreground,
    '--archive-surface': preset.colors.surface,
    '--archive-accent': preset.colors.accent,
  } as CSSProperties
  const categoryLabel = category === 'all' ? 'All categories' : CATEGORY_OPTIONS.find((item) => item.slug === category)?.name || category
  const feature = posts[0]
  const rest = posts.slice(1)

  return (
    <EditableSiteShell>
      <main style={archiveVars} className="bg-[var(--archive-bg)] text-[var(--archive-text)]">
        <section className="mx-auto grid max-w-[var(--editable-container)] gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
          <div className="rounded-[2.8rem] bg-[linear-gradient(135deg,#0a395a_0%,#155271_52%,#214d89_100%)] p-7 text-white shadow-[0_26px_84px_rgba(9,60,93,0.18)] sm:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-[var(--slot4-accent-bright)]">
              <Icon className="h-4 w-4" /> {label}
            </div>
            <h1 className="mt-5 max-w-4xl font-serif text-5xl font-black leading-[0.94] tracking-[-0.06em] text-white sm:text-6xl">
              {voice?.headline || `Browse ${label}`}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/74">{voice?.description || SITE_CONFIG.description}</p>
            <div className="mt-8 rounded-[1.7rem] border border-white/12 bg-white/8 p-4 text-sm font-bold leading-7 text-white/74">{deck.promise}</div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={basePath} className="rounded-full bg-white px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-[var(--archive-text)]">
                Browse all
              </Link>
              <Link href="/search" className="rounded-full border border-white/18 px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white">
                Search posts
              </Link>
            </div>
          </div>

          <div className="grid gap-5 self-end">
            <form action={basePath} className="rounded-[2.2rem] border border-[var(--slot4-line)] bg-white/82 p-5 shadow-[0_16px_44px_rgba(9,60,93,0.08)] backdrop-blur">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[var(--archive-accent)]">
                <Filter className="h-4 w-4" /> Filter
              </div>
              <select name="category" defaultValue={category} className="mt-4 h-12 w-full rounded-full border border-[var(--slot4-line)] bg-white px-4 text-sm font-black outline-none">
                <option value="all">All categories</option>
                {CATEGORY_OPTIONS.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.name}
                  </option>
                ))}
              </select>
              <button className="mt-3 h-12 w-full rounded-full bg-[var(--archive-text)] text-sm font-black uppercase tracking-[0.14em] text-white">Apply</button>
              <p className="mt-3 text-xs font-bold text-[var(--slot4-muted-text)]">Showing: {categoryLabel}</p>
            </form>
            <div className="rounded-[2.2rem] border border-[var(--slot4-line)] bg-white/82 p-5 shadow-[0_16px_44px_rgba(9,60,93,0.06)]">
              <p className="text-[11px] font-black uppercase tracking-[0.26em] text-[var(--archive-accent)]">Collection notes</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {voice.chips.map((chip) => (
                  <span key={chip} className="rounded-full bg-[var(--slot4-accent-soft)] px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--archive-text)]">
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[var(--editable-container)] px-4 pb-16 sm:px-6 lg:px-8">
          {feature ? <ArchiveLeadCard task={task} post={feature} basePath={basePath} /> : null}

          {posts.length ? (
            <div className={`mt-6 ${deck.archiveClass}`}>
              {(feature ? rest : posts).map((post, index) => (
                <ArchivePostCard key={post.id || post.slug || index} post={post} task={task} basePath={basePath} index={index} />
              ))}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-dashed border-[var(--slot4-line)] bg-white/70 p-10 text-center">
              <Search className="mx-auto h-8 w-8 text-[var(--slot4-muted-text)]" />
              <h2 className="mt-4 font-serif text-3xl font-black tracking-[-0.05em]">No posts found</h2>
              <p className="mt-2 text-sm text-[var(--slot4-muted-text)]">Try another category or refresh this page after publishing new content.</p>
            </div>
          )}

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {pagination.hasPrevPage ? <Link href={pageHref(basePath, category, page - 1)} className="rounded-full border border-[var(--slot4-line)] bg-white px-5 py-3 text-sm font-black">Previous</Link> : null}
            <span className="rounded-full bg-[var(--archive-text)] px-5 py-3 text-sm font-black text-white">Page {page} of {pagination.totalPages || 1}</span>
            {pagination.hasNextPage ? <Link href={pageHref(basePath, category, page + 1)} className="rounded-full border border-[var(--slot4-line)] bg-white px-5 py-3 text-sm font-black">Next</Link> : null}
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}

function ArchiveLeadCard({ post, task, basePath }: { post: SitePost; task: TaskKey; basePath: string }) {
  const href = post.slug ? `${basePath}/${post.slug}` : buildPostUrl(task, post.slug)
  if (task === 'image') return <ImageFirstCard post={post} href={href} label="Lead visual" />
  return <HorizontalFeatureCard post={post} href={href} badge={`Featured ${taskDeck[task].badge}`} />
}

function ArchivePostCard({ post, task, basePath, index }: { post: SitePost; task: TaskKey; basePath: string; index: number }) {
  const href = post.slug ? `${basePath}/${post.slug}` : buildPostUrl(task, post.slug)
  if (task === 'listing') return <ListingArchiveCard post={post} href={href} />
  if (task === 'classified') return <ClassifiedArchiveCard post={post} href={href} />
  if (task === 'image') return <ImageArchiveCard post={post} href={href} index={index} />
  if (task === 'sbm') return <BookmarkArchiveCard post={post} href={href} index={index} />
  if (task === 'pdf') return <PdfArchiveCard post={post} href={href} index={index} />
  if (task === 'profile') return <ProfileArchiveCard post={post} href={href} index={index} />
  return <CompactIndexCard post={post} href={href} index={index + 1} />
}

function ListingArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const logo = getEditablePostImage(post)
  const location = getField(post, ['location', 'address', 'city'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const website = getField(post, ['website', 'url'])
  return (
    <Link href={href} className="group grid gap-5 rounded-[2rem] border border-[var(--slot4-line)] bg-white p-5 shadow-[0_18px_50px_rgba(9,60,93,0.08)] transition hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(9,60,93,0.14)] sm:grid-cols-[120px_1fr]">
      <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-[1.5rem] bg-[var(--slot4-gray)] ring-1 ring-[var(--slot4-line)]">
        {logo ? <img src={logo} alt={post.title} className="h-full w-full object-cover" /> : <BriefcaseBusiness className="h-10 w-10 opacity-45" />}
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-[var(--slot4-page-text)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white">Directory</span>
          {location ? <span className="inline-flex items-center gap-1 rounded-full border border-[var(--slot4-line)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em]"><MapPin className="h-3 w-3" /> {location}</span> : null}
        </div>
        <h2 className="mt-4 font-serif text-3xl font-black leading-tight tracking-[-0.04em]">{post.title}</h2>
        <p className="mt-3 line-clamp-2 text-sm leading-7 text-[var(--slot4-muted-text)]">{getSummary(post)}</p>
        <div className="mt-4 grid gap-2 text-xs font-bold text-[var(--slot4-soft-muted-text)] sm:grid-cols-2">
          {phone ? <span>Phone: {phone}</span> : null}
          {website ? <span>Website available</span> : null}
        </div>
      </div>
    </Link>
  )
}

function ClassifiedArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const image = getEditablePostImage(post)
  const price = getField(post, ['price', 'amount', 'budget'])
  const location = getField(post, ['location', 'address', 'city'])
  const condition = getField(post, ['condition', 'type', 'availability'])
  return (
    <Link href={href} className="group overflow-hidden rounded-[2rem] border border-[var(--slot4-line)] bg-white shadow-[0_18px_50px_rgba(9,60,93,0.08)] transition hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(9,60,93,0.14)]">
      <div className="grid min-h-64 sm:grid-cols-[0.72fr_1fr]">
        <div className="relative bg-[var(--slot4-dark-bg)] p-5 text-white">
          <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em]">Classified</span>
          <h2 className="mt-10 font-serif text-4xl font-black leading-[0.95] tracking-[-0.05em]">{price || 'Open offer'}</h2>
          <p className="mt-4 text-sm font-bold text-white/72">{location || condition || 'Details inside'}</p>
          {image ? <img src={image} alt={post.title} className="absolute bottom-4 right-4 h-20 w-20 rounded-2xl object-cover opacity-80" /> : null}
        </div>
        <div className="p-6">
          <h2 className="font-serif text-3xl font-black leading-tight tracking-[-0.04em]">{post.title}</h2>
          <p className="mt-4 line-clamp-4 text-sm leading-7 text-[var(--slot4-muted-text)]">{getSummary(post)}</p>
          <p className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--archive-accent)]">View listing <ArrowRight className="h-4 w-4" /></p>
        </div>
      </div>
    </Link>
  )
}

function ImageArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group mb-5 block break-inside-avoid overflow-hidden rounded-[2rem] border border-[var(--slot4-line)] bg-white shadow-[0_18px_50px_rgba(9,60,93,0.08)] transition hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(9,60,93,0.14)]">
      <div className={index % 3 === 0 ? 'aspect-[3/4]' : 'aspect-[4/3]'}>
        <img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <div className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent-soft)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--slot4-page-text)]">
          <ImageIcon className="h-3 w-3" /> Visual
        </div>
        <h2 className="mt-4 line-clamp-3 font-serif text-2xl font-black leading-tight tracking-[-0.04em]">{post.title}</h2>
      </div>
    </Link>
  )
}

function BookmarkArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const website = getField(post, ['website', 'url', 'link'])
  return (
    <Link href={href} className="group block rounded-[1.8rem] border border-[var(--slot4-line)] bg-white p-6 shadow-[0_18px_50px_rgba(9,60,93,0.08)] transition hover:-translate-y-1 hover:bg-[var(--slot4-page-text)] hover:text-white">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full border border-current/20 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em]">Save {String(index + 1).padStart(2, '0')}</span>
        <Bookmark className="h-5 w-5" />
      </div>
      <h2 className="mt-8 font-serif text-3xl font-black leading-tight tracking-[-0.04em]">{post.title}</h2>
      <p className="mt-4 line-clamp-4 text-sm leading-7 opacity-78">{getSummary(post)}</p>
      {website ? <p className="mt-5 truncate text-xs font-black uppercase tracking-[0.16em] opacity-60">{website.replace(/^https?:\/\//, '')}</p> : null}
    </Link>
  )
}

function PdfArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const category = getEditableCategory(post)
  return (
    <Link href={href} className="group rounded-[2rem] border border-[var(--slot4-line)] bg-white p-6 shadow-[0_18px_50px_rgba(9,60,93,0.08)] transition hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(9,60,93,0.14)]">
      <div className="flex items-start justify-between gap-4">
        <div className="rounded-[1.4rem] bg-[var(--slot4-page-text)] p-5 text-white"><FileText className="h-8 w-8" /></div>
        <span className="rounded-full bg-[var(--slot4-accent-soft)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--slot4-page-text)]">{category}</span>
      </div>
      <p className="mt-6 text-[10px] font-black uppercase tracking-[0.22em] text-[var(--archive-accent)]">Document {String(index + 1).padStart(2, '0')}</p>
      <h2 className="mt-3 font-serif text-3xl font-black leading-tight tracking-[-0.04em]">{post.title}</h2>
      <p className="mt-4 line-clamp-4 text-sm leading-7 text-[var(--slot4-muted-text)]">{getSummary(post)}</p>
      <p className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--archive-accent)]">Open document <Download className="h-4 w-4" /></p>
    </Link>
  )
}

function ProfileArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const avatar = getEditablePostImage(post)
  const role = getField(post, ['role', 'designation', 'company', 'location'])
  return (
    <Link href={href} className="group rounded-[2rem] border border-[var(--slot4-line)] bg-white p-6 text-center shadow-[0_18px_50px_rgba(9,60,93,0.08)] transition hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(9,60,93,0.14)]">
      <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--archive-accent)]">Profile {String(index + 1).padStart(2, '0')}</p>
      <div className="mx-auto mt-4 flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-[var(--slot4-gray)] ring-1 ring-[var(--slot4-line)]">
        {avatar ? <img src={avatar} alt={post.title} className="h-full w-full object-cover" /> : <UserRound className="h-10 w-10 opacity-45" />}
      </div>
      <h2 className="mt-5 font-serif text-2xl font-black leading-tight tracking-[-0.04em]">{post.title}</h2>
      {role ? <p className="mt-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--archive-accent)]">{role}</p> : null}
      <p className="mt-4 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{getSummary(post)}</p>
    </Link>
  )
}

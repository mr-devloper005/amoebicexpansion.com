import Link from 'next/link'
import type { CSSProperties } from 'react'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  Bookmark,
  Building2,
  Camera,
  CheckCircle2,
  Download,
  ExternalLink,
  FileText,
  Globe2,
  Layers3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ScanSearch,
  Sparkles,
  Tag,
  UserRound,
} from 'lucide-react'
import { buildPostMetadata, buildTaskMetadata } from '@/lib/seo'
import { buildPostUrl, fetchArticleComments, fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import { getTaskConfig, SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { getVisualPreset, visualSystem } from '@/editable/theme/visual-system'
import { getEditableCategory, getEditableExcerpt, getEditablePostImage } from '@/editable/cards/PostCards'
import { CopyPageUrlButton } from '@/editable/components/CopyPageUrlButton'

export const revalidate = 3

export async function generateEditableDetailMetadata(task: TaskKey, params: Promise<{ slug?: string; username?: string }>) {
  const resolved = await params
  const slug = resolved.slug || resolved.username || ''
  const post = await fetchTaskPostBySlug(task, slug)
  return post ? await buildPostMetadata(task, post) : await buildTaskMetadata(task)
}

export async function EditableTaskDetailRoute({ task, params }: { task: TaskKey; params: Promise<{ slug?: string; username?: string }> }) {
  const resolved = await params
  const slug = resolved.slug || resolved.username || ''
  const post = await fetchTaskPostBySlug(task, slug)
  if (!post) notFound()
  const related = (await fetchTaskPosts(task, 7)).filter((item) => item.slug !== post.slug).slice(0, 4)
  const comments = task === 'article' ? await fetchArticleComments(post.slug, 50) : []
  return <TaskDetailView task={task} post={post} related={related} comments={comments} />
}

const getContent = (post: SitePost) => (post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {})
const asText = (value: unknown) => (typeof value === 'string' ? value.trim() : '')
const isUrl = (value: string) => value.startsWith('/') || /^https?:\/\//i.test(value)

const getField = (post: SitePost, keys: string[]) => {
  const content = getContent(post)
  for (const key of keys) {
    const value = asText(content[key])
    if (value) return value
  }
  return ''
}

const getImages = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.map((item) => item?.url).filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const images = Array.isArray(content.images) ? content.images.filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const singleImages = ['image', 'featuredImage', 'thumbnail', 'logo', 'avatar'].map((key) => asText(content[key])).filter((url) => url && isUrl(url))
  const combined = [...media, ...images, ...singleImages].filter(Boolean)
  return combined.length ? combined.slice(0, 12) : [getEditablePostImage(post)]
}

const getBody = (
  post: SitePost,
  {
    includeDescription = true,
    includeDetails = true,
    includeSummaryFallback = true,
    fallbackText = 'Details will appear here once available.',
  }: { includeDescription?: boolean; includeDetails?: boolean; includeSummaryFallback?: boolean; fallbackText?: string } = {}
) => {
  const content = getContent(post)
  return (
    asText(content.body) ||
    (includeDescription ? asText(content.description) : '') ||
    (includeDetails ? asText(content.details) : '') ||
    (includeSummaryFallback ? post.summary : '') ||
    fallbackText
  )
}

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')

const safeUrl = (value: string) => (/^https?:\/\//i.test(value) ? value : '#')

const linkifyMarkdown = (value: string) =>
  value.replace(/\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/gi, (_match, label, url) => `<a href="${safeUrl(url)}" target="_blank" rel="nofollow noopener noreferrer">${label}</a>`)

const linkifyText = (value: string) =>
  linkifyMarkdown(value).replace(/(^|[\s(>])((https?:\/\/)[^\s<)]+)/gi, (_match, prefix, url) => `${prefix}<a href="${safeUrl(url)}" target="_blank" rel="nofollow noopener noreferrer">${url}</a>`)

const hardenLinks = (html: string) =>
  html.replace(/<a\s+([^>]*href=["'][^"']+["'][^>]*)>/gi, (_match, attrs) => {
    let next = String(attrs).replace(/\s+on\w+=("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    if (!/\starget=/i.test(next)) next += ' target="_blank"'
    if (!/\srel=/i.test(next)) next += ' rel="nofollow noopener noreferrer"'
    return `<a ${next}>`
  })

const sanitizeHtml = (html: string) =>
  hardenLinks(
    html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<(iframe|object|embed)[^>]*>[\s\S]*?<\/\1>/gi, '')
      .replace(/\s+on\w+=("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
      .replace(/(href|src)=(['"])javascript:[\s\S]*?\2/gi, '$1="#"')
  )

const formatPlainText = (raw: string) => {
  const value = raw.trim()
  if (!value) return ''
  if (/<[a-z][\s\S]*>/i.test(value)) return sanitizeHtml(linkifyMarkdown(value))
  return value
    .split(/\n{2,}/)
    .map((part) => `<p>${linkifyText(escapeHtml(part).replace(/\n/g, '<br />'))}</p>`)
    .join('')
}

const summaryText = (post: SitePost) => getEditableExcerpt(post, 220)
const mapSrcFor = (post: SitePost) => {
  const address = getField(post, ['address', 'location', 'city'])
  const lat = getField(post, ['lat', 'latitude'])
  const lng = getField(post, ['lng', 'lon', 'longitude'])
  if (lat && lng) return `https://maps.google.com/maps?q=${encodeURIComponent(`${lat},${lng}`)}&z=14&output=embed`
  if (address) return `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=13&output=embed`
  return ''
}

export function TaskDetailView({
  task,
  post,
  related,
  comments = [],
}: {
  task: TaskKey
  post: SitePost
  related: SitePost[]
  comments?: Array<{ id: string; name: string; comment: string; createdAt: string }>
}) {
  const preset = getVisualPreset(visualSystem.recommendedPreset as any)
  const detailVars = {
    '--detail-bg': preset.colors.background,
    '--detail-text': preset.colors.foreground,
    '--detail-surface': preset.colors.surface,
    '--detail-accent': preset.colors.accent,
  } as CSSProperties

  return (
    <EditableSiteShell>
      <main style={detailVars} className="bg-[var(--detail-bg)] text-[var(--detail-text)]">
        {task === 'listing' ? <ListingDetail post={post} related={related} /> : null}
        {task === 'classified' ? <ClassifiedDetail post={post} related={related} /> : null}
        {task === 'image' ? <ImageDetail post={post} related={related} /> : null}
        {task === 'sbm' ? <BookmarkDetail post={post} related={related} /> : null}
        {task === 'pdf' ? <PdfDetail post={post} related={related} /> : null}
        {task === 'profile' ? <ProfileDetail post={post} related={related} /> : null}
        {task === 'article' ? <ArticleDetail post={post} related={related} comments={comments} /> : null}
      </main>
    </EditableSiteShell>
  )
}

function BackLink({ task }: { task: TaskKey }) {
  const taskConfig = getTaskConfig(task)
  return (
    <Link href={taskConfig?.route || '/'} className="inline-flex items-center gap-2 rounded-full border border-[var(--slot4-line)] bg-white/80 px-4 py-2 text-sm font-black text-[var(--slot4-page-text)]">
      <ArrowLeft className="h-4 w-4" /> Back to {taskConfig?.label || 'posts'}
    </Link>
  )
}

function HeroHeader({ label, title, summary, badge }: { label: string; title: string; summary?: string; badge: string }) {
  return (
    <div className="rounded-[2.7rem] bg-[linear-gradient(135deg,#0a395a_0%,#155271_50%,#214d89_100%)] p-6 text-white shadow-[0_28px_90px_rgba(9,60,93,0.20)] sm:p-8 lg:p-10">
      <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[var(--slot4-accent-bright)]">{badge}</p>
      <h1 className="mt-4 font-serif text-4xl font-black leading-[0.95] tracking-[-0.05em] sm:text-5xl lg:text-6xl">{title}</h1>
     
    </div>
  )
}

function ArticleDetail({ post, related, comments }: { post: SitePost; related: SitePost[]; comments: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  const images = getImages(post)
  return (
    <section className="mx-auto grid max-w-[var(--editable-container)] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8 lg:py-16">
      <article className="min-w-0">
        <BackLink task="article" />
        <div className="mt-6">
          <HeroHeader label="Article" title={post.title} summary={summaryText(post)} badge={getEditableCategory(post)} />
        </div>
        <div className="mt-6 rounded-[2.4rem] border border-[var(--slot4-line)] bg-white p-5 shadow-[0_28px_80px_rgba(9,60,93,0.08)] sm:p-8 lg:p-10">
          {images[0] ? <img src={images[0]} alt={post.title} className="max-h-[620px] w-full rounded-[2rem] object-cover" /> : null}
          <BodyContent post={post} />
          <EditableComments slug={post.slug} comments={comments} />
        </div>
      </article>
      <RelatedPanel task="article" post={post} related={related} />
    </section>
  )
}

function ListingDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  const logo = images[0]
  const address = getField(post, ['address', 'location', 'city'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const email = getField(post, ['email'])
  const website = getField(post, ['website', 'url'])
  const mapSrc = mapSrcFor(post)
  return (
    <section className="mx-auto max-w-[var(--editable-container)] px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <BackLink task="listing" />
      <div className="mt-6">
        <HeroHeader label="Listing" title={post.title} summary={summaryText(post)} badge="Business listing" />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
        <article className="rounded-[2.5rem] border border-[var(--slot4-line)] bg-white p-6 shadow-[0_28px_80px_rgba(9,60,93,0.08)] sm:p-9">
          <div className="grid gap-6 sm:grid-cols-[150px_1fr]">
            <div className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-[2rem] bg-[var(--slot4-gray)] ring-1 ring-[var(--slot4-line)]">
              {logo ? <img src={logo} alt={post.title} className="h-full w-full object-cover" /> : <Building2 className="h-14 w-14 opacity-40" />}
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--detail-accent)]">Business profile</p>
              <h1 className="mt-3 font-serif text-4xl font-black leading-[0.98] tracking-[-0.05em] sm:text-5xl">{post.title}</h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--slot4-muted-text)]">{summaryText(post)}</p>
            </div>
          </div>
          <InfoGrid items={[['Location', address, MapPin], ['Phone', phone, Phone], ['Email', email, Mail], ['Website', website, Globe2]]} />
          <BodyContent post={post} />
          <ImageStrip images={images.slice(1)} label="Business showcase" />
        </article>
        <aside className="space-y-5">
          {mapSrc ? <MapBox src={mapSrc} label={address || post.title} /> : <ContactAction website={website} phone={phone} email={email} />}
          {mapSrc ? <ContactAction website={website} phone={phone} email={email} /> : null}
          <RelatedPanel task="listing" post={post} related={related} compact />
        </aside>
      </div>
    </section>
  )
}

function ClassifiedDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  const price = getField(post, ['price', 'amount', 'budget'])
  const location = getField(post, ['location', 'address', 'city'])
  const condition = getField(post, ['condition', 'availability', 'type'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const email = getField(post, ['email'])
  const website = getField(post, ['website', 'url'])
  return (
    <section className="mx-auto grid max-w-[var(--editable-container)] gap-7 px-4 py-10 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8 lg:py-16">
      <aside className="rounded-[2.5rem] bg-[var(--slot4-dark-bg)] p-7 text-white shadow-[0_28px_80px_rgba(9,60,93,0.18)] lg:sticky lg:top-24 lg:self-start">
        <BackLink task="classified" />
        <p className="mt-10 text-xs font-black uppercase tracking-[0.28em] text-[var(--slot4-accent-bright)]">Classified notice</p>
        <h1 className="mt-4 font-serif text-4xl font-black leading-[0.95] tracking-[-0.05em] sm:text-5xl">{post.title}</h1>
        <div className="mt-8 grid gap-3">
          {price ? <BadgeLine label="Price" value={price} /> : null}
          {condition ? <BadgeLine label="Condition" value={condition} /> : null}
          {location ? <BadgeLine label="Location" value={location} /> : null}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          {phone ? <a href={`tel:${phone}`} className="rounded-full bg-white px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-[var(--slot4-page-text)]">Call now</a> : null}
          {email ? <a href={`mailto:${email}`} className="rounded-full border border-white/25 px-5 py-3 text-sm font-black uppercase tracking-[0.12em]">Email</a> : null}
        </div>
      </aside>
      <article className="rounded-[2.7rem] border border-[var(--slot4-line)] bg-white p-6 shadow-[0_28px_80px_rgba(9,60,93,0.08)] sm:p-9">
        <ImageStrip images={images} label="Offer images" large />
        <BodyContent post={post} />
        <ContactAction website={website} phone={phone} email={email} />
        <RelatedPanel task="classified" post={post} related={related} />
      </article>
    </section>
  )
}

function ImageDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  return (
    <section className="mx-auto max-w-[var(--editable-container)] px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <BackLink task="image" />
      <div className="mt-6 grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
        <aside className="rounded-[2.5rem] border border-[var(--slot4-line)] bg-white p-7 lg:sticky lg:top-24 lg:self-start">
          <div className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-page-text)] px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-white">
            <Camera className="h-4 w-4" /> Image story
          </div>
          <h1 className="mt-6 font-serif text-4xl font-black leading-[0.95] tracking-[-0.05em] sm:text-5xl">{post.title}</h1>
          <p className="mt-5 text-base leading-8 text-[var(--slot4-muted-text)]">{summaryText(post)}</p>
          <BodyContent post={post} compact />
        </aside>
        <div className="columns-1 gap-5 space-y-5 md:columns-2">
          {images.map((image, index) => (
            <figure key={`${image}-${index}`} className="break-inside-avoid overflow-hidden rounded-[2rem] border border-[var(--slot4-line)] bg-white shadow-[0_18px_50px_rgba(9,60,93,0.08)]">
              <img src={image} alt={post.title} className="w-full object-cover" />
              {index === 0 ? <figcaption className="p-5 text-sm font-bold text-[var(--slot4-muted-text)]">Featured visual from this image post.</figcaption> : null}
            </figure>
          ))}
        </div>
      </div>
      <div className="mt-10"><RelatedPanel task="image" post={post} related={related} /></div>
    </section>
  )
}

function BookmarkDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const website = getField(post, ['website', 'url', 'link'])
  return (
    <section className="mx-auto grid max-w-[var(--editable-container)] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8 lg:py-16">
      <article className="rounded-[2.7rem] border border-[var(--slot4-line)] bg-white p-7 shadow-[0_28px_80px_rgba(9,60,93,0.08)] sm:p-10">
        <BackLink task="sbm" />
        <div className="mt-10 flex h-20 w-20 items-center justify-center rounded-[2rem] bg-[var(--slot4-page-text)] text-white"><Bookmark className="h-9 w-9" /></div>
        <h1 className="mt-7 font-serif text-4xl font-black leading-[0.95] tracking-[-0.05em] sm:text-6xl">{post.title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-9 text-[var(--slot4-muted-text)]">{summaryText(post)}</p>
        {website ? (
          <Link href={website} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--slot4-page-text)] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white">
            Open saved resource <ExternalLink className="h-4 w-4" />
          </Link>
        ) : null}
        <BodyContent post={post} />
      </article>
      <RelatedPanel task="sbm" post={post} related={related} />
    </section>
  )
}

function PdfDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const fileUrl = getField(post, ['fileUrl', 'pdfUrl', 'documentUrl', 'url'])
  const images = getImages(post)
  const coverImage = images[0]
  const category = getEditableCategory(post)
  return (
    <section className="mx-auto max-w-[var(--editable-container)] px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="relative overflow-hidden rounded-[2.8rem] border border-[var(--slot4-line)] bg-[linear-gradient(135deg,#fbfaf6_0%,#f3ecdf_34%,#e8f2ff_100%)] shadow-[0_32px_100px_rgba(9,60,93,0.10)]">
        <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(93,248,216,0.18),transparent_62%)]" />
        <div className="relative grid gap-8 p-5 sm:p-7 lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
          <div className="rounded-[2.4rem] bg-[linear-gradient(135deg,#0a395a_0%,#114766_42%,#1e4f87_100%)] p-6 text-white shadow-[0_24px_80px_rgba(9,60,93,0.24)] sm:p-8">
            <BackLink task="pdf" />
            <div className="mt-8 flex flex-wrap items-center gap-3 text-[11px] font-black uppercase tracking-[0.24em] text-[var(--slot4-accent-bright)]">
              <span className="rounded-full border border-white/14 bg-white/10 px-3 py-1.5">PDF resource</span>
              <span>{category}</span>
            </div>
            <h1 className="mt-5 max-w-4xl font-serif text-4xl font-black leading-[0.92] tracking-[-0.05em] sm:text-5xl lg:text-[4.2rem]">
              {post.title}
            </h1>
            <div className="mt-8 flex flex-wrap gap-3">
              <CopyPageUrlButton className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-[var(--slot4-page-text)] transition hover:bg-white/92" />
              {fileUrl ? (
                <Link href={fileUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:bg-white/16">
                  Download PDF <Download className="h-4 w-4" />
                </Link>
              ) : null}
              {fileUrl ? (
                <Link href={fileUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/18 px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:bg-white/10">
                  Open file <ExternalLink className="h-4 w-4" />
                </Link>
              ) : null}
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.8rem] border border-white/12 bg-white/10 p-4">
                <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-white/64">
                  <Layers3 className="h-4 w-4" /> Format
                </div>
                <p className="mt-3 text-lg font-black">Curated PDF</p>
              </div>
              <div className="rounded-[1.8rem] border border-white/12 bg-white/10 p-4">
                <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-white/64">
                  <ScanSearch className="h-4 w-4" /> Discovery
                </div>
                <p className="mt-3 text-lg font-black">Reading-first layout</p>
              </div>
              <div className="rounded-[1.8rem] border border-white/12 bg-white/10 p-4">
                <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-white/64">
                  <Sparkles className="h-4 w-4" /> Access
                </div>
                <p className="mt-3 text-lg font-black">Fast preview tools</p>
              </div>
            </div>
          </div>

          <div className="grid gap-5">
            <div className="rounded-[2.4rem] border border-[var(--slot4-line)] bg-white/88 p-5 backdrop-blur-sm shadow-[0_20px_60px_rgba(9,60,93,0.10)]">
              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--detail-accent)]">Preview card</p>
              <div className="mt-4 rounded-[2rem] bg-[linear-gradient(180deg,#eef4ff_0%,#ffffff_100%)] p-4 ring-1 ring-[var(--slot4-line)]">
                <div className="rounded-[1.6rem] border border-[var(--slot4-line)] bg-white p-3 shadow-[0_14px_30px_rgba(9,60,93,0.08)]">
                  <div className="flex items-center justify-between border-b border-[var(--slot4-line)] px-2 pb-3">
                    <span className="text-[11px] font-black uppercase tracking-[0.22em] text-[var(--slot4-muted-text)]">{category}</span>
                    <span className="rounded-full bg-[var(--slot4-accent-soft)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--slot4-page-text)]">Featured file</span>
                  </div>
                  <div className="mt-3 overflow-hidden rounded-[1.4rem] bg-[var(--slot4-gray)]">
                    {coverImage ? (
                      <img src={coverImage} alt={post.title} className="aspect-[4/5] w-full object-cover" />
                    ) : (
                      <div className="flex aspect-[4/5] items-center justify-center text-[var(--slot4-page-text)]">
                        <FileText className="h-14 w-14 opacity-35" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-[2.4rem] border border-[var(--slot4-line)] bg-[#17222d] p-5 text-white shadow-[0_20px_60px_rgba(9,60,93,0.18)]">
              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--slot4-accent-bright)]">Why this page feels different</p>
              <p className="mt-4 text-sm leading-8 text-white/76">
                The document is framed like a collectible reading object, with actions, cover treatment, and preview space separated into a cleaner editorial stage.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 border-t border-[var(--slot4-line)] bg-white/62 p-5 backdrop-blur-sm sm:p-7 lg:grid-cols-[320px_minmax(0,1fr)] lg:p-10">
          <aside className="space-y-5">
            <div className="rounded-[2rem] border border-[var(--slot4-line)] bg-white p-5 shadow-[0_18px_50px_rgba(9,60,93,0.06)]">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[var(--detail-accent)]">Reader tools</p>
              <div className="mt-4 space-y-3">
                <div className="rounded-[1.4rem] bg-[var(--slot4-gray)] p-4">
                  <div className="flex items-center gap-2 text-sm font-black text-[var(--slot4-page-text)]">
                    <CheckCircle2 className="h-4 w-4 text-[var(--detail-accent)]" /> Copy the exact page link
                  </div>
                </div>
                <div className="rounded-[1.4rem] bg-[var(--slot4-gray)] p-4">
                  <div className="flex items-center gap-2 text-sm font-black text-[var(--slot4-page-text)]">
                    <CheckCircle2 className="h-4 w-4 text-[var(--detail-accent)]" /> Open the source PDF in one tap
                  </div>
                </div>
                <div className="rounded-[1.4rem] bg-[var(--slot4-gray)] p-4">
                  <div className="flex items-center gap-2 text-sm font-black text-[var(--slot4-page-text)]">
                    <CheckCircle2 className="h-4 w-4 text-[var(--detail-accent)]" /> Browse within a dedicated preview stage
                  </div>
                </div>
              </div>
            </div>
            <RelatedPanel task="pdf" post={post} related={related} />
          </aside>

          <article className="min-w-0">
            {fileUrl ? (
              <div className="overflow-hidden rounded-[2.2rem] border border-[var(--slot4-line)] bg-[var(--slot4-gray)] shadow-[0_24px_80px_rgba(9,60,93,0.10)]">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--slot4-line)] bg-white px-5 py-4">
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[var(--detail-accent)]">Document stage</p>
                    <p className="mt-1 text-sm font-bold text-[var(--slot4-muted-text)]">Focused preview with a cleaner chrome.</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <CopyPageUrlButton className="inline-flex items-center gap-2 rounded-full border border-[var(--slot4-line)] bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-[var(--slot4-page-text)] transition hover:bg-[var(--slot4-gray)]" />
                    <Link href={fileUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-page-text)] px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-white">
                      Download <Download className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
                <iframe src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=0`} title={post.title} className="h-[80vh] w-full bg-white" />
              </div>
            ) : (
              <div className="rounded-[2.2rem] border border-[var(--slot4-line)] bg-white p-10 text-center shadow-[0_24px_80px_rgba(9,60,93,0.08)]">
                <FileText className="mx-auto h-12 w-12 text-[var(--detail-accent)]" />
                <h2 className="mt-5 font-serif text-3xl font-black tracking-[-0.04em] text-[var(--slot4-page-text)]">Preview unavailable</h2>
                <p className="mt-3 text-base leading-8 text-[var(--slot4-muted-text)]">This entry does not currently include a live PDF file link.</p>
              </div>
            )}
            {/* <BodyContent post={post} includeDescription={false} includeDetails={false} includeSummaryFallback={false} fallbackText="" /> */}
          </article>
        </div>
      </div>
    </section>
  )
}

function ProfileDetail({ post, related }: { post: SitePost; related: SitePost[] }) {
  const images = getImages(post)
  const role = getField(post, ['role', 'designation', 'company', 'location'])
  const website = getField(post, ['website', 'url'])
  const email = getField(post, ['email'])
  return (
    <section className="mx-auto grid max-w-[var(--editable-container)] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[420px_minmax(0,1fr)] lg:px-8 lg:py-16">
      <aside className="rounded-[2.7rem] border border-[var(--slot4-line)] bg-white p-8 text-center shadow-[0_28px_80px_rgba(9,60,93,0.08)] lg:sticky lg:top-24 lg:self-start">
        <BackLink task="profile" />
        <div className="mx-auto mt-10 flex h-40 w-40 items-center justify-center overflow-hidden rounded-full bg-[var(--slot4-gray)] ring-1 ring-[var(--slot4-line)]">
          {images[0] ? <img src={images[0]} alt={post.title} className="h-full w-full object-cover" /> : <UserRound className="h-16 w-16 opacity-45" />}
        </div>
        <h1 className="mt-6 font-serif text-4xl font-black leading-[0.95] tracking-[-0.05em]">{post.title}</h1>
        {role ? <p className="mt-3 text-xs font-black uppercase tracking-[0.18em] text-[var(--detail-accent)]">{role}</p> : null}
        <ContactAction website={website} email={email} />
      </aside>
      <article className="rounded-[2.7rem] border border-[var(--slot4-line)] bg-white p-7 shadow-[0_18px_50px_rgba(9,60,93,0.08)] sm:p-10">
        <BodyContent post={post} />
        <ImageStrip images={images.slice(1)} label="Profile gallery" />
        <RelatedPanel task="profile" post={post} related={related} />
      </article>
    </section>
  )
}

function BodyContent({
  post,
  compact = false,
  includeDescription = true,
  includeDetails = true,
  includeSummaryFallback = true,
  fallbackText = 'Details will appear here once available.',
}: {
  post: SitePost
  compact?: boolean
  includeDescription?: boolean
  includeDetails?: boolean
  includeSummaryFallback?: boolean
  fallbackText?: string
}) {
  const html = formatPlainText(getBody(post, { includeDescription, includeDetails, includeSummaryFallback, fallbackText }))
  if (!html) return null
  return (
    <div
      className={`article-content mt-8 max-w-none ${compact ? 'text-base leading-8' : 'text-lg leading-9'} opacity-88`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

function InfoGrid({ items }: { items: Array<[string, string, typeof MapPin]> }) {
  const visible = items.filter(([, value]) => value)
  if (!visible.length) return null
  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-2">
      {visible.map(([label, value, Icon]) => (
        <div key={label} className="rounded-[1.5rem] border border-[var(--slot4-line)] bg-[var(--slot4-gray)] p-4">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--slot4-muted-text)]"><Icon className="h-4 w-4" /> {label}</div>
          <p className="mt-2 break-words text-sm font-bold leading-6 text-[var(--slot4-page-text)]">{value}</p>
        </div>
      ))}
    </div>
  )
}

function ImageStrip({ images, label, large = false }: { images: string[]; label: string; large?: boolean }) {
  if (!images.length) return null
  return (
    <section className="mt-8">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--detail-accent)]">{label}</p>
      <div className={`mt-4 grid gap-3 ${large ? 'sm:grid-cols-2' : 'grid-cols-2 sm:grid-cols-4'}`}>
        {images.slice(0, large ? 4 : 8).map((image, index) => (
          <img key={`${image}-${index}`} src={image} alt={label} className="aspect-[4/3] rounded-[1.4rem] object-cover ring-1 ring-[var(--slot4-line)]" />
        ))}
      </div>
    </section>
  )
}

function MapBox({ src, label }: { src: string; label: string }) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-[var(--slot4-line)] bg-white shadow-[0_18px_50px_rgba(9,60,93,0.08)]">
      <div className="flex items-center gap-2 p-4 text-sm font-black"><MapPin className="h-4 w-4" /> {label || 'Map location'}</div>
      <iframe src={src} title="Map" loading="lazy" className="h-80 w-full border-0" />
    </div>
  )
}

function ContactAction({ website, phone, email }: { website?: string; phone?: string; email?: string }) {
  if (!website && !phone && !email) return null
  return (
    <div className="mt-5 rounded-[2rem] border border-[var(--slot4-line)] bg-white p-5 shadow-[0_18px_50px_rgba(9,60,93,0.06)]">
      <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--slot4-muted-text)]">Quick actions</p>
      <div className="mt-4 flex flex-wrap gap-3">
        {website ? <Link href={website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[var(--detail-text)] px-4 py-2 text-sm font-black uppercase tracking-[0.12em] text-white">Website <ExternalLink className="h-4 w-4" /></Link> : null}
        {phone ? <a href={`tel:${phone}`} className="inline-flex items-center gap-2 rounded-full border border-[var(--slot4-line)] px-4 py-2 text-sm font-black uppercase tracking-[0.12em]"><Phone className="h-4 w-4" /> Call</a> : null}
        {email ? <a href={`mailto:${email}`} className="inline-flex items-center gap-2 rounded-full border border-[var(--slot4-line)] px-4 py-2 text-sm font-black uppercase tracking-[0.12em]"><Mail className="h-4 w-4" /> Email</a> : null}
      </div>
    </div>
  )
}

function BadgeLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm">
      <span className="font-black uppercase tracking-[0.16em] text-white/60">{label}</span>
      <span className="font-black">{value}</span>
    </div>
  )
}

function RelatedPanel({ task, post, related, compact = false }: { task: TaskKey; post: SitePost; related: SitePost[]; compact?: boolean }) {
  const taskConfig = getTaskConfig(task)
  return (
    <div></div>
  )
}

function RelatedCard({ task, post }: { task: TaskKey; post: SitePost }) {
  const image = getEditablePostImage(post)
  return (
    <Link href={buildPostUrl(task, post.slug)} className="group flex gap-3 rounded-2xl border border-[var(--slot4-line)] bg-white p-3 transition hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(9,60,93,0.10)]">
      {image && task !== 'sbm' ? (
        <img src={image} alt={post.title} className="h-20 w-20 shrink-0 rounded-xl object-cover" />
      ) : (
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-[var(--slot4-gray)]"><FileText className="h-6 w-6 opacity-45" /></div>
      )}
      <div className="min-w-0">
        <h3 className="line-clamp-3 text-sm font-black leading-tight tracking-[-0.03em] text-[var(--slot4-page-text)]">{post.title}</h3>
        
      </div>
    </Link>
  )
}

function EditableComments({ slug, comments }: { slug: string; comments: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  return (
    <section className="mt-10 rounded-[2rem] border border-[var(--slot4-line)] bg-[var(--slot4-gray)] p-5">
      <div className="flex items-center gap-2 font-serif text-2xl font-black"><MessageCircle className="h-5 w-5" /> Comments</div>
      <div className="mt-5 grid gap-3">
        {comments.slice(0, 5).map((comment) => (
          <div key={comment.id} className="rounded-2xl border border-[var(--slot4-line)] bg-white p-4">
            <p className="text-sm font-black text-[var(--slot4-page-text)]">{comment.name}</p>
            <p className="mt-2 text-sm leading-7 text-[var(--slot4-muted-text)]">{comment.comment}</p>
          </div>
        ))}
        {!comments.length ? <p className="text-sm text-[var(--slot4-muted-text)]">No comments yet for {slug}.</p> : null}
      </div>
    </section>
  )
}

import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight, FileText, Search, Star } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { editableDesignContract as dc, editablePalette as pal } from '@/editable/layouts/design-contract'
import {
  CompactIndexCard,
  EditorialFeatureCard,
  EditorialListCard,
  HorizontalFeatureCard,
  ImageFirstCard,
  RailPostCard,
  getEditableCategory,
  getEditablePostImage,
  postHref,
} from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

function Rail({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`${dc.layout.rail} ${className}`}>{children}</div>
}

function topicGroups(timeSections: HomeTimeSection[], posts: SitePost[]) {
  if (timeSections.some((section) => section.posts.length)) return timeSections
  return [
    {
      key: 'fresh-arrivals',
      title: 'Fresh arrivals',
      eyebrow: 'New in view',
      description: 'Recent additions arranged for quick discovery.',
      task: 'pdf' as TaskKey,
      posts: posts.slice(0, 4),
      href: '/pdf',
    },
    {
      key: 'reference-reads',
      title: 'Reference reads',
      eyebrow: 'Library picks',
      description: 'Useful guides and practical references.',
      task: 'pdf' as TaskKey,
      posts: posts.slice(4, 8),
      href: '/pdf',
    },
    {
      key: 'from-the-archive',
      title: 'From the archive',
      eyebrow: 'Evergreen shelf',
      description: 'Older material that still deserves a place in view.',
      task: 'pdf' as TaskKey,
      posts: posts.slice(8, 12),
      href: '/pdf',
    },
  ]
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const heroTitle = pagesContent.home.hero.title.join(' ')
  const heroPost = posts[0]
  const supporting = posts.slice(1, 6)

  return (
    <section className="relative overflow-hidden border-b border-[var(--slot4-line)] bg-[linear-gradient(180deg,#fbfaf7_0%,#f6f1ea_8%,#5a4fd5_8%,#5d53d8_100%)] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(93,248,216,0.14),transparent_28%)]" />
      <div className="mx-auto max-w-[var(--editable-container)] px-4 pb-0 pt-2 sm:px-6 lg:px-8 lg:pt-4">
        <div className="mx-auto max-w-5xl py-16 text-center lg:py-20">
          <h1 className="font-serif text-4xl font-black leading-[0.95] tracking-[-0.05em] sm:text-6xl lg:text-[5.2rem]">{heroTitle}</h1>
          <p className="mx-auto mt-6 max-w-4xl text-base leading-8 text-white/82 sm:text-lg">{pagesContent.home.hero.description}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link href={pagesContent.home.hero.primaryCta.href} className="inline-flex items-center gap-2 rounded-full bg-[#17222d] px-7 py-4 text-sm font-black uppercase tracking-[0.14em] text-white">
              {pagesContent.home.hero.primaryCta.label} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href={pagesContent.home.hero.secondaryCta.href} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-4 text-sm font-black uppercase tracking-[0.14em] text-white">
              {pagesContent.home.hero.secondaryCta.label}
            </Link>
          </div>
        </div>

        <div className="relative mx-auto mt-2 hidden max-w-[1480px] gap-4 overflow-hidden lg:grid lg:grid-cols-6">
          {supporting.map((post, index) => (
            <div key={post.id || post.slug || index} className="relative h-[180px] overflow-hidden rounded-t-[1.8rem] border border-white/12 bg-white/10">
              <img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {heroPost ? (
        <div className="bg-[#f5f1ea] px-4 py-8 text-[var(--slot4-page-text)] sm:px-6 lg:px-8 lg:py-10">
          <div className="mx-auto grid max-w-[var(--editable-container)] gap-5 lg:grid-cols-4">
            {[
              {
                title: 'Authors & Collectors',
                body: 'Follow thoughtful stories and original perspectives shaped by restless curiosity.',
                tone: 'bg-white',
              },
              {
                title: 'Studios & Startups',
                body: 'Discover emerging ideas at the meeting point of creativity, culture, and technology.',
                tone: 'bg-[#5b54d5] text-white',
              },
              {
                title: 'Libraries & Brands',
                body: 'Find useful connections across disciplines, communities, and changing points of view.',
                tone: 'bg-[#d7dcfb]',
              },
              {
                title: 'Curious Minds',
                body: 'Make room for questions, experiments, and ideas that continue to evolve over time.',
                tone: 'bg-[#17222d] text-white',
              },
            ].map((card) => (
              <div key={card.title} className={`overflow-hidden rounded-[2rem] border border-[var(--slot4-line)] p-6 shadow-[0_18px_40px_rgba(9,60,93,0.10)] ${card.tone}`}>
                <h3 className="font-serif text-[2rem] font-black leading-tight tracking-[-0.03em]">{card.title}</h3>
                <p className="mt-4 text-base leading-8 opacity-80">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const railPosts = posts.slice(0, 8)
  if (!railPosts.length) return null

  return (
    <section className="bg-[var(--slot4-warm)]">
      <div className="mx-auto max-w-[var(--editable-container)] px-4 py-14 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className={`${dc.type.eyebrow} ${pal.accentText}`}>Trusted reading flow</p>
          <h2 className="mt-4 font-serif text-3xl font-black tracking-[-0.04em] sm:text-4xl">Browse fresh covers, guidebooks, and standout files</h2>
        </div>
        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {railPosts.map((post, index) => (
            <RailPostCard key={post.id || post.slug || index} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const feature = posts[0]
  const secondary = posts.slice(1, 3)
  const visual = posts[3]
  const listPosts = posts.slice(4, 8)
  if (!feature) return null

  return (
    <section className="bg-[var(--slot4-page-bg)]">
      <div className="mx-auto max-w-[var(--editable-container)] px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <EditorialFeatureCard post={feature} href={postHref(primaryTask, feature, primaryRoute)} label="Featured platform story" />
          <div className="grid gap-6">
            {secondary.map((post, index) => (
              <HorizontalFeatureCard
                key={post.id || post.slug || index}
                post={post}
                href={postHref(primaryTask, post, primaryRoute)}
                badge={index === 0 ? 'Entrepreneurs & startups' : 'Businesses & brands'}
              />
            ))}
          </div>
        </div>

        <div className="mt-12">
          <div className="rounded-[2.2rem] border border-[var(--slot4-line)] bg-white p-6 shadow-[0_20px_60px_rgba(9,60,93,0.09)] lg:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.6fr] lg:items-start">
              <div className="max-w-xl">
                <p className={`${dc.type.eyebrow} ${pal.accentText}`}>How it works</p>
                <h2 className="mt-4 font-serif text-4xl font-black tracking-[-0.04em]">A more open path from curiosity to discovery</h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {[
                  ['Notice', 'Begin with a question, a pattern, or an unexpected detail worth examining more closely.'],
                  ['Explore', 'Move across subjects and perspectives while keeping the wider context in view.'],
                  ['Connect', 'See how distant ideas can inform one another and reveal something genuinely new.'],
                  ['Expand', 'Carry the thought forward, revisit it later, and let it continue to change shape.'],
                ].map(([title, copy]) => (
                  <div key={title} className="rounded-[1.6rem] bg-[var(--slot4-warm)] p-5">
                    <h3 className="text-2xl font-black tracking-[-0.03em]">{title}</h3>
                    <p className={`mt-3 text-base leading-8 ${pal.mutedText}`}>{copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const groups = topicGroups(timeSections, posts)
  const picks = posts.slice(0, 4)
  const listPosts = posts.slice(0, 8)

  return (
    <section className="bg-[var(--slot4-gray)]">
      <div className="mx-auto max-w-[var(--editable-container)] px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.84fr_1.16fr] lg:items-end">
          <div>
            <p className={`${dc.type.eyebrow} ${pal.accentText}`}>Curated for curious minds</p>
            <h2 className={dc.type.sectionTitle}>Search-first tools, category blocks, and editorial picks in one view</h2>
            <p className={`mt-5 max-w-xl text-base leading-8 ${pal.mutedText}`}>
              Everything is arranged to feel deliberate: a strong search lane, quick topics, featured shelves, and companion reading instead of one repeating feed.
            </p>
            <form action="/search" className="mt-8 flex max-w-xl rounded-full border border-[var(--slot4-line)] bg-white p-2 shadow-[0_18px_40px_rgba(9,60,93,0.08)]">
              <input name="q" placeholder="Search reports, guides, forms, and references" className="min-w-0 flex-1 bg-transparent px-4 text-sm font-bold outline-none" />
              <button className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-page-text)] px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white">
                <Search className="h-4 w-4" /> Search
              </button>
            </form>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {picks.map((post, index) => (
              <CompactIndexCard key={post.id || post.slug || index} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1fr]">
          {groups.slice(0, 2).map((group, groupIndex) => (
            <div key={group.key} className="rounded-[2.2rem] border border-[var(--slot4-line)] bg-white p-6 shadow-[0_20px_60px_rgba(9,60,93,0.08)]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className={`${dc.type.eyebrow} ${pal.accentText}`}>Topic block {groupIndex + 1}</p>
                  <h3 className="mt-2 font-serif text-3xl font-black tracking-[-0.03em]">{group.title}</h3>
                </div>
                <Star className="h-6 w-6 text-[var(--slot4-accent)]" />
              </div>
              <div className="mt-4">
                {group.posts.slice(0, 4).map((post, index) => (
                  <EditorialListCard key={post.id || post.slug || index} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.86fr_1.14fr]">
          <div className="rounded-[2.2rem] border border-[var(--slot4-line)] bg-[var(--slot4-dark-bg)] p-7 text-white shadow-[0_24px_70px_rgba(9,60,93,0.18)]">
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[var(--slot4-accent-bright)]">Featured library note</p>
            <h3 className="mt-4 font-serif text-4xl font-black tracking-[-0.04em]">Elegant browsing patterns keep practical content feeling premium.</h3>
            <p className="mt-5 max-w-lg text-base leading-8 text-white/76">
              Files, articles, and references can stay useful without looking dull. The layout uses contrast, whitespace, and varied card structures to keep readers engaged.
            </p>
            <div className="mt-8 rounded-[1.8rem] bg-white/8 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/12">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-black">Always evolving</p>
                  <p className="text-sm text-white/64">New perspectives create fresh paths through the ideas already in view.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2.2rem] border border-[var(--slot4-line)] bg-white p-6 shadow-[0_20px_60px_rgba(9,60,93,0.08)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className={`${dc.type.eyebrow} ${pal.accentText}`}>Latest index</p>
                <h3 className="mt-2 font-serif text-3xl font-black tracking-[-0.03em]">Fresh additions across the platform</h3>
              </div>
              <Link href={primaryRoute} className="text-sm font-black uppercase tracking-[0.12em] text-[var(--slot4-page-text)]">
                View all
              </Link>
            </div>
            <div className="mt-5 grid gap-4 xl:grid-cols-2">
              {listPosts.map((post, index) => (
                <HorizontalFeatureCard
                  key={post.id || post.slug || index}
                  post={post}
                  href={postHref(primaryTask, post, primaryRoute)}
                  badge={`Editor's selection ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableHomeCta() {
  return (
    <section id="get-app" className="bg-[var(--slot4-page-bg)]">
      <div className="mx-auto max-w-[var(--editable-container)] px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-[2.8rem] bg-[linear-gradient(135deg,#0b3959_0%,#185372_46%,#1f4f8c_100%)] px-6 py-16 text-center text-white shadow-[0_30px_90px_rgba(9,60,93,0.24)] sm:px-10">
          <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[var(--slot4-accent-bright)]">{pagesContent.home.cta.badge}</p>
          <h2 className="mx-auto mt-5 max-w-4xl font-serif text-4xl font-black leading-[0.96] tracking-[-0.05em] sm:text-5xl">{pagesContent.home.cta.title}</h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/78">{pagesContent.home.cta.description}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href={pagesContent.home.cta.primaryCta.href} className={dc.button.accent}>
              {pagesContent.home.cta.primaryCta.label}
            </Link>
            <Link href={pagesContent.home.cta.secondaryCta.href} className="inline-flex items-center justify-center rounded-full border border-white/18 bg-white/10 px-7 py-3.5 text-sm font-black uppercase tracking-[0.14em] text-white">
              {pagesContent.home.cta.secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

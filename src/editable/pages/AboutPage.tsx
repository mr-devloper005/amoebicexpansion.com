import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="px-4 py-14 sm:px-6 lg:px-8">
        <section className="mx-auto grid max-w-[var(--editable-container)] gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-[2.8rem] bg-[linear-gradient(135deg,#0a395a_0%,#155271_50%,#214d89_100%)] p-8 text-white shadow-[0_30px_90px_rgba(9,60,93,0.18)] lg:p-12">
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[var(--slot4-accent-bright)]">{pagesContent.about.badge}</p>
            <h1 className="mt-5 font-serif text-5xl font-black tracking-[-0.06em] sm:text-6xl">About {SITE_CONFIG.name}</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/78">{pagesContent.about.description}</p>
            <div className="mt-8 space-y-4 text-sm leading-8 text-white/76">
              {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </article>
          <aside className="grid gap-4">
            {pagesContent.about.values.map((value) => (
              <div key={value.title} className="rounded-[2rem] border border-[var(--slot4-line)] bg-white/82 p-6 shadow-[0_18px_50px_rgba(9,60,93,0.06)]">
                <h2 className="font-serif text-2xl font-black tracking-[-0.03em] text-[var(--slot4-page-text)]">{value.title}</h2>
                <p className="mt-3 text-sm leading-8 text-[var(--slot4-muted-text)]">{value.description}</p>
              </div>
            ))}
          </aside>
        </section>
      </main>
    </EditableSiteShell>
  )
}

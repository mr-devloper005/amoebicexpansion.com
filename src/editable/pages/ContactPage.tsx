'use client'

import { BookOpen, Building2, FileText, Mail, Sparkles } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function ContactPage() {
  const lanes = [
    { icon: FileText, title: 'Document submissions', body: 'Talk to us about guides, reports, handbooks, or public files that belong in a polished reading experience.' },
    { icon: Building2, title: 'Archive partnerships', body: 'Coordinate larger collections, branded resource hubs, and premium browsing surfaces for expanding libraries.' },
    { icon: BookOpen, title: 'Editorial support', body: 'Reach out about article framing, category planning, or how to connect related content more clearly.' },
    { icon: Sparkles, title: 'Design direction', body: 'Discuss premium layouts, archive presentation, and how readers should move through your collection.' },
  ]

  return (
    <EditableSiteShell>
      <main className="mx-auto max-w-[var(--editable-container)] px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="rounded-[2.8rem] bg-[linear-gradient(135deg,#0a395a_0%,#155271_50%,#214d89_100%)] p-8 text-white shadow-[0_30px_90px_rgba(9,60,93,0.18)] lg:p-10">
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[var(--slot4-accent-bright)]">{pagesContent.contact.eyebrow}</p>
            <h1 className="mt-4 font-serif text-5xl font-black tracking-[-0.05em]">{pagesContent.contact.title}</h1>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-white/78">{pagesContent.contact.description}</p>
            <div className="mt-8 grid gap-4">
              {lanes.map((lane) => (
                <div key={lane.title} className="rounded-[1.8rem] border border-white/12 bg-white/8 p-5">
                  <lane.icon className="h-5 w-5 text-[var(--slot4-accent-bright)]" />
                  <h2 className="mt-3 font-serif text-2xl font-black">{lane.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-white/74">{lane.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2.4rem] border border-[var(--slot4-line)] bg-white/86 p-7 shadow-[0_20px_60px_rgba(9,60,93,0.08)]">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--slot4-accent-soft)] text-[var(--slot4-page-text)]">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.26em] text-[var(--slot4-accent)]">Contact desk</p>
                <h2 className="mt-1 font-serif text-3xl font-black tracking-[-0.03em] text-[var(--slot4-page-text)]">{pagesContent.contact.formTitle}</h2>
              </div>
            </div>
            <div className="mt-6">
              <EditableContactLeadForm />
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}

'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const { session, logout } = useEditableLocalAuthSession()
  const year = new Date().getFullYear()
  const taskLinks = SITE_CONFIG.tasks.filter((task) => task.enabled)

  return (
    <footer className="relative overflow-hidden border-t border-[var(--slot4-line)] bg-[var(--slot4-dark-bg)] text-[var(--slot4-dark-text)]">
      <div className="absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(93,248,216,0.20),transparent)]" />
      <section className="mx-auto max-w-[var(--editable-container)] px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.24)] backdrop-blur">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr_0.85fr]">
            <div>
              <Link href="/" className="inline-flex items-center gap-3">
                <span className="flex h-14 w-14 items-center justify-center rounded-[1.35rem] border border-white/10 bg-white/10">
                  <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-10 w-10 object-contain" />
                </span>
                <span>
                  <span className="block font-serif text-3xl font-black tracking-[-0.04em]">{SITE_CONFIG.name}</span>
                  <span className="block text-[11px] font-black uppercase tracking-[0.26em] text-white/55">{globalContent.footer.tagline}</span>
                </span>
              </Link>
              <p className="mt-5 max-w-md text-sm leading-8 text-white/70">{globalContent.footer.description}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/pdf" className="rounded-full bg-[var(--slot4-accent-bright)] px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-[var(--slot4-page-text)]">
                  Browse PDFs
                </Link>
                <Link href="/search" className="rounded-full border border-white/15 px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-white">
                  Search archive
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.28em] text-white/45">Collections</h3>
              <div className="mt-5 grid gap-3">
                {taskLinks.map((task) => (
                  <Link key={task.key} href={task.route} className="inline-flex items-center gap-2 text-sm font-bold text-white/78 hover:text-white">
                    {task.label} <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.28em] text-white/45">Pages</h3>
              <div className="mt-5 grid gap-3">
                <Link href="/about" className="text-sm font-bold text-white/78 hover:text-white">About</Link>
                <Link href="/contact" className="text-sm font-bold text-white/78 hover:text-white">Contact</Link>
                
                {session ? (
                  <>
                    <Link href="/create" className="text-sm font-bold text-white/78 hover:text-white">Create</Link>
                    <button type="button" onClick={logout} className="text-left text-sm font-bold text-white/78 hover:text-white">Logout</button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="text-sm font-bold text-white/78 hover:text-white">Login</Link>
                    <Link href="/signup" className="text-sm font-bold text-white/78 hover:text-white">Sign up</Link>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs font-bold text-white/50 md:flex-row md:items-center md:justify-between">
            <p>{globalContent.footer.bottomNote}</p>
            <p>Copyright {year} {SITE_CONFIG.name}. All rights reserved.</p>
          </div>
        </div>
      </section>
    </footer>
  )
}

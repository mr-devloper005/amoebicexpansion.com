'use client'

import { useMemo, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, LogIn, Menu, PlusCircle, Search, UserPlus, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { getVisualPreset, visualSystem } from '@/editable/theme/visual-system'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const preset = getVisualPreset(visualSystem.recommendedPreset as any)
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { session, logout } = useEditableLocalAuthSession()
  const navItems = useMemo(
    () => SITE_CONFIG.tasks.filter((task) => task.enabled).map((task) => ({ label: task.label, href: task.route })),
    []
  )

  const navVars = {
    '--editable-nav-bg': '#fbfaf7',
    '--editable-nav-text': preset.colors.foreground,
    '--editable-nav-muted': preset.colors.muted,
    '--editable-nav-line': 'rgba(9,60,93,0.10)',
    '--editable-nav-pill': '#edf5f7',
    '--editable-nav-cta': '#093c5d',
    '--editable-nav-cta-text': '#f8fffe',
  } as CSSProperties

  return (
    <header
      style={navVars}
      className="sticky top-0 z-50 border-b border-[var(--editable-nav-line)] bg-[var(--editable-nav-bg)]/92 text-[var(--editable-nav-text)] backdrop-blur-xl"
    >
      <nav className="mx-auto flex min-h-[90px] w-full max-w-[var(--editable-container)] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <span className="flex h-14 w-14 items-center justify-center rounded-[1.35rem] border border-[var(--editable-nav-line)] bg-white shadow-[0_10px_30px_rgba(9,60,93,0.08)]">
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-10 w-10 object-contain" />
          </span>
          <span className="hidden min-w-0 sm:block">
            <span className="block font-serif text-[2rem] font-black leading-none tracking-[-0.04em]">{SITE_CONFIG.name}</span>
            <span className="mt-1 block text-[10px] font-black uppercase tracking-[0.26em] text-[var(--editable-nav-muted)]">
              {globalContent.nav.tagline}
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 xl:flex">
          {navItems.slice(0, 5).map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-black transition ${
                  active ? 'bg-[var(--editable-nav-pill)] text-[var(--editable-nav-text)]' : 'hover:bg-[var(--editable-nav-pill)]/70'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
          <Link href="/about" className="inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-black hover:bg-[var(--editable-nav-pill)]/70">
            About
          </Link>
        </div>

        <form action="/search" className="mx-auto hidden min-w-0 max-w-[420px] flex-1 lg:block">
          <label className="flex items-center gap-3 rounded-full border border-[var(--editable-nav-line)] bg-white px-4 py-3 shadow-[0_10px_24px_rgba(9,60,93,0.05)]">
            <Search className="h-4 w-4 text-[var(--editable-nav-muted)]" />
            <input
              name="q"
              type="search"
              placeholder="Search the document archive"
              className="min-w-0 flex-1 bg-transparent text-sm font-bold outline-none placeholder:text-[var(--editable-nav-muted)]"
            />
          </label>
        </form>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          {session ? (
            <>
              <Link
                href="/create"
                className="hidden items-center gap-2 rounded-full bg-[var(--editable-nav-cta)] px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-[var(--editable-nav-cta-text)] shadow-[0_14px_40px_rgba(9,60,93,0.18)] md:inline-flex"
              >
                <PlusCircle className="h-4 w-4" />
                Submit
              </Link>
              <button type="button" onClick={logout} className="hidden rounded-full px-4 py-2 text-sm font-black hover:bg-[var(--editable-nav-pill)] md:inline-flex">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-black hover:bg-[var(--editable-nav-pill)] md:inline-flex">
                <LogIn className="h-4 w-4" />
                Login
              </Link>
              <Link
                href="/signup"
                className="hidden items-center gap-2 rounded-full bg-[var(--editable-nav-cta)] px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-[var(--editable-nav-cta-text)] md:inline-flex"
              >
                <UserPlus className="h-4 w-4" />
                Sign up
              </Link>
            </>
          )}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="rounded-full border border-[var(--editable-nav-line)] bg-white p-3 xl:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-[var(--editable-nav-line)] bg-[var(--editable-nav-bg)] px-4 py-5 xl:hidden">
          <form action="/search" className="mb-4">
            <label className="flex items-center gap-3 rounded-[1.4rem] border border-[var(--editable-nav-line)] bg-white px-4 py-3">
              <Search className="h-4 w-4 text-[var(--editable-nav-muted)]" />
              <input name="q" type="search" placeholder="Search the archive" className="min-w-0 flex-1 bg-transparent text-sm font-bold outline-none" />
            </label>
          </form>
          <div className="grid gap-2">
            {[{ label: 'Home', href: '/' }, ...navItems, { label: 'About', href: '/about' }, { label: 'Contact', href: '/contact' }].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-[1.35rem] border border-[var(--editable-nav-line)] bg-white px-4 py-3 text-sm font-black"
              >
                {item.label}
              </Link>
            ))}
            {session ? (
              <button type="button" onClick={logout} className="rounded-[1.35rem] border border-[var(--editable-nav-line)] bg-white px-4 py-3 text-left text-sm font-black">
                Logout
              </button>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)} className="rounded-[1.35rem] border border-[var(--editable-nav-line)] bg-white px-4 py-3 text-sm font-black">
                  Login
                </Link>
                <Link href="/signup" onClick={() => setOpen(false)} className="rounded-[1.35rem] bg-[var(--editable-nav-cta)] px-4 py-3 text-sm font-black uppercase tracking-[0.14em] text-[var(--editable-nav-cta-text)]">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  )
}

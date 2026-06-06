import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: pagesContent.auth.signup.metadataDescription })
}

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main>
        <section className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[var(--editable-container)] items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.95fr_1fr] lg:px-8">
          <div className="rounded-[2.3rem] border border-[var(--slot4-line)] bg-white/88 p-6 shadow-[0_24px_70px_rgba(9,60,93,0.08)] backdrop-blur sm:p-8">
            <h1 className="font-serif text-3xl font-black tracking-[-0.03em] text-[var(--slot4-page-text)]">{pagesContent.auth.signup.formTitle}</h1>
            <EditableLocalSignupForm />
            <p className="mt-5 text-sm text-[var(--slot4-muted-text)]">Already have an account? <Link href="/login" className="font-black text-[var(--slot4-page-text)] underline-offset-4 hover:underline">{pagesContent.auth.signup.loginCta}</Link></p>
          </div>
          <div className="rounded-[2.8rem] bg-[linear-gradient(135deg,#0a395a_0%,#155271_50%,#214d89_100%)] p-8 text-white shadow-[0_30px_90px_rgba(9,60,93,0.18)] sm:p-10">
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[var(--slot4-accent-bright)]">{pagesContent.auth.signup.badge}</p>
            <h2 className="mt-5 max-w-xl font-serif text-5xl font-black leading-[0.95] tracking-[-0.05em] sm:text-6xl">{pagesContent.auth.signup.title}</h2>
            <p className="mt-6 max-w-lg text-sm leading-8 text-white/76">{pagesContent.auth.signup.description}</p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}

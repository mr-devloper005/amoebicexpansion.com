import type { ReactNode } from 'react'
import { EditableNavbar } from '@/editable/shell/EditableNavbar'
import { EditableFooter } from '@/editable/shell/EditableFooter'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'

export function EditableSiteShell({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`${dc.shell.page} relative flex min-h-screen flex-col ${className}`}>
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-70">
        <div className="absolute left-0 top-0 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(93,248,216,0.18),transparent_68%)]" />
        <div className="absolute right-0 top-[16rem] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(111,209,215,0.16),transparent_68%)]" />
      </div>
      <EditableNavbar />
      <div className="min-h-0 flex-1">{children}</div>
      <EditableFooter />
    </div>
  )
}

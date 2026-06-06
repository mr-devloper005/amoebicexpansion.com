import { EditableTaskDetailRoute, generateEditableDetailMetadata } from '@/editable/pages/TaskDetailPage'

export const revalidate = 3

export async function generateStaticParams() {
  return []
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return generateEditableDetailMetadata('pdf', params)
}

export default async function PdfDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  // Shared detail route keeps the redesigned layout centralized.
  return <EditableTaskDetailRoute task="pdf" params={params} />
}

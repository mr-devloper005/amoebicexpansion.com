import { EditableTaskArchiveRoute, taskMetadata } from '@/editable/pages/TaskArchivePage'

export const revalidate = 3

export const generateMetadata = () => taskMetadata('pdf', '/pdf')

export async function PdfPageTaskPage({
  searchParams,
  basePath = '/pdf',
}: {
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  // Shared archive route keeps the redesigned layout centralized.
  return <EditableTaskArchiveRoute task="pdf" searchParams={searchParams} basePath={basePath} />
}

export default PdfPageTaskPage

export const PdfTaskPage = PdfPageTaskPage

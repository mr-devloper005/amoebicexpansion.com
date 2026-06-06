import { EditableTaskArchiveRoute, taskMetadata } from '@/editable/pages/TaskArchivePage'

export const revalidate = 3

export const generateMetadata = () => taskMetadata('image', '/image')

export async function ImagesPageTaskPage({
  searchParams,
  basePath = '/image',
}: {
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  // Shared archive route keeps the redesigned layout centralized.
  return <EditableTaskArchiveRoute task="image" searchParams={searchParams} basePath={basePath} />
}

export default ImagesPageTaskPage

export const ImagesTaskPage = ImagesPageTaskPage

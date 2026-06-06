import { EditableTaskArchiveRoute, taskMetadata } from '@/editable/pages/TaskArchivePage'

export const revalidate = 3

export const generateMetadata = () => taskMetadata('article', '/article')

export async function ArticlePageTaskPage({
  searchParams,
  basePath = '/article',
}: {
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  // Shared archive route keeps the redesigned layout centralized.
  return <EditableTaskArchiveRoute task="article" searchParams={searchParams} basePath={basePath} />
}

export default ArticlePageTaskPage

export const ArticleTaskPage = ArticlePageTaskPage

import fs, { Dirent } from 'fs'
import path from 'path'

export type Note = {
  title: string
  description: string
  link: string
  uid: string
  date: string
  tags?: string[]
}

export function getNotes(): Note[] {
  const postsDirectory = path.join(process.cwd(), 'app/notes')

  try {
    const postFolders = fs
      .readdirSync(postsDirectory, { withFileTypes: true })
      .filter((dirent: Dirent) => dirent.isDirectory())
      .map((dirent: Dirent) => dirent.name)

    const notes = postFolders
      .map((folderName: string): Note | null => {
        const mdxPath = path.join(postsDirectory, folderName, 'page.mdx')
        if (!fs.existsSync(mdxPath)) return null

        const stats = fs.statSync(mdxPath)
        const fileContents = fs.readFileSync(mdxPath, 'utf8')

        const titleMatch = fileContents.match(/title: '(.*?)'/)
        const descriptionMatch = fileContents.match(/description: '(.*?)'/)
        const tagsMatch = fileContents.match(/tags: \[(.*?)\]/)

        const note: Note = {
          title: titleMatch ? titleMatch[1] : 'Untitled Post',
          description: descriptionMatch?.[1] ?? 'No description available.',
          link: `/notes/${folderName}`,
          uid: folderName,
          date: stats.birthtime.toISOString(),
        }

        if (tagsMatch && tagsMatch[1]) {
          note.tags = tagsMatch[1]
            .split(',')
            .map((tag) => tag.trim().replace(/['"]/g, ''))
        }

        return note
      })
      .filter((note): note is Note => note !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return notes
  } catch (error) {
    console.error('Error reading blog posts:', error)
    return []
  }
}

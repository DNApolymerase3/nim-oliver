import fs, { Dirent } from 'fs'
import path from 'path'

export type BlogPost = {
  title: string
  description: string
  link: string
  uid: string
}

export function getBlogPosts(): BlogPost[] {
  const postsDirectory = path.join(process.cwd(), 'app/blog')

  try {
    const postFolders = fs
      .readdirSync(postsDirectory, { withFileTypes: true })
      .filter((dirent: Dirent) => dirent.isDirectory())
      .map((dirent: Dirent) => dirent.name)

    const posts = postFolders
      .map((folderName: string) => {
        const mdxPath = path.join(postsDirectory, folderName, 'page.mdx')
        if (!fs.existsSync(mdxPath)) {
          return null
        }

        const fileContents = fs.readFileSync(mdxPath, 'utf8')

        const titleMatch = fileContents.match(/title: '(.*?)'/)
        const descriptionMatch = fileContents.match(/description: '(.*?)'/)

        const title = titleMatch ? titleMatch[1] : 'Untitled Post'
        const description = descriptionMatch
          ? descriptionMatch[1]
          : 'No description available.'

        return {
          title,
          description,
          link: `/blog/${folderName}`,
          uid: folderName,
        }
      })
      .filter((post: BlogPost | null): post is BlogPost => post !== null)

    return posts
  } catch (error) {
    console.error('Error reading blog posts:', error)
    return []
  }
}

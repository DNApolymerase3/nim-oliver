import { getBlogPosts } from '@/lib/posts'
import Link from 'next/link'
import { AnimatedBackground } from '@/components/ui/animated-background'

export default function BlogIndexPage() {
  const allPosts = getBlogPosts()

  return (
    <AnimatedBackground>
      <main className="container mx-auto max-w-3xl px-4 py-24">
        <h1 className="mb-8 text-3xl font-bold text-zinc-900 dark:text-zinc-100">All Posts</h1>
        <div className="flex flex-col space-y-4">
          {allPosts.map((post) => (
            <Link
              href={post.link}
              key={post.uid}
              className="block rounded-2xl bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md dark:bg-zinc-950 dark:ring-1 dark:ring-zinc-800"
            >
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                {post.title}
              </h2>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                {post.description}
              </p>
              <time className="mt-4 block text-sm text-zinc-500">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </Link>
          ))}
        </div>
      </main>
    </AnimatedBackground>
  )
}

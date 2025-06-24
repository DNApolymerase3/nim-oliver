'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { Note } from '@/lib/notes'

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const VARIANTS_ITEM = {
  hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

export function NotesList({ notes }: { notes: Note[] }) {
  return (
    <motion.main
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
      className="container mx-auto max-w-3xl px-4 py-24"
    >
      <motion.h1 variants={VARIANTS_ITEM} className="mb-8 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
        All Notes
      </motion.h1>
      <div className="flex flex-col space-y-4">
        {notes.map((note) => (
          <motion.div
            key={note.uid}
            variants={VARIANTS_ITEM}
            className="transform transition-transform duration-300 ease-in-out hover:scale-105"
          >
            <div className="group relative block h-full rounded-2xl bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md dark:bg-zinc-950 dark:ring-1 dark:ring-zinc-800">
              <div className="flex h-full flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between">
                    <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                      {note.title}
                    </h2>
                    {note.tags && (
                      <div className="relative z-10 flex flex-wrap gap-2 pl-4">
                        {note.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                    {note.description}
                  </p>
                </div>
                <time className="mt-4 block text-sm text-zinc-500">
                  {new Date(note.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
              <Link
                href={note.link}
                className="absolute inset-0"
                aria-label={`Read more about ${note.title}`}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.main>
  )
}

'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { AnimatedBackground } from '@/components/motion-primitives/animated-background'
import { Note } from '@/lib/notes'
import { useState, useMemo } from 'react'

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
  exit: {
    opacity: 0,
    filter: 'blur(10px)',
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
}

export function NotesList({ notes }: { notes: Note[] }) {
  const [searchTitle, setSearchTitle] = useState('')
  const [searchTags, setSearchTags] = useState('')
  const [suggestion, setSuggestion] = useState('')

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTags(value)

    if (value) {
      const match = allTags.find((tag) =>
        tag.toLowerCase().startsWith(value.toLowerCase()),
      )
      if (match && match.toLowerCase() !== value.toLowerCase()) {
        setSuggestion(match.substring(value.length))
      } else {
        setSuggestion('')
      }
    } else {
      setSuggestion('')
    }
  }

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Tab' || e.key === 'ArrowRight') && suggestion) {
      e.preventDefault()
      setSearchTags(searchTags + suggestion)
      setSuggestion('')
    }
  }

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    notes.forEach((note) => {
      note.tags?.forEach((tag) => tags.add(tag))
    })
    return Array.from(tags)
  }, [notes])

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const titleMatch = note.title
        .toLowerCase()
        .includes(searchTitle.toLowerCase())
      const tagsMatch =
        searchTags === ''
          ? true
          : note.tags?.some((tag) =>
              tag.toLowerCase().includes(searchTags.toLowerCase()),
            )
      return titleMatch && tagsMatch
    })
  }, [notes, searchTitle, searchTags])

  return (
    <main className="container mx-auto min-w-[48rem] max-w-3xl px-4 pt-0">
      <motion.h1
        variants={VARIANTS_ITEM}
        className="mb-8 text-3xl font-bold text-zinc-900 dark:text-zinc-100"
      >
        All Notes
      </motion.h1>
      <motion.div
        variants={VARIANTS_ITEM}
        className="mb-8 flex w-full flex-shrink-0 flex-col gap-4 sm:flex-row"
      >
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          className="w-full rounded-md border border-zinc-300 bg-white px-4 py-2 text-zinc-900 placeholder-zinc-500 transition-colors duration-300 focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder-zinc-400"
        />
        <div className="relative w-full">
          <input
            type="text"
            readOnly
            value={searchTags + suggestion}
            className="w-full rounded-md border border-zinc-300 bg-white px-4 py-2 text-zinc-400 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-600"
          />
          <input
            type="text"
            placeholder="Filter by tag..."
            value={searchTags}
            onChange={handleTagChange}
            onKeyDown={handleTagKeyDown}
            className="absolute inset-0 z-10 w-full rounded-md border border-transparent bg-transparent px-4 py-2 text-zinc-900 placeholder-zinc-500 focus:border-zinc-500 focus:outline-none dark:text-zinc-100 dark:placeholder-zinc-400"
          />
        </div>
      </motion.div>
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          <AnimatedBackground
            className="rounded-2xl bg-zinc-100 dark:bg-zinc-800"
            transition={{
              type: 'spring',
              bounce: 0.2,
              duration: 0.6,
            }}
            enableHover
          >
            {filteredNotes.map((note) => (
              <motion.div
                key={note.uid}
                data-id={note.uid}
                variants={VARIANTS_ITEM}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="h-full rounded-2xl bg-white shadow-sm dark:bg-zinc-950 dark:ring-1 dark:ring-zinc-800"
              >
                <div className="group relative block h-full p-6">
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
          </AnimatedBackground>
        </AnimatePresence>
      </div>
    </main>
  )
}

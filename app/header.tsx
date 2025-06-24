'use client'
import { TextEffect } from '@/components/ui/text-effect'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Header() {
  const pathname = usePathname()
  const isNotesPage = pathname.startsWith('/notes')

  const headerClasses = isNotesPage
    ? 'container mx-auto mb-8 flex min-w-[48rem] max-w-3xl items-center justify-between px-4 pt-8'
    : 'mb-8 flex items-center justify-between'

  return (
    <header className={headerClasses}>
      <div>
        <Link href="/" className="font-medium text-black dark:text-white">
          Julien Nim
        </Link>
        <TextEffect
          as="p"
          preset="fade"
          per="char"
          className="text-zinc-600 dark:text-zinc-500"
          delay={0.5}
        >
          Design Engineer
        </TextEffect>
      </div>
    </header>
  )
}

'use client'
import { TextLoop } from '@/components/ui/text-loop'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Header() {
  const pathname = usePathname()
  const isNotesPage = pathname.startsWith('/notes')

  const headerClasses = isNotesPage
    ? 'container mx-auto mb-4 flex min-w-[48rem] max-w-3xl items-center justify-between px-4 pt-8'
    : 'mb-4 flex items-center justify-between'

  return (
    <header className={headerClasses}>
      <div className="flex flex-col">
        <Link href="/" className="font-medium text-black dark:text-white">
          Tristan Perry
        </Link>
        <TextLoop className="text-zinc-600 dark:text-zinc-500">
          <span>Philosophy Enthusiast</span>
          <span>Pediatric Cardiologist</span>
          <span>Maker</span>
        </TextLoop>
      </div>
      <img src="/ezgif-48c7fcf1df66ae-unscreen.gif" alt="logo" className="h-12 w-12" />
    </header>
  )
}

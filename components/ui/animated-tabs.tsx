'use client'

'use client'

import { useRouter } from 'next/navigation'
import { FileText, Home, PhoneCall, Settings } from 'lucide-react'
import { motion, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion'
import { AnimatedBackground } from '@/components/motion-primitives/animated-background'

export function AnimatedTabs() {
  const router = useRouter()
  const { scrollY } = useScroll()
  const scrollYVelocity = useVelocity(scrollY)
  const y = useTransform(scrollYVelocity, [-1000, 1000], [8, -8], {
    clamp: false,
  })
  const smoothY = useSpring(y, { damping: 50, stiffness: 400 })

  const TABS = [
    {
      label: 'Home',
      href: '/',
      icon: <Home className="h-5 w-5" />,
    },
    {
      label: 'Notes',
      href: '/notes',
      icon: <FileText className="h-5 w-5" />,
    },
    {
      label: 'Services',
      href: '#',
      icon: <Settings className="h-5 w-5" />,
    },
    {
      label: 'Contact',
      href: '#',
      icon: <PhoneCall className="h-5 w-5" />,
    },
  ]

  return (
    <motion.div
      style={{ y: smoothY }}
      className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2"
    >
      <div className="flex w-full items-center space-x-2 rounded-xl border border-zinc-950/10 bg-white p-2">
        <AnimatedBackground
          defaultValue={TABS[0].label}
          className="rounded-lg bg-zinc-100"
          transition={{
            type: 'spring',
            bounce: 0.2,
            duration: 0.3,
          }}
          enableHover
        >
          {TABS.map((tab) => (
            <button
              key={tab.label}
              data-id={tab.label}
              onClick={() => router.push(tab.href)}
              type="button"
              className="h-9 w-9 bg-transparent text-zinc-500 transition-colors duration-100 focus-visible:outline-2 data-[checked=true]:text-zinc-950"
            >
              {tab.icon}
            </button>
          ))}
        </AnimatedBackground>
      </div>
    </motion.div>
  )
}

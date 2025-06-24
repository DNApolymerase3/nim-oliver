'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/motion-primitives/accordion'
import { ChevronRight } from 'lucide-react'

export function Faq() {
  return (
    <div className="py-8">
      <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
        more info!
      </h2>
      <Accordion
        className="flex w-full flex-col"
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        variants={{
          expanded: {
            opacity: 1,
            scale: 1,
          },
          collapsed: {
            opacity: 0,
            scale: 0.7,
          },
        }}
      >
        <AccordionItem value="getting-started" className="py-2">
          <AccordionTrigger className="w-full py-0.5 text-left text-zinc-950 dark:text-zinc-50">
            <div className="flex items-center">
              <ChevronRight className="h-4 w-4 text-zinc-950 transition-transform duration-200 group-data-expanded:rotate-90 dark:text-zinc-50" />
              <div className="ml-2 text-zinc-950 dark:text-zinc-50">
                What's Tristan's current university standing? What classes is he taking
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="origin-left">
            <p className="pl-6 pr-2 text-zinc-500 dark:text-zinc-400">
              I'm currently a sophomore(?) at Santa Clara University, having just transfered from CWRU in Cleveland, Ohio. At the moment I'm taking MATH8 (Intro Stats) and PHIL 25 (Ethics). 
I also attend peds cardiology fellow lectures, but that's occuring in an entirely unofficial capacity out of a ravenous curiosity for the subject material
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="animation-properties" className="py-2">
          <AccordionTrigger className="w-full py-0.5 text-left text-zinc-950 dark:text-zinc-50">
            <div className="flex items-center">
              <ChevronRight className="h-4 w-4 text-zinc-950 transition-transform duration-200 group-data-expanded:rotate-90 dark:text-zinc-50" />
              <div className="ml-2 text-zinc-950 dark:text-zinc-50">
                Summary of tristan's research and work experience
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="origin-left">
            <p className="pl-6 pr-2 text-zinc-500 dark:text-zinc-400">
              1000hrs - Dr. Wu lab, Heart center - clinical and basic sciences research<br />
              Publications : BioAVR durability investigation<br />
              500hrs - CNA - Cardiovascular Intensive care unit<br />
              500hrs - volunteer translator - Spanish, Chinese
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="advanced-features" className="py-2">
          <AccordionTrigger className="w-full py-0.5 text-left text-zinc-950 dark:text-zinc-50">
            <div className="flex items-center">
              <ChevronRight className="h-4 w-4 text-zinc-950 transition-transform duration-200 group-data-expanded:rotate-90 dark:text-zinc-50" />
              <div className="ml-2 text-zinc-950 dark:text-zinc-50">
                what does tristan do for fun?
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="origin-left">
            <p className="pl-6 pr-2 text-zinc-500 dark:text-zinc-400">
              A few too many things to manage unfortunately. The most longstanding of my projects have been rock climbing, photography, and of course, pediatric cardiology. You typically can find what is currently monopolizing my time in the notes section
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="community-support" className="py-2">
          <AccordionTrigger className="w-full py-0.5 text-left text-zinc-950 dark:text-zinc-50">
            <div className="flex items-center">
              <ChevronRight className="h-4 w-4 text-zinc-950 transition-transform duration-200 group-data-expanded:rotate-90 dark:text-zinc-50" />
              <div className="ml-2 text-zinc-950 dark:text-zinc-50">
                fun bird pictures!
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="origin-left">
            <div className="pl-6 pr-2 text-zinc-500 dark:text-zinc-400">
              <a href="https://adobe.ly/4lke6cq" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">https://adobe.ly/4lke6cq</a>
              <p className="mt-2">photo slider work in progress</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

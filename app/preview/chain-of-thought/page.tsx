'use client'

import * as React from 'react'

import Image from 'next/image'
import { Search } from 'lucide-react'

import {
  ChainOfThought,
  ChainOfThoughtContent,
  ChainOfThoughtHeader,
  ChainOfThoughtImage,
  ChainOfThoughtSearchResult,
  ChainOfThoughtSearchResults,
  ChainOfThoughtStep,
} from '@/components/ai-elements/chain-of-thought'

export default function ChainOfThoughtPreview() {
  return (
    <div className="container mx-auto max-w-4xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Chain of Thought</h1>
        <p className="text-muted-foreground">
          The ChainOfThought component provides a visual representation of an AI&apos;s reasoning process, 
          showing step-by-step thinking with support for search results, images, and progress indicators.
        </p>
      </div>

      <div className="space-y-6">
        <ChainOfThought defaultOpen>
          <ChainOfThoughtHeader>Chain of Thought</ChainOfThoughtHeader>
          <ChainOfThoughtContent>
            <ChainOfThoughtStep
              icon={Search}
              label="Searching for profiles for Hayden Bleasel"
              status="complete"
            >
              <ChainOfThoughtSearchResults>
                <ChainOfThoughtSearchResult>
                  www.x.com
                </ChainOfThoughtSearchResult>
                <ChainOfThoughtSearchResult>
                  www.instagram.com
                </ChainOfThoughtSearchResult>
                <ChainOfThoughtSearchResult>
                  www.github.com
                </ChainOfThoughtSearchResult>
              </ChainOfThoughtSearchResults>
            </ChainOfThoughtStep>

            <ChainOfThoughtStep
              label="Found the profile photo for Hayden Bleasel"
              status="complete"
            >
              <ChainOfThoughtImage caption="Hayden Bleasel's profile photo from x.com, showing a Ghibli-style man.">
                <Image
                  src="https://pbs.twimg.com/profile_images/1831737932413661184/0e6w7ixs_400x400.jpg"
                  alt="Hayden Bleasel"
                  width={400}
                  height={400}
                  className="w-full h-auto"
                />
              </ChainOfThoughtImage>
              <div className="mt-3 text-sm text-muted-foreground">
                <p>
                  Hayden Bleasel is an Australian product designer, software engineer, and founder. 
                  He is currently based in the United States working for Vercel, an American cloud 
                  computing company that builds products for web developers.
                </p>
              </div>
            </ChainOfThoughtStep>
          </ChainOfThoughtContent>
        </ChainOfThought>
      </div>
    </div>
  )
}

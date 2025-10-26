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
          Production-ready component showing step-by-step AI reasoning process with 
          search results, images, and status indicators.
        </p>
      </div>

      <div className="space-y-6">
        {/* Example 1: Complete chain of thought */}
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

        {/* Integration guide */}
        <div className="rounded-lg border bg-card p-6 space-y-4">
          <h3 className="font-semibold">Integration Guide</h3>
          
          <div className="text-sm space-y-3">
            <div>
              <p className="font-medium mb-1">Usage Example:</p>
              <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
{`<ChainOfThought defaultOpen>
  <ChainOfThoughtHeader>Chain of Thought</ChainOfThoughtHeader>
  <ChainOfThoughtContent>
    
    {/* Search step */}
    <ChainOfThoughtStep
      icon={SearchIcon}
      label="Searching for information"
      status="complete"
    >
      <ChainOfThoughtSearchResults>
        <ChainOfThoughtSearchResult>
          Source 1
        </ChainOfThoughtSearchResult>
        <ChainOfThoughtSearchResult>
          Source 2
        </ChainOfThoughtSearchResult>
      </ChainOfThoughtSearchResults>
    </ChainOfThoughtStep>

    {/* Analysis step */}
    <ChainOfThoughtStep
      label="Analyzing results"
      description="Processing the data"
      status="active"
    >
      Content here...
    </ChainOfThoughtStep>

    {/* Image step */}
    <ChainOfThoughtStep
      label="Found relevant image"
      status="complete"
    >
      <ChainOfThoughtImage caption="Image description">
        <Image src="..." alt="..." width={400} height={400} />
      </ChainOfThoughtImage>
    </ChainOfThoughtStep>

  </ChainOfThoughtContent>
</ChainOfThought>`}
              </pre>
            </div>

            <div>
              <p className="font-medium mb-1">Status Types:</p>
              <ul className="list-disc list-inside space-y-1 ml-4 text-muted-foreground">
                <li><code className="text-green-600">complete</code> - Step finished (green)</li>
                <li><code className="text-blue-600">active</code> - Currently processing (blue)</li>
                <li><code className="text-muted-foreground">pending</code> - Not started (gray)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-sm text-muted-foreground space-y-2">
          <p><strong>Features:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Collapsible interface with smooth animations</li>
            <li>Step-by-step visualization with status indicators</li>
            <li>Search results display with badge styling</li>
            <li>Image support with captions</li>
            <li>Custom icons for different step types</li>
            <li>Responsive and accessible design</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

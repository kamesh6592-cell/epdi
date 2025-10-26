'use client'

import * as React from 'react'

import { SearchIcon } from 'lucide-react'

import {
  ChainOfThought,
  ChainOfThoughtContent,
  ChainOfThoughtHeader,
  ChainOfThoughtImage,
  ChainOfThoughtSearchResult,
  ChainOfThoughtSearchResults,
  ChainOfThoughtStep,
} from '@/components/ai-elements/chain-of-thought'

export default function ChainOfThoughtPreviewPage() {
  return (
    <div className="container mx-auto max-w-3xl py-8 space-y-6">
      <h1 className="text-2xl font-semibold">Chain of Thought Component Preview</h1>
      <p className="text-muted-foreground">
        This page demonstrates the ChainOfThought component for step-by-step reasoning with search results and images.
      </p>

      <ChainOfThought defaultOpen>
        <ChainOfThoughtHeader />
        <ChainOfThoughtContent>
          <ChainOfThoughtStep
            icon={SearchIcon}
            label="Searching for information"
            status="complete"
          >
            <ChainOfThoughtSearchResults>
              <ChainOfThoughtSearchResult>
                Result 1: Intro to AI Reasoning
              </ChainOfThoughtSearchResult>
              <ChainOfThoughtSearchResult>
                Result 2: How chain-of-thought helps
              </ChainOfThoughtSearchResult>
            </ChainOfThoughtSearchResults>
          </ChainOfThoughtStep>

          <ChainOfThoughtStep
            label="Analyzing findings"
            description="Synthesizing the most relevant sources into key insights"
            status="active"
          />

          <ChainOfThoughtStep
            label="Forming conclusion"
            description="Creating a final answer based on verified reasoning"
            status="pending"
          >
            <ChainOfThoughtImage caption="Diagram of reasoning flow">
              <div className="aspect-video bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">Placeholder image</span>
              </div>
            </ChainOfThoughtImage>
          </ChainOfThoughtStep>
        </ChainOfThoughtContent>
      </ChainOfThought>
    </div>
  )
}
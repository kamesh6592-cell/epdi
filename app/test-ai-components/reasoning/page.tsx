'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'

import { Reasoning, ReasoningContent, ReasoningTrigger } from '@/components/ai-elements/reasoning'

export default function ReasoningPreviewPage() {
  const [isStreaming, setIsStreaming] = React.useState(false)

  const toggleStreaming = () => {
    setIsStreaming((prev) => !prev)
  }

  return (
    <div className="container mx-auto max-w-3xl py-8 space-y-6">
      <h1 className="text-2xl font-semibold">Reasoning Component Preview</h1>
      <p className="text-muted-foreground">
        This page demonstrates the Reasoning component with auto-open during streaming and auto-close after completion.
      </p>

      <div className="flex gap-3">
        <Button onClick={toggleStreaming}>
          {isStreaming ? 'Stop Streaming' : 'Start Streaming'}
        </Button>
      </div>

      <Reasoning className="w-full" isStreaming={isStreaming}>
        <ReasoningTrigger title={isStreaming ? 'Thinking…' : 'AI Reasoning'} />
        <ReasoningContent>
          I need to compute the square of 2.
          <br />
          Recognize that squaring a number means multiplying it by itself.
          <br />
          Therefore, 2 × 2 = 4.
        </ReasoningContent>
      </Reasoning>
    </div>
  )
}
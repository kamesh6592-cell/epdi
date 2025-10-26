'use client'

import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from '@/components/ai-elements/reasoning'

const reasoningSteps = [
  'Let me think about this problem step by step.',
  '\n\nFirst, I need to understand what the user is asking for.',
  '\n\nThey want a reasoning component that opens automatically when streaming begins and closes when streaming finishes. The component should be composable and follow existing patterns in the codebase.',
  '\n\nThis seems like a collapsible component with state management would be the right approach.',
].join('')

export default function ReasoningPreview() {
  const [content, setContent] = React.useState('')
  const [isStreaming, setIsStreaming] = React.useState(false)
  const [currentTokenIndex, setCurrentTokenIndex] = React.useState(0)
  const [tokens, setTokens] = React.useState<string[]>([])

  // Function to chunk text into fake tokens of 3-4 characters
  const chunkIntoTokens = React.useCallback((text: string): string[] => {
    const tokens: string[] = []
    let i = 0
    while (i < text.length) {
      const chunkSize = Math.floor(Math.random() * 2) + 3 // Random size between 3-4
      tokens.push(text.slice(i, i + chunkSize))
      i += chunkSize
    }
    return tokens
  }, [])

  const startStreaming = React.useCallback(() => {
    const tokenizedSteps = chunkIntoTokens(reasoningSteps)
    setTokens(tokenizedSteps)
    setContent('')
    setCurrentTokenIndex(0)
    setIsStreaming(true)
  }, [chunkIntoTokens])

  React.useEffect(() => {
    if (!isStreaming || currentTokenIndex >= tokens.length) {
      if (isStreaming && currentTokenIndex >= tokens.length) {
        setIsStreaming(false)
      }
      return
    }

    const timer = setTimeout(() => {
      setContent((prev) => prev + tokens[currentTokenIndex])
      setCurrentTokenIndex((prev) => prev + 1)
    }, 25) // Faster interval since we're streaming smaller chunks

    return () => clearTimeout(timer)
  }, [isStreaming, currentTokenIndex, tokens])

  return (
    <div className="container mx-auto max-w-4xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Reasoning</h1>
        <p className="text-muted-foreground">
          The Reasoning component displays AI reasoning content, automatically opening during 
          streaming and closing when finished.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            onClick={startStreaming} 
            disabled={isStreaming}
          >
            {isStreaming ? 'Streaming...' : 'Start Streaming'}
          </Button>
          <span className="text-sm text-muted-foreground">
            {isStreaming ? 'Watch the reasoning component auto-open and close' : 'Click to simulate AI reasoning'}
          </span>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <Reasoning className="w-full" isStreaming={isStreaming}>
            <ReasoningTrigger>
              {isStreaming ? 'Thought for 4 seconds' : 'Reasoning'}
            </ReasoningTrigger>
            <ReasoningContent>
              {content || 'Click "Start Streaming" to see the reasoning process...'}
            </ReasoningContent>
          </Reasoning>
        </div>

        <div className="text-sm text-muted-foreground space-y-2">
          <p><strong>Features demonstrated:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Auto-opens when streaming begins (isStreaming=true)</li>
            <li>Auto-closes when streaming finishes</li>
            <li>Pulsing animation indicator during streaming</li>
            <li>Manual toggle available when not streaming</li>
            <li>Smooth collapsible animations</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

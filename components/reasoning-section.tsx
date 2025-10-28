'use client'

import { Check, Loader2 } from 'lucide-react'

import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger
} from '@/components/elements/reasoning'

import { StatusIndicator } from './ui/status-indicator'

interface ReasoningContentData {
  reasoning: string
  time?: number
}

export interface ReasoningSectionProps {
  content: ReasoningContentData
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function ReasoningSection({
  content,
  isOpen,
  onOpenChange
}: ReasoningSectionProps) {
  const isStreaming = content.time === 0
  const duration = content.time ? Math.round(content.time / 1000) : 0

  if (!content || !content.reasoning) return null

  return (
    <div className="flex flex-col gap-2 sm:gap-4 w-full max-w-full overflow-hidden">
      <Reasoning
        className="w-full max-w-full"
        isStreaming={isStreaming}
        open={isOpen}
        onOpenChange={onOpenChange}
        duration={duration}
        defaultOpen={false}
      >
        <ReasoningTrigger>
          <div className="flex items-center justify-between w-full">
            <span className="flex-1 text-left">
              {isStreaming ? 'Thinking...' : duration > 0 ? `Thought for ${duration}s` : 'Thoughts'}
            </span>
            <div className="ml-2 shrink-0">
              {isStreaming ? (
                <Loader2
                  size={14}
                  className="sm:size-4 animate-spin text-muted-foreground/50"
                />
              ) : (
                <StatusIndicator icon={Check} iconClassName="text-green-500">
                  <span className="hidden sm:inline text-xs">
                    {`${content.reasoning.length.toLocaleString()} chars`}
                  </span>
                  <span className="inline sm:hidden text-xs">
                    {`${Math.round(content.reasoning.length / 100) / 10}k`}
                  </span>
                </StatusIndicator>
              )}
            </div>
          </div>
        </ReasoningTrigger>
        <ReasoningContent>
          {content.reasoning}
        </ReasoningContent>
      </Reasoning>
    </div>
  )
}

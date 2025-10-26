'use client'

import { Check, Loader2 } from 'lucide-react'

import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger
} from '@/components/ai-elements/reasoning'

import { StatusIndicator } from './ui/status-indicator'
import { BotMessage } from './message'

interface ReasoningContent {
  reasoning: string
  time?: number
}

export interface ReasoningSectionProps {
  content: ReasoningContent
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function ReasoningSection({
  content,
  isOpen,
  onOpenChange
}: ReasoningSectionProps) {
  const isStreaming = content.time === 0

  if (!content) return null

  return (
    <div className="flex flex-col gap-2 sm:gap-4">
      <Reasoning
        className="w-full"
        isStreaming={isStreaming}
        open={isOpen}
        onOpenChange={onOpenChange}
      >
        <ReasoningTrigger
          title={
            content.time === 0
              ? 'Thinking...'
              : content.time !== undefined && content.time > 0
                ? `Thought for ${(content.time / 1000).toFixed(1)} seconds`
                : 'Thoughts'
          }
        >
          <div className="ml-auto">
            {content.time === 0 ? (
              <Loader2
                size={14}
                className="sm:size-4 animate-spin text-muted-foreground/50"
              />
            ) : (
              <StatusIndicator icon={Check} iconClassName="text-green-500">
                <span className="hidden sm:inline">{`${content.reasoning.length.toLocaleString()} characters`}</span>
                <span className="inline sm:hidden">{`${Math.round(content.reasoning.length / 100) / 10}k`}</span>
              </StatusIndicator>
            )}
          </div>
        </ReasoningTrigger>
        <ReasoningContent>
          <BotMessage
            message={content.reasoning}
            className="prose-p:text-muted-foreground text-xs sm:text-sm"
          />
        </ReasoningContent>
      </Reasoning>
    </div>
  )
}

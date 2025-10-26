'use client'

import * as React from 'react'

import { ChevronDown, Lightbulb, Loader2 } from 'lucide-react'

import { cn } from '@/lib/utils'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'

interface ReasoningContextType {
  isStreaming?: boolean
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const ReasoningContext = React.createContext<ReasoningContextType | undefined>(
  undefined
)

const useReasoning = () => {
  const context = React.useContext(ReasoningContext)
  if (!context) {
    throw new Error('useReasoning must be used within a Reasoning component')
  }
  return context
}

interface ReasoningProps extends React.ComponentProps<typeof Collapsible> {
  isStreaming?: boolean
  children: React.ReactNode
}

const Reasoning = React.forwardRef<
  React.ElementRef<typeof Collapsible>,
  ReasoningProps
>(({ isStreaming = false, children, className, ...props }, ref) => {
  const [isOpen, setIsOpen] = React.useState(false)

  // Auto-open when streaming, auto-close when streaming stops
  React.useEffect(() => {
    if (isStreaming) {
      setIsOpen(true)
    } else if (!isStreaming && isOpen) {
      // Add a small delay before auto-closing to let user see the content
      const timer = setTimeout(() => {
        setIsOpen(false)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [isStreaming, isOpen])

  return (
    <ReasoningContext.Provider value={{ isStreaming, isOpen, setIsOpen }}>
      <Collapsible
        ref={ref}
        open={isOpen}
        onOpenChange={setIsOpen}
        className={cn('space-y-2', className)}
        {...props}
      >
        {children}
      </Collapsible>
    </ReasoningContext.Provider>
  )
})
Reasoning.displayName = 'Reasoning'

interface ReasoningTriggerProps
  extends React.ComponentProps<typeof CollapsibleTrigger> {
  title?: string
}

const ReasoningTrigger = React.forwardRef<
  React.ElementRef<typeof CollapsibleTrigger>,
  ReasoningTriggerProps
>(({ title = 'Reasoning', className, children, ...props }, ref) => {
  const { isStreaming, isOpen } = useReasoning()

  return (
    <CollapsibleTrigger
      ref={ref}
      className={cn(
        'flex w-full items-center justify-between rounded-lg border bg-card p-3 text-left hover:bg-accent/50 transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        isStreaming && 'border-primary/50 bg-primary/5',
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <div className="relative">
          <Lightbulb
            size={16}
            className={cn(
              'text-muted-foreground',
              isStreaming && 'text-primary'
            )}
          />
          {isStreaming && (
            <div className="absolute inset-0 animate-pulse">
              <Lightbulb size={16} className="text-primary/70" />
            </div>
          )}
        </div>
        <span
          className={cn('text-sm font-medium', isStreaming && 'text-primary')}
        >
          {title}
        </span>
        {isStreaming && (
          <Loader2 size={14} className="animate-spin text-primary/70" />
        )}
      </div>
      <ChevronDown
        size={16}
        className={cn(
          'text-muted-foreground transition-transform duration-200',
          isOpen && 'rotate-180'
        )}
      />
      {children}
    </CollapsibleTrigger>
  )
})
ReasoningTrigger.displayName = 'ReasoningTrigger'

interface ReasoningContentProps
  extends React.ComponentProps<typeof CollapsibleContent> {}

const ReasoningContent = React.forwardRef<
  React.ElementRef<typeof CollapsibleContent>,
  ReasoningContentProps
>(({ className, children, ...props }, ref) => {
  const { isStreaming } = useReasoning()

  return (
    <CollapsibleContent
      ref={ref}
      className={cn(
        'rounded-lg border border-t-0 bg-card/50 p-4 text-sm text-muted-foreground',
        'data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down',
        'overflow-hidden transition-all',
        isStreaming && 'border-primary/30 bg-primary/5',
        className
      )}
      {...props}
    >
      <div
        className={cn(
          'prose prose-sm max-w-none dark:prose-invert',
          'prose-p:leading-relaxed prose-p:text-muted-foreground',
          'prose-headings:text-foreground prose-strong:text-foreground',
          isStreaming && 'prose-p:text-primary/80'
        )}
      >
        {children}
        {isStreaming && (
          <div className="mt-2 flex items-center gap-2 text-xs text-primary/70">
            <Loader2 size={12} className="animate-spin" />
            <span>Thinking...</span>
          </div>
        )}
      </div>
    </CollapsibleContent>
  )
})
ReasoningContent.displayName = 'ReasoningContent'

export { Reasoning, ReasoningContent,ReasoningTrigger }

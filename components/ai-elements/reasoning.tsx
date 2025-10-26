'use client'

import * as React from 'react'

import { ChevronDown } from 'lucide-react'

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

function useReasoning() {
  const context = React.useContext(ReasoningContext)
  if (!context) {
    throw new Error('useReasoning must be used within a Reasoning component')
  }
  return context
}

// Main Reasoning Component
interface ReasoningProps extends React.ComponentProps<typeof Collapsible> {
  isStreaming?: boolean
  children: React.ReactNode
}

export function Reasoning({
  isStreaming = false,
  children,
  className,
  open,
  defaultOpen,
  onOpenChange,
  ...props
}: ReasoningProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen ?? false)
  
  const isControlled = open !== undefined
  const isOpen = isControlled ? open : internalOpen
  const setIsOpen = React.useCallback((newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen)
    }
    onOpenChange?.(newOpen)
  }, [isControlled, onOpenChange])

  // Auto-open when streaming starts, auto-close when streaming ends
  React.useEffect(() => {
    if (isStreaming && !isOpen) {
      setIsOpen(true)
    } else if (!isStreaming && isOpen) {
      // Auto-close when streaming finishes
      const timer = setTimeout(() => {
        setIsOpen(false)
      }, 500) // Small delay before auto-closing
      return () => clearTimeout(timer)
    }
  }, [isStreaming, isOpen, setIsOpen])

  const contextValue = React.useMemo(() => ({
    isStreaming,
    isOpen,
    setIsOpen
  }), [isStreaming, isOpen, setIsOpen])

  return (
    <ReasoningContext.Provider value={contextValue}>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className={cn('w-full', className)}
        {...props}
      >
        {children}
      </Collapsible>
    </ReasoningContext.Provider>
  )
}

// Reasoning Trigger Component
interface ReasoningTriggerProps extends React.ComponentProps<typeof CollapsibleTrigger> {
  title?: string
}

export function ReasoningTrigger({
  title = 'Reasoning',
  className,
  children,
  ...props
}: ReasoningTriggerProps) {
  const { isOpen, isStreaming } = useReasoning()

  return (
    <CollapsibleTrigger
      className={cn(
        'flex w-full items-center justify-between rounded-lg border bg-card p-2 sm:p-3 text-left text-xs sm:text-sm font-medium transition-colors',
        'hover:bg-accent hover:text-accent-foreground',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        'data-[state=open]:bg-accent',
        'min-h-[44px]',
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
        {isStreaming && (
          <div className="h-2 w-2 shrink-0 rounded-full bg-blue-500 animate-pulse" />
        )}
        <span className="text-xs sm:text-sm font-medium truncate">{children || title}</span>
      </div>
      <ChevronDown
        className={cn(
          'h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 ml-2 transition-transform duration-200',
          isOpen && 'rotate-180'
        )}
      />
    </CollapsibleTrigger>
  )
}

// Reasoning Content Component
interface ReasoningContentProps extends React.ComponentProps<typeof CollapsibleContent> {
  children: React.ReactNode
}

export function ReasoningContent({
  children,
  className,
  ...props
}: ReasoningContentProps) {
  return (
    <CollapsibleContent
      className={cn(
        'overflow-hidden text-xs sm:text-sm transition-all',
        'data-[state=closed]:animate-collapsible-up',
        'data-[state=open]:animate-collapsible-down',
        className
      )}
      {...props}
    >
      <div className="border-l-2 border-muted-foreground/20 pl-2 sm:pl-4 pt-2 sm:pt-3 pb-1 overflow-x-auto">
        <div className="text-xs sm:text-sm text-muted-foreground space-y-2 break-words">
          {children}
        </div>
      </div>
    </CollapsibleContent>
  )
}
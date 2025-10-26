'use client'

import * as React from 'react'

import { ChevronDown, Dot, type LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

import { Badge } from '@/components/ui/badge'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'

interface ChainOfThoughtContextType {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const ChainOfThoughtContext = React.createContext<ChainOfThoughtContextType | undefined>(
  undefined
)

function useChainOfThought() {
  const context = React.useContext(ChainOfThoughtContext)
  if (!context) {
    throw new Error('useChainOfThought must be used within a ChainOfThought component')
  }
  return context
}

// Main ChainOfThought Component
interface ChainOfThoughtProps extends React.ComponentProps<'div'> {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

export function ChainOfThought({
  open,
  defaultOpen = false,
  onOpenChange,
  children,
  className,
  ...props
}: ChainOfThoughtProps) {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  
  const isControlled = open !== undefined
  const isOpen = isControlled ? open : internalOpen
  const setIsOpen = React.useCallback((newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen)
    }
    onOpenChange?.(newOpen)
  }, [isControlled, onOpenChange])

  const contextValue = React.useMemo(() => ({
    isOpen,
    setIsOpen
  }), [isOpen, setIsOpen])

  return (
    <ChainOfThoughtContext.Provider value={contextValue}>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className={cn('w-full', className)}
        {...props}
      >
        {children}
      </Collapsible>
    </ChainOfThoughtContext.Provider>
  )
}

// ChainOfThought Header Component
interface ChainOfThoughtHeaderProps extends React.ComponentProps<typeof CollapsibleTrigger> {
  children?: React.ReactNode
}

export function ChainOfThoughtHeader({
  children = 'Chain of Thought',
  className,
  ...props
}: ChainOfThoughtHeaderProps) {
  const { isOpen } = useChainOfThought()

  return (
    <CollapsibleTrigger
      className={cn(
        'flex w-full items-center justify-between rounded-lg border bg-card p-3 text-left text-sm font-medium transition-colors',
        'hover:bg-accent hover:text-accent-foreground',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        'data-[state=open]:bg-accent',
        className
      )}
      {...props}
    >
      <span className="text-sm font-medium">{children}</span>
      <ChevronDown
        className={cn(
          'h-4 w-4 transition-transform duration-200',
          isOpen && 'rotate-180'
        )}
      />
    </CollapsibleTrigger>
  )
}

// ChainOfThought Content Component
interface ChainOfThoughtContentProps extends React.ComponentProps<typeof CollapsibleContent> {
  children: React.ReactNode
}

export function ChainOfThoughtContent({
  children,
  className,
  ...props
}: ChainOfThoughtContentProps) {
  return (
    <CollapsibleContent
      className={cn(
        'overflow-hidden transition-all',
        'data-[state=closed]:animate-collapsible-up',
        'data-[state=open]:animate-collapsible-down',
        className
      )}
      {...props}
    >
      <div className="pt-3 space-y-3">
        {children}
      </div>
    </CollapsibleContent>
  )
}

// ChainOfThought Step Component
interface ChainOfThoughtStepProps extends React.ComponentProps<'div'> {
  icon?: LucideIcon
  label: string
  description?: string
  status?: 'complete' | 'active' | 'pending'
  children?: React.ReactNode
}

export function ChainOfThoughtStep({
  icon: Icon = Dot,
  label,
  description,
  status = 'complete',
  children,
  className,
  ...props
}: ChainOfThoughtStepProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'complete':
        return 'text-green-600 dark:text-green-400'
      case 'active':
        return 'text-blue-600 dark:text-blue-400'
      case 'pending':
        return 'text-muted-foreground'
    }
  }

  const getBorderColor = () => {
    switch (status) {
      case 'complete':
        return 'border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/30'
      case 'active':
        return 'border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/30'
      case 'pending':
        return 'border-muted bg-muted/30'
    }
  }

  return (
    <div
      className={cn(
        'flex gap-3 rounded-lg border p-3 transition-all',
        getBorderColor(),
        className
      )}
      {...props}
    >
      <div className="flex h-6 w-6 shrink-0 items-center justify-center">
        <Icon className={cn('h-4 w-4', getStatusColor())} />
      </div>
      <div className="min-w-0 flex-1 space-y-2">
        <div className="font-medium text-sm">{label}</div>
        {description && (
          <div className="text-sm text-muted-foreground">{description}</div>
        )}
        {children && (
          <div className="space-y-2">
            {children}
          </div>
        )}
      </div>
    </div>
  )
}

// ChainOfThought Search Results Container
interface ChainOfThoughtSearchResultsProps extends React.ComponentProps<'div'> {
  children: React.ReactNode
}

export function ChainOfThoughtSearchResults({
  children,
  className,
  ...props
}: ChainOfThoughtSearchResultsProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)} {...props}>
      {children}
    </div>
  )
}

// ChainOfThought Search Result Item
interface ChainOfThoughtSearchResultProps extends React.ComponentProps<typeof Badge> {
  children: React.ReactNode
}

export function ChainOfThoughtSearchResult({
  children,
  className,
  variant = 'secondary',
  ...props
}: ChainOfThoughtSearchResultProps) {
  return (
    <Badge className={className} variant={variant} {...props}>
      {children}
    </Badge>
  )
}

// ChainOfThought Image Component
interface ChainOfThoughtImageProps extends React.ComponentProps<'div'> {
  caption?: string
  children: React.ReactNode
}

export function ChainOfThoughtImage({
  caption,
  children,
  className,
  ...props
}: ChainOfThoughtImageProps) {
  return (
    <div className={cn('space-y-2', className)} {...props}>
      <div className="rounded-lg overflow-hidden border">
        {children}
      </div>
      {caption && (
        <p className="text-xs text-muted-foreground text-center">{caption}</p>
      )}
    </div>
  )
}

// Hook for adding steps programmatically (backward compatibility)
export function useChainOfThoughtStep() {
  const createStep = React.useCallback((
    title: string,
    content?: React.ReactNode
  ) => {
    // This is now a no-op since we're using a different API
    // Kept for backward compatibility
    console.warn('useChainOfThoughtStep is deprecated. Use the new declarative API with ChainOfThoughtStep components.')
  }, [])

  const completeStep = React.useCallback((
    id: string,
    content?: React.ReactNode
  ) => {
    // This is now a no-op since we're using a different API
    // Kept for backward compatibility
    console.warn('useChainOfThoughtStep is deprecated. Use the new declarative API with ChainOfThoughtStep components.')
  }, [])

  return { createStep, completeStep }
}
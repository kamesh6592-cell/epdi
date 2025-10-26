'use client'

import * as React from 'react'

import { Check, ChevronDown, Dot, Loader2, LucideIcon } from 'lucide-react'

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

const ChainOfThoughtContext = React.createContext<
  ChainOfThoughtContextType | undefined
>(undefined)

const useChainOfThought = () => {
  const context = React.useContext(ChainOfThoughtContext)
  if (!context) {
    throw new Error(
      'useChainOfThought must be used within a ChainOfThought component'
    )
  }
  return context
}

interface ChainOfThoughtProps extends React.ComponentProps<'div'> {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

const ChainOfThought = React.forwardRef<HTMLDivElement, ChainOfThoughtProps>(
  (
    { open, defaultOpen = false, onOpenChange, children, className, ...props },
    ref
  ) => {
    const [isOpenState, setIsOpenState] = React.useState(defaultOpen)

    const isControlled = open !== undefined
    const isOpen = isControlled ? open : isOpenState

    const setIsOpen = React.useCallback(
      (newOpen: boolean) => {
        if (!isControlled) {
          setIsOpenState(newOpen)
        }
        onOpenChange?.(newOpen)
      },
      [isControlled, onOpenChange]
    )

    return (
      <ChainOfThoughtContext.Provider value={{ isOpen, setIsOpen }}>
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className={cn('space-y-2', className)}
          {...props}
        >
          <div ref={ref} className="w-full">
            {children}
          </div>
        </Collapsible>
      </ChainOfThoughtContext.Provider>
    )
  }
)
ChainOfThought.displayName = 'ChainOfThought'

interface ChainOfThoughtHeaderProps
  extends React.ComponentProps<typeof CollapsibleTrigger> {
  children?: React.ReactNode
}

const ChainOfThoughtHeader = React.forwardRef<
  React.ElementRef<typeof CollapsibleTrigger>,
  ChainOfThoughtHeaderProps
>(({ children = 'Chain of Thought', className, ...props }, ref) => {
  const { isOpen } = useChainOfThought()

  return (
    <CollapsibleTrigger
      ref={ref}
      className={cn(
        'flex w-full items-center justify-between rounded-lg border bg-card p-3 text-left',
        'hover:bg-accent/50 transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
          <Dot className="h-4 w-4 text-primary" />
        </div>
        <span className="text-sm font-medium">{children}</span>
      </div>
      <ChevronDown
        size={16}
        className={cn(
          'text-muted-foreground transition-transform duration-200',
          isOpen && 'rotate-180'
        )}
      />
    </CollapsibleTrigger>
  )
})
ChainOfThoughtHeader.displayName = 'ChainOfThoughtHeader'

interface ChainOfThoughtContentProps
  extends React.ComponentProps<typeof CollapsibleContent> {}

const ChainOfThoughtContent = React.forwardRef<
  React.ElementRef<typeof CollapsibleContent>,
  ChainOfThoughtContentProps
>(({ className, children, ...props }, ref) => {
  return (
    <CollapsibleContent
      ref={ref}
      className={cn(
        'rounded-lg border border-t-0 bg-card/50 p-4',
        'data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down',
        'overflow-hidden transition-all',
        className
      )}
      {...props}
    >
      <div className="space-y-4">{children}</div>
    </CollapsibleContent>
  )
})
ChainOfThoughtContent.displayName = 'ChainOfThoughtContent'

type StepStatus = 'complete' | 'active' | 'pending'

interface ChainOfThoughtStepProps extends React.ComponentProps<'div'> {
  icon?: LucideIcon
  label: string
  description?: string
  status?: StepStatus
}

const ChainOfThoughtStep = React.forwardRef<
  HTMLDivElement,
  ChainOfThoughtStepProps
>(
  (
    { icon: Icon = Dot, label, description, status = 'complete', className, children, ...props },
    ref
  ) => {
    const getStatusIcon = () => {
      switch (status) {
        case 'complete':
          return <Check className="h-4 w-4 text-green-500" />
        case 'active':
          return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
        case 'pending':
          return <Icon className="h-4 w-4 text-muted-foreground" />
        default:
          return <Icon className="h-4 w-4" />
      }
    }

    const getStatusColor = () => {
      switch (status) {
        case 'complete':
          return 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950'
        case 'active':
          return 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950'
        case 'pending':
          return 'border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950'
        default:
          return 'border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950'
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg border p-3 transition-all duration-200',
          getStatusColor(),
          className
        )}
        {...props}
      >
        <div className="flex items-start gap-3">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-background border">
            {getStatusIcon()}
          </div>
          <div className="min-w-0 flex-1 space-y-2">
            <div>
              <p className="text-sm font-medium leading-none">{label}</p>
              {description && (
                <p className="text-xs text-muted-foreground mt-1">
                  {description}
                </p>
              )}
            </div>
            {children && (
              <div className="animate-in fade-in-50 slide-in-from-top-1 duration-200">
                {children}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
)
ChainOfThoughtStep.displayName = 'ChainOfThoughtStep'

interface ChainOfThoughtSearchResultsProps extends React.ComponentProps<'div'> {}

const ChainOfThoughtSearchResults = React.forwardRef<
  HTMLDivElement,
  ChainOfThoughtSearchResultsProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('flex flex-wrap gap-2', className)}
      {...props}
    >
      {children}
    </div>
  )
})
ChainOfThoughtSearchResults.displayName = 'ChainOfThoughtSearchResults'

interface ChainOfThoughtSearchResultProps
  extends React.ComponentProps<typeof Badge> {}

const ChainOfThoughtSearchResult = React.forwardRef<
  HTMLSpanElement,
  ChainOfThoughtSearchResultProps
>(({ className, children, ...props }, ref) => {
  return (
    <Badge
      className={cn(
        'text-xs font-normal px-2 py-1 bg-background/50 hover:bg-background/80 transition-colors',
        className
      )}
      {...props}
    >
      {children}
    </Badge>
  )
})
ChainOfThoughtSearchResult.displayName = 'ChainOfThoughtSearchResult'

interface ChainOfThoughtImageProps extends React.ComponentProps<'div'> {
  caption?: string
}

const ChainOfThoughtImage = React.forwardRef<
  HTMLDivElement,
  ChainOfThoughtImageProps
>(({ caption, className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('space-y-2', className)}
      {...props}
    >
      <div className="rounded-lg border bg-muted/50 p-2">
        {children}
      </div>
      {caption && (
        <p className="text-xs text-muted-foreground text-center italic">
          {caption}
        </p>
      )}
    </div>
  )
})
ChainOfThoughtImage.displayName = 'ChainOfThoughtImage'

export {
  ChainOfThought,
  ChainOfThoughtContent,
  ChainOfThoughtHeader,
  ChainOfThoughtImage,
  ChainOfThoughtSearchResult,
  ChainOfThoughtSearchResults,
  ChainOfThoughtStep
}
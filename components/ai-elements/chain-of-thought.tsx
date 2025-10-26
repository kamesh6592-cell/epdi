'use client'

import * as React from 'react'

import { Check, Loader2 } from 'lucide-react'

import { cn } from '@/lib/utils'

interface ChainOfThoughtContextType {
  steps: StepData[]
  addStep: (step: Omit<StepData, 'id'>) => void
  updateStep: (id: string, updates: Partial<StepData>) => void
  currentStepId?: string
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

interface StepData {
  id: string
  title: string
  content?: React.ReactNode
  status: 'pending' | 'running' | 'complete'
}

// Main ChainOfThought Component
interface ChainOfThoughtProps extends React.ComponentProps<'div'> {
  children: React.ReactNode
}

export function ChainOfThought({
  children,
  className,
  ...props
}: ChainOfThoughtProps) {
  const [steps, setSteps] = React.useState<StepData[]>([])
  const [currentStepId, setCurrentStepId] = React.useState<string>()

  const addStep = React.useCallback((stepData: Omit<StepData, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    const step = { id, ...stepData }
    setSteps(prev => [...prev, step])
    if (stepData.status === 'running') {
      setCurrentStepId(id)
    }
  }, [])

  const updateStep = React.useCallback((id: string, updates: Partial<StepData>) => {
    setSteps(prev => prev.map(step => 
      step.id === id ? { ...step, ...updates } : step
    ))
    if (updates.status === 'running') {
      setCurrentStepId(id)
    }
  }, [])

  const contextValue = React.useMemo(() => ({
    steps,
    addStep,
    updateStep,
    currentStepId
  }), [steps, addStep, updateStep, currentStepId])

  return (
    <ChainOfThoughtContext.Provider value={contextValue}>
      <div className={cn('w-full space-y-3', className)} {...props}>
        {children}
        {steps.length > 0 && (
          <div className="space-y-2">
            {steps.map((step) => (
              <ChainOfThoughtStep
                key={step.id}
                title={step.title}
                status={step.status}
                isActive={step.id === currentStepId}
              >
                {step.content}
              </ChainOfThoughtStep>
            ))}
          </div>
        )}
      </div>
    </ChainOfThoughtContext.Provider>
  )
}

// ChainOfThought Step Component
interface ChainOfThoughtStepProps extends React.ComponentProps<'div'> {
  title: string
  status: 'pending' | 'running' | 'complete'
  isActive?: boolean
  children?: React.ReactNode
}

export function ChainOfThoughtStep({
  title,
  status,
  isActive = false,
  children,
  className,
  ...props
}: ChainOfThoughtStepProps) {
  const getStatusIcon = () => {
    switch (status) {
      case 'complete':
        return <Check className="h-4 w-4 text-green-600" />
      case 'running':
        return <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
      case 'pending':
        return <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30" />
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case 'complete':
        return 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/50'
      case 'running':
        return 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50'
      case 'pending':
        return 'border-muted bg-muted/30'
    }
  }

  return (
    <div
      className={cn(
        'flex gap-3 rounded-lg border p-3 transition-all',
        getStatusColor(),
        isActive && 'ring-2 ring-blue-200 dark:ring-blue-800',
        className
      )}
      {...props}
    >
      <div className="flex h-6 w-6 shrink-0 items-center justify-center">
        {getStatusIcon()}
      </div>
      <div className="min-w-0 flex-1 space-y-2">
        <div className="font-medium text-sm">{title}</div>
        {children && (
          <div className="text-sm text-muted-foreground">
            {children}
          </div>
        )}
      </div>
    </div>
  )
}

// Hook for adding steps programmatically
export function useChainOfThoughtStep() {
  const { addStep, updateStep } = useChainOfThought()
  
  const createStep = React.useCallback((
    title: string,
    content?: React.ReactNode
  ) => {
    addStep({
      title,
      content,
      status: 'running'
    })
  }, [addStep])

  const completeStep = React.useCallback((
    id: string,
    content?: React.ReactNode
  ) => {
    updateStep(id, {
      status: 'complete',
      ...(content && { content })
    })
  }, [updateStep])

  return { createStep, completeStep }
}
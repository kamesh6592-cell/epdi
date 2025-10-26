'use client'

import { useEffect, useState } from 'react'

import { Lightbulb } from 'lucide-react'

import { cn } from '@/lib/utils'
import { getCookie, setCookie } from '@/lib/utils/cookies'

import { Toggle } from './ui/toggle'

export function DeepDiveToggle() {
  const [isDeepDiveMode, setIsDeepDiveMode] = useState(false)

  useEffect(() => {
    const savedMode = getCookie('deepdive-mode')
    if (savedMode !== null) {
      setIsDeepDiveMode(savedMode === 'true')
    } else {
      setCookie('deepdive-mode', 'false')
    }
  }, [])

  const handleDeepDiveModeChange = (pressed: boolean) => {
    setIsDeepDiveMode(pressed)
    setCookie('deepdive-mode', pressed.toString())
  }

  return (
    <Toggle
      aria-label="Toggle reasoning mode for deeper analysis"
      pressed={isDeepDiveMode}
      onPressedChange={handleDeepDiveModeChange}
      variant="outline"
      className={cn(
        'gap-1 px-3 border border-input text-muted-foreground bg-background',
        'data-[state=on]:bg-primary/10',
        'data-[state=on]:text-primary',
        'data-[state=on]:border-primary/30',
        'hover:bg-accent hover:text-accent-foreground rounded-full',
        'transition-all duration-200'
      )}
    >
      <Lightbulb
        className={cn(
          'size-4 transition-transform duration-200',
          isDeepDiveMode && 'animate-pulse'
        )}
      />
      <span className="text-xs">DeepDive</span>
    </Toggle>
  )
}

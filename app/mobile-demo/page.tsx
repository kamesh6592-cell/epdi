'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

import { Shimmer } from '@/components/ai-elements/shimmer'

export default function MobileDemoPage() {
  const [isSimulating, setIsSimulating] = useState(false)
  const [showText, setShowText] = useState(false)

  const simulateLoading = () => {
    setIsSimulating(true)
    setShowText(false)
    
    // Simulate AI response after 2 seconds
    setTimeout(() => {
      setShowText(true)
      setIsSimulating(false)
    }, 2000)
  }

  return (
    <div className="flex flex-col h-full min-h-dvh w-full overflow-hidden">
      {/* Mobile-optimized header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b px-3 sm:px-4 py-3">
        <h1 className="text-lg sm:text-xl font-semibold">Mobile Demo</h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Testing mobile-first layout with shimmer effects
        </p>
      </header>

      {/* Scrollable content area */}
      <main className="flex-1 overflow-y-auto overscroll-behavior-contain -webkit-overflow-scrolling-touch">
        <div className="max-w-3xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 pb-safe">
          {/* Demo section */}
          <div className="space-y-4">
            <h2 className="text-base sm:text-lg font-semibold">
              Mobile Optimizations
            </h2>
            
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="p-3 rounded-lg border bg-card">
                <p className="font-medium mb-1">✅ Dynamic Viewport Height</p>
                <p className="text-muted-foreground">Using min-h-dvh for proper mobile viewport</p>
              </div>
              
              <div className="p-3 rounded-lg border bg-card">
                <p className="font-medium mb-1">✅ Safe Area Insets</p>
                <p className="text-muted-foreground">Respects notches and home indicators</p>
              </div>
              
              <div className="p-3 rounded-lg border bg-card">
                <p className="font-medium mb-1">✅ Touch Optimization</p>
                <p className="text-muted-foreground">44px min touch targets, touch-manipulation</p>
              </div>
              
              <div className="p-3 rounded-lg border bg-card">
                <p className="font-medium mb-1">✅ Smooth Scrolling</p>
                <p className="text-muted-foreground">Momentum scrolling and overscroll prevention</p>
              </div>
              
              <div className="p-3 rounded-lg border bg-card">
                <p className="font-medium mb-1">✅ Responsive Design</p>
                <p className="text-muted-foreground">Mobile-first with sm: and md: breakpoints</p>
              </div>
            </div>
          </div>

          {/* Shimmer demo */}
          <div className="space-y-4">
            <h2 className="text-base sm:text-lg font-semibold">
              Shimmer During Rendering
            </h2>
            
            <Button 
              onClick={simulateLoading}
              disabled={isSimulating}
              className="w-full sm:w-auto touch-manipulation min-h-[44px]"
            >
              {isSimulating ? 'Simulating...' : 'Simulate AI Response'}
            </Button>

            {isSimulating && (
              <div className="flex items-center gap-2 p-4 rounded-lg border bg-card">
                <Spinner className="size-4" />
                <Shimmer duration={1.5} className="text-xs sm:text-sm text-muted-foreground">
                  AI is thinking and generating response...
                </Shimmer>
              </div>
            )}

            {showText && (
              <div className="p-4 rounded-lg border bg-card space-y-2">
                <p className="text-xs sm:text-sm font-medium">AI Response:</p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  This is a simulated AI response. The shimmer effect showed while the content was being &ldquo;generated&rdquo;.
                  On mobile devices, this provides excellent visual feedback during streaming responses.
                </p>
              </div>
            )}
          </div>

          {/* Multiple shimmer examples */}
          <div className="space-y-4">
            <h2 className="text-base sm:text-lg font-semibold">
              Shimmer Variations
            </h2>
            
            <div className="space-y-3">
              <div className="p-3 rounded-lg border bg-card">
                <Shimmer duration={1} className="text-xs sm:text-sm">
                  Fast shimmer (1s duration)
                </Shimmer>
              </div>
              
              <div className="p-3 rounded-lg border bg-card">
                <Shimmer duration={1.5} className="text-xs sm:text-sm">
                  Default shimmer (1.5s duration)
                </Shimmer>
              </div>
              
              <div className="p-3 rounded-lg border bg-card">
                <Shimmer duration={2.5} className="text-xs sm:text-sm">
                  Slow shimmer (2.5s duration)
                </Shimmer>
              </div>
            </div>
          </div>

          {/* Test scrolling */}
          <div className="space-y-4">
            <h2 className="text-base sm:text-lg font-semibold">
              Scroll Test
            </h2>
            
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="p-4 rounded-lg border bg-card">
                <p className="text-xs sm:text-sm">
                  Content block {i + 1} - Scroll to test smooth momentum scrolling
                  and safe area insets at the bottom of the page.
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Mobile-optimized footer/input area */}
      <footer className="sticky bottom-0 bg-background/95 backdrop-blur border-t px-2 sm:px-3 py-3 pb-safe">
        <div className="max-w-3xl mx-auto flex items-center gap-2">
          <div className="flex-1 p-3 rounded-2xl bg-muted border text-xs sm:text-sm text-muted-foreground">
            Input area (simulated)
          </div>
          <Button 
            size="icon" 
            className="size-10 sm:size-11 rounded-full shrink-0 touch-manipulation"
          >
            ↑
          </Button>
        </div>
      </footer>
    </div>
  )
}

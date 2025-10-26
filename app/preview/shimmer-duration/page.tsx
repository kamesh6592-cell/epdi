import { Shimmer } from '@/components/ai-elements/shimmer'

export default function ShimmerDurationPreview() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-8">
      <div className="w-full max-w-2xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Shimmer - Different Durations</h1>
          <p className="text-muted-foreground">
            Compare shimmer effects with different animation speeds.
          </p>
        </div>

        <div className="space-y-6 rounded-lg border p-6">
          <div className="space-y-2">
            <h2 className="text-sm font-medium text-muted-foreground">
              Very Fast (0.5s)
            </h2>
            <Shimmer duration={0.5}>Quick processing animation</Shimmer>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-medium text-muted-foreground">
              Fast (1s)
            </h2>
            <Shimmer duration={1}>Fast shimmer effect</Shimmer>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-medium text-muted-foreground">
              Default (2s)
            </h2>
            <Shimmer>Standard shimmer animation</Shimmer>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-medium text-muted-foreground">
              Slow (3s)
            </h2>
            <Shimmer duration={3}>Slower, more relaxed shimmer</Shimmer>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-medium text-muted-foreground">
              Very Slow (5s)
            </h2>
            <Shimmer duration={5}>
              Very slow shimmer for emphasis and attention
            </Shimmer>
          </div>
        </div>

        <div className="rounded-lg border bg-muted/50 p-4">
          <h3 className="mb-2 text-sm font-medium">Duration Prop:</h3>
          <pre className="overflow-x-auto text-xs">
            <code>{`// Fast shimmer (1 second)
<Shimmer duration={1}>Quick animation</Shimmer>

// Default shimmer (2 seconds)
<Shimmer>Standard animation</Shimmer>

// Slow shimmer (5 seconds)
<Shimmer duration={5}>Slow animation</Shimmer>`}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}

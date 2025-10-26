import { Shimmer } from '@/components/ai-elements/shimmer'

export default function ShimmerPreview() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-8">
      <div className="w-full max-w-2xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Shimmer Component</h1>
          <p className="text-muted-foreground">
            An animated shimmer effect for loading states and dynamic content.
          </p>
        </div>

        <div className="space-y-6 rounded-lg border p-6">
          <div className="space-y-2">
            <h2 className="text-sm font-medium text-muted-foreground">
              Basic Usage
            </h2>
            <Shimmer>Loading your response...</Shimmer>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-medium text-muted-foreground">
              As Heading
            </h2>
            <Shimmer as="h2" className="text-2xl font-bold">
              Analyzing your request
            </Shimmer>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-medium text-muted-foreground">
              Custom Duration (Slow)
            </h2>
            <Shimmer duration={4}>Thinking deeply about this...</Shimmer>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-medium text-muted-foreground">
              Custom Duration (Fast)
            </h2>
            <Shimmer duration={1}>Processing quickly...</Shimmer>
          </div>
        </div>

        <div className="rounded-lg border bg-muted/50 p-4">
          <h3 className="mb-2 text-sm font-medium">Usage Example:</h3>
          <pre className="overflow-x-auto text-xs">
            <code>{`import { Shimmer } from '@/components/ai-elements/shimmer'

<Shimmer>Loading your response...</Shimmer>

// With custom props
<Shimmer 
  as="h2" 
  duration={3} 
  spread={1.5}
  className="text-xl"
>
  Analyzing data...
</Shimmer>`}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}

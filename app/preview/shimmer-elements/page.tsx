import { Shimmer } from '@/components/ai-elements/shimmer'

export default function ShimmerElementsPreview() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-8">
      <div className="w-full max-w-2xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Shimmer - Custom Elements</h1>
          <p className="text-muted-foreground">
            The shimmer component can render as any HTML element.
          </p>
        </div>

        <div className="space-y-6 rounded-lg border p-6">
          <div className="space-y-2">
            <h2 className="text-sm font-medium text-muted-foreground">
              As Paragraph (Default)
            </h2>
            <Shimmer>This is rendered as a paragraph element</Shimmer>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-medium text-muted-foreground">
              As H1 Heading
            </h2>
            <Shimmer as="h1" className="text-4xl font-bold">
              Main Heading with Shimmer
            </Shimmer>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-medium text-muted-foreground">
              As H2 Heading
            </h2>
            <Shimmer as="h2" className="text-3xl font-semibold">
              Subheading with Shimmer
            </Shimmer>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-medium text-muted-foreground">
              As H3 Heading
            </h2>
            <Shimmer as="h3" className="text-2xl font-medium">
              Section Title with Shimmer
            </Shimmer>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-medium text-muted-foreground">
              As Span (Inline)
            </h2>
            <p>
              This is regular text with{' '}
              <Shimmer as="span" className="font-semibold">
                inline shimmer effect
              </Shimmer>{' '}
              in the middle of a sentence.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-medium text-muted-foreground">
              As Div with Custom Styling
            </h2>
            <Shimmer
              as="div"
              className="rounded-lg border bg-muted/50 p-4 text-center text-lg font-medium"
            >
              Custom styled container with shimmer
            </Shimmer>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-medium text-muted-foreground">
              As Label
            </h2>
            <Shimmer as="label" className="text-sm font-medium">
              Form label with shimmer effect
            </Shimmer>
          </div>
        </div>

        <div className="rounded-lg border bg-muted/50 p-4">
          <h3 className="mb-2 text-sm font-medium">Element Types:</h3>
          <pre className="overflow-x-auto text-xs">
            <code>{`// As heading
<Shimmer as="h1" className="text-4xl font-bold">
  Heading Text
</Shimmer>

// As span (inline)
<Shimmer as="span">Inline shimmer</Shimmer>

// As div with custom styling
<Shimmer as="div" className="p-4 border">
  Container with shimmer
</Shimmer>

// As any HTML element
<Shimmer as="label">Label text</Shimmer>`}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}

import { Image } from '@/components/ai-elements/image'

// Example base64 encoded 1x1 pixel images for demonstration
const exampleImages = {
  redSquare: {
    base64:
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg==',
    mediaType: 'image/png'
  },
  blueSquare: {
    base64:
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
    mediaType: 'image/png'
  },
  greenSquare: {
    base64:
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M/wHwAEBgIApD5fRAAAAABJRU5ErkJggg==',
    mediaType: 'image/png'
  }
}

export default function ImagePreview() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-8">
      <div className="w-full max-w-2xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Image Component</h1>
          <p className="text-muted-foreground">
            Displays AI-generated images from base64 data returned by the AI
            SDK.
          </p>
        </div>

        <div className="space-y-6 rounded-lg border p-6">
          <div className="space-y-2">
            <h2 className="text-sm font-medium text-muted-foreground">
              Basic Usage
            </h2>
            <div className="flex gap-4">
              <Image
                {...exampleImages.redSquare}
                alt="Red square example"
                className="h-24 w-24 border"
              />
              <Image
                {...exampleImages.blueSquare}
                alt="Blue square example"
                className="h-24 w-24 border"
              />
              <Image
                {...exampleImages.greenSquare}
                alt="Green square example"
                className="h-24 w-24 border"
              />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-medium text-muted-foreground">
              Different Sizes
            </h2>
            <div className="flex items-end gap-4">
              <Image
                {...exampleImages.redSquare}
                alt="Small"
                className="h-16 w-16 border"
              />
              <Image
                {...exampleImages.blueSquare}
                alt="Medium"
                className="h-32 w-32 border"
              />
              <Image
                {...exampleImages.greenSquare}
                alt="Large"
                className="h-48 w-48 border"
              />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-medium text-muted-foreground">
              Responsive Image
            </h2>
            <Image
              {...exampleImages.blueSquare}
              alt="Responsive example"
              className="w-full max-w-md border"
            />
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-medium text-muted-foreground">
              Custom Styling
            </h2>
            <Image
              {...exampleImages.greenSquare}
              alt="Custom styled"
              className="h-32 w-32 rounded-full border-4 border-primary shadow-lg"
            />
          </div>
        </div>

        <div className="rounded-lg border bg-muted/50 p-4">
          <h3 className="mb-2 text-sm font-medium">Usage Example:</h3>
          <pre className="overflow-x-auto text-xs">
            <code>{`import { Image } from '@/components/ai-elements/image'

// From AI SDK generateImage response
const { image } = await experimental_generateImage({
  model: openai.image('dall-e-3'),
  prompt: 'A futuristic cityscape'
})

// Render the image
<Image
  base64={image.base64}
  mediaType={image.mediaType}
  alt="Generated cityscape"
  className="h-64 w-64"
/>`}</code>
          </pre>
        </div>

        <div className="rounded-lg border bg-amber-50 dark:bg-amber-950/20 p-4">
          <p className="text-sm text-amber-900 dark:text-amber-100">
            <strong>Note:</strong> These are placeholder examples using small
            1x1 pixel images. In production, this component will display
            full-size AI-generated images from models like DALL-E, Stable
            Diffusion, or other image generation APIs.
          </p>
        </div>
      </div>
    </div>
  )
}

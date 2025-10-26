'use client'

import { Image as AIImage } from '@/components/ai-elements/image'

import { CollapsibleMessage } from './collapsible-message'
import { Section } from './section'

export interface ImageSectionProps {
  base64: string
  mediaType?: string
  alt?: string
  prompt?: string
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function ImageSection({
  base64,
  mediaType = 'image/png',
  alt = 'AI generated image',
  prompt,
  isOpen,
  onOpenChange
}: ImageSectionProps) {
  return (
    <CollapsibleMessage
      role="assistant"
      isCollapsible={false}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      showBorder={false}
      showIcon={false}
    >
      <Section title={prompt ? `Generated: ${prompt}` : 'Generated Image'}>
        <div className="flex justify-center">
          <AIImage
            base64={base64}
            mediaType={mediaType}
            alt={alt}
            className="max-w-full rounded-lg border shadow-lg"
          />
        </div>
      </Section>
    </CollapsibleMessage>
  )
}

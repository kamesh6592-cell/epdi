'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

export interface GeneratedImage {
  base64: string
  uint8Array?: Uint8Array
  mediaType?: string
}

interface ImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'>,
    GeneratedImage {}

export const Image = React.memo(function Image({
  base64,
  mediaType = 'image/png',
  alt = 'Generated image',
  className,
  ...props
}: ImageProps) {
  const src = React.useMemo(() => {
    return `data:${mediaType};base64,${base64}`
  }, [base64, mediaType])

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={cn('max-w-full h-auto rounded-lg', className)}
      {...props}
    />
  )
})

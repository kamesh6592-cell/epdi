'use client'

import { Shimmer } from './ai-elements/shimmer'
import { Skeleton } from './ui/skeleton'

export const DefaultSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 pb-4 pt-2">
      <Shimmer className="text-sm">Generating response...</Shimmer>
      <Skeleton className="w-full h-6" />
      <Skeleton className="w-3/4 h-6" />
    </div>
  )
}

export function SearchSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Shimmer duration={1.2} className="text-xs">
        Searching the web for relevant information...
      </Shimmer>
      <div className="flex flex-wrap gap-2 pb-0.5">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="w-[calc(50%-0.5rem)] md:w-[calc(25%-0.5rem)]"
          >
            <Skeleton className="h-20 w-full" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function VideoSearchSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Shimmer duration={1.3} className="text-xs">
        Finding relevant videos...
      </Shimmer>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="h-32 w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function RetrieveSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Shimmer duration={1.4} className="text-xs">
        Retrieving content from the web page...
      </Shimmer>
      <div className="space-y-2">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-3/4" />
      </div>
    </div>
  )
}

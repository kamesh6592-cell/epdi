'use client'

import * as React from 'react'

import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'

interface ShimmerProps {
  children: string
  as?: React.ElementType
  className?: string
  duration?: number
  spread?: number
}

export const Shimmer = React.memo(function Shimmer({
  children,
  as: Component = 'p',
  className,
  duration = 2,
  spread = 2
}: ShimmerProps) {
  const textLength = children.length
  const spreadPercentage = textLength * spread

  return (
    <Component className={cn('relative inline-block', className)}>
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground to-transparent bg-clip-text text-transparent"
        style={{
          backgroundSize: `${spreadPercentage}% 100%`,
          backgroundPosition: 'left center'
        }}
        animate={{
          backgroundPosition: ['left center', 'right center']
        }}
        transition={{
          duration,
          ease: 'linear',
          repeat: Infinity
        }}
      >
        {children}
      </motion.span>
      <span className="text-muted-foreground">{children}</span>
    </Component>
  )
})

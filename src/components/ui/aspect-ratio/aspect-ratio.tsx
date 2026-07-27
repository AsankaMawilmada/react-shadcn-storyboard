import * as React from 'react'
import { cn } from '@/lib/utils'

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number
}

export const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ className, ratio = 16 / 9, style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('relative w-full', className)}
      style={{ aspectRatio: ratio, ...style }}
      {...props}
    />
  ),
)
AspectRatio.displayName = 'AspectRatio'

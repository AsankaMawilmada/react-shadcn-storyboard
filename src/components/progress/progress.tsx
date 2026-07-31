import * as React from 'react'
import { Progress as ProgressPrimitive } from '@base-ui/react/progress'
import { cn } from '@/lib/utils'

export type ProgressProps = ProgressPrimitive.Root.Props

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, ...props }, ref) => (
    <ProgressPrimitive.Root
      ref={ref}
      value={value}
      className={cn('relative w-full', className)}
      {...props}
    >
      <ProgressPrimitive.Track className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
        <ProgressPrimitive.Indicator className="block h-full bg-primary transition-all" />
      </ProgressPrimitive.Track>
    </ProgressPrimitive.Root>
  ),
)
Progress.displayName = 'Progress'

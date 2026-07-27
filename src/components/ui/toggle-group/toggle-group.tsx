import * as React from 'react'
import { ToggleGroup as ToggleGroupPrimitive } from '@base-ui/react/toggle-group'
import type { VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Toggle, toggleVariants, type ToggleProps } from '../toggle'

type ToggleGroupContextValue = VariantProps<typeof toggleVariants>

const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({
  variant: 'default',
  size: 'md',
})

export interface ToggleGroupProps
  extends ToggleGroupPrimitive.Props,
    VariantProps<typeof toggleVariants> {}

export const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  ({ className, variant, size, children, ...props }, ref) => (
    <ToggleGroupPrimitive
      ref={ref}
      className={cn('flex items-center gap-1', className)}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive>
  ),
)
ToggleGroup.displayName = 'ToggleGroup'

export const ToggleGroupItem = React.forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, variant, size, ...props }, ref) => {
    const context = React.useContext(ToggleGroupContext)
    return (
      <Toggle
        ref={ref}
        variant={variant ?? context.variant}
        size={size ?? context.size}
        className={className}
        {...props}
      />
    )
  },
)
ToggleGroupItem.displayName = 'ToggleGroupItem'

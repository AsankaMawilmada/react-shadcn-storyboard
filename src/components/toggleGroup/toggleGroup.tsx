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
  extends ToggleGroupPrimitive.Props, VariantProps<typeof toggleVariants> {}

export const ToggleGroup = ({
  className,
  variant,
  size,
  children,
  ...props
}: ToggleGroupProps) => (
  <ToggleGroupPrimitive
    className={cn('flex items-center gap-1', className)}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive>
)

export const ToggleGroupItem = ({
  className,
  variant,
  size,
  ...props
}: ToggleProps) => {
  const context = React.useContext(ToggleGroupContext)
  return (
    <Toggle
      variant={variant ?? context.variant}
      size={size ?? context.size}
      className={className}
      {...props}
    />
  )
}

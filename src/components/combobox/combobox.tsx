import * as React from 'react'
import { Combobox as ComboboxPrimitive } from '@base-ui/react/combobox'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export const Combobox = ComboboxPrimitive.Root

export const ComboboxInput = React.forwardRef<HTMLInputElement, ComboboxPrimitive.Input.Props>(
  ({ className, ...props }, ref) => (
    <ComboboxPrimitive.Input
      ref={ref}
      className={cn(
        'flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  ),
)
ComboboxInput.displayName = 'ComboboxInput'

export const ComboboxContent = React.forwardRef<HTMLDivElement, ComboboxPrimitive.Popup.Props>(
  ({ className, children, ...props }, ref) => (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner sideOffset={8} align="start" className="z-50">
        <ComboboxPrimitive.Popup
          ref={ref}
          className={cn(
            'max-h-80 w-[var(--anchor-width)] overflow-y-auto rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md outline-none data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0',
            className,
          )}
          {...props}
        >
          {children}
        </ComboboxPrimitive.Popup>
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  ),
)
ComboboxContent.displayName = 'ComboboxContent'

export const ComboboxList = React.forwardRef<HTMLDivElement, ComboboxPrimitive.List.Props>(
  ({ className, ...props }, ref) => (
    <ComboboxPrimitive.List ref={ref} className={cn('flex flex-col gap-0.5', className)} {...props} />
  ),
)
ComboboxList.displayName = 'ComboboxList'

export const ComboboxItem = React.forwardRef<HTMLDivElement, ComboboxPrimitive.Item.Props>(
  ({ className, children, ...props }, ref) => (
    <ComboboxPrimitive.Item
      ref={ref}
      className={cn(
        'relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground',
        className,
      )}
      {...props}
    >
      <span className="flex-1">{children}</span>
      <ComboboxPrimitive.ItemIndicator className="flex items-center">
        <Check className="size-4" />
      </ComboboxPrimitive.ItemIndicator>
    </ComboboxPrimitive.Item>
  ),
)
ComboboxItem.displayName = 'ComboboxItem'

export const ComboboxEmpty = React.forwardRef<HTMLDivElement, ComboboxPrimitive.Empty.Props>(
  ({ className, ...props }, ref) => (
    <ComboboxPrimitive.Empty
      ref={ref}
      className={cn('py-6 text-center text-sm text-muted-foreground', className)}
      {...props}
    />
  ),
)
ComboboxEmpty.displayName = 'ComboboxEmpty'

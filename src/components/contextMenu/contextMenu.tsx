import * as React from 'react'
import { ContextMenu as ContextMenuPrimitive } from '@base-ui/react/context-menu'
import { cn } from '@/lib/utils'

export const ContextMenu = ContextMenuPrimitive.Root
export const ContextMenuTrigger = ContextMenuPrimitive.Trigger
export const ContextMenuGroup = ContextMenuPrimitive.Group

export const ContextMenuContent = React.forwardRef<
  HTMLDivElement,
  ContextMenuPrimitive.Popup.Props
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Positioner className="z-50">
      <ContextMenuPrimitive.Popup
        ref={ref}
        className={cn(
          'min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md outline-none data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0',
          className,
        )}
        {...props}
      >
        {children}
      </ContextMenuPrimitive.Popup>
    </ContextMenuPrimitive.Positioner>
  </ContextMenuPrimitive.Portal>
))
ContextMenuContent.displayName = 'ContextMenuContent'

export const ContextMenuItem = React.forwardRef<
  HTMLDivElement,
  ContextMenuPrimitive.Item.Props
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground [&_svg]:size-4 [&_svg]:shrink-0',
      className,
    )}
    {...props}
  />
))
ContextMenuItem.displayName = 'ContextMenuItem'

export const ContextMenuLabel = React.forwardRef<
  HTMLDivElement,
  ContextMenuPrimitive.GroupLabel.Props
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.GroupLabel
    ref={ref}
    className={cn('px-2 py-1.5 text-sm font-semibold', className)}
    {...props}
  />
))
ContextMenuLabel.displayName = 'ContextMenuLabel'

export const ContextMenuSeparator = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('-mx-1 my-1 h-px bg-border', className)} {...props} />
)

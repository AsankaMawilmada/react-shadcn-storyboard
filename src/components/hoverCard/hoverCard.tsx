import * as React from 'react'
import { PreviewCard as HoverCardPrimitive } from '@base-ui/react/preview-card'
import { cn } from '@/lib/utils'

export const HoverCard = HoverCardPrimitive.Root
export const HoverCardTrigger = HoverCardPrimitive.Trigger

export const HoverCardContent = React.forwardRef<
  HTMLDivElement,
  HoverCardPrimitive.Popup.Props
>(({ className, children, ...props }, ref) => (
  <HoverCardPrimitive.Portal>
    <HoverCardPrimitive.Positioner sideOffset={8}>
      <HoverCardPrimitive.Popup
        ref={ref}
        className={cn(
          'z-50 w-72 rounded-md border border-border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0',
          className,
        )}
        {...props}
      >
        {children}
      </HoverCardPrimitive.Popup>
    </HoverCardPrimitive.Positioner>
  </HoverCardPrimitive.Portal>
))
HoverCardContent.displayName = 'HoverCardContent'

import { Tooltip as TooltipPrimitive } from '@base-ui/react/tooltip'
import { cn } from '@/lib/utils'

export const TooltipProvider = TooltipPrimitive.Provider
export const Tooltip = TooltipPrimitive.Root
export const TooltipTrigger = TooltipPrimitive.Trigger

export const TooltipContent = ({
  className,
  children,
  ...props
}: TooltipPrimitive.Popup.Props) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Positioner sideOffset={4}>
      <TooltipPrimitive.Popup
        className={cn(
          'z-50 rounded-md border border-border bg-popover px-3 py-1.5 text-xs text-popover-foreground shadow-md outline-none data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0',
          className,
        )}
        {...props}
      >
        {children}
      </TooltipPrimitive.Popup>
    </TooltipPrimitive.Positioner>
  </TooltipPrimitive.Portal>
)

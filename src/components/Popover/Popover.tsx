import { Popover as PopoverPrimitive } from '@base-ui/react/popover';
import { cn } from '@/lib/utils';

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;

export const PopoverContent = ({
  className,
  children,
  ...props
}: PopoverPrimitive.Popup.Props) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Positioner sideOffset={8}>
      <PopoverPrimitive.Popup
        className={cn(
          'z-50 w-72 rounded-md border border-border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0',
          className,
        )}
        {...props}
      >
        {children}
      </PopoverPrimitive.Popup>
    </PopoverPrimitive.Positioner>
  </PopoverPrimitive.Portal>
);

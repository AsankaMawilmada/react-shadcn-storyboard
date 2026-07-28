import * as React from 'react'
import { Menubar as MenubarPrimitive } from '@base-ui/react/menubar'
import { Menu as MenuPrimitive } from '@base-ui/react/menu'
import { Check, Circle } from 'lucide-react'
import { cn } from '@/lib/utils'

export const Menubar = React.forwardRef<HTMLDivElement, MenubarPrimitive.Props>(
  ({ className, ...props }, ref) => (
    <MenubarPrimitive
      ref={ref}
      className={cn(
        'flex h-9 items-center gap-1 rounded-md border border-border bg-background p-1 shadow-sm',
        className,
      )}
      {...props}
    />
  ),
)
Menubar.displayName = 'Menubar'

export const MenubarMenu = MenuPrimitive.Root
export const MenubarGroup = MenuPrimitive.Group
export const MenubarRadioGroup = MenuPrimitive.RadioGroup

export const MenubarTrigger = React.forwardRef<HTMLButtonElement, MenuPrimitive.Trigger.Props>(
  ({ className, ...props }, ref) => (
    <MenuPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex items-center rounded-sm px-3 py-1 text-sm font-medium outline-none select-none data-[popup-open]:bg-accent data-[popup-open]:text-accent-foreground',
        className,
      )}
      {...props}
    />
  ),
)
MenubarTrigger.displayName = 'MenubarTrigger'

export const MenubarContent = React.forwardRef<HTMLDivElement, MenuPrimitive.Popup.Props>(
  ({ className, children, ...props }, ref) => (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner sideOffset={4} align="start" className="z-50">
        <MenuPrimitive.Popup
          ref={ref}
          className={cn(
            'min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md outline-none data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0',
            className,
          )}
          {...props}
        >
          {children}
        </MenuPrimitive.Popup>
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  ),
)
MenubarContent.displayName = 'MenubarContent'

export const MenubarItem = React.forwardRef<HTMLDivElement, MenuPrimitive.Item.Props>(
  ({ className, ...props }, ref) => (
    <MenuPrimitive.Item
      ref={ref}
      className={cn(
        'relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground [&_svg]:size-4 [&_svg]:shrink-0',
        className,
      )}
      {...props}
    />
  ),
)
MenubarItem.displayName = 'MenubarItem'

export const MenubarCheckboxItem = React.forwardRef<
  HTMLDivElement,
  MenuPrimitive.CheckboxItem.Props
>(({ className, children, ...props }, ref) => (
  <MenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      'relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground',
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex size-4 items-center justify-center">
      <MenuPrimitive.CheckboxItemIndicator>
        <Check className="size-4" />
      </MenuPrimitive.CheckboxItemIndicator>
    </span>
    {children}
  </MenuPrimitive.CheckboxItem>
))
MenubarCheckboxItem.displayName = 'MenubarCheckboxItem'

export const MenubarRadioItem = React.forwardRef<HTMLDivElement, MenuPrimitive.RadioItem.Props>(
  ({ className, children, ...props }, ref) => (
    <MenuPrimitive.RadioItem
      ref={ref}
      className={cn(
        'relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground',
        className,
      )}
      {...props}
    >
      <span className="absolute left-2 flex size-4 items-center justify-center">
        <MenuPrimitive.RadioItemIndicator>
          <Circle className="size-2 fill-current" />
        </MenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  ),
)
MenubarRadioItem.displayName = 'MenubarRadioItem'

export const MenubarLabel = React.forwardRef<HTMLDivElement, MenuPrimitive.GroupLabel.Props>(
  ({ className, ...props }, ref) => (
    <MenuPrimitive.GroupLabel
      ref={ref}
      className={cn('px-2 py-1.5 text-sm font-semibold', className)}
      {...props}
    />
  ),
)
MenubarLabel.displayName = 'MenubarLabel'

export const MenubarSeparator = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('-mx-1 my-1 h-px bg-border', className)} {...props} />
)

export const MenubarShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn('ml-auto text-xs tracking-widest text-muted-foreground', className)} {...props} />
)

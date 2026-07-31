import { NavigationMenu as NavigationMenuPrimitive } from '@base-ui/react/navigation-menu'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export const NavigationMenu = ({
  className,
  children,
  ...props
}: NavigationMenuPrimitive.Root.Props) => (
  <NavigationMenuPrimitive.Root
    className={cn(
      'relative flex max-w-max flex-1 items-center justify-center',
      className,
    )}
    {...props}
  >
    {children}
    <NavigationMenuPrimitive.Portal>
      <NavigationMenuPrimitive.Positioner
        sideOffset={8}
        className="z-50 box-border"
      >
        <NavigationMenuPrimitive.Popup
          className={cn(
            'h-[var(--popup-height)] w-[var(--popup-width)] origin-[var(--transform-origin)] overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-md outline-none transition-[width,height] duration-200 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0',
          )}
        >
          <NavigationMenuPrimitive.Viewport />
        </NavigationMenuPrimitive.Popup>
      </NavigationMenuPrimitive.Positioner>
    </NavigationMenuPrimitive.Portal>
  </NavigationMenuPrimitive.Root>
)

export const NavigationMenuList = ({
  className,
  ...props
}: NavigationMenuPrimitive.List.Props) => (
  <NavigationMenuPrimitive.List
    className={cn(
      'flex flex-1 list-none items-center justify-center gap-1',
      className,
    )}
    {...props}
  />
)

export const NavigationMenuItem = NavigationMenuPrimitive.Item

export const NavigationMenuTrigger = ({
  className,
  children,
  ...props
}: NavigationMenuPrimitive.Trigger.Props) => (
  <NavigationMenuPrimitive.Trigger
    className={cn(
      'group flex items-center gap-1 rounded-md bg-background px-3 py-2 text-sm font-medium outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring data-[popup-open]:bg-accent data-[popup-open]:text-accent-foreground',
      className,
    )}
    {...props}
  >
    {children}
    <ChevronDown className="size-3 transition-transform duration-200 group-data-[popup-open]:rotate-180" />
  </NavigationMenuPrimitive.Trigger>
)

export const NavigationMenuContent = ({
  className,
  ...props
}: NavigationMenuPrimitive.Content.Props) => (
  <NavigationMenuPrimitive.Content
    className={cn('p-4', className)}
    {...props}
  />
)

export const NavigationMenuLink = ({
  className,
  ...props
}: NavigationMenuPrimitive.Link.Props) => (
  <NavigationMenuPrimitive.Link
    className={cn(
      'block rounded-sm p-2 text-sm leading-snug outline-none transition-colors select-none hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring',
      className,
    )}
    {...props}
  />
)

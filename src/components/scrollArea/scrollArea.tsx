import { ScrollArea as ScrollAreaPrimitive } from '@base-ui/react/scroll-area'
import { cn } from '@/lib/utils'

export type ScrollAreaProps = ScrollAreaPrimitive.Root.Props

export const ScrollArea = ({
  className,
  children,
  ...props
}: ScrollAreaProps) => (
  <ScrollAreaPrimitive.Root
    className={cn('relative overflow-hidden', className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="size-full rounded-[inherit]">
      <ScrollAreaPrimitive.Content>{children}</ScrollAreaPrimitive.Content>
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
)

export type ScrollBarProps = ScrollAreaPrimitive.Scrollbar.Props

export const ScrollBar = ({
  className,
  orientation = 'vertical',
  ...props
}: ScrollBarProps) => (
  <ScrollAreaPrimitive.Scrollbar
    orientation={orientation}
    className={cn(
      'flex touch-none p-px transition-colors select-none',
      orientation === 'vertical' &&
        'h-full w-2.5 border-l border-l-transparent',
      orientation === 'horizontal' &&
        'h-2.5 flex-col border-t border-t-transparent',
      className,
    )}
    {...props}
  >
    <ScrollAreaPrimitive.Thumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.Scrollbar>
)

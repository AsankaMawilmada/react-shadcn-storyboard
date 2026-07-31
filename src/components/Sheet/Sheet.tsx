import * as React from 'react'
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { cva, type VariantProps } from 'class-variance-authority'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export const Sheet = DialogPrimitive.Root
export const SheetTrigger = DialogPrimitive.Trigger
export const SheetClose = DialogPrimitive.Close

const sheetVariants = cva(
  'fixed z-50 gap-4 border-border bg-background p-6 shadow-lg outline-none transition-transform duration-300 ease-in-out',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 w-full border-b data-[starting-style]:-translate-y-full data-[ending-style]:-translate-y-full',
        bottom:
          'inset-x-0 bottom-0 w-full border-t data-[starting-style]:translate-y-full data-[ending-style]:translate-y-full',
        left: 'inset-y-0 left-0 h-full w-3/4 max-w-sm border-r data-[starting-style]:-translate-x-full data-[ending-style]:-translate-x-full',
        right:
          'inset-y-0 right-0 h-full w-3/4 max-w-sm border-l data-[starting-style]:translate-x-full data-[ending-style]:translate-x-full',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  },
)

export interface SheetContentProps
  extends DialogPrimitive.Popup.Props, VariantProps<typeof sheetVariants> {}

export const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(
  ({ className, side, children, ...props }, ref) => (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/50 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0" />
      <DialogPrimitive.Popup
        ref={ref}
        className={cn(sheetVariants({ side }), className)}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute top-4 right-4 rounded-sm opacity-70 outline-none transition-opacity hover:opacity-100 focus-visible:ring-2 focus-visible:ring-ring">
          <X className="size-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Popup>
    </DialogPrimitive.Portal>
  ),
)
SheetContent.displayName = 'SheetContent'

export const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col gap-1.5 text-center sm:text-left', className)}
    {...props}
  />
)

export const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
      className,
    )}
    {...props}
  />
)

export const SheetTitle = React.forwardRef<
  HTMLHeadingElement,
  DialogPrimitive.Title.Props
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-lg leading-none font-semibold', className)}
    {...props}
  />
))
SheetTitle.displayName = 'SheetTitle'

export const SheetDescription = React.forwardRef<
  HTMLParagraphElement,
  DialogPrimitive.Description.Props
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
SheetDescription.displayName = 'SheetDescription'

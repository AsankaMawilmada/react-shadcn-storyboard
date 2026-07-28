import * as React from 'react'
import { AlertDialog as AlertDialogPrimitive } from '@base-ui/react/alert-dialog'
import { cn } from '@/lib/utils'
import { Button, type ButtonProps } from '../button'

export const AlertDialog = AlertDialogPrimitive.Root
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger

export const AlertDialogContent = React.forwardRef<
  HTMLDivElement,
  AlertDialogPrimitive.Popup.Props
>(({ className, children, ...props }, ref) => (
  <AlertDialogPrimitive.Portal>
    <AlertDialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/50 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0" />
    <AlertDialogPrimitive.Popup
      ref={ref}
      className={cn(
        'fixed top-1/2 left-1/2 z-50 grid w-full max-w-md -translate-x-1/2 -translate-y-1/2 gap-4 rounded-lg border border-border bg-background p-6 shadow-lg outline-none data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0',
        className,
      )}
      {...props}
    >
      {children}
    </AlertDialogPrimitive.Popup>
  </AlertDialogPrimitive.Portal>
))
AlertDialogContent.displayName = 'AlertDialogContent'

export const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col gap-1.5 text-center sm:text-left', className)}
    {...props}
  />
)
export const AlertDialogFooter = ({
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

export const AlertDialogTitle = React.forwardRef<
  HTMLHeadingElement,
  AlertDialogPrimitive.Title.Props
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={cn('text-lg leading-none font-semibold', className)}
    {...props}
  />
))
AlertDialogTitle.displayName = 'AlertDialogTitle'

export const AlertDialogDescription = React.forwardRef<
  HTMLParagraphElement,
  AlertDialogPrimitive.Description.Props
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
AlertDialogDescription.displayName = 'AlertDialogDescription'

export const AlertDialogAction = ({ className, ...props }: ButtonProps) => (
  <AlertDialogPrimitive.Close
    render={<Button className={className} {...props} />}
  />
)

export const AlertDialogCancel = ({
  className,
  variant = 'outline',
  ...props
}: ButtonProps) => (
  <AlertDialogPrimitive.Close
    render={<Button variant={variant} className={className} {...props} />}
  />
)

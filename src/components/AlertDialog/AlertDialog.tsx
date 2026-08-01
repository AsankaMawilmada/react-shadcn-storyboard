import * as React from 'react'
import { AlertDialog as AlertDialogPrimitive } from '@base-ui/react/alert-dialog'
import { cn } from '@/lib/utils'
import { Button, type ButtonProps } from '../Button'

export const AlertDialog = AlertDialogPrimitive.Root
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger

export const AlertDialogContent = ({
  className,
  children,
  ...props
}: AlertDialogPrimitive.Popup.Props) => (
  <AlertDialogPrimitive.Portal>
    <AlertDialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/50 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0" />
    <AlertDialogPrimitive.Popup
      className={cn(
        'fixed top-1/2 left-1/2 z-50 grid w-full max-w-md -translate-x-1/2 -translate-y-1/2 gap-4 rounded-lg border border-border bg-background p-6 shadow-lg outline-none data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0',
        className,
      )}
      {...props}
    >
      {children}
    </AlertDialogPrimitive.Popup>
  </AlertDialogPrimitive.Portal>
)

export const AlertDialogHeader = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => (
  <div
    className={cn('flex flex-col gap-1.5 text-center sm:text-left', className)}
    {...props}
  />
)
export const AlertDialogFooter = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => (
  <div
    className={cn(
      'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
      className,
    )}
    {...props}
  />
)

export const AlertDialogTitle = ({
  className,
  ...props
}: AlertDialogPrimitive.Title.Props) => (
  <AlertDialogPrimitive.Title
    className={cn('text-lg leading-none font-semibold', className)}
    {...props}
  />
)

export const AlertDialogDescription = ({
  className,
  ...props
}: AlertDialogPrimitive.Description.Props) => (
  <AlertDialogPrimitive.Description
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
)

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

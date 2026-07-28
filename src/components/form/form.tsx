import * as React from 'react'
import { Field as FieldPrimitive } from '@base-ui/react/field'
import { Form as FormPrimitive } from '@base-ui/react/form'
import { cn } from '@/lib/utils'

export const Form = FormPrimitive
export const FormField = FieldPrimitive.Root
export const FormControl = FieldPrimitive.Control

export const FormLabel = React.forwardRef<HTMLLabelElement, FieldPrimitive.Label.Props>(
  ({ className, ...props }, ref) => (
    <FieldPrimitive.Label
      ref={ref}
      className={cn(
        'text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className,
      )}
      {...props}
    />
  ),
)
FormLabel.displayName = 'FormLabel'

export const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  FieldPrimitive.Description.Props
>(({ className, ...props }, ref) => (
  <FieldPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
FormDescription.displayName = 'FormDescription'

export const FormMessage = React.forwardRef<HTMLDivElement, FieldPrimitive.Error.Props>(
  ({ className, ...props }, ref) => (
    <FieldPrimitive.Error
      ref={ref}
      className={cn('text-sm text-destructive', className)}
      {...props}
    />
  ),
)
FormMessage.displayName = 'FormMessage'

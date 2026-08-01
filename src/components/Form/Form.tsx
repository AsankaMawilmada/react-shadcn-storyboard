import { Field as FieldPrimitive } from '@base-ui/react/field'
import { Form as FormPrimitive } from '@base-ui/react/form'
import { cn } from '@/lib/utils'

export const Form = FormPrimitive
export const FormField = FieldPrimitive.Root
export const FormControl = FieldPrimitive.Control

export const FormLabel = ({
  className,
  ...props
}: FieldPrimitive.Label.Props) => (
  <FieldPrimitive.Label
    className={cn(
      'text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
      className,
    )}
    {...props}
  />
)

export const FormDescription = ({
  className,
  ...props
}: FieldPrimitive.Description.Props) => (
  <FieldPrimitive.Description
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
)

export const FormMessage = ({
  className,
  ...props
}: FieldPrimitive.Error.Props) => (
  <FieldPrimitive.Error
    className={cn('text-sm text-destructive', className)}
    {...props}
  />
)

import * as React from 'react'
import { OTPField as OtpFieldPrimitive } from '@base-ui/react/otp-field'
import { cn } from '@/lib/utils'

export const InputOTP = React.forwardRef<HTMLDivElement, OtpFieldPrimitive.Root.Props>(
  ({ className, ...props }, ref) => (
    <OtpFieldPrimitive.Root
      ref={ref}
      className={cn('flex items-center gap-2 has-[input:disabled]:opacity-50', className)}
      {...props}
    />
  ),
)
InputOTP.displayName = 'InputOTP'

export const InputOTPGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center gap-2', className)} {...props} />
  ),
)
InputOTPGroup.displayName = 'InputOTPGroup'

export const InputOTPSlot = React.forwardRef<HTMLInputElement, OtpFieldPrimitive.Input.Props>(
  ({ className, ...props }, ref) => (
    <OtpFieldPrimitive.Input
      ref={ref}
      className={cn(
        'flex size-9 items-center justify-center rounded-md border border-input text-center text-sm shadow-sm outline-none transition-colors data-[filled]:border-ring disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    />
  ),
)
InputOTPSlot.displayName = 'InputOTPSlot'

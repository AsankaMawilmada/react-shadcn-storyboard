import * as React from 'react';
import { OTPField as OtpFieldPrimitive } from '@base-ui/react/otp-field';
import { cn } from '@/lib/utils';

export const InputOTP = ({
  className,
  ...props
}: OtpFieldPrimitive.Root.Props) => (
  <OtpFieldPrimitive.Root
    className={cn(
      'flex items-center gap-2 has-[input:disabled]:opacity-50',
      className,
    )}
    {...props}
  />
);

export const InputOTPGroup = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => (
  <div className={cn('flex items-center gap-2', className)} {...props} />
);

export const InputOTPSlot = ({
  className,
  ...props
}: OtpFieldPrimitive.Input.Props) => (
  <OtpFieldPrimitive.Input
    className={cn(
      'flex size-9 items-center justify-center rounded-md border border-input text-center text-sm shadow-sm outline-none transition-colors data-[filled]:border-ring disabled:cursor-not-allowed disabled:opacity-50',
      'focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/50 aria-invalid:border-destructive aria-invalid:ring-4 aria-invalid:ring-destructive/50 aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:ring-destructive/50',
      className,
    )}
    {...props}
  />
);

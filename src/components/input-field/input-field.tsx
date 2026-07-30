import * as React from 'react'
import { cn } from '@/lib/utils'
import { Input } from '../input'
import { Label } from '../label'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../input-otp'

export type InputFieldType =
  'text' | 'date' | 'number' | 'postcode' | 'email' | 'split'
export type LabelPosition = 'above' | 'beside'
export type IconPosition = 'left' | 'right'

export type InputFieldProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
> & {
  type?: InputFieldType
  label?: React.ReactNode
  labelPosition?: LabelPosition
  icon?: React.ReactNode
  iconPosition?: IconPosition
  /** Arbitrary content rendered before the input, e.g. a "$" prefix. */
  leading?: React.ReactNode
  /** Arbitrary content rendered after the input, e.g. a unit suffix. */
  trailing?: React.ReactNode
  /** Number of segmented boxes when `type="split"`. */
  splitLength?: number
  /** Class applied to the outer label+field layout wrapper. */
  containerClassName?: string
}

const iconClassName =
  'flex size-4 shrink-0 items-center justify-center text-muted-foreground'

// `type="split"` has no native <input> of its own (it renders InputOTP
// instead), so ref forwarding only targets HTMLInputElement — see the
// component doc comment below for the tradeoff this implies.
export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      type = 'text',
      label,
      labelPosition = 'above',
      icon,
      iconPosition = 'left',
      leading,
      trailing,
      splitLength = 6,
      containerClassName,
      className,
      id,
      disabled,
      inputMode,
      autoComplete,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId()
    const inputId = id ?? generatedId

    let field: React.ReactNode

    if (type === 'split') {
      // icon/leading/trailing don't apply to the segmented-box layout, so
      // they're intentionally not rendered here.
      field = (
        <InputOTP length={splitLength} disabled={disabled}>
          <InputOTPGroup>
            {Array.from({ length: splitLength }, (_, index) => (
              <InputOTPSlot key={index} />
            ))}
          </InputOTPGroup>
        </InputOTP>
      )
    } else {
      const nativeType = type === 'postcode' ? 'text' : type
      const resolvedInputMode =
        type === 'postcode' ? (inputMode ?? 'text') : inputMode
      const resolvedAutoComplete =
        type === 'postcode' ? (autoComplete ?? 'postal-code') : autoComplete

      field =
        icon || leading || trailing ? (
          <div
            className={cn(
              'flex h-9 w-full items-center gap-2 rounded-md border border-input bg-background px-3 shadow-sm transition-colors focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50',
              className,
            )}
          >
            {leading}
            {icon && iconPosition === 'left' && (
              <span className={iconClassName}>{icon}</span>
            )}
            <input
              ref={ref}
              id={inputId}
              type={nativeType}
              disabled={disabled}
              inputMode={resolvedInputMode}
              autoComplete={resolvedAutoComplete}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
              {...props}
            />
            {icon && iconPosition === 'right' && (
              <span className={iconClassName}>{icon}</span>
            )}
            {trailing}
          </div>
        ) : (
          <Input
            ref={ref}
            id={inputId}
            type={nativeType}
            disabled={disabled}
            inputMode={resolvedInputMode}
            autoComplete={resolvedAutoComplete}
            className={className}
            {...props}
          />
        )
    }

    return (
      <div
        className={cn(
          'flex flex-col gap-1.5',
          labelPosition === 'beside' && 'sm:flex-row sm:items-center sm:gap-3',
          containerClassName,
        )}
      >
        {label && (
          <Label
            htmlFor={type === 'split' ? undefined : inputId}
            className={cn(labelPosition === 'beside' && 'sm:w-32 sm:shrink-0')}
          >
            {label}
          </Label>
        )}
        <div className={cn(labelPosition === 'beside' && 'sm:flex-1')}>
          {field}
        </div>
      </div>
    )
  },
)
InputField.displayName = 'InputField'

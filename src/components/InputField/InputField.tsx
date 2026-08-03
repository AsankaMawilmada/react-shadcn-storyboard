import * as React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '../Input';
import { Label } from '../Label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../InputOtp';

export type InputFieldType =
  'text' | 'date' | 'number' | 'postcode' | 'email' | 'split';
export type LabelPosition = 'above' | 'beside';
export type IconPosition = 'left' | 'right';

export type InputFieldProps = Omit<React.ComponentProps<'input'>, 'type'> & {
  type?: InputFieldType;
  label?: React.ReactNode;
  labelPosition?: LabelPosition;
  icon?: React.ReactNode;
  iconPosition?: IconPosition;
  /** Arbitrary content rendered before the input, e.g. a "$" prefix. */
  leading?: React.ReactNode;
  /** Arbitrary content rendered after the input, e.g. a unit suffix. */
  trailing?: React.ReactNode;
  /** Number of segmented boxes when `type="split"`. */
  splitLength?: number;
  /** Class applied to the outer label+field layout wrapper. */
  containerClassName?: string;
};

const iconClassName =
  'flex size-4 shrink-0 items-center justify-center text-muted-foreground';

// Error (aria-invalid) wins over focus even when both apply — the compound
// `aria-invalid:focus-visible:` / `has-aria-invalid:focus-within:` variants
// carry higher CSS specificity than either single-condition rule, so this
// holds regardless of the order Tailwind emits the underlying declarations.
const focusErrorClassName =
  'focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/50 focus-visible:ring-offset-0 aria-invalid:border-destructive aria-invalid:ring-4 aria-invalid:ring-destructive/50 aria-invalid:ring-offset-0 aria-invalid:focus-visible:border-destructive aria-invalid:focus-visible:ring-destructive/50';
const wrapperFocusErrorClassName =
  'focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/50 has-aria-invalid:border-destructive has-aria-invalid:ring-4 has-aria-invalid:ring-destructive/50 has-aria-invalid:focus-within:border-destructive has-aria-invalid:focus-within:ring-destructive/50';

// `type="split"` has no native <input> of its own (it renders InputOTP
// instead), so a `ref` prop only ever attaches to an HTMLInputElement — it's
// silently unused when `type="split"`, since `...props` isn't spread there.
export const InputField = ({
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
}: InputFieldProps) => {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;

  let field: React.ReactNode;

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
    );
  } else {
    const nativeType = type === 'postcode' ? 'text' : type;
    const resolvedInputMode =
      type === 'postcode' ? (inputMode ?? 'text') : inputMode;
    const resolvedAutoComplete =
      type === 'postcode' ? (autoComplete ?? 'postal-code') : autoComplete;

    field =
      icon || leading || trailing ? (
        <div
          className={cn(
            'flex h-12 w-full items-center gap-2 rounded-md border border-input bg-background px-4 shadow-sm transition-colors has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50',
            wrapperFocusErrorClassName,
            className,
          )}
        >
          {leading}
          {icon && iconPosition === 'left' && (
            <span className={iconClassName}>{icon}</span>
          )}
          <input
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
          id={inputId}
          type={nativeType}
          disabled={disabled}
          inputMode={resolvedInputMode}
          autoComplete={resolvedAutoComplete}
          className={cn('h-12', focusErrorClassName, className)}
          {...props}
        />
      );
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
  );
};

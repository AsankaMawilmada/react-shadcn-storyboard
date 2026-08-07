import * as React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '../Input';
import { Label } from '../Label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../InputOtp';

export type InputFieldType =
  'text' | 'date' | 'number' | 'postcode' | 'email' | 'split';
export type LabelPosition = 'above' | 'beside';
export type IconPosition = 'left' | 'right';

export type InputFieldProps = Omit<
  React.ComponentProps<'input'>,
  'type' | 'value' | 'defaultValue'
> & {
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
  /**
   * Controlled value. For `type="split"` this is the composed OTP string
   * rather than a native input value.
   */
  value?: string;
  /** Uncontrolled initial value. See `value` for `type="split"` semantics. */
  defaultValue?: string;
  /**
   * Fired with the composed value when `type="split"`. Native `onChange`
   * doesn't apply there since there's no single `<input>` to attach it to —
   * use this to wire the segmented field to external state or a validation
   * library's `Controller`/`Field` render-prop adapter (e.g. react-hook-form
   * `Controller`, Formik `Field`).
   */
  onValueChange?: (value: string) => void;
};

// `type="split"` has no native <input> of its own (it renders InputOTP
// instead). `value`/`defaultValue`/`name`/`onValueChange` are wired through
// to the underlying OTP field so it can still be driven by external state or
// a validation library's Controller/Field adapter, but a `ref` prop only
// ever attaches to an HTMLInputElement — it's silently unused when
// `type="split"`, since `...props` isn't spread there.
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
  onValueChange,
  ...props
}: InputFieldProps) => {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;

  let field: React.ReactNode;

  if (type === 'split') {
    // icon/leading/trailing don't apply to the segmented-box layout, so
    // they're intentionally not rendered here.
    field = (
      <InputOTP
        length={splitLength}
        disabled={disabled}
        name={props.name}
        value={props.value}
        defaultValue={props.defaultValue}
        onValueChange={onValueChange}
      >
        <InputOTPGroup>
          {Array.from({ length: splitLength }, (_, index) => (
            <InputOTPSlot key={index} aria-invalid={props['aria-invalid']} />
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
        <div className={cn('input-field-wrapper', className)}>
          {leading}
          {icon && iconPosition === 'left' && (
            <span className='input-field-icon'>{icon}</span>
          )}
          <input
            id={inputId}
            type={nativeType}
            disabled={disabled}
            inputMode={resolvedInputMode}
            autoComplete={resolvedAutoComplete}
            className='input-field-wrapper__input'
            {...props}
          />
          {icon && iconPosition === 'right' && (
            <span className='input-field-icon'>{icon}</span>
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
          className={cn('input-field', className)}
          {...props}
        />
      );
  }

  return (
    <div
      className={cn(
        'input-field-container',
        labelPosition === 'beside' && 'input-field-container--beside',
        containerClassName,
      )}
    >
      {label && (
        <Label
          htmlFor={type === 'split' ? undefined : inputId}
          className={cn(
            labelPosition === 'beside' && 'input-field-label--beside',
          )}
        >
          {label}
        </Label>
      )}
      <div
        className={cn(labelPosition === 'beside' && 'input-field-slot--beside')}
      >
        {field}
      </div>
    </div>
  );
};

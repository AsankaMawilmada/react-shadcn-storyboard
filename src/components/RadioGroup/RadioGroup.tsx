import * as React from 'react';
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group';
import { Radio as RadioPrimitive } from '@base-ui/react/radio';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export type RadioGroupOption = {
  value: string;
  label: React.ReactNode;
  /** Disables just this option — the rest of the group stays interactive. */
  disabled?: boolean;
};

export type RadioGroupProps = Omit<
  RadioGroupPrimitive.Props<string>,
  'children' | 'className' | 'defaultValue'
> & {
  /** The buttons to render, in order. */
  options: RadioGroupOption[];
  label?: React.ReactNode;
  /**
   * Uncontrolled initial value — optional, and the recommended way to seed
   * a selection when you don't need to read/drive it from outside (see
   * `value` for the controlled alternative).
   */
  defaultValue?: string;
  /**
   * Message shown below the group when present. Also implies `aria-invalid`
   * (styling every button as invalid) unless `aria-invalid` is explicitly
   * set.
   */
  errorMessage?: React.ReactNode;
  /**
   * Stretches the group to fill its container, sharing the width equally
   * across every option, instead of sizing to fit its content.
   * @default false
   */
  fullWidth?: boolean;
  /** Class applied to the outer label+group+message wrapper. */
  containerClassName?: string;
  /** Class applied to the row of buttons itself. */
  className?: string;
};

// A real radio group (native form semantics, single selection, works with
// `required`/native validation) styled as a segmented button row — renders
// directly on Base UI's `RadioGroup`/`Radio` primitives, so `value`/
// `defaultValue`/`onValueChange` and native form validation all work exactly
// like a plain radio input group would.
export const RadioGroup = ({
  options,
  label,
  errorMessage,
  fullWidth = false,
  containerClassName,
  className,
  id,
  'aria-invalid': ariaInvalidProp,
  'aria-describedby': ariaDescribedByProp,
  ...props
}: RadioGroupProps) => {
  const generatedId = React.useId();
  const groupId = id ?? generatedId;
  const labelId = label ? `${groupId}-label` : undefined;
  const errorMessageId = errorMessage ? `${groupId}-error` : undefined;
  // An explicit `aria-invalid` always wins; otherwise an error message alone
  // is enough to style every button as invalid, so consumers who only pass
  // `errorMessage` don't also have to separately set `aria-invalid`.
  const invalid = ariaInvalidProp ?? (errorMessage ? true : undefined);
  const describedBy =
    [ariaDescribedByProp, errorMessageId].filter(Boolean).join(' ') ||
    undefined;

  return (
    <div className={cn('radio-group-container', containerClassName)}>
      {label && (
        <span id={labelId} className='radio-group-label'>
          {label}
        </span>
      )}
      <RadioGroupPrimitive
        id={groupId}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        aria-labelledby={labelId}
        className={cn(
          'radio-group',
          fullWidth && 'radio-group--full-width',
          className,
        )}
        {...props}
      >
        {options.map((option) => (
          <RadioPrimitive.Root
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            className='radio-group-item'
          >
            {/* keepMounted: reserves the icon's layout space even when
             * unchecked (hidden via CSS's `[data-unchecked]` below) — the
             * default (mount only once checked) shifts the label sideways
             * every time an item is (de)selected. */}
            <RadioPrimitive.Indicator
              keepMounted
              className='radio-group-item-icon'
            >
              <Check aria-hidden='true' className='size-4 shrink-0' />
            </RadioPrimitive.Indicator>
            <span className='radio-group-item-label'>{option.label}</span>
          </RadioPrimitive.Root>
        ))}
      </RadioGroupPrimitive>
      {errorMessage && (
        <p id={errorMessageId} role='alert' className='radio-group-error'>
          {errorMessage}
        </p>
      )}
    </div>
  );
};

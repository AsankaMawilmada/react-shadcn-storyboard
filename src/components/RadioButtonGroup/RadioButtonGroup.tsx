import * as React from 'react';
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group';
import { Radio as RadioPrimitive } from '@base-ui/react/radio';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export type RadioButtonGroupOption = {
  value: string;
  label: React.ReactNode;
  /** Disables just this option — the rest of the group stays interactive. */
  disabled?: boolean;
};

// Variant class names map to hand-written rules in RadioButtonGroup.css
// (not Tailwind utilities, unlike Button's `buttonVariants`) — `cva` still
// composes them fine, it doesn't care what a variant's string contains.
// `size` mirrors Button's own sm/md/lg scale (see Button.tsx's
// `buttonVariants`) so a RadioButtonGroup sits flush against Buttons of the
// same size in the same row; `md`/horizontal are the unstyled defaults, so
// their variant strings are empty.
const radioButtonGroupVariants = cva('radio-button-group', {
  variants: {
    orientation: {
      horizontal: '',
      vertical: 'radio-button-group--vertical',
    },
    size: {
      sm: 'radio-button-group--sm',
      md: '',
      lg: 'radio-button-group--lg',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    size: 'md',
  },
});

export type RadioButtonGroupProps = Omit<
  RadioGroupPrimitive.Props<string>,
  'children' | 'className' | 'defaultValue'
> &
  VariantProps<typeof radioButtonGroupVariants> & {
    /** The buttons to render, in order. */
    options: RadioButtonGroupOption[];
    label?: React.ReactNode;
    /**
     * Uncontrolled initial value — optional, and the recommended way to
     * seed a selection when you don't need to read/drive it from outside
     * (see `value` for the controlled alternative).
     */
    defaultValue?: string;
    /**
     * Message shown below the group when present. Also implies
     * `aria-invalid` (styling every button as invalid) unless
     * `aria-invalid` is explicitly set.
     */
    errorMessage?: React.ReactNode;
    /** Class applied to the outer label+group+message wrapper. */
    containerClassName?: string;
    /** Class applied to the row of buttons itself. */
    className?: string;
  };

// A real radio group (native form semantics, single selection, works with
// `required`/native validation) styled as a segmented button row rather
// than the traditional circle-and-dot look — renders directly on Base UI's
// `RadioGroup`/`Radio` primitives instead of reusing this repo's own
// `RadioGroup`/`RadioGroupItem` (which bake in the circular appearance as
// plain Tailwind utility classes on the same element); overriding those
// from a `@layer components` class would silently lose, the same footgun
// documented on InputField.css's `.input-field`.
export const RadioButtonGroup = ({
  options,
  label,
  errorMessage,
  orientation = 'horizontal',
  size = 'md',
  containerClassName,
  className,
  id,
  'aria-invalid': ariaInvalidProp,
  'aria-describedby': ariaDescribedByProp,
  ...props
}: RadioButtonGroupProps) => {
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
    <div className={cn('radio-button-group-container', containerClassName)}>
      {label && (
        <span id={labelId} className='radio-button-group-label'>
          {label}
        </span>
      )}
      <RadioGroupPrimitive
        id={groupId}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        aria-labelledby={labelId}
        // Base UI's `RadioGroup` has no built-in orientation concept
        // (arrow-key cycling comes from the native radio inputs underneath
        // and isn't direction-aware) — `orientation` here only drives
        // `aria-orientation` and, via `radioButtonGroupVariants`, the
        // visual layout.
        aria-orientation={orientation ?? 'horizontal'}
        className={cn(
          radioButtonGroupVariants({ orientation, size }),
          className,
        )}
        {...props}
      >
        {options.map((option) => (
          <RadioPrimitive.Root
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            className='radio-button-group-item'
          >
            {option.label}
          </RadioPrimitive.Root>
        ))}
      </RadioGroupPrimitive>
      {errorMessage && (
        <p
          id={errorMessageId}
          role='alert'
          className='radio-button-group-error'
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
};

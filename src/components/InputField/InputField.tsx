import * as React from 'react';
import { cn } from '@/lib/utils';
import { Label } from '../Label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../InputOtp';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../Select';

export type InputFieldType =
  'text' | 'date' | 'number' | 'postcode' | 'email' | 'split' | 'datedropdown';
export type LabelPosition = 'above' | 'beside';
export type IconPosition = 'left' | 'right';

const MONTHS = [
  { value: '01', label: 'January' },
  { value: '02', label: 'February' },
  { value: '03', label: 'March' },
  { value: '04', label: 'April' },
  { value: '05', label: 'May' },
  { value: '06', label: 'June' },
  { value: '07', label: 'July' },
  { value: '08', label: 'August' },
  { value: '09', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
] as const;

const pad2 = (n: number) => String(n).padStart(2, '0');

const daysInMonth = (year: number | undefined, month: number | undefined) =>
  year && month ? new Date(year, month, 0).getDate() : 31;

const parseIsoDate = (value: string | undefined) => {
  const match = value?.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return match
    ? {
        year: Number(match[1]),
        month: Number(match[2]),
        day: Number(match[3]),
      }
    : { year: undefined, month: undefined, day: undefined };
};

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
  /** Earliest selectable year when `type="datedropdown"`. @default currentYear - 100 */
  minYear?: number;
  /** Latest selectable year when `type="datedropdown"`. @default currentYear */
  maxYear?: number;
  /** Class applied to the outer label+field layout wrapper. */
  containerClassName?: string;
  /**
   * Message shown below the field when present. Also implies `aria-invalid`
   * (styling the field as invalid) unless `aria-invalid` is explicitly set.
   */
  errorMessage?: React.ReactNode;
  /**
   * Controlled value. For `type="split"`/`type="datedropdown"` this is the
   * composed value (OTP string, or `YYYY-MM-DD`) rather than a native input
   * value.
   */
  value?: string;
  /**
   * Uncontrolled initial value. See `value` for `type="split"`/
   * `type="datedropdown"` semantics.
   */
  defaultValue?: string;
  /**
   * Fired with the composed value when `type="split"` (the OTP string) or
   * `type="datedropdown"` (an ISO `YYYY-MM-DD` string, or `''` while
   * incomplete). Neither type has a single native `<input>` to attach a DOM
   * `onChange` to — use this to wire the field to external state or a
   * validation library's `Controller`/`Field` render-prop adapter (e.g.
   * react-hook-form `Controller`, Formik `Field`).
   */
  onValueChange?: (value: string) => void;
};

// `type="split"`/`type="datedropdown"` have no native <input> of their own
// (they render InputOTP / a trio of Selects instead). `value`/`defaultValue`/
// `name`/`onValueChange` are wired through so they can still be driven by
// external state or a validation library's Controller/Field adapter, but a
// `ref` prop only ever attaches to an HTMLInputElement — it's silently
// unused for both, since `...props` isn't spread onto either.
export const InputField = ({
  type = 'text',
  label,
  labelPosition = 'above',
  icon,
  iconPosition = 'left',
  leading,
  trailing,
  splitLength = 6,
  minYear = new Date().getFullYear() - 100,
  maxYear = new Date().getFullYear(),
  containerClassName,
  errorMessage,
  className,
  id,
  disabled,
  inputMode,
  autoComplete,
  onValueChange,
  'aria-invalid': ariaInvalidProp,
  'aria-describedby': ariaDescribedByProp,
  ...props
}: InputFieldProps) => {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const errorMessageId = errorMessage ? `${inputId}-error` : undefined;
  // An explicit `aria-invalid` always wins; otherwise an error message alone
  // is enough to style the field as invalid, so consumers who only pass
  // `errorMessage` don't also have to separately set `aria-invalid`.
  const invalid = ariaInvalidProp ?? (errorMessage ? true : undefined);
  const describedBy =
    [ariaDescribedByProp, errorMessageId].filter(Boolean).join(' ') ||
    undefined;

  // Lifted here (rather than inside the `datedropdown` branch below) because
  // hooks can't be called conditionally — harmless no-ops for every other
  // `type`. Day/month/year are always tracked as internal state rather than
  // derived fresh from `props.value` on every render: unlike `split`'s plain
  // OTP string, an ISO date can't represent a partial selection (day picked
  // but month/year still pending), so we ourselves emit `''` via
  // `onValueChange` until all three are set — deriving straight from
  // `props.value` would make that `''` bounce straight back and wipe
  // whatever the user just picked in a controlled usage. The effect below
  // only resyncs from `value` when it's a complete, parseable date, so an
  // external caller can still set/replace the date programmatically.
  const parsedInitial = parseIsoDate(props.value ?? props.defaultValue);
  const [day, setDay] = React.useState(parsedInitial.day);
  const [month, setMonth] = React.useState(parsedInitial.month);
  const [year, setYear] = React.useState(parsedInitial.year);

  React.useEffect(() => {
    if (props.value === undefined) return;
    const parsed = parseIsoDate(props.value);
    if (parsed.year && parsed.month && parsed.day) {
      setDay(parsed.day);
      setMonth(parsed.month);
      setYear(parsed.year);
    }
  }, [props.value]);

  const commitDate = (
    nextDay: number | undefined,
    nextMonth: number | undefined,
    nextYear: number | undefined,
  ) => {
    setDay(nextDay);
    setMonth(nextMonth);
    setYear(nextYear);
    onValueChange?.(
      nextDay && nextMonth && nextYear
        ? `${nextYear}-${pad2(nextMonth)}-${pad2(nextDay)}`
        : '',
    );
  };

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
            <InputOTPSlot
              key={index}
              aria-invalid={invalid}
              aria-describedby={describedBy}
            />
          ))}
        </InputOTPGroup>
      </InputOTP>
    );
  } else if (type === 'datedropdown') {
    // icon/leading/trailing don't apply to the day/month/year layout, so
    // they're intentionally not rendered here.
    const maxDay = daysInMonth(year, month);
    const years = Array.from(
      { length: Math.max(maxYear - minYear + 1, 0) },
      (_, i) => minYear + i,
    );
    const dropdownName = props.name;

    field = (
      <div className='input-field-date-dropdown'>
        <Select
          value={day ? pad2(day) : null}
          onValueChange={(next) =>
            commitDate(next ? Number(next) : undefined, month, year)
          }
          disabled={disabled}
          name={dropdownName ? `${dropdownName}-day` : undefined}
        >
          <SelectTrigger
            aria-invalid={invalid}
            aria-describedby={describedBy}
            className='input-field-date-dropdown__trigger'
          >
            <SelectValue placeholder='Day' />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: maxDay }, (_, i) => i + 1).map((d) => (
              <SelectItem key={d} value={pad2(d)}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          items={MONTHS}
          value={month ? pad2(month) : null}
          onValueChange={(next) => {
            const nextMonth = next ? Number(next) : undefined;
            const nextMaxDay = daysInMonth(year, nextMonth);
            commitDate(
              day && day > nextMaxDay ? undefined : day,
              nextMonth,
              year,
            );
          }}
          disabled={disabled}
          name={dropdownName ? `${dropdownName}-month` : undefined}
        >
          <SelectTrigger
            aria-invalid={invalid}
            aria-describedby={describedBy}
            className='input-field-date-dropdown__trigger'
          >
            <SelectValue placeholder='Month' />
          </SelectTrigger>
          <SelectContent>
            {MONTHS.map((m) => (
              <SelectItem key={m.value} value={m.value}>
                {m.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={year ? String(year) : null}
          onValueChange={(next) => {
            const nextYear = next ? Number(next) : undefined;
            const nextMaxDay = daysInMonth(nextYear, month);
            commitDate(
              day && day > nextMaxDay ? undefined : day,
              month,
              nextYear,
            );
          }}
          disabled={disabled}
          name={dropdownName ? `${dropdownName}-year` : undefined}
        >
          <SelectTrigger
            aria-invalid={invalid}
            aria-describedby={describedBy}
            className='input-field-date-dropdown__trigger'
          >
            <SelectValue placeholder='Year' />
          </SelectTrigger>
          <SelectContent>
            {years.map((y) => (
              <SelectItem key={y} value={String(y)}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
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
            aria-invalid={invalid}
            aria-describedby={describedBy}
            className='input-field-wrapper__input'
            {...props}
          />
          {icon && iconPosition === 'right' && (
            <span className='input-field-icon'>{icon}</span>
          )}
          {trailing}
        </div>
      ) : (
        <input
          id={inputId}
          type={nativeType}
          disabled={disabled}
          inputMode={resolvedInputMode}
          autoComplete={resolvedAutoComplete}
          aria-invalid={invalid}
          aria-describedby={describedBy}
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
          htmlFor={
            type === 'split' || type === 'datedropdown' ? undefined : inputId
          }
          className={cn(
            labelPosition === 'beside' && 'input-field-label--beside',
          )}
        >
          {label}
        </Label>
      )}
      <div
        className={cn(
          'input-field-slot',
          labelPosition === 'beside' && 'input-field-slot--beside',
        )}
      >
        {field}
        {errorMessage && (
          <p id={errorMessageId} role='alert' className='input-field-error'>
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
};

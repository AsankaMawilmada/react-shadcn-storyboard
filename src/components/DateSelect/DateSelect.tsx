import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../Select';

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

// 2000 is a leap year, used as the reference when `year` isn't chosen yet so
// February still correctly caps at 29 (its maximum possible days) rather
// than falling all the way back to 31 — a day of 30/31 gets clamped as soon
// as February is picked, even before a year narrows it further to 28.
const daysInMonth = (year: number | undefined, month: number | undefined) =>
  month ? new Date(year ?? 2000, month, 0).getDate() : 31;

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

export type DateSelectProps = {
  /**
   * Controlled value, as an ISO `YYYY-MM-DD` string, or `''` while
   * incomplete (day/month/year can't all be represented until every part is
   * chosen).
   */
  value?: string;
  /** Uncontrolled initial value. See `value` for the format. */
  defaultValue?: string;
  /**
   * Fired with the composed value whenever day/month/year changes (an ISO
   * `YYYY-MM-DD` string, or `''` while incomplete). There's no single native
   * `<input>` to attach a DOM `onChange` to — use this to wire the field to
   * external state or a validation library's `Controller`/`Field`
   * render-prop adapter (e.g. react-hook-form `Controller`, Formik `Field`).
   */
  onValueChange?: (value: string) => void;
  /** Earliest selectable year. @default currentYear - 100 */
  minYear?: number;
  /** Latest selectable year. @default currentYear */
  maxYear?: number;
  disabled?: boolean;
  /** Suffixed per dropdown (`${name}-day`/`-month`/`-year`) for native form submission. */
  name?: string;
  'aria-invalid'?: React.AriaAttributes['aria-invalid'];
  'aria-describedby'?: string;
  /**
   * Message shown below the dropdowns when present. Also implies
   * `aria-invalid` (styling every trigger as invalid) unless `aria-invalid`
   * is explicitly set.
   */
  errorMessage?: React.ReactNode;
  /** Class applied to the row of three dropdowns. */
  className?: string;
};

// Day/month/year are tracked as internal state rather than derived fresh
// from `value` on every render: an ISO date string can't represent a
// partial selection (day picked but month/year still pending), so this
// itself emits `''` via `onValueChange` until all three are set — deriving
// straight from `value` would make that `''` bounce right back and wipe
// whatever the user just picked in a controlled usage. The effect below
// only resyncs from `value` when it's a complete, parseable date, so an
// external caller can still set/replace the date programmatically.
export const DateSelect = ({
  value,
  defaultValue,
  onValueChange,
  minYear = new Date().getFullYear() - 100,
  maxYear = new Date().getFullYear(),
  disabled,
  name,
  'aria-invalid': ariaInvalidProp,
  'aria-describedby': ariaDescribedByProp,
  errorMessage,
  className,
}: DateSelectProps) => {
  const generatedId = React.useId();
  const errorMessageId = errorMessage ? `${generatedId}-error` : undefined;
  // An explicit `aria-invalid` always wins; otherwise an error message alone
  // is enough to style every trigger as invalid, so consumers who only pass
  // `errorMessage` don't also have to separately set `aria-invalid`.
  const invalid = ariaInvalidProp ?? (errorMessage ? true : undefined);
  const describedBy =
    [ariaDescribedByProp, errorMessageId].filter(Boolean).join(' ') ||
    undefined;

  const parsedInitial = parseIsoDate(value ?? defaultValue);
  const [day, setDay] = React.useState(parsedInitial.day);
  const [month, setMonth] = React.useState(parsedInitial.month);
  const [year, setYear] = React.useState(parsedInitial.year);

  React.useEffect(() => {
    if (value === undefined) return;
    const parsed = parseIsoDate(value);
    if (parsed.year && parsed.month && parsed.day) {
      setDay(parsed.day);
      setMonth(parsed.month);
      setYear(parsed.year);
    }
  }, [value]);

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

  const maxDay = daysInMonth(year, month);
  const years = Array.from(
    { length: Math.max(maxYear - minYear + 1, 0) },
    (_, i) => minYear + i,
  );

  return (
    <div className='date-select-container'>
      <div className={cn('date-select', className)}>
        <Select
          value={day ? pad2(day) : null}
          onValueChange={(next) =>
            commitDate(next ? Number(next) : undefined, month, year)
          }
          disabled={disabled}
          name={name ? `${name}-day` : undefined}
        >
          <SelectTrigger
            aria-invalid={invalid}
            aria-describedby={describedBy}
            className='date-select__trigger'
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
          name={name ? `${name}-month` : undefined}
        >
          <SelectTrigger
            aria-invalid={invalid}
            aria-describedby={describedBy}
            className='date-select__trigger'
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
          name={name ? `${name}-year` : undefined}
        >
          <SelectTrigger
            aria-invalid={invalid}
            aria-describedby={describedBy}
            className='date-select__trigger'
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
      {errorMessage && (
        <p id={errorMessageId} role='alert' className='date-select-error'>
          {errorMessage}
        </p>
      )}
    </div>
  );
};

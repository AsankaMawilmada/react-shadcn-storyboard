import * as React from 'react';
import { Select as SelectPrimitive } from '@base-ui/react/select';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Select = SelectPrimitive.Root;

export const SelectValue = SelectPrimitive.Value;

export const SelectTrigger = ({
  className,
  children,
  ...props
}: SelectPrimitive.Trigger.Props) => (
  <SelectPrimitive.Trigger
    className={cn(
      'flex h-9 w-full items-center justify-between gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none transition-colors data-[placeholder]:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[popup-open]:ring-2 data-[popup-open]:ring-ring',
      'aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive aria-invalid:focus-visible:ring-destructive',
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon className='flex shrink-0 items-center text-muted-foreground'>
      <ChevronDown className='size-4' />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
);

export const SelectContent = ({
  className,
  children,
  ...props
}: SelectPrimitive.Popup.Props) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Positioner sideOffset={8} className='z-50' align='start'>
      <SelectPrimitive.Popup
        className={cn(
          'max-h-96 min-w-[8rem] overflow-y-auto rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md outline-none data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0',
          className,
        )}
        {...props}
      >
        <SelectPrimitive.List>{children}</SelectPrimitive.List>
      </SelectPrimitive.Popup>
    </SelectPrimitive.Positioner>
  </SelectPrimitive.Portal>
);

export const SelectItem = ({
  className,
  children,
  ...props
}: SelectPrimitive.Item.Props) => (
  <SelectPrimitive.Item
    className={cn(
      'relative flex cursor-default items-center rounded-sm py-1.5 pr-8 pl-2 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground',
      className,
    )}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    <SelectPrimitive.ItemIndicator className='absolute right-2 flex items-center'>
      <Check className='size-4' />
    </SelectPrimitive.ItemIndicator>
  </SelectPrimitive.Item>
);

export const SelectGroup = SelectPrimitive.Group;

export const SelectLabel = ({
  className,
  ...props
}: SelectPrimitive.GroupLabel.Props) => (
  <SelectPrimitive.GroupLabel
    className={cn(
      'px-2 py-1.5 text-xs font-medium text-muted-foreground',
      className,
    )}
    {...props}
  />
);

// `Select` is a compositional primitive (its `Root` renders no DOM element
// of its own — see Base UI's docs), unlike InputField/DateSelect, so there's
// no single point to auto-derive `aria-invalid`/`aria-describedby` the way
// those do from an `errorMessage` prop. This is a plain styled message —
// wire it up yourself: give it an `id`, set `aria-invalid`/
// `aria-describedby={id}` on `SelectTrigger` (already styled for
// `aria-invalid`), and render this conditionally.
export const SelectErrorMessage = ({
  className,
  ...props
}: React.ComponentProps<'p'>) => (
  <p role='alert' className={cn('select-error', className)} {...props} />
);

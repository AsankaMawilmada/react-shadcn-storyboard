import * as React from 'react';
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export const DialogContent = ({
  className,
  children,
  ...props
}: DialogPrimitive.Popup.Props) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/50 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0" />
    <DialogPrimitive.Popup
      className={cn(
        'fixed top-1/2 left-1/2 z-50 grid w-full max-w-md -translate-x-1/2 -translate-y-1/2 gap-4 rounded-lg border border-border bg-background p-6 shadow-lg outline-none data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0',
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute top-4 right-4 rounded-sm opacity-70 outline-none transition-opacity hover:opacity-100 focus-visible:ring-2 focus-visible:ring-ring">
        <X className="size-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Popup>
  </DialogPrimitive.Portal>
);

export const DialogHeader = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => (
  <div
    className={cn('flex flex-col gap-1.5 text-center sm:text-left', className)}
    {...props}
  />
);

export const DialogFooter = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => (
  <div
    className={cn(
      'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
      className,
    )}
    {...props}
  />
);

export const DialogTitle = ({
  className,
  ...props
}: DialogPrimitive.Title.Props) => (
  <DialogPrimitive.Title
    className={cn('text-lg leading-none font-semibold', className)}
    {...props}
  />
);

export const DialogDescription = ({
  className,
  ...props
}: DialogPrimitive.Description.Props) => (
  <DialogPrimitive.Description
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
);

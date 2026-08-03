import * as React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';
import { cn } from '@/lib/utils';

export const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
);

export const DrawerTrigger = DrawerPrimitive.Trigger;
export const DrawerClose = DrawerPrimitive.Close;

export const DrawerContent = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content>) => (
  <DrawerPrimitive.Portal>
    <DrawerPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50" />
    <DrawerPrimitive.Content
      className={cn(
        'fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-xl border-t border-border bg-background outline-none',
        className,
      )}
      {...props}
    >
      <div className="mx-auto mt-4 h-1.5 w-12 shrink-0 rounded-full bg-muted" />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPrimitive.Portal>
);

export const DrawerHeader = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => (
  <div
    className={cn('grid gap-1.5 p-4 text-center sm:text-left', className)}
    {...props}
  />
);

export const DrawerFooter = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => (
  <div
    className={cn('mt-auto flex flex-col gap-2 p-4', className)}
    {...props}
  />
);

export const DrawerTitle = ({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) => (
  <DrawerPrimitive.Title
    className={cn('text-lg leading-none font-semibold', className)}
    {...props}
  />
);

export const DrawerDescription = ({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) => (
  <DrawerPrimitive.Description
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
);

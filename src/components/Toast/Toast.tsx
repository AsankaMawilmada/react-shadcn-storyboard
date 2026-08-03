import { Toast as ToastPrimitive } from '@base-ui/react/toast';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ToastProvider = ToastPrimitive.Provider;

// The package's top-level `@base-ui/react/toast` entry only re-exports
// `useToastManager` as a type (`export type * from './useToastManager.js'`);
// the real runtime function only exists on the `Toast` namespace object.
export const useToastManager = ToastPrimitive.useToastManager;

const ToastList = () => {
  const { toasts } = useToastManager();

  return (
    <>
      {toasts.map((toast) => (
        <ToastPrimitive.Root
          key={toast.id}
          toast={toast}
          className={cn(
            'pointer-events-auto relative w-full rounded-md border border-border bg-background p-4 pr-8 shadow-lg outline-none',
            'data-[starting-style]:translate-y-2 data-[starting-style]:opacity-0',
            'data-[ending-style]:translate-y-2 data-[ending-style]:opacity-0',
            'transition-all duration-200',
          )}
        >
          <ToastPrimitive.Title className="text-sm font-medium" />
          <ToastPrimitive.Description className="text-sm text-muted-foreground" />
          <ToastPrimitive.Close className="absolute top-3 right-3 rounded-sm opacity-70 outline-none transition-opacity hover:opacity-100 focus-visible:ring-2 focus-visible:ring-ring">
            <X className="size-4" />
            <span className="sr-only">Close</span>
          </ToastPrimitive.Close>
        </ToastPrimitive.Root>
      ))}
    </>
  );
};

export const Toaster = () => (
  <ToastPrimitive.Portal>
    <ToastPrimitive.Viewport className="fixed bottom-4 right-4 z-100 flex w-full max-w-sm flex-col gap-2">
      <ToastList />
    </ToastPrimitive.Viewport>
  </ToastPrimitive.Portal>
);

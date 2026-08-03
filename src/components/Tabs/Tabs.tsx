import { Tabs as TabsPrimitive } from '@base-ui/react/tabs';
import { cn } from '@/lib/utils';

export const Tabs = TabsPrimitive.Root;

export const TabsList = ({ className, ...props }: TabsPrimitive.List.Props) => (
  <TabsPrimitive.List
    className={cn(
      'inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground',
      className,
    )}
    {...props}
  />
);

export const TabsTrigger = ({
  className,
  ...props
}: TabsPrimitive.Tab.Props) => (
  <TabsPrimitive.Tab
    className={cn(
      'inline-flex items-center justify-center rounded-md px-3 py-1 text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-background data-[active]:text-foreground data-[active]:shadow-sm',
      className,
    )}
    {...props}
  />
);

export const TabsContent = ({
  className,
  ...props
}: TabsPrimitive.Panel.Props) => (
  <TabsPrimitive.Panel
    className={cn('mt-2 focus-visible:outline-none', className)}
    {...props}
  />
);

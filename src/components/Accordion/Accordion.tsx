import * as React from 'react'
import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export const Accordion = AccordionPrimitive.Root

export const AccordionItem = React.forwardRef<
  HTMLDivElement,
  AccordionPrimitive.Item.Props
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn('border-b border-border', className)}
    {...props}
  />
))
AccordionItem.displayName = 'AccordionItem'

export const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  AccordionPrimitive.Trigger.Props
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[panel-open]:[&>svg]:rotate-180',
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = 'AccordionTrigger'

export const AccordionContent = React.forwardRef<
  HTMLDivElement,
  AccordionPrimitive.Panel.Props
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Panel
    ref={ref}
    className={cn(
      'h-[var(--accordion-panel-height)] overflow-hidden text-sm transition-[height] duration-200 ease-out data-[ending-style]:h-0 data-[starting-style]:h-0',
      className,
    )}
    {...props}
  >
    <div className="pb-4">{children}</div>
  </AccordionPrimitive.Panel>
))
AccordionContent.displayName = 'AccordionContent'

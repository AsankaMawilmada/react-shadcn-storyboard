import { Toggle as TogglePrimitive } from '@base-ui/react/toggle';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const toggleVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors outline-none hover:bg-muted hover:text-muted-foreground disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[pressed]:bg-accent data-[pressed]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline:
          'border border-border bg-transparent hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        sm: 'h-8 px-2',
        md: 'h-9 px-3',
        lg: 'h-10 px-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

export interface ToggleProps
  extends TogglePrimitive.Props, VariantProps<typeof toggleVariants> {}

export const Toggle = ({ className, variant, size, ...props }: ToggleProps) => (
  <TogglePrimitive
    className={cn(toggleVariants({ variant, size }), className)}
    {...props}
  />
);

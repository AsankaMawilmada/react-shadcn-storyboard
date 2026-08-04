import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const typographyVariants = cva('', {
  variants: {
    variant: {
      Display1: 'scroll-m-20 text-4xl font-bold tracking-tight text-balance',
      Display2:
        'scroll-m-20 border-b border-border pb-2 text-3xl font-semibold tracking-tight first:mt-0',
      Display3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      Display4: 'scroll-m-20 text-xl font-semibold tracking-tight',
      p: 'leading-relaxed [&:not(:first-child)]:mt-4',
      lead: 'text-xl text-muted-foreground',
      large: 'text-lg font-semibold',
      small: 'text-sm leading-none font-medium',
      muted: 'text-sm text-muted-foreground',
      blockquote: 'mt-4 border-l-2 border-border pl-6 italic',
      // Wired straight to the Figma-exported link color tokens
      // (--link/--link-hover/--link-pressed), not the generic --primary
      // scale, so it tracks the design system's own link palette.
      a: 'font-medium text-link underline underline-offset-4 hover:text-link-hover active:text-link-pressed',
    },
  },
  defaultVariants: {
    variant: 'p',
  },
});

export type TypographyVariant = NonNullable<
  VariantProps<typeof typographyVariants>['variant']
>;

export type TypographyProps<T extends React.ElementType = 'span'> = {
  /** Overrides the rendered element — every variant renders as <span> by
   * default (e.g. pass as="a" for a real, functional link). */
  as?: T;
  variant?: TypographyVariant;
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'variant'>;

export const Typography = <T extends React.ElementType = 'span'>({
  as,
  variant = 'p',
  className,
  ...props
}: TypographyProps<T>) => {
  const Component = as ?? 'span';
  return (
    <Component
      className={cn(typographyVariants({ variant }), className)}
      {...props}
    />
  );
};

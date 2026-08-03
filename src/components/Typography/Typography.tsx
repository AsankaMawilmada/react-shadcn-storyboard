import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-4xl font-bold tracking-tight text-balance',
      h2: 'scroll-m-20 border-b border-border pb-2 text-3xl font-semibold tracking-tight first:mt-0',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
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

const defaultElement: Record<TypographyVariant, React.ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  p: 'p',
  lead: 'p',
  large: 'div',
  small: 'small',
  muted: 'p',
  blockquote: 'blockquote',
  a: 'a',
};

export type TypographyProps<T extends React.ElementType = 'p'> = {
  /** Overrides the rendered element; defaults per-variant (e.g. h1 -> <h1>, a -> <a>). */
  as?: T;
  variant?: TypographyVariant;
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'variant'>;

export const Typography = <T extends React.ElementType = 'p'>({
  as,
  variant = 'p',
  className,
  ...props
}: TypographyProps<T>) => {
  const Component = as ?? defaultElement[variant];
  return (
    <Component
      className={cn(typographyVariants({ variant }), className)}
      {...props}
    />
  );
};

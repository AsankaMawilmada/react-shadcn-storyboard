import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const linkVariants = cva(
  'inline-flex items-center gap-1.5 rounded-sm outline-none transition-colors text-link visited:text-link hover:text-link-hover active:text-link-pressed focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed aria-disabled:pointer-events-none aria-disabled:opacity-50 aria-disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      size: {
        sm: 'text-xs [&_svg]:size-3.5',
        lg: 'text-sm [&_svg]:size-4',
      },
      variant: {
        // Embedded in a sentence/paragraph — always underlined, since
        // color alone isn't enough to distinguish it from surrounding text.
        inline: 'underline underline-offset-4',
        // A standalone action/nav link (e.g. "Learn more", "Clear
        // filters") — underline only appears on hover.
        standalone: 'font-medium hover:underline underline-offset-4',
      },
    },
    defaultVariants: {
      size: 'lg',
      variant: 'standalone',
    },
  },
);

type LinkOwnProps = VariantProps<typeof linkVariants> & {
  /**
   * Anchors have no native `disabled` attribute, so this drives
   * `aria-disabled` + a click guard on the `<a>` branch; the `<button>`
   * branch uses the real `disabled` attribute.
   */
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

type LinkAnchorProps = LinkOwnProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkOwnProps> & {
    href: string;
  };

type LinkButtonProps = LinkOwnProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof LinkOwnProps> & {
    href?: undefined;
  };

export type LinkProps = LinkAnchorProps | LinkButtonProps;

// Renders an <a> when `href` is given, a <button type="button"> otherwise —
// so the same link-styled component covers both real navigation and a
// link-styled action trigger (e.g. "Clear filters"), sharing one visual
// language and one API either way.
export const Link = React.forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  LinkProps
>(
  (
    {
      className,
      size,
      variant,
      disabled,
      leftIcon,
      rightIcon,
      children,
      ...rest
    },
    ref,
  ) => {
    const content = (
      <>
        {leftIcon}
        {children}
        {rightIcon}
      </>
    );
    const sharedClassName = cn(linkVariants({ size, variant }), className);

    if (rest.href !== undefined) {
      const { onClick, ...anchorProps } = rest;
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          aria-disabled={disabled || undefined}
          tabIndex={disabled ? -1 : undefined}
          onClick={(event) => {
            if (disabled) {
              event.preventDefault();
              return;
            }
            onClick?.(event);
          }}
          className={sharedClassName}
          {...anchorProps}
        >
          {content}
        </a>
      );
    }

    const { type = 'button', ...buttonProps } = rest;
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        disabled={disabled}
        className={sharedClassName}
        {...buttonProps}
      >
        {content}
      </button>
    );
  },
);
Link.displayName = 'Link';

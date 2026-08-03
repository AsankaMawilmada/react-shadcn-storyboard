import * as React from 'react';
import { cn } from '@/lib/utils';

export interface HeroImageProps extends React.ComponentProps<'div'> {
  src: string;
  alt: string;
  /** Aspect ratio of the image, e.g. 16 / 9 (the default). */
  ratio?: number;
  /** Darkens the bottom of the image so overlaid text stays legible. */
  overlay?: boolean;
  /** Class applied to the content wrapper positioned over the image. */
  contentClassName?: string;
  /** Arbitrary overlaid content — headings, paragraphs, buttons, etc. */
  children?: React.ReactNode;
}

export const HeroImage = ({
  src,
  alt,
  ratio = 16 / 9,
  overlay = true,
  contentClassName,
  className,
  style,
  children,
  ...props
}: HeroImageProps) => (
  <div
    className={cn('relative w-full overflow-hidden rounded-lg', className)}
    style={{ aspectRatio: ratio, ...style }}
    {...props}
  >
    <img
      src={src}
      alt={alt}
      className="absolute inset-0 size-full object-cover"
    />
    {overlay && (
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
      />
    )}
    {children && (
      <div
        className={cn(
          'absolute inset-0 flex flex-col justify-end gap-2 p-6 text-white',
          contentClassName,
        )}
      >
        {children}
      </div>
    )}
  </div>
);

import * as React from 'react';
import { cn } from '@/lib/utils';

export interface AspectRatioProps extends React.ComponentProps<'div'> {
  ratio?: number;
}

export const AspectRatio = ({
  className,
  ratio = 16 / 9,
  style,
  ...props
}: AspectRatioProps) => (
  <div
    className={cn('relative w-full', className)}
    style={{ aspectRatio: ratio, ...style }}
    {...props}
  />
);

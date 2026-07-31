import type * as React from 'react'

export interface IconProps extends React.ComponentProps<'svg'> {
  size?: number | string
  color?: string
  strokeWidth?: number | string
  /** Wraps the icon in a circle of this color, e.g. background="#2563eb". */
  background?: string
  /** Space (px) between the icon and the background circle's edge.
   * Defaults to ~40% of `size` when `size` is a number, else 8px. */
  backgroundPadding?: number
}

import { forwardRef } from 'react'
import type { IconProps } from './icon.types'
export const CheckIcon = forwardRef<SVGSVGElement, IconProps>(
  function CheckIcon(
    {
      size = 24,
      color,
      strokeWidth = 2,
      style,
      background,
      backgroundPadding,
      ...props
    },
    ref,
  ) {
    const icon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        strokeWidth={strokeWidth}
        style={
          color
            ? {
                color,
                ...style,
              }
            : style
        }
        ref={ref}
        {...props}
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m5 13 4.5 4.5L19 7"
        />
      </svg>
    )
    if (!background) return icon
    const padding =
      backgroundPadding ??
      (typeof size === 'number' ? Math.round(size * 0.4) : 8)
    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '9999px',
          background,
          padding,
        }}
      >
        {icon}
      </span>
    )
  },
)

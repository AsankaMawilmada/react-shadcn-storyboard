import type { IconProps } from './icon.types'
export function SearchIcon({
  size = 24,
  color,
  strokeWidth = 2,
  style,
  background,
  backgroundPadding,
  ...props
}: IconProps) {
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
      {...props}
    >
      <circle cx={11} cy={11} r={7} stroke="currentColor" />
      <path stroke="currentColor" strokeLinecap="round" d="m21 21-4.35-4.35" />
    </svg>
  )
  if (!background) return icon
  const padding =
    backgroundPadding ?? (typeof size === 'number' ? Math.round(size * 0.4) : 8)
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
}

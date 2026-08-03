import type { IconProps } from './icon.types';

export interface IconBaseProps extends IconProps {
  viewBox: string;
  defaultStrokeWidth: number | string;
}

/** Shared rendering logic for every generated icon in this folder — the
 * size/color/background handling lives here once instead of being repeated
 * in each `*Icon.tsx` file. Not exported from `./index` on purpose: it's an
 * internal building block, not a public icon itself. */
export function IconBase({
  viewBox,
  defaultStrokeWidth,
  size = 24,
  color,
  strokeWidth = defaultStrokeWidth,
  style,
  background,
  backgroundPadding,
  children,
  ...props
}: IconBaseProps) {
  const icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox={viewBox}
      width={size}
      height={size}
      strokeWidth={strokeWidth}
      style={color ? { color, ...style } : style}
      {...props}
    >
      {children}
    </svg>
  );

  if (!background) {
    return icon;
  }

  const padding =
    backgroundPadding ??
    (typeof size === 'number' ? Math.round(size * 0.4) : 8);

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
  );
}

import { IconBase } from './IconBase';
import type { IconProps } from './icon.types';
export function XIcon(props: IconProps) {
  return (
    <IconBase viewBox="0 0 24 24" defaultStrokeWidth="2" {...props}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m6 6 12 12m0-12L6 18"
      />
    </IconBase>
  );
}

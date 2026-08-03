import { IconBase } from './IconBase';
import type { IconProps } from './icon.types';
export function ArrowRightIcon(props: IconProps) {
  return (
    <IconBase viewBox="0 0 24 24" defaultStrokeWidth="2" {...props}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 12h14m0 0-6-6m6 6-6 6"
      />
    </IconBase>
  );
}

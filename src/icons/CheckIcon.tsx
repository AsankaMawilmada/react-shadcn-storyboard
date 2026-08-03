import { IconBase } from './IconBase';
import type { IconProps } from './icon.types';
export function CheckIcon(props: IconProps) {
  return (
    <IconBase viewBox="0 0 24 24" defaultStrokeWidth="2" {...props}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m5 13 4.5 4.5L19 7"
      />
    </IconBase>
  );
}

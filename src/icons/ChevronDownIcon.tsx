import { IconBase } from './IconBase';
import type { IconProps } from './icon.types';
export function ChevronDownIcon(props: IconProps) {
  return (
    <IconBase viewBox="0 0 24 24" defaultStrokeWidth="2" {...props}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m6 9 6 6 6-6"
      />
    </IconBase>
  );
}

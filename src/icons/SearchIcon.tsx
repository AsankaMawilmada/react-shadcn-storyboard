import { IconBase } from './IconBase';
import type { IconProps } from './icon.types';
export function SearchIcon(props: IconProps) {
  return (
    <IconBase viewBox="0 0 24 24" defaultStrokeWidth="2" {...props}>
      <circle cx={11} cy={11} r={7} stroke="currentColor" />
      <path stroke="currentColor" strokeLinecap="round" d="m21 21-4.35-4.35" />
    </IconBase>
  );
}

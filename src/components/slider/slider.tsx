import { Slider as SliderPrimitive } from '@base-ui/react/slider'
import { cn } from '@/lib/utils'

export type SliderProps = SliderPrimitive.Root.Props

export const Slider = ({ className, ...props }: SliderProps) => (
  <SliderPrimitive.Root
    className={cn(
      'relative flex w-full touch-none items-center select-none',
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Control className="flex w-full items-center">
      <SliderPrimitive.Track className="relative h-1.5 w-full grow rounded-full bg-secondary">
        <SliderPrimitive.Indicator className="absolute h-full rounded-full bg-primary" />
        <SliderPrimitive.Thumb className="block size-4 rounded-full border-2 border-primary bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
      </SliderPrimitive.Track>
    </SliderPrimitive.Control>
  </SliderPrimitive.Root>
)

import { Avatar as AvatarPrimitive } from '@base-ui/react/avatar'
import { cn } from '@/lib/utils'

export const Avatar = ({ className, ...props }: AvatarPrimitive.Root.Props) => (
  <AvatarPrimitive.Root
    className={cn(
      'relative flex size-10 shrink-0 overflow-hidden rounded-full bg-muted',
      className,
    )}
    {...props}
  />
)

export const AvatarImage = ({
  className,
  ...props
}: AvatarPrimitive.Image.Props) => (
  <AvatarPrimitive.Image
    className={cn('aspect-square size-full', className)}
    {...props}
  />
)

export const AvatarFallback = ({
  className,
  ...props
}: AvatarPrimitive.Fallback.Props) => (
  <AvatarPrimitive.Fallback
    className={cn(
      'flex size-full items-center justify-center text-sm font-medium text-muted-foreground',
      className,
    )}
    {...props}
  />
)

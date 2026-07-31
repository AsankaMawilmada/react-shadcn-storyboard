import * as React from 'react'
import { Avatar as AvatarPrimitive } from '@base-ui/react/avatar'
import { cn } from '@/lib/utils'

export const Avatar = React.forwardRef<
  HTMLSpanElement,
  AvatarPrimitive.Root.Props
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex size-10 shrink-0 overflow-hidden rounded-full bg-muted',
      className,
    )}
    {...props}
  />
))
Avatar.displayName = 'Avatar'

export const AvatarImage = React.forwardRef<
  HTMLImageElement,
  AvatarPrimitive.Image.Props
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square size-full', className)}
    {...props}
  />
))
AvatarImage.displayName = 'AvatarImage'

export const AvatarFallback = React.forwardRef<
  HTMLSpanElement,
  AvatarPrimitive.Fallback.Props
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'flex size-full items-center justify-center text-sm font-medium text-muted-foreground',
      className,
    )}
    {...props}
  />
))
AvatarFallback.displayName = 'AvatarFallback'

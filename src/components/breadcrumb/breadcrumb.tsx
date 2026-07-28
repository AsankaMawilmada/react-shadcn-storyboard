import * as React from 'react'
import { ChevronRight, MoreHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'

export const Breadcrumb = (props: React.HTMLAttributes<HTMLElement>) => (
  <nav aria-label="breadcrumb" {...props} />
)

export const BreadcrumbList = ({
  className,
  ...props
}: React.OlHTMLAttributes<HTMLOListElement>) => (
  <ol
    className={cn(
      'flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5',
      className,
    )}
    {...props}
  />
)

export const BreadcrumbItem = ({
  className,
  ...props
}: React.LiHTMLAttributes<HTMLLIElement>) => (
  <li
    className={cn('inline-flex items-center gap-1.5', className)}
    {...props}
  />
)

export const BreadcrumbLink = ({
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a
    className={cn('transition-colors hover:text-foreground', className)}
    {...props}
  />
)

export const BreadcrumbPage = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn('font-normal text-foreground', className)}
    {...props}
  />
)

export const BreadcrumbSeparator = ({
  className,
  children,
  ...props
}: React.LiHTMLAttributes<HTMLLIElement>) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn('[&>svg]:size-3.5', className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
)

export const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn('flex size-9 items-center justify-center', className)}
    {...props}
  >
    <MoreHorizontal className="size-4" />
    <span className="sr-only">More</span>
  </span>
)

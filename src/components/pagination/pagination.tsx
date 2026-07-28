import * as React from 'react'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'

export const Pagination = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn('mx-auto flex w-full justify-center', className)}
    {...props}
  />
)

export const PaginationContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLUListElement>) => (
  <ul
    className={cn('flex flex-row items-center gap-1', className)}
    {...props}
  />
)

export const PaginationItem = ({
  className,
  ...props
}: React.LiHTMLAttributes<HTMLLIElement>) => (
  <li className={cn(className)} {...props} />
)

export interface PaginationLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  isActive?: boolean
  size?: 'default' | 'icon'
}

export const PaginationLink = ({
  className,
  isActive,
  size = 'icon',
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      'inline-flex items-center justify-center gap-1 rounded-md text-sm font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      isActive
        ? 'border border-border bg-accent text-accent-foreground'
        : 'hover:bg-accent hover:text-accent-foreground',
      size === 'icon' ? 'size-9' : 'h-9 px-4',
      className,
    )}
    {...props}
  />
)

export const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn('gap-1 pl-2.5', className)}
    {...props}
  >
    <ChevronLeft className="size-4" />
    <span>Previous</span>
  </PaginationLink>
)

export const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn('gap-1 pr-2.5', className)}
    {...props}
  >
    <span>Next</span>
    <ChevronRight className="size-4" />
  </PaginationLink>
)

export const PaginationEllipsis = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    aria-hidden="true"
    className={cn('flex size-9 items-center justify-center', className)}
    {...props}
  >
    <MoreHorizontal className="size-4" />
    <span className="sr-only">More pages</span>
  </span>
)

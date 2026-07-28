import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/react'
import * as stories from './breadcrumb.stories'

const { Default } = composeStories(stories)

describe('Breadcrumb', () => {
  it('renders a nav landmark labeled breadcrumb', () => {
    render(<Default />)
    expect(screen.getByRole('navigation', { name: 'breadcrumb' })).toBeInTheDocument()
  })

  it('renders a navigable link for each non-current item', () => {
    render(<Default />)
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '#')
    expect(screen.getByRole('link', { name: 'Components' })).toHaveAttribute('href', '#')
  })

  it('marks the current page item with aria-current and no href', () => {
    render(<Default />)
    const current = screen.getByText('Breadcrumb')
    expect(current).toHaveAttribute('aria-current', 'page')
    expect(current).not.toHaveAttribute('href')
  })
})

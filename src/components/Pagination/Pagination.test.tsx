import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/react'
import * as stories from './Pagination.stories'

const { Default } = composeStories(stories)

describe('Pagination', () => {
  it('renders a navigation landmark labeled pagination', () => {
    render(<Default />)
    expect(
      screen.getByRole('navigation', { name: 'pagination' }),
    ).toBeInTheDocument()
  })

  it('renders Previous and Next links', () => {
    render(<Default />)
    expect(
      screen.getByRole('link', { name: 'Go to previous page' }),
    ).toHaveTextContent('Previous')
    expect(
      screen.getByRole('link', { name: 'Go to next page' }),
    ).toHaveTextContent('Next')
  })

  it('marks the active page link with aria-current', () => {
    render(<Default />)
    const page2 = screen.getByRole('link', { name: '2' })
    expect(page2).toHaveAttribute('aria-current', 'page')

    const page1 = screen.getByRole('link', { name: '1' })
    expect(page1).not.toHaveAttribute('aria-current')
  })

  it('renders the ellipsis for skipped pages', () => {
    render(<Default />)
    expect(screen.getByText('More pages')).toBeInTheDocument()
  })
})

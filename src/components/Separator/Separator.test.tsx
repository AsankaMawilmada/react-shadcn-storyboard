import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/react'
import * as stories from './Separator.stories'

const { Default } = composeStories(stories)

describe('Separator', () => {
  it('renders a horizontal separator by default', () => {
    render(<Default />)
    const separators = screen.getAllByRole('separator')
    expect(separators.length).toBeGreaterThanOrEqual(2)
    expect(separators[0]).toHaveAttribute('aria-orientation', 'horizontal')
  })

  it('renders the second separator vertically', () => {
    render(<Default />)
    const separators = screen.getAllByRole('separator')
    expect(separators[1]).toHaveAttribute('aria-orientation', 'vertical')
  })

  it('renders the surrounding content', () => {
    render(<Default />)
    expect(screen.getByText('Base UI')).toBeInTheDocument()
    expect(screen.getByText('Docs')).toBeInTheDocument()
    expect(screen.getByText('Source')).toBeInTheDocument()
  })
})

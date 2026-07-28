import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/react'
import * as stories from './progress.stories'

const { Default } = composeStories(stories)

describe('Progress', () => {
  it('renders a progressbar reflecting the value prop', () => {
    render(<Default />)
    const progressbar = screen.getByRole('progressbar')
    expect(progressbar).toHaveAttribute('aria-valuenow', '60')
    expect(progressbar).toHaveAttribute('aria-valuemax', '100')
    expect(progressbar).toHaveAttribute('aria-valuemin', '0')
  })
})

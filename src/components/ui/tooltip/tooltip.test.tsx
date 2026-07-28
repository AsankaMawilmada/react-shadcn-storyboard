import { describe, expect, it } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { composeStories } from '@storybook/react'
import * as stories from './tooltip.stories'

const { Default } = composeStories(stories)

describe('Tooltip', () => {
  it('is hidden until the trigger is hovered', () => {
    render(<Default />)
    expect(screen.queryByText('Add to library')).not.toBeInTheDocument()
  })

  it('shows its content on hover', async () => {
    const user = userEvent.setup()
    render(<Default />)
    await user.hover(screen.getByRole('button', { name: 'Hover me' }))
    expect(await screen.findByText('Add to library')).toBeInTheDocument()
  })

  it('hides again on unhover', async () => {
    const user = userEvent.setup()
    render(<Default />)
    const trigger = screen.getByRole('button', { name: 'Hover me' })
    await user.hover(trigger)
    expect(await screen.findByText('Add to library')).toBeInTheDocument()
    await user.unhover(trigger)
    await waitFor(() => {
      expect(screen.queryByText('Add to library')).not.toBeInTheDocument()
    })
  })
})

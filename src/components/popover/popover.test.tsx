import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { composeStories } from '@storybook/react'
import * as stories from './popover.stories'

const { Default } = composeStories(stories)

describe('Popover', () => {
  it('is closed until the trigger is clicked', () => {
    render(<Default />)
    expect(screen.queryByText('Dimensions')).not.toBeInTheDocument()
  })

  it('opens on trigger click and shows its content', async () => {
    const user = userEvent.setup()
    render(<Default />)
    await user.click(screen.getByRole('button', { name: 'Open popover' }))
    expect(screen.getByText('Dimensions')).toBeInTheDocument()
    expect(
      screen.getByText('Set the dimensions for the layer.'),
    ).toBeInTheDocument()
  })

  it('closes when Escape is pressed', async () => {
    const user = userEvent.setup()
    render(<Default />)
    await user.click(screen.getByRole('button', { name: 'Open popover' }))
    expect(screen.getByText('Dimensions')).toBeInTheDocument()
    await user.keyboard('{Escape}')
    expect(screen.queryByText('Dimensions')).not.toBeInTheDocument()
  })
})

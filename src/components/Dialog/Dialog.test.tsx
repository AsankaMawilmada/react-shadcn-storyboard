import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { composeStories } from '@storybook/react'
import * as stories from './dialog.stories'

const { Default } = composeStories(stories)

describe('Dialog', () => {
  it('is closed until the trigger is clicked', () => {
    render(<Default />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('opens on trigger click and shows its content', async () => {
    const user = userEvent.setup()
    render(<Default />)
    await user.click(screen.getByRole('button', { name: 'Edit profile' }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(
      screen.getByText('Make changes to your profile here.'),
    ).toBeInTheDocument()
  })

  it('closes when the close button is clicked', async () => {
    const user = userEvent.setup()
    render(<Default />)
    await user.click(screen.getByRole('button', { name: 'Edit profile' }))
    await user.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})

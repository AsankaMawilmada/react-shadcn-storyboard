import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { composeStories } from '@storybook/react'
import * as stories from './sheet.stories'

const { Default, Left } = composeStories(stories)

describe('Sheet', () => {
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

  it('closes when the close (X) button is clicked', async () => {
    const user = userEvent.setup()
    render(<Default />)
    await user.click(screen.getByRole('button', { name: 'Edit profile' }))
    await user.click(screen.getByRole('button', { name: 'Close' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes when Cancel (SheetClose) is clicked', async () => {
    const user = userEvent.setup()
    render(<Default />)
    await user.click(screen.getByRole('button', { name: 'Edit profile' }))
    await user.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('opens the left-side variant', async () => {
    const user = userEvent.setup()
    render(<Left />)
    await user.click(screen.getByRole('button', { name: 'Open left' }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(
      screen.getByText('A sheet sliding in from the left edge.'),
    ).toBeInTheDocument()
  })
})

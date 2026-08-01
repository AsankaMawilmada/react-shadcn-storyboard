import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { composeStories } from '@storybook/react'
import * as stories from './NavigationMenu.stories'

const { Default } = composeStories(stories)

describe('NavigationMenu', () => {
  it('does not show submenu content until a trigger is clicked', () => {
    render(<Default />)
    expect(screen.queryByText('Introduction')).not.toBeInTheDocument()
  })

  it('opens a submenu on trigger click and shows its content', async () => {
    const user = userEvent.setup()
    render(<Default />)
    await user.click(screen.getByRole('button', { name: 'Getting Started' }))
    expect(await screen.findByText('Introduction')).toBeInTheDocument()
    expect(screen.getByText('Installation')).toBeInTheDocument()
  })

  it('shows a different submenu when switching triggers', async () => {
    const user = userEvent.setup()
    render(<Default />)
    await user.click(screen.getByRole('button', { name: 'Components' }))
    expect(await screen.findByText('Button')).toBeInTheDocument()
    expect(screen.getByText('Select')).toBeInTheDocument()
  })
})

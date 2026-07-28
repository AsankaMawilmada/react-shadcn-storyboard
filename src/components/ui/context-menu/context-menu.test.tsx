import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { composeStories } from '@storybook/react'
import * as stories from './context-menu.stories'

const { Default } = composeStories(stories)

describe('ContextMenu', () => {
  it('is closed until the trigger area is right-clicked', () => {
    render(<Default />)
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('opens on right-click and shows its content', async () => {
    render(<Default />)
    fireEvent.contextMenu(screen.getByText('Right click here'))
    expect(await screen.findByRole('menu')).toBeInTheDocument()
    expect(screen.getByText('Actions')).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: 'Back' })).toBeInTheDocument()
  })

  it('closes when Escape is pressed', async () => {
    const user = userEvent.setup()
    render(<Default />)
    fireEvent.contextMenu(screen.getByText('Right click here'))
    expect(await screen.findByRole('menu')).toBeInTheDocument()
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('closes when an item is clicked', async () => {
    const user = userEvent.setup()
    render(<Default />)
    fireEvent.contextMenu(screen.getByText('Right click here'))
    const backItem = await screen.findByRole('menuitem', { name: 'Back' })
    await user.click(backItem)
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })
})

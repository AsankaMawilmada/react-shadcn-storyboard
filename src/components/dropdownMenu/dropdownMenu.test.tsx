import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { composeStories } from '@storybook/react'
import * as stories from './dropdownMenu.stories'

const { Default } = composeStories(stories)

describe('DropdownMenu', () => {
  it('is closed until the trigger is clicked', () => {
    render(<Default />)
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('opens on trigger click and shows its content', async () => {
    const user = userEvent.setup()
    render(<Default />)
    await user.click(screen.getByRole('button', { name: 'Open menu' }))
    expect(await screen.findByRole('menu')).toBeInTheDocument()
    expect(screen.getByText('My Account')).toBeInTheDocument()
    expect(
      screen.getByRole('menuitem', { name: /Profile/ }),
    ).toBeInTheDocument()
  })

  it('closes when Escape is pressed', async () => {
    const user = userEvent.setup()
    render(<Default />)
    await user.click(screen.getByRole('button', { name: 'Open menu' }))
    expect(await screen.findByRole('menu')).toBeInTheDocument()
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('toggles the checkbox item state on click', async () => {
    const user = userEvent.setup()
    render(<Default />)
    await user.click(screen.getByRole('button', { name: 'Open menu' }))
    const statusBarItem = await screen.findByRole('menuitemcheckbox', {
      name: 'Show status bar',
    })
    const activityLogItem = screen.getByRole('menuitemcheckbox', {
      name: 'Show activity log',
    })
    expect(statusBarItem).toHaveAttribute('aria-checked', 'true')
    expect(activityLogItem).toHaveAttribute('aria-checked', 'false')
    await user.click(activityLogItem)
    expect(
      screen.getByRole('menuitemcheckbox', { name: 'Show activity log' }),
    ).toHaveAttribute('aria-checked', 'true')
  })

  it('closes when an item is clicked', async () => {
    const user = userEvent.setup()
    render(<Default />)
    await user.click(screen.getByRole('button', { name: 'Open menu' }))
    const profileItem = await screen.findByRole('menuitem', { name: /Profile/ })
    await user.click(profileItem)
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })
})

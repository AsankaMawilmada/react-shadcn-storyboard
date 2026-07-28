import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { composeStories } from '@storybook/react'
import * as stories from './select.stories'

const { Default } = composeStories(stories)

describe('Select', () => {
  it('is closed until the trigger is clicked', () => {
    render(<Default />)
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('shows the default value on the trigger', () => {
    render(<Default />)
    expect(screen.getByRole('combobox')).toHaveTextContent('apple')
  })

  it('opens on trigger click and shows its options', async () => {
    const user = userEvent.setup()
    render(<Default />)
    await user.click(screen.getByRole('combobox'))
    expect(await screen.findByRole('listbox')).toBeInTheDocument()
    expect(screen.getByText('Fruits')).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Banana' })).toBeInTheDocument()
  })

  it('closes when Escape is pressed', async () => {
    const user = userEvent.setup()
    render(<Default />)
    await user.click(screen.getByRole('combobox'))
    expect(await screen.findByRole('listbox')).toBeInTheDocument()
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('selects an item and updates the trigger value', async () => {
    const user = userEvent.setup()
    render(<Default />)
    await user.click(screen.getByRole('combobox'))
    const bananaOption = await screen.findByRole('option', { name: 'Banana' })
    await user.click(bananaOption)
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    expect(screen.getByRole('combobox')).toHaveTextContent('banana')
  })
})

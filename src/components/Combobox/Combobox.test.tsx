import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { composeStories } from '@storybook/react'
import * as stories from './Combobox.stories'

const { Default } = composeStories(stories)

describe('Combobox', () => {
  it('is closed until the input is interacted with', () => {
    render(<Default />)
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('opens on input click and shows its options', async () => {
    const user = userEvent.setup()
    render(<Default />)
    await user.click(screen.getByPlaceholderText('Search framework...'))
    expect(await screen.findByRole('listbox')).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'React' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Vue' })).toBeInTheDocument()
  })

  it('filters options as the user types', async () => {
    const user = userEvent.setup()
    render(<Default />)
    const input = screen.getByPlaceholderText('Search framework...')
    await user.click(input)
    await screen.findByRole('listbox')
    await user.type(input, 'Vue')
    expect(screen.getByRole('option', { name: 'Vue' })).toBeInTheDocument()
    expect(
      screen.queryByRole('option', { name: 'React' }),
    ).not.toBeInTheDocument()
  })

  it('shows the empty state when there are no matches', async () => {
    const user = userEvent.setup()
    render(<Default />)
    const input = screen.getByPlaceholderText('Search framework...')
    await user.click(input)
    await screen.findByRole('listbox')
    await user.type(input, 'nonexistent-framework')
    expect(await screen.findByText('No results found.')).toBeInTheDocument()
  })

  it('closes when Escape is pressed', async () => {
    const user = userEvent.setup()
    render(<Default />)
    const input = screen.getByPlaceholderText('Search framework...')
    await user.click(input)
    expect(await screen.findByRole('listbox')).toBeInTheDocument()
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })
})

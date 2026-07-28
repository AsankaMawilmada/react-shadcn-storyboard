import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { composeStories } from '@storybook/react'
import * as stories from './command.stories'

const { Default } = composeStories(stories)

describe('Command', () => {
  it('renders all items initially', () => {
    render(<Default />)
    expect(screen.getByText('Calendar')).toBeInTheDocument()
    expect(screen.getByText('Search Emoji')).toBeInTheDocument()
    expect(screen.getByText('Calculator')).toBeInTheDocument()
  })

  it('filters items as the user types', async () => {
    const user = userEvent.setup()
    render(<Default />)
    const input = screen.getByPlaceholderText('Type a command or search...')
    await user.type(input, 'Calc')
    expect(screen.getByText('Calculator')).toBeInTheDocument()
    expect(screen.queryByText('Calendar')).not.toBeInTheDocument()
    expect(screen.queryByText('Search Emoji')).not.toBeInTheDocument()
  })

  it('shows the empty state when nothing matches', async () => {
    const user = userEvent.setup()
    render(<Default />)
    const input = screen.getByPlaceholderText('Type a command or search...')
    await user.type(input, 'nonexistent-query')
    expect(screen.getByText('No results found.')).toBeInTheDocument()
    expect(screen.queryByText('Calendar')).not.toBeInTheDocument()
  })
})

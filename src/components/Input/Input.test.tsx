import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { composeStories } from '@storybook/react'
import * as stories from './Input.stories'

const { Default, Disabled } = composeStories(stories)

describe('Input', () => {
  it('renders with its placeholder', () => {
    render(<Default />)
    expect(screen.getByPlaceholderText('Enter text...')).toBeInTheDocument()
  })

  it('accepts typed text', async () => {
    const user = userEvent.setup()
    render(<Default />)
    const input = screen.getByPlaceholderText('Enter text...')
    await user.type(input, 'hello world')
    expect(input).toHaveValue('hello world')
  })

  it('is disabled and shows its value when disabled', () => {
    render(<Disabled />)
    const input = screen.getByDisplayValue('Disabled value')
    expect(input).toBeDisabled()
  })

  it('does not accept input while disabled', async () => {
    const user = userEvent.setup()
    render(<Disabled />)
    const input = screen.getByDisplayValue('Disabled value')
    await user.type(input, 'more text')
    expect(input).toHaveValue('Disabled value')
  })
})

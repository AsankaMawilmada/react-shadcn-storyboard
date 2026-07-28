import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { composeStories } from '@storybook/react'
import * as stories from './textarea.stories'

const { Default, Disabled } = composeStories(stories)

describe('Textarea', () => {
  it('renders with its placeholder', () => {
    render(<Default />)
    expect(
      screen.getByPlaceholderText('Type your message...'),
    ).toBeInTheDocument()
  })

  it('accepts typed multi-line text', async () => {
    const user = userEvent.setup()
    render(<Default />)
    const textarea = screen.getByPlaceholderText('Type your message...')
    await user.type(textarea, 'line one{enter}line two')
    expect(textarea).toHaveValue('line one\nline two')
  })

  it('is disabled and shows its value when disabled', () => {
    render(<Disabled />)
    const textarea = screen.getByDisplayValue('Disabled value')
    expect(textarea).toBeDisabled()
  })

  it('does not accept input while disabled', async () => {
    const user = userEvent.setup()
    render(<Disabled />)
    const textarea = screen.getByDisplayValue('Disabled value')
    await user.type(textarea, 'more text')
    expect(textarea).toHaveValue('Disabled value')
  })
})

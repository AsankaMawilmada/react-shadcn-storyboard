import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { composeStories } from '@storybook/react'
import * as stories from './form.stories'

const { Default } = composeStories(stories)

describe('Form', () => {
  it('renders the label, description, and control', () => {
    render(<Default />)
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(
      screen.getByText("We'll never share your email."),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()
  })

  it('associates the label with its control via FormLabel/FormControl', () => {
    render(<Default />)
    const input = screen.getByLabelText('Email')
    expect(input).toBeInTheDocument()
    expect(input.tagName).toBe('INPUT')
  })

  it('calls onFormSubmit with the entered values when submitted', async () => {
    const user = userEvent.setup()
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    render(<Default />)
    const input = screen.getByLabelText('Email')
    await user.type(input, 'jane@example.com')
    await user.click(screen.getByRole('button', { name: 'Submit' }))
    expect(logSpy).toHaveBeenCalledWith(
      expect.objectContaining({ email: 'jane@example.com' }),
    )
    logSpy.mockRestore()
  })
})

import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { composeStories } from '@storybook/react'
import * as stories from './toggle.stories'

const { Default, Disabled } = composeStories(stories)

describe('Toggle', () => {
  it('starts unpressed and toggles on click', async () => {
    const user = userEvent.setup()
    render(<Default />)
    const toggle = screen.getByRole('button', { name: 'Toggle bold' })
    expect(toggle).toHaveAttribute('aria-pressed', 'false')
    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-pressed', 'true')
  })

  it('toggles back off on a second click', async () => {
    const user = userEvent.setup()
    render(<Default />)
    const toggle = screen.getByRole('button', { name: 'Toggle bold' })
    await user.click(toggle)
    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-pressed', 'false')
  })

  it('cannot be toggled while disabled', async () => {
    const user = userEvent.setup()
    render(<Disabled />)
    const toggle = screen.getByRole('button', { name: 'Toggle bold' })
    // Toggle renders a real <button>, so toBeDisabled() works here (unlike
    // the span-based Checkbox/Switch/Radio primitives).
    expect(toggle).toBeDisabled()
    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-pressed', 'false')
  })
})

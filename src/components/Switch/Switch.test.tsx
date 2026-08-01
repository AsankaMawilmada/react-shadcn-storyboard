import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { composeStories } from '@storybook/react'
import * as stories from './Switch.stories'

const { Default, Checked, Disabled } = composeStories(stories)

describe('Switch', () => {
  it('starts unchecked and toggles on click', async () => {
    const user = userEvent.setup()
    render(<Default />)
    const switchEl = screen.getByRole('switch')
    expect(switchEl).not.toBeChecked()
    await user.click(switchEl)
    expect(switchEl).toBeChecked()
  })

  it('toggles when its label is clicked', async () => {
    const user = userEvent.setup()
    render(<Default />)
    await user.click(screen.getByText('Airplane mode'))
    expect(screen.getByRole('switch')).toBeChecked()
  })

  it('renders checked by default', () => {
    render(<Checked />)
    expect(screen.getByRole('switch')).toBeChecked()
  })

  it('cannot be toggled while disabled', async () => {
    const user = userEvent.setup()
    render(<Disabled />)
    const switchEl = screen.getByRole('switch')
    // Base UI's Switch renders a <button role="switch">, but disabled
    // state is still surfaced as aria-disabled rather than being reliably
    // reflected by toBeDisabled() across Base UI versions, so check aria.
    expect(switchEl).toHaveAttribute('aria-disabled', 'true')
    await user.click(switchEl)
    expect(switchEl).not.toBeChecked()
  })
})

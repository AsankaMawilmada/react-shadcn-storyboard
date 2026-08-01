import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { composeStories } from '@storybook/react'
import * as stories from './Checkbox.stories'

const { Default, Checked, Disabled } = composeStories(stories)

describe('Checkbox', () => {
  it('starts unchecked and toggles on click', async () => {
    const user = userEvent.setup()
    render(<Default />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
    await user.click(checkbox)
    expect(checkbox).toBeChecked()
  })

  it('toggles when its label is clicked', async () => {
    const user = userEvent.setup()
    render(<Default />)
    await user.click(screen.getByText('Accept terms and conditions'))
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('renders checked by default', () => {
    render(<Checked />)
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('cannot be toggled while disabled', async () => {
    const user = userEvent.setup()
    render(<Disabled />)
    const checkbox = screen.getByRole('checkbox')
    // Base UI's Checkbox renders a <span role="checkbox">, not a native
    // disableable form element, so it's marked via aria-disabled rather
    // than the DOM `disabled` property that toBeDisabled() checks for.
    expect(checkbox).toHaveAttribute('aria-disabled', 'true')
    await user.click(checkbox)
    expect(checkbox).not.toBeChecked()
  })
})

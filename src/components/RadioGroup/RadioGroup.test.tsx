import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { composeStories } from '@storybook/react'
import * as stories from './RadioGroup.stories'

const { Default, Disabled } = composeStories(stories)

describe('RadioGroup', () => {
  it('starts with the default value checked', () => {
    render(<Default />)
    expect(screen.getByRole('radio', { name: 'Default' })).not.toBeChecked()
    expect(screen.getByRole('radio', { name: 'Comfortable' })).toBeChecked()
    expect(screen.getByRole('radio', { name: 'Compact' })).not.toBeChecked()
  })

  it('checks the clicked item and unchecks the previously-checked one', async () => {
    const user = userEvent.setup()
    render(<Default />)
    const compact = screen.getByRole('radio', { name: 'Compact' })
    const comfortable = screen.getByRole('radio', { name: 'Comfortable' })
    await user.click(compact)
    expect(compact).toBeChecked()
    expect(comfortable).not.toBeChecked()
  })

  it('cannot be checked while disabled', async () => {
    const user = userEvent.setup()
    render(<Disabled />)
    const defaultRadio = screen.getByRole('radio', { name: 'Default' })
    // Base UI's Radio renders a <span role="radio">, not a native input, so
    // disabled state is exposed via aria-disabled rather than toBeDisabled().
    expect(defaultRadio).toHaveAttribute('aria-disabled', 'true')
    await user.click(defaultRadio)
    expect(defaultRadio).not.toBeChecked()
  })
})

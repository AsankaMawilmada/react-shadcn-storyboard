import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { composeStories } from '@storybook/react'
import * as stories from './Tabs.stories'

const { Default } = composeStories(stories)

describe('Tabs', () => {
  it('starts on the default tab and shows its panel', () => {
    render(<Default />)
    expect(screen.getByRole('tab', { name: 'Account' })).toHaveAttribute(
      'aria-selected',
      'true',
    )
    expect(screen.getByRole('tab', { name: 'Password' })).toHaveAttribute(
      'aria-selected',
      'false',
    )
    expect(
      screen.getByText('Make changes to your account here.'),
    ).toBeInTheDocument()
  })

  it('selects the clicked tab and shows its panel', async () => {
    const user = userEvent.setup()
    render(<Default />)
    await user.click(screen.getByRole('tab', { name: 'Password' }))
    expect(screen.getByRole('tab', { name: 'Password' })).toHaveAttribute(
      'aria-selected',
      'true',
    )
    expect(screen.getByRole('tab', { name: 'Account' })).toHaveAttribute(
      'aria-selected',
      'false',
    )

    const passwordPanel = screen.getByRole('tabpanel')
    expect(passwordPanel).toHaveTextContent('Change your password here.')
  })
})

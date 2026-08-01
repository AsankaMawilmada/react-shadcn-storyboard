import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { composeStories } from '@storybook/react'
import * as stories from './Accordion.stories'

const { Default } = composeStories(stories)

describe('Accordion', () => {
  it('starts with the default item expanded and others collapsed', () => {
    render(<Default />)
    expect(
      screen.getByRole('button', { name: 'Is it accessible?' }),
    ).toHaveAttribute('aria-expanded', 'true')
    expect(
      screen.getByRole('button', { name: 'Is it styled?' }),
    ).toHaveAttribute('aria-expanded', 'false')
  })

  it('expands a collapsed item on click', async () => {
    const user = userEvent.setup()
    render(<Default />)
    const styledTrigger = screen.getByRole('button', { name: 'Is it styled?' })
    await user.click(styledTrigger)
    expect(styledTrigger).toHaveAttribute('aria-expanded', 'true')
  })

  it('collapses an expanded item on click', async () => {
    const user = userEvent.setup()
    render(<Default />)
    const accessibleTrigger = screen.getByRole('button', {
      name: 'Is it accessible?',
    })
    expect(accessibleTrigger).toHaveAttribute('aria-expanded', 'true')
    await user.click(accessibleTrigger)
    expect(accessibleTrigger).toHaveAttribute('aria-expanded', 'false')
  })
})

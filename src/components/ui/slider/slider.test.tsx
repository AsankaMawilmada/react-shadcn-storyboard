import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { composeStories } from '@storybook/react'
import * as stories from './slider.stories'

const { Default } = composeStories(stories)

describe('Slider', () => {
  it('renders a thumb with the default value', () => {
    render(<Default />)
    const thumb = screen.getByRole('slider')
    expect(thumb).toHaveAttribute('aria-valuenow', '50')
  })

  it('increases the value when the thumb is focused and ArrowRight is pressed', async () => {
    const user = userEvent.setup()
    render(<Default />)
    const thumb = screen.getByRole('slider')
    thumb.focus()
    await user.keyboard('{ArrowRight}')
    const valueNow = Number(thumb.getAttribute('aria-valuenow'))
    expect(valueNow).toBeGreaterThan(50)
  })

  it('decreases the value when ArrowLeft is pressed', async () => {
    const user = userEvent.setup()
    render(<Default />)
    const thumb = screen.getByRole('slider')
    thumb.focus()
    await user.keyboard('{ArrowLeft}')
    const valueNow = Number(thumb.getAttribute('aria-valuenow'))
    expect(valueNow).toBeLessThan(50)
  })
})

import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { composeStories } from '@storybook/react'
import * as stories from './button.stories'

const { Default, Disabled, IconLeft, IconRight, IconOnly } = composeStories(stories)

describe('Button', () => {
  it('renders', () => {
    render(<Default />)
    expect(screen.getByRole('button', { name: 'Button' })).toBeInTheDocument()
  })

  it('fires onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Default onClick={onClick} />)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('does not fire onClick while disabled', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Disabled onClick={onClick} />)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    await user.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('renders an icon before the label', () => {
    render(<IconLeft />)
    expect(screen.getByRole('button', { name: /login with email/i })).toBeInTheDocument()
  })

  it('renders an icon after the label', () => {
    render(<IconRight />)
    expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument()
  })

  it('renders icon-only buttons at every size', () => {
    render(<IconOnly />)
    expect(screen.getAllByRole('button', { name: 'Send email' })).toHaveLength(2)
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument()
  })
})

import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { composeStories } from '@storybook/react'
import * as stories from './Card.stories'

const { Default } = composeStories(stories)

describe('Card', () => {
  it('renders the title and description', () => {
    render(<Default />)
    expect(
      screen.getByRole('heading', { name: 'Create project' }),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Deploy your new project in one click.'),
    ).toBeInTheDocument()
  })

  it('renders the content', () => {
    render(<Default />)
    expect(screen.getByText('Project details go here.')).toBeInTheDocument()
  })

  it('renders footer buttons that are clickable', async () => {
    const user = userEvent.setup()
    render(<Default />)
    const cancel = screen.getByRole('button', { name: 'Cancel' })
    const deploy = screen.getByRole('button', { name: 'Deploy' })
    expect(cancel).toBeInTheDocument()
    expect(deploy).toBeInTheDocument()

    const onClick = vi.fn()
    cancel.addEventListener('click', onClick)
    await user.click(cancel)
    expect(onClick).toHaveBeenCalledOnce()
  })
})

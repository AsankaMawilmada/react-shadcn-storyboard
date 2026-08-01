import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/react'
import * as stories from './Avatar.stories'

const { Default, WithFallback } = composeStories(stories)

describe('Avatar', () => {
  // jsdom never actually fetches images, so the underlying <img> never fires
  // a real load/error event and Base UI's Avatar never reaches the "loaded"
  // status. That means AvatarImage never mounts and AvatarFallback renders
  // immediately and stays visible — verified by inspecting the rendered DOM.
  it('renders the fallback text since jsdom never loads the image', () => {
    render(<Default />)
    expect(screen.getByText('SC')).toBeInTheDocument()
    expect(
      screen.queryByRole('img', { name: '@shadcn' }),
    ).not.toBeInTheDocument()
  })

  it('renders the fallback for a broken image source', () => {
    render(<WithFallback />)
    expect(screen.getByText('JD')).toBeInTheDocument()
    expect(
      screen.queryByRole('img', { name: 'Jane Doe' }),
    ).not.toBeInTheDocument()
  })
})

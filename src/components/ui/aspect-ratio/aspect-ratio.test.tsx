import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/react'
import * as stories from './aspect-ratio.stories'

const { Default } = composeStories(stories)

describe('AspectRatio', () => {
  it('wraps its child image and applies the aspect-ratio style', () => {
    const { container } = render(<Default />)
    const image = screen.getByRole('img', { name: 'Landscape' })
    expect(image).toBeInTheDocument()

    const wrapper = container.querySelector('.relative.w-full')
    expect(wrapper).not.toBeNull()
    expect(wrapper).toHaveStyle({ aspectRatio: '1.7777777777777777' })
    expect(wrapper).toContainElement(image)
  })
})

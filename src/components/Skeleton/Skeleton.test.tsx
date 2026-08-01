import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { composeStories } from '@storybook/react'
import * as stories from './Skeleton.stories'

const { Default } = composeStories(stories)

describe('Skeleton', () => {
  it('renders pulsing placeholder blocks', () => {
    const { container } = render(<Default />)
    const skeletons = container.querySelectorAll('.animate-pulse')
    expect(skeletons).toHaveLength(3)
    skeletons.forEach((skeleton) => {
      expect(skeleton.tagName).toBe('DIV')
      expect(skeleton).toHaveClass('bg-muted')
    })
    // First skeleton is the round avatar placeholder; the other two are text lines.
    expect(skeletons[0]).toHaveClass('rounded-full')
    expect(skeletons[1]).toHaveClass('rounded-md')
    expect(skeletons[2]).toHaveClass('rounded-md')
  })
})

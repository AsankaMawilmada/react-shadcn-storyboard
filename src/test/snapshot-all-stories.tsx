import type { ComponentType } from 'react'
import { expect, it } from 'vitest'
import { render } from '@testing-library/react'

/**
 * Registers one `it(...).toMatchSnapshot()` per composed story, so every
 * variant/size a component exposes gets a regression snapshot without
 * having to name them by hand (and without missing new ones later).
 */
export const snapshotAllStories = (stories: Record<string, ComponentType>) => {
  for (const [name, Story] of Object.entries(stories)) {
    it(`matches snapshot: ${name}`, () => {
      const { container } = render(<Story />)
      expect(container).toMatchSnapshot()
    })
  }
}

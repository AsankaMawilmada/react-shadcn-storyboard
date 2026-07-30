import { describe } from 'vitest'
import { composeStories } from '@storybook/react'
import { snapshotAllStories } from '@/test/snapshot-all-stories'
import * as stories from './hoverCard.stories'

describe('HoverCard snapshots', () => {
  snapshotAllStories(composeStories(stories))
})

import { describe } from 'vitest'
import { composeStories } from '@storybook/react'
import { snapshotAllStories } from '@/test/snapshot-all-stories'
import * as stories from './aspect-ratio.stories'

describe('AspectRatio snapshots', () => {
  snapshotAllStories(composeStories(stories))
})

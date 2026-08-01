import { describe } from 'vitest'
import { composeStories } from '@storybook/react'
import { snapshotAllStories } from '@/test/snapshot-all-stories'
import * as stories from './Toggle.stories'

describe('Toggle snapshots', () => {
  snapshotAllStories(composeStories(stories))
})

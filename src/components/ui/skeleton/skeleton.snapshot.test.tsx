import { describe } from 'vitest'
import { composeStories } from '@storybook/react'
import { snapshotAllStories } from '@/test/snapshot-all-stories'
import * as stories from './skeleton.stories'

describe('Skeleton snapshots', () => {
  snapshotAllStories(composeStories(stories))
})

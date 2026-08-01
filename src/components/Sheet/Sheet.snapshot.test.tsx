import { describe } from 'vitest'
import { composeStories } from '@storybook/react'
import { snapshotAllStories } from '@/test/snapshot-all-stories'
import * as stories from './Sheet.stories'

describe('Sheet snapshots', () => {
  snapshotAllStories(composeStories(stories))
})

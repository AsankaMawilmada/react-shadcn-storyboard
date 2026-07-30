import { describe } from 'vitest'
import { composeStories } from '@storybook/react'
import { snapshotAllStories } from '@/test/snapshot-all-stories'
import * as stories from './scrollArea.stories'

describe('ScrollArea snapshots', () => {
  snapshotAllStories(composeStories(stories))
})

import { describe } from 'vitest'
import { composeStories } from '@storybook/react'
import { snapshotAllStories } from '@/test/snapshot-all-stories'
import * as stories from './sheet.stories'

describe('Sheet snapshots', () => {
  snapshotAllStories(composeStories(stories))
})

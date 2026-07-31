import { describe } from 'vitest'
import { composeStories } from '@storybook/react'
import { snapshotAllStories } from '@/test/snapshot-all-stories'
import * as stories from './table.stories'

describe('Table snapshots', () => {
  snapshotAllStories(composeStories(stories))
})

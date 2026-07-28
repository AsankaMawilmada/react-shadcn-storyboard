import { describe } from 'vitest'
import { composeStories } from '@storybook/react'
import { snapshotAllStories } from '@/test/snapshot-all-stories'
import * as stories from './pagination.stories'

describe('Pagination snapshots', () => {
  snapshotAllStories(composeStories(stories))
})

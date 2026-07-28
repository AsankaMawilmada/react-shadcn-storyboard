import { describe } from 'vitest'
import { composeStories } from '@storybook/react'
import { snapshotAllStories } from '@/test/snapshot-all-stories'
import * as stories from './switch.stories'

describe('Switch snapshots', () => {
  snapshotAllStories(composeStories(stories))
})

import { describe } from 'vitest'
import { composeStories } from '@storybook/react'
import { snapshotAllStories } from '@/test/snapshot-all-stories'
import * as stories from './typography.stories'

describe('Typography snapshots', () => {
  snapshotAllStories(composeStories(stories))
})

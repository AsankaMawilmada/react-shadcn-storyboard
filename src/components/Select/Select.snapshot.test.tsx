import { describe } from 'vitest'
import { composeStories } from '@storybook/react'
import { snapshotAllStories } from '@/test/snapshot-all-stories'
import * as stories from './Select.stories'

describe('Select snapshots', () => {
  snapshotAllStories(composeStories(stories))
})

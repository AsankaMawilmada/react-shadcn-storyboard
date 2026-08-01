import { describe } from 'vitest'
import { composeStories } from '@storybook/react'
import { snapshotAllStories } from '@/test/snapshot-all-stories'
import * as stories from './Tabs.stories'

describe('Tabs snapshots', () => {
  snapshotAllStories(composeStories(stories))
})

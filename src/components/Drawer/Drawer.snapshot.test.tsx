import { describe } from 'vitest'
import { composeStories } from '@storybook/react'
import { snapshotAllStories } from '@/test/snapshot-all-stories'
import * as stories from './drawer.stories'

describe('Drawer snapshots', () => {
  snapshotAllStories(composeStories(stories))
})

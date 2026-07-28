import { describe } from 'vitest'
import { composeStories } from '@storybook/react'
import { snapshotAllStories } from '@/test/snapshot-all-stories'
import * as stories from './menubar.stories'

describe('Menubar snapshots', () => {
  snapshotAllStories(composeStories(stories))
})

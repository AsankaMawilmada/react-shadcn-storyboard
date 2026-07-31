import { describe } from 'vitest'
import { composeStories } from '@storybook/react'
import { snapshotAllStories } from '@/test/snapshot-all-stories'
import * as stories from './dialog.stories'

describe('Dialog snapshots', () => {
  snapshotAllStories(composeStories(stories))
})

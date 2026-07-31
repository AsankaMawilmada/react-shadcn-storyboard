import { describe } from 'vitest'
import { composeStories } from '@storybook/react'
import { snapshotAllStories } from '@/test/snapshot-all-stories'
import * as stories from './separator.stories'

describe('Separator snapshots', () => {
  snapshotAllStories(composeStories(stories))
})

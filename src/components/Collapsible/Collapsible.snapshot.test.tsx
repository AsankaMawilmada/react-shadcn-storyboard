import { describe } from 'vitest'
import { composeStories } from '@storybook/react'
import { snapshotAllStories } from '@/test/snapshot-all-stories'
import * as stories from './Collapsible.stories'

describe('Collapsible snapshots', () => {
  snapshotAllStories(composeStories(stories))
})

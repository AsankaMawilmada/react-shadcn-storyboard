import { describe } from 'vitest'
import { composeStories } from '@storybook/react'
import { snapshotAllStories } from '@/test/snapshot-all-stories'
import * as stories from './checkbox.stories'

describe('Checkbox snapshots', () => {
  snapshotAllStories(composeStories(stories))
})

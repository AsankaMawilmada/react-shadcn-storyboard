import { describe } from 'vitest'
import { composeStories } from '@storybook/react'
import { snapshotAllStories } from '@/test/snapshot-all-stories'
import * as stories from './radio-group.stories'

describe('RadioGroup snapshots', () => {
  snapshotAllStories(composeStories(stories))
})

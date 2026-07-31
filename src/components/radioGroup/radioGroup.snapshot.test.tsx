import { describe } from 'vitest'
import { composeStories } from '@storybook/react'
import { snapshotAllStories } from '@/test/snapshot-all-stories'
import * as stories from './radioGroup.stories'

describe('RadioGroup snapshots', () => {
  snapshotAllStories(composeStories(stories))
})

import { describe } from 'vitest'
import { composeStories } from '@storybook/react'
import { snapshotAllStories } from '@/test/snapshot-all-stories'
import * as stories from './toggleGroup.stories'

describe('ToggleGroup snapshots', () => {
  snapshotAllStories(composeStories(stories))
})

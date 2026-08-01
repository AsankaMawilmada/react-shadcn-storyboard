import { describe } from 'vitest'
import { composeStories } from '@storybook/react'
import { snapshotAllStories } from '@/test/snapshot-all-stories'
import * as stories from './Checkbox.stories'

describe('Checkbox snapshots', () => {
  snapshotAllStories(composeStories(stories))
})

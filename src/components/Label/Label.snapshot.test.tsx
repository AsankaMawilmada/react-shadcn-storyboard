import { describe } from 'vitest'
import { composeStories } from '@storybook/react'
import { snapshotAllStories } from '@/test/snapshot-all-stories'
import * as stories from './label.stories'

describe('Label snapshots', () => {
  snapshotAllStories(composeStories(stories))
})

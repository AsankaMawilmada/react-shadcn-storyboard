import { describe } from 'vitest'
import { composeStories } from '@storybook/react'
import { snapshotAllStories } from '@/test/snapshot-all-stories'
import * as stories from './icon.stories'

describe('Icons snapshots', () => {
  snapshotAllStories(composeStories(stories))
})

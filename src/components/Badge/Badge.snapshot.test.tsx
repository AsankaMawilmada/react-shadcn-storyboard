import { describe } from 'vitest'
import { composeStories } from '@storybook/react'
import { snapshotAllStories } from '@/test/snapshot-all-stories'
import * as stories from './Badge.stories'

describe('Badge snapshots', () => {
  snapshotAllStories(composeStories(stories))
})

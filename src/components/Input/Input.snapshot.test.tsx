import { describe } from 'vitest'
import { composeStories } from '@storybook/react'
import { snapshotAllStories } from '@/test/snapshot-all-stories'
import * as stories from './Input.stories'

describe('Input snapshots', () => {
  snapshotAllStories(composeStories(stories))
})

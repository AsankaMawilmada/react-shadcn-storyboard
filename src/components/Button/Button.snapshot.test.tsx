import { describe } from 'vitest'
import { composeStories } from '@storybook/react'
import { snapshotAllStories } from '@/test/snapshot-all-stories'
import * as stories from './Button.stories'

describe('Button snapshots', () => {
  snapshotAllStories(composeStories(stories))
})

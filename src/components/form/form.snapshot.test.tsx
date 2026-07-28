import { describe } from 'vitest'
import { composeStories } from '@storybook/react'
import { snapshotAllStories } from '@/test/snapshot-all-stories'
import * as stories from './form.stories'

describe('Form snapshots', () => {
  snapshotAllStories(composeStories(stories))
})

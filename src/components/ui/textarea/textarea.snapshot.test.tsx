import { describe } from 'vitest'
import { composeStories } from '@storybook/react'
import { snapshotAllStories } from '@/test/snapshot-all-stories'
import * as stories from './textarea.stories'

describe('Textarea snapshots', () => {
  snapshotAllStories(composeStories(stories))
})

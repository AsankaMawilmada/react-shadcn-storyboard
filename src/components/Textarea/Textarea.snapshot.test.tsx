import { describe } from 'vitest'
import { composeStories } from '@storybook/react'
import { snapshotAllStories } from '@/test/snapshot-all-stories'
import * as stories from './Textarea.stories'

describe('Textarea snapshots', () => {
  snapshotAllStories(composeStories(stories))
})

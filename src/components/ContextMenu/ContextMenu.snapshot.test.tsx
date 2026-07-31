import { describe } from 'vitest'
import { composeStories } from '@storybook/react'
import { snapshotAllStories } from '@/test/snapshot-all-stories'
import * as stories from './contextMenu.stories'

describe('ContextMenu snapshots', () => {
  snapshotAllStories(composeStories(stories))
})

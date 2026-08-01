import { describe } from 'vitest'
import { composeStories } from '@storybook/react'
import { snapshotAllStories } from '@/test/snapshot-all-stories'
import * as stories from './Combobox.stories'

describe('Combobox snapshots', () => {
  snapshotAllStories(composeStories(stories))
})

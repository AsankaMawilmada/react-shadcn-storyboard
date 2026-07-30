import { describe } from 'vitest'
import { composeStories } from '@storybook/react'
import { snapshotAllStories } from '@/test/snapshot-all-stories'
import * as stories from './dropdownMenu.stories'

describe('DropdownMenu snapshots', () => {
  snapshotAllStories(composeStories(stories))
})

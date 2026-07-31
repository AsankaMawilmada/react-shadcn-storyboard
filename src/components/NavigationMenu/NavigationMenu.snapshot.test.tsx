import { describe } from 'vitest'
import { composeStories } from '@storybook/react'
import { snapshotAllStories } from '@/test/snapshot-all-stories'
import * as stories from './navigationMenu.stories'

describe('NavigationMenu snapshots', () => {
  snapshotAllStories(composeStories(stories))
})

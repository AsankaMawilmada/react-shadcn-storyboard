import { describe } from 'vitest'
import { composeStories } from '@storybook/react'
import { snapshotAllStories } from '@/test/snapshot-all-stories'
import * as stories from './breadcrumb.stories'

describe('Breadcrumb snapshots', () => {
  snapshotAllStories(composeStories(stories))
})

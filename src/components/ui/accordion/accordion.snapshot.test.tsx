import { describe } from 'vitest'
import { composeStories } from '@storybook/react'
import { snapshotAllStories } from '@/test/snapshot-all-stories'
import * as stories from './accordion.stories'

describe('Accordion snapshots', () => {
  snapshotAllStories(composeStories(stories))
})

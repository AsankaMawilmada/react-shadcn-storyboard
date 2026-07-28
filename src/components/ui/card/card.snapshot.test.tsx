import { describe } from 'vitest'
import { composeStories } from '@storybook/react'
import { snapshotAllStories } from '@/test/snapshot-all-stories'
import * as stories from './card.stories'

describe('Card snapshots', () => {
  snapshotAllStories(composeStories(stories))
})

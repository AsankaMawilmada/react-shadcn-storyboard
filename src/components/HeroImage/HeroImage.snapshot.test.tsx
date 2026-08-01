import { describe } from 'vitest'
import { composeStories } from '@storybook/react'
import { snapshotAllStories } from '@/test/snapshot-all-stories'
import * as stories from './HeroImage.stories'

describe('HeroImage snapshots', () => {
  snapshotAllStories(composeStories(stories))
})

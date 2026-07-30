import { describe } from 'vitest'
import { composeStories } from '@storybook/react'
import { snapshotAllStories } from '@/test/snapshot-all-stories'
import * as stories from './input-field.stories'

describe('InputField snapshots', () => {
  snapshotAllStories(composeStories(stories))
})

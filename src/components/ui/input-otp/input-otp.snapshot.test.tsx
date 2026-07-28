import { describe } from 'vitest'
import { composeStories } from '@storybook/react'
import { snapshotAllStories } from '@/test/snapshot-all-stories'
import * as stories from './input-otp.stories'

describe('InputOTP snapshots', () => {
  snapshotAllStories(composeStories(stories))
})

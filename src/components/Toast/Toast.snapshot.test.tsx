import { describe } from 'vitest';
import { composeStories } from '@storybook/react';
import { snapshotAllStories } from '@/test/snapshot-all-stories';
import * as stories from './Toast.stories';

describe('Toast snapshots', () => {
  snapshotAllStories(composeStories(stories));
});

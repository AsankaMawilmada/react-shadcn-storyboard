import { describe } from 'vitest';
import { composeStories } from '@storybook/react';
import { snapshotAllStories } from '@/test/snapshot-all-stories';
import * as stories from './Skeleton.stories';

describe('Skeleton snapshots', () => {
  snapshotAllStories(composeStories(stories));
});

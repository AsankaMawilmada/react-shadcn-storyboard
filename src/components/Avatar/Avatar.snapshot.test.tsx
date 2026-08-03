import { describe } from 'vitest';
import { composeStories } from '@storybook/react';
import { snapshotAllStories } from '@/test/snapshot-all-stories';
import * as stories from './Avatar.stories';

describe('Avatar snapshots', () => {
  snapshotAllStories(composeStories(stories));
});

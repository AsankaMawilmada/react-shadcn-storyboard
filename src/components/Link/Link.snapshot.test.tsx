import { describe } from 'vitest';
import { composeStories } from '@storybook/react';
import { snapshotAllStories } from '@/test/snapshot-all-stories';
import * as stories from './Link.stories';

describe('Link snapshots', () => {
  snapshotAllStories(composeStories(stories));
});

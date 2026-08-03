import { describe } from 'vitest';
import { composeStories } from '@storybook/react';
import { snapshotAllStories } from '@/test/snapshot-all-stories';
import * as stories from './Tooltip.stories';

describe('Tooltip snapshots', () => {
  snapshotAllStories(composeStories(stories));
});

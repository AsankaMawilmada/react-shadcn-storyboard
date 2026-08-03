import { describe } from 'vitest';
import { composeStories } from '@storybook/react';
import { snapshotAllStories } from '@/test/snapshot-all-stories';
import * as stories from './Popover.stories';

describe('Popover snapshots', () => {
  snapshotAllStories(composeStories(stories));
});

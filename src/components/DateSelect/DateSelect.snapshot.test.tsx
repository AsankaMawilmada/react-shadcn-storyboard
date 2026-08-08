import { describe } from 'vitest';
import { composeStories } from '@storybook/react';
import { snapshotAllStories } from '@/test/snapshot-all-stories';
import * as stories from './DateSelect.stories';

describe('DateSelect snapshots', () => {
  snapshotAllStories(composeStories(stories));
});

import { describe } from 'vitest';
import { composeStories } from '@storybook/react';
import { snapshotAllStories } from '@/test/snapshot-all-stories';
import * as stories from './AlertDialog.stories';

describe('AlertDialog snapshots', () => {
  snapshotAllStories(composeStories(stories));
});

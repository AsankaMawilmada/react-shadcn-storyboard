import { describe } from 'vitest';
import { composeStories } from '@storybook/react';
import { snapshotAllStories } from '@/test/snapshot-all-stories';
import * as stories from './Table.stories';

describe('Table snapshots', () => {
  snapshotAllStories(composeStories(stories));
});

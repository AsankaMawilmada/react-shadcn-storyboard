import { describe } from 'vitest';
import { composeStories } from '@storybook/react';
import { snapshotAllStories } from '@/test/snapshot-all-stories';
import * as stories from './Command.stories';

describe('Command snapshots', () => {
  snapshotAllStories(composeStories(stories));
});

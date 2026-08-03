import { describe } from 'vitest';
import { composeStories } from '@storybook/react';
import { snapshotAllStories } from '@/test/snapshot-all-stories';
import * as stories from './Alert.stories';

describe('Alert snapshots', () => {
  snapshotAllStories(composeStories(stories));
});

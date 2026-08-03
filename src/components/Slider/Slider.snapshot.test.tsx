import { describe } from 'vitest';
import { composeStories } from '@storybook/react';
import { snapshotAllStories } from '@/test/snapshot-all-stories';
import * as stories from './Slider.stories';

describe('Slider snapshots', () => {
  snapshotAllStories(composeStories(stories));
});

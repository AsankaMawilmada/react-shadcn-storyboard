import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import * as stories from './HoverCard.stories';

const { Default } = composeStories(stories);

describe('HoverCard', () => {
  it('is hidden until the trigger is hovered', () => {
    render(<Default />);
    expect(screen.queryByText('Joined December 2021')).not.toBeInTheDocument();
  });

  it('shows its content on hover', async () => {
    const user = userEvent.setup();
    render(<Default />);
    await user.hover(screen.getByRole('button', { name: '@shadcn' }));
    expect(await screen.findByText('Joined December 2021')).toBeInTheDocument();
  });

  it('hides again on unhover', async () => {
    const user = userEvent.setup();
    render(<Default />);
    const trigger = screen.getByRole('button', { name: '@shadcn' });
    await user.hover(trigger);
    expect(await screen.findByText('Joined December 2021')).toBeInTheDocument();
    await user.unhover(trigger);
    await waitFor(() => {
      expect(
        screen.queryByText('Joined December 2021'),
      ).not.toBeInTheDocument();
    });
  });
});

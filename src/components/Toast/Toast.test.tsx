import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import * as stories from './Toast.stories';

const { Default } = composeStories(stories);

describe('Toast', () => {
  it('shows no toast until the trigger is clicked', () => {
    render(<Default />);
    expect(screen.queryByText('Scheduled')).not.toBeInTheDocument();
  });

  it('shows the toast title and description after the trigger is clicked', async () => {
    const user = userEvent.setup();
    render(<Default />);
    await user.click(screen.getByRole('button', { name: 'Add to calendar' }));
    // Toasts are added asynchronously via the toast manager, so wait for it.
    expect(await screen.findByText('Scheduled')).toBeInTheDocument();
    expect(
      screen.getByText('Your meeting has been scheduled.'),
    ).toBeInTheDocument();
  });

  it('closes the toast when its close button is clicked', async () => {
    const user = userEvent.setup();
    render(<Default />);
    await user.click(screen.getByRole('button', { name: 'Add to calendar' }));
    await screen.findByText('Scheduled');
    // The close button's accessible name comes from a visually-hidden
    // "Close" span, but the button itself is aria-hidden (its icon is
    // decorative), so it's not exposed via getByRole — find it by text.
    const closeButton = screen.getByText('Close').closest('button');
    if (!closeButton) throw new Error('Close button not found');
    await user.click(closeButton);
    expect(screen.queryByText('Scheduled')).not.toBeInTheDocument();
  });
});

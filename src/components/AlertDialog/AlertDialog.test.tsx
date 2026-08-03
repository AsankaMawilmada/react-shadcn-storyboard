import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import * as stories from './AlertDialog.stories';

const { Default } = composeStories(stories);

describe('AlertDialog', () => {
  it('is closed until the trigger is clicked', () => {
    render(<Default />);
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
  });

  it('opens on trigger click and shows its content', async () => {
    const user = userEvent.setup();
    render(<Default />);
    await user.click(screen.getByRole('button', { name: 'Delete account' }));
    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
    expect(screen.getByText('Are you absolutely sure?')).toBeInTheDocument();
  });

  it('closes when Cancel is clicked', async () => {
    const user = userEvent.setup();
    render(<Default />);
    await user.click(screen.getByRole('button', { name: 'Delete account' }));
    await user.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
  });

  it('closes when Continue (action) is clicked', async () => {
    const user = userEvent.setup();
    render(<Default />);
    await user.click(screen.getByRole('button', { name: 'Delete account' }));
    await user.click(screen.getByRole('button', { name: 'Continue' }));
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
  });
});

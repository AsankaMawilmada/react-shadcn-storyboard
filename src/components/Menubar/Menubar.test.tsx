import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import * as stories from './Menubar.stories';

const { Default } = composeStories(stories);

describe('Menubar', () => {
  it('does not show menu content until a trigger is clicked', () => {
    render(<Default />);
    expect(screen.queryByText('New Tab')).not.toBeInTheDocument();
  });

  it('opens a menu on trigger click and shows its content', async () => {
    const user = userEvent.setup();
    render(<Default />);
    await user.click(screen.getByRole('menuitem', { name: 'File' }));
    expect(await screen.findByText('New Tab')).toBeInTheDocument();
    expect(screen.getByText('Share')).toBeInTheDocument();
  });

  it('shows a different menu when switching triggers', async () => {
    const user = userEvent.setup();
    render(<Default />);
    await user.click(screen.getByRole('menuitem', { name: 'Edit' }));
    expect(await screen.findByText('Undo')).toBeInTheDocument();
    expect(screen.getByText('Cut')).toBeInTheDocument();
  });
});

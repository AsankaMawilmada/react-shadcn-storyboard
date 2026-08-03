import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import * as stories from './Collapsible.stories';

const { Default } = composeStories(stories);

describe('Collapsible', () => {
  it('starts closed', () => {
    render(<Default />);
    expect(screen.getByRole('button', { name: 'Toggle' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('opens on trigger click', async () => {
    const user = userEvent.setup();
    render(<Default />);
    const trigger = screen.getByRole('button', { name: 'Toggle' });
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('closes again on a second click', async () => {
    const user = userEvent.setup();
    render(<Default />);
    const trigger = screen.getByRole('button', { name: 'Toggle' });
    await user.click(trigger);
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });
});

import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import * as stories from './ToggleGroup.stories';

const { Default } = composeStories(stories);

describe('ToggleGroup', () => {
  it('starts with the default item pressed and others unpressed', () => {
    render(<Default />);
    expect(screen.getByRole('button', { name: 'Toggle bold' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(
      screen.getByRole('button', { name: 'Toggle italic' }),
    ).toHaveAttribute('aria-pressed', 'false');
    expect(
      screen.getByRole('button', { name: 'Toggle underline' }),
    ).toHaveAttribute('aria-pressed', 'false');
  });

  it('allows multiple items to be pressed independently', async () => {
    const user = userEvent.setup();
    render(<Default />);
    const italic = screen.getByRole('button', { name: 'Toggle italic' });
    await user.click(italic);
    expect(italic).toHaveAttribute('aria-pressed', 'true');
    // The bold item, pressed by default, stays pressed since this group allows multiple.
    expect(screen.getByRole('button', { name: 'Toggle bold' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('unpresses an item when clicked again', async () => {
    const user = userEvent.setup();
    render(<Default />);
    const bold = screen.getByRole('button', { name: 'Toggle bold' });
    await user.click(bold);
    expect(bold).toHaveAttribute('aria-pressed', 'false');
  });
});

import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import * as stories from './InputOtp.stories';

const { Default } = composeStories(stories);

describe('InputOTP', () => {
  it('renders one input slot per digit', () => {
    render(<Default />);
    expect(screen.getAllByRole('textbox')).toHaveLength(6);
  });

  it('fills a slot and advances focus to the next slot when typing a digit', async () => {
    const user = userEvent.setup();
    render(<Default />);
    const slots = screen.getAllByRole('textbox');
    await user.click(slots[0]);
    await user.keyboard('1');
    expect(slots[0]).toHaveValue('1');
    expect(slots[0]).toHaveAttribute('data-filled');
    expect(slots[1]).toHaveFocus();
  });

  it('fills subsequent slots as more digits are typed', async () => {
    const user = userEvent.setup();
    render(<Default />);
    const slots = screen.getAllByRole('textbox');
    await user.click(slots[0]);
    await user.keyboard('123');
    expect(slots[0]).toHaveValue('1');
    expect(slots[1]).toHaveValue('2');
    expect(slots[2]).toHaveValue('3');
  });
});

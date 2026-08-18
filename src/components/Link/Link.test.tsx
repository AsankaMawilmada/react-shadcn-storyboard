import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import * as stories from './Link.stories';

const {
  Default,
  Inline,
  Standalone,
  WithLeftIcon,
  WithRightIcon,
  Disabled,
  AsButton,
  DisabledAsButton,
} = composeStories(stories);

describe('Link', () => {
  it('renders an <a> with the given href when href is provided', () => {
    render(<Default />);
    const link = screen.getByRole('link', { name: 'Learn more' });
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '#');
  });

  it('applies underline for the inline variant', () => {
    render(<Inline />);
    expect(screen.getByRole('link')).toHaveClass('underline');
  });

  it('only underlines on hover for the standalone variant', () => {
    render(<Standalone />);
    expect(screen.getByRole('link')).not.toHaveClass('underline');
    expect(screen.getByRole('link')).toHaveClass('hover:underline');
  });

  it('renders a left icon before the children', () => {
    render(<WithLeftIcon />);
    const link = screen.getByRole('link');
    expect(link.firstElementChild?.tagName).toBe('svg');
  });

  it('renders a right icon after the children', () => {
    render(<WithRightIcon />);
    const link = screen.getByRole('link');
    expect(link.lastElementChild?.tagName).toBe('svg');
  });

  it('marks a disabled anchor with aria-disabled and removes it from tab order', () => {
    render(<Disabled />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(link).toHaveAttribute('tabindex', '-1');
  });

  it('blocks navigation (click) on a disabled anchor', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Disabled onClick={onClick} />);
    await user.click(screen.getByRole('link'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('renders a <button type="button"> when href is not provided', () => {
    render(<AsButton />);
    const button = screen.getByRole('button', { name: 'Clear filters' });
    expect(button.tagName).toBe('BUTTON');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('fires onClick when rendered as a button', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<AsButton onClick={onClick} />);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('is natively disabled when rendered as a button', () => {
    render(<DisabledAsButton />);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});

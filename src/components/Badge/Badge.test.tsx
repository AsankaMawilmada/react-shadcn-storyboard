import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './Badge.stories';

const { Default, Secondary, Destructive, Success, Warning, Outline } =
  composeStories(stories);

describe('Badge', () => {
  it('renders the default badge as a span with its text', () => {
    render(<Default />);
    const badge = screen.getByText('Badge');
    expect(badge).toBeInTheDocument();
    expect(badge.tagName).toBe('SPAN');
  });

  it('renders the secondary variant', () => {
    render(<Secondary />);
    expect(screen.getByText('Badge')).toBeInTheDocument();
  });

  it('renders the destructive variant', () => {
    render(<Destructive />);
    expect(screen.getByText('Badge')).toBeInTheDocument();
  });

  it('renders the success variant', () => {
    render(<Success />);
    expect(screen.getByText('Badge')).toBeInTheDocument();
  });

  it('renders the warning variant', () => {
    render(<Warning />);
    expect(screen.getByText('Badge')).toBeInTheDocument();
  });

  it('renders the outline variant', () => {
    render(<Outline />);
    expect(screen.getByText('Badge')).toBeInTheDocument();
  });
});

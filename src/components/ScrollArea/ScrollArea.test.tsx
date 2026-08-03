import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './ScrollArea.stories';

const { Default } = composeStories(stories);

describe('ScrollArea', () => {
  it('renders its heading and all scrollable content', () => {
    render(<Default />);
    expect(screen.getByText('Tags')).toBeInTheDocument();
    expect(screen.getByText('Tag 1')).toBeInTheDocument();
    expect(screen.getByText('Tag 20')).toBeInTheDocument();
  });

  it('renders the viewport wrapping the scrollable content', () => {
    const { container } = render(<Default />);
    // The primitive's Viewport renders a focusable (tabindex="-1"), scrollable
    // container that wraps the content passed as children.
    const viewport = container.querySelector('[tabindex="-1"]');
    expect(viewport).toBeInTheDocument();
    expect(viewport).toContainElement(screen.getByText('Tag 1'));
    expect(viewport).toContainElement(screen.getByText('Tag 20'));
  });

  it('applies the size classes passed via className to the root', () => {
    const { container } = render(<Default />);
    expect(container.firstElementChild).toHaveClass(
      'h-72',
      'w-48',
      'overflow-hidden',
    );
  });
});

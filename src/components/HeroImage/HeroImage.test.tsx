import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './HeroImage.stories';

const { Default, WithoutContent, WithoutOverlay } = composeStories(stories);

describe('HeroImage', () => {
  it('renders the image with the given alt text', () => {
    render(<Default />);
    expect(
      screen.getByRole('img', { name: 'Mountain landscape at sunset' }),
    ).toBeInTheDocument();
  });

  it('renders arbitrary children over the image', () => {
    render(<Default />);
    expect(
      screen.getByRole('heading', { name: 'Explore the highlands' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Guided tours starting every weekend this summer.'),
    ).toBeInTheDocument();
  });

  it('renders no content wrapper when there are no children', () => {
    const { container } = render(<WithoutContent />);
    expect(container.querySelector('.text-white')).not.toBeInTheDocument();
  });

  it('omits the gradient overlay when overlay is false', () => {
    const { container } = render(<WithoutOverlay />);
    expect(
      container.querySelector('[aria-hidden="true"]'),
    ).not.toBeInTheDocument();
  });
});

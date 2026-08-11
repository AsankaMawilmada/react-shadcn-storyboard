import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import { Typography } from './Typography';
import * as stories from './Typography.stories';

const {
  Display1,
  Display2,
  Display3,
  Display4,
  P,
  Blockquote,
  Lead,
  Large,
  Small,
  Muted,
  Link,
  RelaxedLineHeightOverride,
} = composeStories(stories);

describe('Typography', () => {
  it('renders the Display1 variant as a <span>', () => {
    const { container } = render(<Display1 />);
    expect(container.querySelector('span')).toHaveTextContent(
      'Taxing Laughter: The Joke Tax Chronicles',
    );
  });

  it('renders the Display2 variant as a <span>', () => {
    const { container } = render(<Display2 />);
    expect(container.querySelector('span')).toHaveTextContent(
      'The People of the Kingdom',
    );
  });

  it('renders the Display3 variant as a <span>', () => {
    const { container } = render(<Display3 />);
    expect(container.querySelector('span')).toHaveTextContent('The Joke Tax');
  });

  it('renders the Display4 variant as a <span>', () => {
    const { container } = render(<Display4 />);
    expect(container.querySelector('span')).toHaveTextContent(
      'People stopped telling jokes',
    );
  });

  it('renders the p variant as a <span>', () => {
    const { container } = render(<P />);
    expect(container.querySelector('span')).toHaveTextContent(
      'The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax.',
    );
  });

  it('renders the blockquote variant as a <span>', () => {
    const { container } = render(<Blockquote />);
    expect(container.querySelector('span')).toHaveTextContent(
      'After all," he said, "everyone enjoys a good joke, so it\'s only fair that they pay for the privilege.',
    );
  });

  it('renders the lead variant as a <span>', () => {
    const { container } = render(<Lead />);
    expect(container.querySelector('span')).toHaveTextContent(
      'A modal dialog that interrupts the user with important content.',
    );
  });

  it('renders the large variant as a <span>', () => {
    const { container } = render(<Large />);
    expect(container.querySelector('span')).toHaveTextContent(
      'Are you sure absolutely sure?',
    );
  });

  it('renders the small variant as a <span>', () => {
    const { container } = render(<Small />);
    expect(container.querySelector('span')).toHaveTextContent('Email address');
  });

  it('renders the muted variant as a <span>', () => {
    const { container } = render(<Muted />);
    expect(container.querySelector('span')).toHaveTextContent(
      'Enter your email address.',
    );
  });

  it('renders no non-span elements by default, regardless of variant', () => {
    const { container } = render(<Display1 />);
    expect(
      container.querySelector('h1,h2,h3,h4,p,small,blockquote,a'),
    ).toBeNull();
  });

  it('renders the link variant as a real <a> once `as="a"` is passed', () => {
    render(<Link />);
    const link = screen.getByRole('link', { name: 'Read the documentation' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#');
  });

  it("lineHeight overrides the variant's built-in line-height", () => {
    const { container } = render(<RelaxedLineHeightOverride />);
    const el = container.querySelector('span');
    expect(el).toHaveClass('leading-relaxed');
    expect(el).not.toHaveClass('leading-none');
  });

  it("the variant's built-in line-height is kept when lineHeight isn't passed", () => {
    const { container } = render(<Small />);
    expect(container.querySelector('span')).toHaveClass('leading-none');
  });

  it('the `as` prop overrides the rendered element for any variant', () => {
    render(
      <Typography variant='p' as='h2'>
        Overridden
      </Typography>,
    );
    expect(
      screen.getByRole('heading', { level: 2, name: 'Overridden' }),
    ).toBeInTheDocument();
  });
});

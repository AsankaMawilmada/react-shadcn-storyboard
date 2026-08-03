import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { composeStories } from '@storybook/react';
import * as stories from './Label.stories';

const { Default } = composeStories(stories);

describe('Label', () => {
  it('renders its text', () => {
    render(<Default />);
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('associates with its paired input via htmlFor', () => {
    render(<Default />);
    const input = screen.getByLabelText('Email');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'email');
  });
});

import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/react'
import * as stories from './Typography.stories'

const { H1, H2, H3, H4, P, Blockquote, Lead, Large, Small, Muted, Link } =
  composeStories(stories)

describe('Typography', () => {
  it('renders the h1 variant as an <h1>', () => {
    render(<H1 />)
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Taxing Laughter: The Joke Tax Chronicles',
      }),
    ).toBeInTheDocument()
  })

  it('renders the h2 variant as an <h2>', () => {
    render(<H2 />)
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'The People of the Kingdom',
      }),
    ).toBeInTheDocument()
  })

  it('renders the h3 variant as an <h3>', () => {
    render(<H3 />)
    expect(
      screen.getByRole('heading', { level: 3, name: 'The Joke Tax' }),
    ).toBeInTheDocument()
  })

  it('renders the h4 variant as an <h4>', () => {
    render(<H4 />)
    expect(
      screen.getByRole('heading', {
        level: 4,
        name: 'People stopped telling jokes',
      }),
    ).toBeInTheDocument()
  })

  it('renders the p variant as a <p>', () => {
    const { container } = render(<P />)
    const paragraph = container.querySelector('p')
    expect(paragraph).not.toBeNull()
    expect(paragraph).toHaveTextContent(
      'The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax.',
    )
  })

  it('renders the blockquote variant as a <blockquote>', () => {
    const { container } = render(<Blockquote />)
    const quote = container.querySelector('blockquote')
    expect(quote).not.toBeNull()
    expect(quote).toHaveTextContent(
      'After all," he said, "everyone enjoys a good joke, so it\'s only fair that they pay for the privilege.',
    )
  })

  it('renders the lead variant as a <p>', () => {
    const { container } = render(<Lead />)
    const lead = container.querySelector('p')
    expect(lead).not.toBeNull()
    expect(lead).toHaveTextContent(
      'A modal dialog that interrupts the user with important content.',
    )
  })

  it('renders the large variant as a <div>', () => {
    const { container } = render(<Large />)
    const large = container.querySelector('div')
    expect(large).not.toBeNull()
    expect(large).toHaveTextContent('Are you sure absolutely sure?')
  })

  it('renders the small variant as a <small>', () => {
    const { container } = render(<Small />)
    const small = container.querySelector('small')
    expect(small).not.toBeNull()
    expect(small).toHaveTextContent('Email address')
  })

  it('renders the muted variant as a <p>', () => {
    const { container } = render(<Muted />)
    const muted = container.querySelector('p')
    expect(muted).not.toBeNull()
    expect(muted).toHaveTextContent('Enter your email address.')
  })

  it('renders the link variant as an <a> with its href', () => {
    render(<Link />)
    const link = screen.getByRole('link', { name: 'Read the documentation' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '#')
  })
})

import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/react'
import * as stories from './alert.stories'

const { Default, Destructive, Success, Warning } = composeStories(stories)

describe('Alert', () => {
  it('renders the default alert with a title and description', () => {
    render(<Default />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 5, name: 'Heads up' }),
    ).toBeInTheDocument()
    expect(
      screen.getByText('You can add components to your app using the CLI.'),
    ).toBeInTheDocument()
  })

  it('renders the destructive variant with its title and description', () => {
    render(<Destructive />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 5, name: 'Error' }),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Your session has expired. Please sign in again.'),
    ).toBeInTheDocument()
  })

  it('renders the success variant with its title and description', () => {
    render(<Success />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 5, name: 'Success' }),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Your changes have been saved.'),
    ).toBeInTheDocument()
  })

  it('renders the warning variant with its title and description', () => {
    render(<Warning />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { level: 5, name: 'Warning' }),
    ).toBeInTheDocument()
    expect(
      screen.getByText('This action cannot be undone.'),
    ).toBeInTheDocument()
  })
})

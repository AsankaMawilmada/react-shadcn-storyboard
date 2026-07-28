import type { Meta, StoryObj } from '@storybook/react-vite'
import { Typography } from './typography'

const meta: Meta<typeof Typography> = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs', '!dev'],
}
export default meta

type Story = StoryObj<typeof Typography>

export const H1: Story = {
  args: { variant: 'h1', children: 'Taxing Laughter: The Joke Tax Chronicles' },
}

export const H2: Story = {
  args: { variant: 'h2', children: 'The People of the Kingdom' },
}

export const H3: Story = {
  args: { variant: 'h3', children: 'The Joke Tax' },
}

export const H4: Story = {
  args: { variant: 'h4', children: 'People stopped telling jokes' },
}

export const P: Story = {
  args: {
    variant: 'p',
    children:
      'The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax.',
  },
}

export const Blockquote: Story = {
  args: {
    variant: 'blockquote',
    children: '"After all," he said, "everyone enjoys a good joke, so it\'s only fair that they pay for the privilege."',
  },
}

export const Lead: Story = {
  args: { variant: 'lead', children: 'A modal dialog that interrupts the user with important content.' },
}

export const Large: Story = {
  args: { variant: 'large', children: 'Are you sure absolutely sure?' },
}

export const Small: Story = {
  args: { variant: 'small', children: 'Email address' },
}

export const Muted: Story = {
  args: { variant: 'muted', children: 'Enter your email address.' },
}

export const Link: Story = {
  name: 'Link (wired to --link tokens)',
  args: {
    variant: 'a',
    href: '#',
    children: 'Read the documentation',
  },
}

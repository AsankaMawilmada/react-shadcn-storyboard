import type { Meta, StoryObj } from '@storybook/react-vite'
import { ArrowRight, Mail, Trash2 } from 'lucide-react'
import { Button } from './button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs', '!dev'],
  args: {
    children: 'Button',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'secondary',
        'destructive',
        'outline',
        'ghost',
        'link',
      ],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'icon-sm', 'icon', 'icon-lg'],
    },
  },
}
export default meta

type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: { variant: 'default' },
}

export const Secondary: Story = {
  args: { variant: 'secondary' },
}

export const Destructive: Story = {
  args: { variant: 'destructive' },
}

export const Outline: Story = {
  args: { variant: 'outline' },
}

export const Ghost: Story = {
  args: { variant: 'ghost' },
}

export const Link: Story = {
  args: { variant: 'link' },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}

// Icon placement isn't a prop — it's just children order. The `gap-2` and
// `[&_svg]:size-4` rules on buttonVariants handle spacing/sizing either way.
export const IconLeft: Story = {
  render: () => (
    <Button>
      <Mail />
      Login with Email
    </Button>
  ),
}

export const IconRight: Story = {
  render: () => (
    <Button variant="outline">
      Continue
      <ArrowRight />
    </Button>
  ),
}

export const IconOnly: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="icon-sm" variant="outline" aria-label="Send email">
        <Mail />
      </Button>
      <Button size="icon" variant="outline" aria-label="Send email">
        <Mail />
      </Button>
      <Button size="icon-lg" variant="destructive" aria-label="Delete">
        <Trash2 />
      </Button>
    </div>
  ),
}

export const Disabled: Story = {
  args: { disabled: true },
}

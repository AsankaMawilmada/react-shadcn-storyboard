import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bold } from 'lucide-react'
import { Toggle } from './toggle'

const meta: Meta<typeof Toggle> = {
  title: 'UI/Toggle',
  component: Toggle,
  tags: ['autodocs', '!dev'],
  args: {
    children: <Bold />,
    'aria-label': 'Toggle bold',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
}
export default meta

type Story = StoryObj<typeof Toggle>

export const Default: Story = {
  args: { variant: 'default' },
}

export const Outline: Story = {
  args: { variant: 'outline' },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Toggle size="sm" aria-label="Toggle bold">
        <Bold />
      </Toggle>
      <Toggle size="md" aria-label="Toggle bold">
        <Bold />
      </Toggle>
      <Toggle size="lg" aria-label="Toggle bold">
        <Bold />
      </Toggle>
    </div>
  ),
}

export const Disabled: Story = {
  args: { disabled: true },
}

import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from './input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs', '!dev'],
  args: {
    placeholder: 'Enter text...',
  },
}
export default meta

type Story = StoryObj<typeof Input>

export const Default: Story = {}

export const Disabled: Story = {
  args: { disabled: true, value: 'Disabled value' },
}

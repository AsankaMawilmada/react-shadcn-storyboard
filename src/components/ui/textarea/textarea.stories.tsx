import type { Meta, StoryObj } from '@storybook/react-vite'
import { Textarea } from './textarea'

const meta: Meta<typeof Textarea> = {
  title: 'UI/Textarea',
  component: Textarea,
  tags: ['autodocs', '!dev'],
  args: {
    placeholder: 'Type your message...',
  },
}
export default meta

type Story = StoryObj<typeof Textarea>

export const Default: Story = {}

export const Disabled: Story = {
  args: { disabled: true, value: 'Disabled value' },
}

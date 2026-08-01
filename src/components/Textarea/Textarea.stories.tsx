import type { Meta, StoryObj } from '@storybook/react-vite'
import { Textarea } from './Textarea'

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
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

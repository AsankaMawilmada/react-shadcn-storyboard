import type { Meta, StoryObj } from '@storybook/react-vite'
import { Progress } from './progress'

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs', '!dev'],
  args: {
    value: 60,
    className: 'w-64',
  },
}
export default meta

type Story = StoryObj<typeof Progress>

export const Default: Story = {}

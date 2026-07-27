import type { Meta, StoryObj } from '@storybook/react-vite'
import { Slider } from './slider'

const meta: Meta<typeof Slider> = {
  title: 'UI/Slider',
  component: Slider,
  tags: ['autodocs', '!dev'],
  args: {
    defaultValue: 50,
    className: 'w-64',
  },
}
export default meta

type Story = StoryObj<typeof Slider>

export const Default: Story = {}

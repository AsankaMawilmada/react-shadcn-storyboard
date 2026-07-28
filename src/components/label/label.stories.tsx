import type { Meta, StoryObj } from '@storybook/react-vite'
import { Label } from './label'
import { Input } from '../input'

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs', '!dev'],
}
export default meta

type Story = StoryObj<typeof Label>

export const Default: Story = {
  render: () => (
    <div className="grid gap-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  ),
}

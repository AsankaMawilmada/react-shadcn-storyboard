import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox } from './Checkbox'
import { Label } from '../Label'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
}

export const Checked: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms-checked" defaultChecked />
      <Label htmlFor="terms-checked">Accept terms and conditions</Label>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms-disabled" disabled />
      <Label htmlFor="terms-disabled">Accept terms and conditions</Label>
    </div>
  ),
}

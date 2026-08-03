import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from './Switch';
import { Label } from '../Label';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane mode</Label>
    </div>
  ),
};

export const Checked: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="airplane-mode-checked" defaultChecked />
      <Label htmlFor="airplane-mode-checked">Airplane mode</Label>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="airplane-mode-disabled" disabled />
      <Label htmlFor="airplane-mode-disabled">Airplane mode</Label>
    </div>
  ),
};

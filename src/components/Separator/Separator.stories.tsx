import type { Meta, StoryObj } from '@storybook/react-vite';
import { Separator } from './Separator';

const meta: Meta<typeof Separator> = {
  title: 'Components/Separator',
  component: Separator,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Separator>;

export const Default: Story = {
  render: () => (
    <div>
      <div className="space-y-1">
        <h4 className="text-sm leading-none font-medium">Base UI</h4>
        <p className="text-sm text-muted-foreground">
          An open-source component library.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center gap-4 text-sm">
        <span>Docs</span>
        <Separator orientation="vertical" />
        <span>Source</span>
      </div>
    </div>
  ),
};

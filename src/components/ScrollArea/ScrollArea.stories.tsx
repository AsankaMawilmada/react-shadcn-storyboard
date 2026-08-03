import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScrollArea } from './ScrollArea';

const meta: Meta<typeof ScrollArea> = {
  title: 'Components/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ScrollArea>;

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-72 w-48 rounded-md border border-border">
      <div className="p-4">
        <h4 className="mb-4 text-sm leading-none font-medium">Tags</h4>
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="border-b border-border py-2 text-sm last:border-0"
          >
            Tag {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

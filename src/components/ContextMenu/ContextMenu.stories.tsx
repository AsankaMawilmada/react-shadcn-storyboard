import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from './ContextMenu';

const meta: Meta<typeof ContextMenu> = {
  title: 'Components/ContextMenu',
  component: ContextMenu,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ContextMenu>;

export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-64 items-center justify-center rounded-md border border-dashed border-border text-sm text-muted-foreground">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent className="w-52">
        <ContextMenuGroup>
          <ContextMenuLabel>Actions</ContextMenuLabel>
          <ContextMenuSeparator />
          <ContextMenuItem>Back</ContextMenuItem>
          <ContextMenuItem>Forward</ContextMenuItem>
          <ContextMenuItem>Reload</ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuItem>Save page as...</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

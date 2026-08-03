import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowRightIcon } from './ArrowRightIcon';
import * as Icons from './index';

const iconEntries = Object.entries(Icons).filter(([name]) =>
  name.endsWith('Icon'),
) as Array<[string, typeof ArrowRightIcon]>;

const SIZES = [16, 20, 24, 32, 48, 64];
const COLORS = ['currentColor', '#2563eb', '#dc2626', '#16a34a', '#d97706'];

const meta: Meta<typeof ArrowRightIcon> = {
  title: 'Icons',
  component: ArrowRightIcon,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'color' },
    background: { control: 'color' },
    size: { control: 'number' },
    strokeWidth: { control: 'number' },
    backgroundPadding: { control: 'number' },
  },
  args: {
    size: 24,
  },
};
export default meta;

type Story = StoryObj<typeof ArrowRightIcon>;

export const Default: Story = {};

export const AllIcons: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-6 sm:grid-cols-6 md:grid-cols-8">
      {iconEntries.map(([name, Icon]) => (
        <div
          key={name}
          className="flex flex-col items-center gap-2 text-center"
        >
          <Icon size={24} />
          <span className="text-xs text-muted-foreground">{name}</span>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-6">
      {SIZES.map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <ArrowRightIcon size={size} />
          <span className="text-xs text-muted-foreground">{size}px</span>
        </div>
      ))}
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      {COLORS.map((color) => (
        <div key={color} className="flex flex-col items-center gap-2">
          <ArrowRightIcon size={28} color={color} />
          <span className="text-xs text-muted-foreground">{color}</span>
        </div>
      ))}
    </div>
  ),
};

export const Backgrounds: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      {COLORS.slice(1).map((background) => (
        <div key={background} className="flex flex-col items-center gap-2">
          <ArrowRightIcon size={20} color="white" background={background} />
          <span className="text-xs text-muted-foreground">{background}</span>
        </div>
      ))}
    </div>
  ),
};

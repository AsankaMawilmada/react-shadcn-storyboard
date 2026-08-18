import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArrowRightIcon } from '@/icons/ArrowRightIcon';
import { CheckIcon } from '@/icons/CheckIcon';
import { Link } from './Link';

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  tags: ['autodocs'],
  args: {
    href: '#',
    children: 'Learn more',
  },
};
export default meta;

type Story = StoryObj<typeof Link>;

export const Default: Story = {};

export const Inline: Story = {
  args: { variant: 'inline' },
};

export const Standalone: Story = {
  args: { variant: 'standalone' },
};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

export const WithLeftIcon: Story = {
  args: { leftIcon: <CheckIcon size={16} /> },
};

export const WithRightIcon: Story = {
  args: { rightIcon: <ArrowRightIcon size={16} /> },
};

export const Disabled: Story = {
  args: { disabled: true, rightIcon: <ArrowRightIcon size={16} /> },
};

/**
 * No `href` — renders a `<button type="button">` styled identically, for
 * link-styled actions that don't navigate (e.g. "Clear filters").
 */
export const AsButton: Story = {
  args: { href: undefined, children: 'Clear filters', onClick: () => {} },
};

export const DisabledAsButton: Story = {
  name: 'Disabled (as button)',
  args: { href: undefined, children: 'Clear filters', disabled: true },
};

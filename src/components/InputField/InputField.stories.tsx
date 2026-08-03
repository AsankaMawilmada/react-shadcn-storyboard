import type { Meta, StoryObj } from '@storybook/react-vite';
import { Mail, Search } from 'lucide-react';
import { InputField } from './InputField';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  tags: ['autodocs'],
  args: {
    placeholder: 'Enter text...',
  },
};
export default meta;

type Story = StoryObj<typeof InputField>;

export const FieldOnly: Story = {};

export const WithLabelAbove: Story = {
  args: { label: 'Full name' },
};

export const WithLabelBeside: Story = {
  args: { label: 'Full name', labelPosition: 'beside' },
};

export const WithLeftIcon: Story = {
  args: { label: 'Search', icon: <Search />, placeholder: 'Search...' },
};

export const WithRightIcon: Story = {
  args: {
    label: 'Email',
    icon: <Mail />,
    iconPosition: 'right',
    placeholder: 'you@example.com',
  },
};

export const WithLeadingContent: Story = {
  args: { label: 'Price', leading: <span className="text-sm">$</span> },
};

export const WithTrailingContent: Story = {
  args: { label: 'Weight', trailing: <span className="text-sm">kg</span> },
};

export const EmailType: Story = {
  args: { type: 'email', label: 'Email', placeholder: 'you@example.com' },
};

export const DateType: Story = {
  args: { type: 'date', label: 'Date of birth' },
};

export const NumberType: Story = {
  args: { type: 'number', label: 'Quantity' },
};

export const PostcodeType: Story = {
  args: { type: 'postcode', label: 'Postcode' },
};

export const SplitType: Story = {
  args: { type: 'split', label: 'Verification code', splitLength: 6 },
};

export const Disabled: Story = {
  args: { label: 'Full name', disabled: true, value: 'Disabled value' },
};

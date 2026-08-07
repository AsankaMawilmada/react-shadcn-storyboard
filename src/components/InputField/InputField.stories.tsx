import * as React from 'react';
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
  args: { label: 'Price', leading: <span className='text-sm'>$</span> },
};

export const WithTrailingContent: Story = {
  args: { label: 'Weight', trailing: <span className='text-sm'>kg</span> },
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

export const DateDropdownType: Story = {
  args: { type: 'datedropdown', label: 'Date of birth' },
};

export const DateDropdownTypeWithValue: Story = {
  args: {
    type: 'datedropdown',
    label: 'Date of birth',
    defaultValue: '1990-06-15',
  },
};

export const DateDropdownTypeCustomYearRange: Story = {
  args: {
    type: 'datedropdown',
    label: 'Expiry date',
    minYear: new Date().getFullYear(),
    maxYear: new Date().getFullYear() + 10,
  },
};

export const Disabled: Story = {
  args: { label: 'Full name', disabled: true, value: 'Disabled value' },
};

/**
 * `aria-invalid` is a plain forwarded prop, so it's the same attribute a
 * validation library sets when a field fails validation (e.g.
 * react-hook-form's `aria-invalid={!!errors.email}` or Formik's
 * `aria-invalid={touched.email && !!errors.email}`).
 */
export const ErrorState: Story = {
  args: {
    label: 'Email',
    type: 'email',
    defaultValue: 'not-an-email',
    'aria-invalid': true,
  },
};

export const ErrorStateWithIcon: Story = {
  args: {
    label: 'Email',
    icon: <Mail />,
    defaultValue: 'not-an-email',
    'aria-invalid': true,
  },
};

export const ErrorStateSplit: Story = {
  args: {
    label: 'Verification code',
    type: 'split',
    splitLength: 6,
    defaultValue: '12',
    'aria-invalid': true,
  },
};

export const ErrorStateDateDropdown: Story = {
  args: {
    label: 'Date of birth',
    type: 'datedropdown',
    'aria-invalid': true,
  },
};

function ControlledSplitField(args: React.ComponentProps<typeof InputField>) {
  const [value, setValue] = React.useState('');
  return <InputField {...args} value={value} onValueChange={setValue} />;
}

/**
 * `type="split"` has no single native `<input>`, so it can't be spread with
 * a plain `{...register('code')}`. It's still controllable from any
 * validation library through the same `value`/`onValueChange` contract a
 * `Controller` (react-hook-form) or `<Field>` render prop (Formik) provides.
 * This story stands in for that adapter with local `useState`.
 */
export const SplitTypeControlledExternally: Story = {
  render: ControlledSplitField,
  args: { type: 'split', label: 'Verification code', splitLength: 6 },
};

function ControlledDateDropdownField(
  args: React.ComponentProps<typeof InputField>,
) {
  const [value, setValue] = React.useState('');
  return <InputField {...args} value={value} onValueChange={setValue} />;
}

/**
 * Same Controller/Field-adapter story as `SplitTypeControlledExternally`,
 * for `type="datedropdown"`. `value`/`onValueChange` carry an ISO
 * `YYYY-MM-DD` string (or `''` while incomplete).
 */
export const DateDropdownTypeControlledExternally: Story = {
  render: ControlledDateDropdownField,
  args: { type: 'datedropdown', label: 'Date of birth' },
};

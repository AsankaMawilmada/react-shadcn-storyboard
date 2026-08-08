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
    errorMessage: 'Enter a valid email address.',
  },
};

export const ErrorStateWithIcon: Story = {
  args: {
    label: 'Email',
    icon: <Mail />,
    defaultValue: 'not-an-email',
    'aria-invalid': true,
    errorMessage: 'Enter a valid email address.',
  },
};

export const ErrorStateSplit: Story = {
  args: {
    label: 'Verification code',
    type: 'split',
    splitLength: 6,
    defaultValue: '12',
    'aria-invalid': true,
    errorMessage: 'Enter the full 6-digit code.',
  },
};

/**
 * `errorMessage` alone (no explicit `aria-invalid`) is enough to trigger the
 * invalid styling — useful for consumers who only track a message string
 * (e.g. `errors.email?.message` from react-hook-form) and don't separately
 * compute a boolean.
 */
export const ErrorMessageOnly: Story = {
  args: {
    label: 'Email',
    type: 'email',
    defaultValue: 'not-an-email',
    errorMessage: 'Enter a valid email address.',
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

import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioGroup } from './RadioGroup';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  args: {
    options: [
      { value: 'day', label: 'Day' },
      { value: 'week', label: 'Week' },
      { value: 'month', label: 'Month' },
    ],
  },
};
export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    label: 'Billing period',
    options: [
      { value: 'monthly', label: 'Monthly' },
      { value: 'yearly', label: 'Yearly' },
    ],
  },
};

export const WithDefaultValue: Story = {
  name: 'Uncontrolled with defaultValue',
  args: { label: 'View', defaultValue: 'week' },
};

// A fixed-width wrapper so FixedWidth/FullWidth/LongLabelsTruncated render
// inside the same reference frame — otherwise "full width" has nothing to
// stretch to fill and the comparison isn't visible.
function WidthDemo(args: React.ComponentProps<typeof RadioGroup>) {
  return (
    <div style={{ width: 320 }}>
      <RadioGroup {...args} />
    </div>
  );
}

export const FixedWidth: Story = {
  name: 'Fixed width (default)',
  render: WidthDemo,
  args: { label: 'View' },
};

export const FullWidth: Story = {
  name: 'Full width (fullWidth)',
  render: WidthDemo,
  args: { label: 'View', fullWidth: true },
};

export const LongLabelsTruncated: Story = {
  name: 'Long labels truncate with ellipsis',
  render: WidthDemo,
  args: {
    label: 'Notification frequency',
    fullWidth: true,
    options: [
      { value: 'realtime', label: 'Real-time notifications' },
      { value: 'daily', label: 'Daily digest summary' },
      { value: 'weekly', label: 'Weekly digest summary' },
    ],
  },
};

export const DisabledItem: Story = {
  args: {
    label: 'Plan',
    defaultValue: 'basic',
    options: [
      { value: 'basic', label: 'Basic' },
      { value: 'pro', label: 'Pro' },
      { value: 'enterprise', label: 'Enterprise', disabled: true },
    ],
  },
};

/**
 * `errorMessage` alone (no explicit `aria-invalid`) is enough to trigger the
 * invalid styling — useful for consumers who only track a message string
 * (e.g. `errors.plan?.message` from react-hook-form) and don't separately
 * compute a boolean.
 */
export const ErrorState: Story = {
  args: {
    label: 'Plan',
    errorMessage: 'Please choose a plan.',
    options: [
      { value: 'basic', label: 'Basic' },
      { value: 'pro', label: 'Pro' },
      { value: 'enterprise', label: 'Enterprise' },
    ],
  },
};

function ControlledField(args: React.ComponentProps<typeof RadioGroup>) {
  const [value, setValue] = React.useState('');
  return (
    <RadioGroup {...args} label='Plan' value={value} onValueChange={setValue} />
  );
}

/**
 * Controllable from any validation library through the same
 * `value`/`onValueChange` contract a `Controller` (react-hook-form) or
 * `<Field>` render prop (Formik) provides. This story stands in for that
 * adapter with local `useState`.
 */
export const ControlledExternally: Story = {
  render: ControlledField,
  args: {
    options: [
      { value: 'basic', label: 'Basic' },
      { value: 'pro', label: 'Pro' },
      { value: 'enterprise', label: 'Enterprise' },
    ],
  },
};

import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioButtonGroup } from './RadioButtonGroup';

const meta: Meta<typeof RadioButtonGroup> = {
  title: 'Components/RadioButtonGroup',
  component: RadioButtonGroup,
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

type Story = StoryObj<typeof RadioButtonGroup>;

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

export const Vertical: Story = {
  args: { label: 'View', orientation: 'vertical' },
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

function ControlledField(args: React.ComponentProps<typeof RadioButtonGroup>) {
  const [value, setValue] = React.useState('');
  return (
    <RadioButtonGroup
      {...args}
      label='Plan'
      value={value}
      onValueChange={setValue}
    />
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

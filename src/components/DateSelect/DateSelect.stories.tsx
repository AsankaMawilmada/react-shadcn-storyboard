import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DateSelect } from './DateSelect';

const meta: Meta<typeof DateSelect> = {
  title: 'Components/DateSelect',
  component: DateSelect,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof DateSelect>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { defaultValue: '1990-06-15' },
};

export const CustomYearRange: Story = {
  args: {
    minYear: new Date().getFullYear(),
    maxYear: new Date().getFullYear() + 10,
  },
};

export const Disabled: Story = {
  args: { defaultValue: '1990-06-15', disabled: true },
};

export const ErrorState: Story = {
  args: { 'aria-invalid': true },
};

function ControlledField(args: React.ComponentProps<typeof DateSelect>) {
  const [value, setValue] = React.useState('');
  return <DateSelect {...args} value={value} onValueChange={setValue} />;
}

/**
 * No single native `<input>`, so it can't be spread with a plain
 * `{...register('dob')}`. It's still controllable from any validation
 * library through the same `value`/`onValueChange` contract a `Controller`
 * (react-hook-form) or `<Field>` render prop (Formik) provides. This story
 * stands in for that adapter with local `useState`.
 */
export const ControlledExternally: Story = {
  render: ControlledField,
};

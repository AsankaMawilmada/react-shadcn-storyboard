import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import * as stories from './RadioGroup.stories';

const {
  Default,
  WithLabel,
  WithDefaultValue,
  FixedWidth,
  FullWidth,
  LongLabelsTruncated,
  DisabledItem,
  ErrorState,
  ControlledExternally,
} = composeStories(stories);

describe('RadioGroup', () => {
  it('renders a radiogroup with one radio per item', () => {
    render(<Default />);
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(3);
    expect(radios[0]).toHaveTextContent('Day');
    expect(radios[1]).toHaveTextContent('Week');
    expect(radios[2]).toHaveTextContent('Month');
  });

  it('associates the group with its label via aria-labelledby', () => {
    render(<WithLabel />);
    expect(
      screen.getByRole('radiogroup', { name: 'Billing period' }),
    ).toBeInTheDocument();
  });

  it('selects an item on click', async () => {
    const user = userEvent.setup();
    render(<Default />);
    const week = screen.getByRole('radio', { name: 'Week' });
    expect(week).not.toBeChecked();
    await user.click(week);
    expect(week).toBeChecked();
  });

  it('only one item can be checked at a time', async () => {
    const user = userEvent.setup();
    render(<Default />);
    const [day, week] = screen.getAllByRole('radio');
    await user.click(day);
    expect(day).toBeChecked();
    await user.click(week);
    expect(day).not.toBeChecked();
    expect(week).toBeChecked();
  });

  it('pre-selects an item via defaultValue (uncontrolled)', () => {
    render(<WithDefaultValue />);
    expect(screen.getByRole('radio', { name: 'Week' })).toBeChecked();
  });

  it('shows a check icon only on the selected item', async () => {
    // The icon stays mounted (`keepMounted`) even while unchecked, so its
    // box always reserves space and the label never shifts when an item
    // is (de)selected — visibility is toggled by CSS off the
    // data-checked/data-unchecked attribute this asserts on, not by
    // mounting/unmounting the icon.
    const user = userEvent.setup();
    render(<Default />);
    const [day, week] = screen.getAllByRole('radio');
    const dayIcon = day.querySelector('.radio-group-item-icon');
    const weekIcon = week.querySelector('.radio-group-item-icon');
    expect(dayIcon).toHaveAttribute('data-unchecked');
    await user.click(day);
    expect(dayIcon).toHaveAttribute('data-checked');
    await user.click(week);
    expect(dayIcon).toHaveAttribute('data-unchecked');
    expect(weekIcon).toHaveAttribute('data-checked');
  });

  it('defaults to a fixed (fit-content) width, not full-width', () => {
    render(<FixedWidth />);
    expect(screen.getByRole('radiogroup')).not.toHaveClass(
      'radio-group--full-width',
    );
  });

  it('adds the full-width class when fullWidth is set', () => {
    render(<FullWidth />);
    expect(screen.getByRole('radiogroup')).toHaveClass(
      'radio-group--full-width',
    );
  });

  it('renders long labels so they can truncate with ellipsis via CSS', () => {
    render(<LongLabelsTruncated />);
    expect(
      screen.getByRole('radio', { name: 'Real-time notifications' }),
    ).toBeInTheDocument();
  });

  it('disables an individual item without affecting the others', async () => {
    const user = userEvent.setup();
    render(<DisabledItem />);
    // `Radio.Root` renders a <span role="radio">, not a native disableable
    // element (the real `disabled` attribute lives on its hidden paired
    // <input>) — so disabled state shows up as `aria-disabled`, not the
    // native `disabled` property `toBeDisabled()` checks for.
    const enterprise = screen.getByRole('radio', { name: 'Enterprise' });
    expect(enterprise).toHaveAttribute('aria-disabled', 'true');
    await user.click(enterprise);
    expect(enterprise).not.toBeChecked();
    expect(screen.getByRole('radio', { name: 'Pro' })).not.toHaveAttribute(
      'aria-disabled',
    );
  });

  it('renders errorMessage below the group, linked via aria-describedby', () => {
    render(<ErrorState />);
    const group = screen.getByRole('radiogroup');
    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent('Please choose a plan.');
    expect(group.getAttribute('aria-describedby')).toBe(alert.id);
  });

  it('errorMessage alone (no explicit aria-invalid) still marks the group invalid', () => {
    render(<ErrorState />);
    expect(screen.getByRole('radiogroup')).toHaveAttribute(
      'aria-invalid',
      'true',
    );
  });

  it('can be driven by external controlled state (value/onValueChange)', async () => {
    const user = userEvent.setup();
    render(<ControlledExternally />);
    const pro = screen.getByRole('radio', { name: 'Pro' });
    expect(pro).not.toBeChecked();
    await user.click(pro);
    expect(pro).toBeChecked();
  });
});

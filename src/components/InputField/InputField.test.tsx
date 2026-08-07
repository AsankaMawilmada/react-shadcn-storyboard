import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import * as stories from './InputField.stories';

const {
  FieldOnly,
  WithLabelAbove,
  WithLeftIcon,
  WithRightIcon,
  EmailType,
  PostcodeType,
  SplitType,
  Disabled,
  ErrorState,
  ErrorStateWithIcon,
  ErrorStateSplit,
  SplitTypeControlledExternally,
  DateDropdownType,
  DateDropdownTypeWithValue,
  DateDropdownTypeCustomYearRange,
  ErrorStateDateDropdown,
  DateDropdownTypeControlledExternally,
  ErrorMessageOnly,
} = composeStories(stories);

describe('InputField', () => {
  it('renders with its placeholder', () => {
    render(<FieldOnly />);
    expect(screen.getByPlaceholderText('Enter text...')).toBeInTheDocument();
  });

  it('accepts typed text', async () => {
    const user = userEvent.setup();
    render(<FieldOnly />);
    const input = screen.getByPlaceholderText('Enter text...');
    await user.type(input, 'hello world');
    expect(input).toHaveValue('hello world');
  });

  it('associates the label with the input via htmlFor/id', () => {
    render(<WithLabelAbove />);
    expect(screen.getByLabelText('Full name')).toBeInTheDocument();
  });

  it('renders a left icon before the input', () => {
    render(<WithLeftIcon />);
    const input = screen.getByPlaceholderText('Search...');
    const wrapper = input.parentElement as HTMLElement;
    expect(wrapper.children[0]).not.toBe(input);
    expect(wrapper.children[1]).toBe(input);
  });

  it('renders a right icon after the input', () => {
    render(<WithRightIcon />);
    const input = screen.getByPlaceholderText('you@example.com');
    const wrapper = input.parentElement as HTMLElement;
    expect(wrapper.children[0]).toBe(input);
    expect(wrapper.children[1]).not.toBe(input);
  });

  it('sets the native type for a typed field', () => {
    render(<EmailType />);
    expect(screen.getByPlaceholderText('you@example.com')).toHaveAttribute(
      'type',
      'email',
    );
  });

  it('postcode type sets autoComplete=postal-code and type=text', () => {
    render(<PostcodeType />);
    const input = screen.getByLabelText('Postcode');
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('autoComplete', 'postal-code');
  });

  it('split type renders one slot per splitLength and accepts input', async () => {
    const user = userEvent.setup();
    render(<SplitType />);
    const slots = screen.getAllByRole('textbox');
    expect(slots).toHaveLength(6);
    await user.click(slots[0]);
    await user.keyboard('123456');
    expect(slots[0]).toHaveValue('1');
    expect(slots[5]).toHaveValue('6');
  });

  it('is disabled and shows its value when disabled', () => {
    render(<Disabled />);
    const input = screen.getByDisplayValue('Disabled value');
    expect(input).toBeDisabled();
  });

  it('does not accept input while disabled', async () => {
    const user = userEvent.setup();
    render(<Disabled />);
    const input = screen.getByDisplayValue('Disabled value');
    await user.type(input, 'more text');
    expect(input).toHaveValue('Disabled value');
  });

  it('forwards aria-invalid to the native input for error styling', () => {
    render(<ErrorState />);
    expect(screen.getByLabelText('Email')).toHaveAttribute(
      'aria-invalid',
      'true',
    );
  });

  it('forwards aria-invalid to the input in the icon-wrapper layout', () => {
    render(<ErrorStateWithIcon />);
    expect(screen.getByLabelText('Email')).toHaveAttribute(
      'aria-invalid',
      'true',
    );
  });

  it('forwards aria-invalid to every slot for split type', () => {
    render(<ErrorStateSplit />);
    const slots = screen.getAllByRole('textbox');
    expect(slots.length).toBeGreaterThan(0);
    for (const slot of slots) {
      expect(slot).toHaveAttribute('aria-invalid', 'true');
    }
  });

  it('split type accepts an initial value via defaultValue', () => {
    render(<ErrorStateSplit />);
    const slots = screen.getAllByRole('textbox');
    expect(slots[0]).toHaveValue('1');
    expect(slots[1]).toHaveValue('2');
  });

  it('split type can be driven by external controlled state (value/onValueChange)', async () => {
    const user = userEvent.setup();
    render(<SplitTypeControlledExternally />);
    const slots = screen.getAllByRole('textbox');
    await user.click(slots[0]);
    await user.keyboard('123');
    expect(slots[0]).toHaveValue('1');
    expect(slots[1]).toHaveValue('2');
    expect(slots[2]).toHaveValue('3');
  });

  it('datedropdown type renders three dropdowns for day/month/year', () => {
    render(<DateDropdownType />);
    const dropdowns = screen.getAllByRole('combobox');
    expect(dropdowns).toHaveLength(3);
    expect(dropdowns[0]).toHaveTextContent('Day');
    expect(dropdowns[1]).toHaveTextContent('Month');
    expect(dropdowns[2]).toHaveTextContent('Year');
  });

  it('datedropdown type pre-fills all three dropdowns from defaultValue', () => {
    render(<DateDropdownTypeWithValue />);
    const dropdowns = screen.getAllByRole('combobox');
    expect(dropdowns[0]).toHaveTextContent('15');
    expect(dropdowns[1]).toHaveTextContent('June');
    expect(dropdowns[2]).toHaveTextContent('1990');
  });

  it('datedropdown type respects a custom minYear/maxYear range', async () => {
    const user = userEvent.setup();
    render(<DateDropdownTypeCustomYearRange />);
    const currentYear = new Date().getFullYear();
    await user.click(screen.getAllByRole('combobox')[2]);
    const listbox = await screen.findByRole('listbox');
    expect(
      screen.getByRole('option', { name: String(currentYear) }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: String(currentYear + 10) }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('option', { name: String(currentYear - 1) }),
    ).not.toBeInTheDocument();
    expect(listbox).toBeInTheDocument();
  });

  it('forwards aria-invalid to all three dropdown triggers', () => {
    render(<ErrorStateDateDropdown />);
    for (const dropdown of screen.getAllByRole('combobox')) {
      expect(dropdown).toHaveAttribute('aria-invalid', 'true');
    }
  });

  it('datedropdown type can be driven by external controlled state (value/onValueChange)', async () => {
    const user = userEvent.setup();
    render(<DateDropdownTypeControlledExternally />);
    const [dayTrigger, monthTrigger, yearTrigger] =
      screen.getAllByRole('combobox');

    await user.click(dayTrigger);
    await user.click(await screen.findByRole('option', { name: '15' }));

    await user.click(monthTrigger);
    await user.click(await screen.findByRole('option', { name: 'June' }));

    await user.click(yearTrigger);
    await user.click(await screen.findByRole('option', { name: '1990' }));

    expect(dayTrigger).toHaveTextContent('15');
    expect(monthTrigger).toHaveTextContent('June');
    expect(yearTrigger).toHaveTextContent('1990');
  });

  it('renders errorMessage below the field, linked via aria-describedby', () => {
    render(<ErrorState />);
    const input = screen.getByLabelText('Email');
    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent('Enter a valid email address.');
    expect(input.getAttribute('aria-describedby')).toBe(alert.id);
  });

  it('renders errorMessage for the icon-wrapper layout, linked via aria-describedby', () => {
    render(<ErrorStateWithIcon />);
    const input = screen.getByLabelText('Email');
    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent('Enter a valid email address.');
    expect(input.getAttribute('aria-describedby')).toBe(alert.id);
  });

  it('renders errorMessage for split type, linked to every slot via aria-describedby', () => {
    render(<ErrorStateSplit />);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent('Enter the full 6-digit code.');
    for (const slot of screen.getAllByRole('textbox')) {
      expect(slot.getAttribute('aria-describedby')).toBe(alert.id);
    }
  });

  it('renders errorMessage for datedropdown type, linked to every trigger via aria-describedby', () => {
    render(<ErrorStateDateDropdown />);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent('Enter your full date of birth.');
    for (const dropdown of screen.getAllByRole('combobox')) {
      expect(dropdown.getAttribute('aria-describedby')).toBe(alert.id);
    }
  });

  it('errorMessage alone (no explicit aria-invalid) still marks the field invalid', () => {
    render(<ErrorMessageOnly />);
    expect(screen.getByLabelText('Email')).toHaveAttribute(
      'aria-invalid',
      'true',
    );
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Enter a valid email address.',
    );
  });
});

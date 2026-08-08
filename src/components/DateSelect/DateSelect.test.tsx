import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { composeStories } from '@storybook/react';
import * as stories from './DateSelect.stories';

const {
  Default,
  WithValue,
  CustomYearRange,
  Disabled,
  ErrorState,
  ControlledExternally,
} = composeStories(stories);

describe('DateSelect', () => {
  it('renders three dropdowns for day/month/year', () => {
    render(<Default />);
    const dropdowns = screen.getAllByRole('combobox');
    expect(dropdowns).toHaveLength(3);
    expect(dropdowns[0]).toHaveTextContent('Day');
    expect(dropdowns[1]).toHaveTextContent('Month');
    expect(dropdowns[2]).toHaveTextContent('Year');
  });

  it('pre-fills all three dropdowns from defaultValue', () => {
    render(<WithValue />);
    const dropdowns = screen.getAllByRole('combobox');
    expect(dropdowns[0]).toHaveTextContent('15');
    expect(dropdowns[1]).toHaveTextContent('June');
    expect(dropdowns[2]).toHaveTextContent('1990');
  });

  it('respects a custom minYear/maxYear range', async () => {
    const user = userEvent.setup();
    render(<CustomYearRange />);
    const currentYear = new Date().getFullYear();
    await user.click(screen.getAllByRole('combobox')[2]);
    expect(await screen.findByRole('listbox')).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: String(currentYear) }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('option', { name: String(currentYear + 10) }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('option', { name: String(currentYear - 1) }),
    ).not.toBeInTheDocument();
  });

  it('disables all three dropdowns', () => {
    render(<Disabled />);
    for (const dropdown of screen.getAllByRole('combobox')) {
      expect(dropdown).toBeDisabled();
    }
  });

  it('forwards aria-invalid to all three triggers', () => {
    render(<ErrorState />);
    for (const dropdown of screen.getAllByRole('combobox')) {
      expect(dropdown).toHaveAttribute('aria-invalid', 'true');
    }
  });

  it('forwards aria-describedby to all three triggers', () => {
    render(<ErrorState aria-describedby='external-hint' />);
    for (const dropdown of screen.getAllByRole('combobox')) {
      expect(dropdown).toHaveAttribute('aria-describedby', 'external-hint');
    }
  });

  it('can be driven by external controlled state (value/onValueChange)', async () => {
    const user = userEvent.setup();
    render(<ControlledExternally />);
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

  it('clamps an out-of-range day when the month changes (e.g. 31 -> February)', async () => {
    const user = userEvent.setup();
    render(<ControlledExternally />);
    const [dayTrigger, monthTrigger] = screen.getAllByRole('combobox');

    await user.click(dayTrigger);
    await user.click(await screen.findByRole('option', { name: '31' }));

    await user.click(monthTrigger);
    await user.click(await screen.findByRole('option', { name: 'February' }));

    expect(dayTrigger).toHaveTextContent('Day');
  });
});

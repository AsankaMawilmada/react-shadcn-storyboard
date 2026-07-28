import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/react'
import * as stories from './table.stories'

const { Default } = composeStories(stories)

describe('Table', () => {
  it('renders the column headers', () => {
    render(<Default />)
    expect(
      screen.getByRole('columnheader', { name: 'Invoice' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('columnheader', { name: 'Status' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('columnheader', { name: 'Method' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('columnheader', { name: 'Amount' }),
    ).toBeInTheDocument()
  })

  it('renders one row per invoice plus the header row', () => {
    render(<Default />)
    expect(screen.getAllByRole('row')).toHaveLength(4)
  })

  it('renders the correct cell values for each row', () => {
    render(<Default />)
    const rows = screen.getAllByRole('row').slice(1)
    expect(rows).toHaveLength(3)

    const firstRowCells = rows[0].querySelectorAll('td')
    expect(firstRowCells[0]).toHaveTextContent('INV001')
    expect(firstRowCells[1]).toHaveTextContent('Paid')
    expect(firstRowCells[2]).toHaveTextContent('Credit Card')
    expect(firstRowCells[3]).toHaveTextContent('$250.00')
  })

  it('renders the caption', () => {
    render(<Default />)
    expect(screen.getByText('A list of recent invoices.')).toBeInTheDocument()
  })
})

import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { composeStories } from '@storybook/react'
import * as stories from './input-field.stories'

const {
  FieldOnly,
  WithLabelAbove,
  WithLeftIcon,
  WithRightIcon,
  EmailType,
  PostcodeType,
  SplitType,
  Disabled,
} = composeStories(stories)

describe('InputField', () => {
  it('renders with its placeholder', () => {
    render(<FieldOnly />)
    expect(screen.getByPlaceholderText('Enter text...')).toBeInTheDocument()
  })

  it('accepts typed text', async () => {
    const user = userEvent.setup()
    render(<FieldOnly />)
    const input = screen.getByPlaceholderText('Enter text...')
    await user.type(input, 'hello world')
    expect(input).toHaveValue('hello world')
  })

  it('associates the label with the input via htmlFor/id', () => {
    render(<WithLabelAbove />)
    expect(screen.getByLabelText('Full name')).toBeInTheDocument()
  })

  it('renders a left icon before the input', () => {
    render(<WithLeftIcon />)
    const input = screen.getByPlaceholderText('Search...')
    const wrapper = input.parentElement as HTMLElement
    expect(wrapper.children[0]).not.toBe(input)
    expect(wrapper.children[1]).toBe(input)
  })

  it('renders a right icon after the input', () => {
    render(<WithRightIcon />)
    const input = screen.getByPlaceholderText('you@example.com')
    const wrapper = input.parentElement as HTMLElement
    expect(wrapper.children[0]).toBe(input)
    expect(wrapper.children[1]).not.toBe(input)
  })

  it('sets the native type for a typed field', () => {
    render(<EmailType />)
    expect(screen.getByPlaceholderText('you@example.com')).toHaveAttribute(
      'type',
      'email',
    )
  })

  it('postcode type sets autoComplete=postal-code and type=text', () => {
    render(<PostcodeType />)
    const input = screen.getByLabelText('Postcode')
    expect(input).toHaveAttribute('type', 'text')
    expect(input).toHaveAttribute('autoComplete', 'postal-code')
  })

  it('split type renders one slot per splitLength and accepts input', async () => {
    const user = userEvent.setup()
    render(<SplitType />)
    const slots = screen.getAllByRole('textbox')
    expect(slots).toHaveLength(6)
    await user.click(slots[0])
    await user.keyboard('123456')
    expect(slots[0]).toHaveValue('1')
    expect(slots[5]).toHaveValue('6')
  })

  it('is disabled and shows its value when disabled', () => {
    render(<Disabled />)
    const input = screen.getByDisplayValue('Disabled value')
    expect(input).toBeDisabled()
  })

  it('does not accept input while disabled', async () => {
    const user = userEvent.setup()
    render(<Disabled />)
    const input = screen.getByDisplayValue('Disabled value')
    await user.type(input, 'more text')
    expect(input).toHaveValue('Disabled value')
  })
})

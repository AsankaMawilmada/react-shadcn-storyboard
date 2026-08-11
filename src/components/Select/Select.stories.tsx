import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Select,
  SelectContent,
  SelectErrorMessage,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: () => (
    <Select defaultValue='apple'>
      <SelectTrigger className='w-52'>
        <SelectValue placeholder='Select a fruit' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value='apple'>Apple</SelectItem>
          <SelectItem value='banana'>Banana</SelectItem>
          <SelectItem value='blueberry'>Blueberry</SelectItem>
          <SelectItem value='grapes'>Grapes</SelectItem>
          <SelectItem value='pineapple'>Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

/**
 * `SelectErrorMessage` is a plain styled piece — `Select`'s `Root` renders
 * no DOM element of its own, so there's no single point to auto-wire
 * `aria-invalid`/`aria-describedby` the way InputField/DateSelect do from
 * an `errorMessage` prop. Wire it up yourself: an `id` on the message, and
 * `aria-invalid`/`aria-describedby` on `SelectTrigger`.
 */
export const ErrorState: Story = {
  render: () => (
    <Select>
      <SelectTrigger
        className='w-52'
        aria-invalid
        aria-describedby='fruit-error'
      >
        <SelectValue placeholder='Select a fruit' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value='apple'>Apple</SelectItem>
          <SelectItem value='banana'>Banana</SelectItem>
          <SelectItem value='blueberry'>Blueberry</SelectItem>
        </SelectGroup>
      </SelectContent>
      <SelectErrorMessage id='fruit-error'>
        Please select a fruit.
      </SelectErrorMessage>
    </Select>
  ),
};

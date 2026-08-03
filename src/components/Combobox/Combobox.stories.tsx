import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from './Combobox';

const meta: Meta<typeof Combobox> = {
  title: 'Components/Combobox',
  component: Combobox,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Combobox>;

const frameworks = ['React', 'Vue', 'Svelte', 'Angular', 'Solid', 'Qwik'];

export const Default: Story = {
  render: () => (
    <Combobox items={frameworks}>
      <ComboboxInput placeholder="Search framework..." className="w-64" />
      <ComboboxContent>
        <ComboboxEmpty>No results found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
};

import type { Meta, StoryObj } from '@storybook/react-vite'
import { Calculator, Calendar, Smile } from 'lucide-react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './Command'

const meta: Meta<typeof Command> = {
  title: 'Components/Command',
  component: Command,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Command>

export const Default: Story = {
  render: () => (
    <Command className="w-80 rounded-lg border border-border shadow-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <Calendar />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <Smile />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem>
            <Calculator />
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}

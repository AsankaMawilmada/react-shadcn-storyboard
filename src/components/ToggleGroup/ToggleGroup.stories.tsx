import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bold, Italic, Underline } from 'lucide-react'
import { ToggleGroup, ToggleGroupItem } from './ToggleGroup'

const meta: Meta<typeof ToggleGroup> = {
  title: 'Components/ToggleGroup',
  component: ToggleGroup,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof ToggleGroup>

export const Default: Story = {
  render: () => (
    <ToggleGroup multiple defaultValue={['bold']}>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <Bold />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <Italic />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Toggle underline">
        <Underline />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}

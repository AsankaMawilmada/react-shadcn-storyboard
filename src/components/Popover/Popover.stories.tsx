import type { Meta, StoryObj } from '@storybook/react-vite'
import { Popover, PopoverContent, PopoverTrigger } from './Popover'
import { Button } from '../Button'

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Popover>

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger
        render={<Button variant="outline">Open popover</Button>}
      />
      <PopoverContent>
        <div className="grid gap-2">
          <h4 className="leading-none font-medium">Dimensions</h4>
          <p className="text-sm text-muted-foreground">
            Set the dimensions for the layer.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
}

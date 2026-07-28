import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChevronsUpDown } from 'lucide-react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './collapsible'
import { Button } from '../button'

const meta: Meta<typeof Collapsible> = {
  title: 'Components/Collapsible',
  component: Collapsible,
  tags: ['autodocs', '!dev'],
}
export default meta

type Story = StoryObj<typeof Collapsible>

export const Default: Story = {
  render: () => (
    <Collapsible defaultOpen={false} className="w-full max-w-md">
      <div className="flex items-center justify-between gap-4 px-1">
        <p className="text-sm font-medium">@peduarte starred 3 repositories</p>
        <CollapsibleTrigger
          render={
            <Button variant="ghost" size="icon" aria-label="Toggle">
              <ChevronsUpDown />
            </Button>
          }
        />
      </div>
      <div className="rounded-md border border-border px-4 py-2 text-sm shadow-sm">
        @radix-ui/primitives
      </div>
      <CollapsibleContent>
        <div className="mt-2 flex flex-col gap-2">
          <div className="rounded-md border border-border px-4 py-2 text-sm shadow-sm">
            @radix-ui/colors
          </div>
          <div className="rounded-md border border-border px-4 py-2 text-sm shadow-sm">
            @stitches/react
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  ),
}

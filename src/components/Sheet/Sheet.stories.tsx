import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './Sheet'
import { Button } from '../Button'
import { Input } from '../Input'
import { Label } from '../Label'

const meta: Meta<typeof Sheet> = {
  title: 'Components/Sheet',
  component: Sheet,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Sheet>

export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger render={<Button>Edit profile</Button>} />
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="sheet-name">Name</Label>
            <Input id="sheet-name" defaultValue="Pedro Duarte" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sheet-username">Username</Label>
            <Input id="sheet-username" defaultValue="@peduarte" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose render={<Button variant="outline">Cancel</Button>} />
          <Button>Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
}

export const Left: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger render={<Button>Open left</Button>} />
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>
            A sheet sliding in from the left edge.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
}

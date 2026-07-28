import type { Meta, StoryObj } from '@storybook/react-vite'
import { AspectRatio } from './aspect-ratio'

const meta: Meta<typeof AspectRatio> = {
  title: 'Components/AspectRatio',
  component: AspectRatio,
  tags: ['autodocs', '!dev'],
}
export default meta

type Story = StoryObj<typeof AspectRatio>

export const Default: Story = {
  render: () => (
    <div className="w-96">
      <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-md bg-muted">
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Landscape"
          className="absolute inset-0 size-full object-cover"
        />
      </AspectRatio>
    </div>
  ),
}

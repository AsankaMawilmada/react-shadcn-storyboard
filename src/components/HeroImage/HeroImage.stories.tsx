import type { Meta, StoryObj } from '@storybook/react-vite'
import { HeroImage } from './HeroImage'

const IMAGE_SRC =
  'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=1200&dpr=2&q=80'

const meta: Meta<typeof HeroImage> = {
  title: 'Components/HeroImage',
  component: HeroImage,
  tags: ['autodocs'],
  args: {
    src: IMAGE_SRC,
    alt: 'Mountain landscape at sunset',
  },
  render: (args) => (
    <div className="w-full max-w-2xl">
      <HeroImage {...args} />
    </div>
  ),
}
export default meta

type Story = StoryObj<typeof HeroImage>

export const Default: Story = {
  args: {
    children: (
      <>
        <h1 className="text-2xl font-semibold">Explore the highlands</h1>
        <p className="text-sm text-white/80">
          Guided tours starting every weekend this summer.
        </p>
      </>
    ),
  },
}

export const WithoutContent: Story = {}

export const WithoutOverlay: Story = {
  args: {
    overlay: false,
    children: (
      <h1 className="rounded bg-black/60 px-2 py-1 text-lg font-semibold">
        Explore the highlands
      </h1>
    ),
  },
}

export const SquareRatio: Story = {
  args: {
    ratio: 1,
    children: <h1 className="text-xl font-semibold">Explore the highlands</h1>,
  },
}

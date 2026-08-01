import type { Meta, StoryObj } from '@storybook/react-vite'
import { ToastProvider, Toaster, useToastManager } from './Toast'
import { Button } from '../Button'

const meta: Meta<typeof ToastProvider> = {
  title: 'Components/Toast',
  component: ToastProvider,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof ToastProvider>

const ToastDemoTrigger = () => {
  const toastManager = useToastManager()

  return (
    <Button
      onClick={() =>
        toastManager.add({
          title: 'Scheduled',
          description: 'Your meeting has been scheduled.',
        })
      }
    >
      Add to calendar
    </Button>
  )
}

export const Default: Story = {
  render: () => (
    <ToastProvider>
      <Toaster />
      <ToastDemoTrigger />
    </ToastProvider>
  ),
}

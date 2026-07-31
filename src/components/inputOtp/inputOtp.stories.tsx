import type { Meta, StoryObj } from '@storybook/react-vite'
import { InputOTP, InputOTPGroup, InputOTPSlot } from './inputOtp'

const meta: Meta<typeof InputOTP> = {
  title: 'Components/InputOTP',
  component: InputOTP,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof InputOTP>

export const Default: Story = {
  render: () => (
    <InputOTP length={6}>
      <InputOTPGroup>
        <InputOTPSlot />
        <InputOTPSlot />
        <InputOTPSlot />
        <InputOTPSlot />
        <InputOTPSlot />
        <InputOTPSlot />
      </InputOTPGroup>
    </InputOTP>
  ),
}

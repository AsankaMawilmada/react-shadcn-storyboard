import type { Meta, StoryObj } from '@storybook/react-vite'
import { Form, FormControl, FormDescription, FormField, FormLabel, FormMessage } from './form'
import { Button } from '../button'
import { Input } from '../input'

const meta: Meta<typeof Form> = {
  title: 'UI/Form',
  component: Form,
  tags: ['autodocs', '!dev'],
}
export default meta

type Story = StoryObj<typeof Form>

export const Default: Story = {
  render: () => (
    <Form
      className="grid w-full max-w-sm gap-4"
      onFormSubmit={(values) => {
        console.log(values)
      }}
    >
      <FormField name="email" className="grid gap-2">
        <FormLabel>Email</FormLabel>
        <FormControl render={<Input type="email" required placeholder="you@example.com" />} />
        <FormDescription>We&apos;ll never share your email.</FormDescription>
        <FormMessage />
      </FormField>
      <Button type="submit">Submit</Button>
    </Form>
  ),
}

import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-80">
      <TabsList className="w-full">
        <TabsTrigger value="account" className="flex-1">
          Account
        </TabsTrigger>
        <TabsTrigger value="password" className="flex-1">
          Password
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  ),
};

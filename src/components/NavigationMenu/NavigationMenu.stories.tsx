import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './NavigationMenu'

const meta: Meta<typeof NavigationMenu> = {
  title: 'Components/NavigationMenu',
  component: NavigationMenu,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof NavigationMenu>

export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-72 gap-1">
              <li>
                <NavigationMenuLink href="#">
                  <div className="font-medium">Introduction</div>
                  <div className="text-muted-foreground">
                    Learn the basics of the library.
                  </div>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#">
                  <div className="font-medium">Installation</div>
                  <div className="text-muted-foreground">
                    How to install and configure it.
                  </div>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-72 gap-1">
              <li>
                <NavigationMenuLink href="#">
                  <div className="font-medium">Button</div>
                  <div className="text-muted-foreground">
                    Displays a button or a link.
                  </div>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#">
                  <div className="font-medium">Select</div>
                  <div className="text-muted-foreground">
                    Pick a value from a list.
                  </div>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
}

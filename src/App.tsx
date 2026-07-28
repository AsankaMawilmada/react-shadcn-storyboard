import { Button } from '@/components/button'
import { Badge } from '@/components/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/card'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import { Switch } from '@/components/switch'
import { ThemeProvider, useTheme } from '@/components/theme-provider'

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="theme-switch">Midnight theme</Label>
      <Switch
        id="theme-switch"
        checked={theme === 'midnight'}
        onCheckedChange={(checked: boolean) =>
          setTheme(checked ? 'midnight' : 'default')
        }
      />
    </div>
  )
}

const App = () => (
  <ThemeProvider>
    <main className="mx-auto flex min-h-screen max-w-(--layout-content-max-width) flex-col gap-8 px-(--layout-margin) py-12">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">shadcn-test</h1>
          <p className="text-muted-foreground">
            A component library boilerplate, themed from Figma design tokens.
          </p>
        </div>
        <ThemeToggle />
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>
            Enter your email below to sign in to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <div className="flex gap-2">
            <Button className="flex-1">Sign in</Button>
            <Button variant="outline" className="flex-1">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2">
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="destructive">Destructive</Badge>
      </div>
    </main>
  </ThemeProvider>
)

export default App

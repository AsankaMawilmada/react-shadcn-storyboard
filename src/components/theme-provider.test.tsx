import { afterEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider, useTheme } from './theme-provider'

afterEach(() => {
  document.documentElement.removeAttribute('data-theme')
})

const ThemeConsumer = () => {
  const { theme, setTheme } = useTheme()
  return (
    <div>
      <span>Current: {theme}</span>
      <button onClick={() => setTheme('midnight')}>Go midnight</button>
      <button onClick={() => setTheme('default')}>Go default</button>
    </div>
  )
}

describe('ThemeProvider', () => {
  it('renders its children', () => {
    render(
      <ThemeProvider>
        <div>content</div>
      </ThemeProvider>,
    )
    expect(screen.getByText('content')).toBeInTheDocument()
  })

  it('defaults to the default theme and clears data-theme from <html>', () => {
    document.documentElement.setAttribute('data-theme', 'leftover')
    render(
      <ThemeProvider>
        <div />
      </ThemeProvider>,
    )
    expect(document.documentElement).not.toHaveAttribute('data-theme')
  })

  it('applies data-theme when defaultTheme is midnight', () => {
    render(
      <ThemeProvider defaultTheme="midnight">
        <div />
      </ThemeProvider>,
    )
    expect(document.documentElement).toHaveAttribute('data-theme', 'midnight')
  })

  it('useTheme reflects the current theme and setTheme updates data-theme', async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    )
    expect(screen.getByText('Current: default')).toBeInTheDocument()
    expect(document.documentElement).not.toHaveAttribute('data-theme')

    await user.click(screen.getByRole('button', { name: 'Go midnight' }))
    expect(screen.getByText('Current: midnight')).toBeInTheDocument()
    expect(document.documentElement).toHaveAttribute('data-theme', 'midnight')

    await user.click(screen.getByRole('button', { name: 'Go default' }))
    expect(screen.getByText('Current: default')).toBeInTheDocument()
    expect(document.documentElement).not.toHaveAttribute('data-theme')
  })

  it('useTheme throws when called outside a ThemeProvider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<ThemeConsumer />)).toThrow(
      'useTheme must be used within a ThemeProvider',
    )
    consoleError.mockRestore()
  })
})

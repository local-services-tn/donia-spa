import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Custom colors for the restaurant
const colors = {
  border: 'hsl(var(--border))',
  input: 'hsl(var(--input))',
  ring: 'hsl(var(--ring))',
  background: 'hsl(var(--background))',
  foreground: 'hsl(var(--foreground))',
  primary: 'hsl(var(--primary))',
  'primary-foreground': 'hsl(var(--primary-foreground))',
  secondary: 'hsl(var(--secondary))',
  'secondary-foreground': 'hsl(var(--secondary-foreground))',
  muted: 'hsl(var(--muted))',
  'muted-foreground': 'hsl(var(--muted-foreground))',
  accent: 'hsl(var(--accent))',
  'accent-foreground': 'hsl(var(--accent-foreground))',
  destructive: 'hsl(var(--destructive))',
  'destructive-foreground': 'hsl(var(--destructive-foreground))',
  card: 'hsl(var(--card))',
  'card-foreground': 'hsl(var(--card-foreground))',
  popover: 'hsl(var(--popover))',
  'popover-foreground': 'hsl(var(--popover-foreground))',
  rounded: 'hsl(var(--rounded))',
  'glass-blur': 'hsl(var(--glass-blur))',
  sidebar: 'hsl(var(--sidebar))',
  'sidebar-foreground': 'hsl(var(--sidebar-foreground))',
  'sidebar-primary': 'hsl(var(--sidebar-primary))',
  'sidebar-accent': 'hsl(var(--sidebar-accent))',
} as const

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/donia-restaurant/',
  build: {
    rolloutOptions: {
      sourcemap: true,
    }
  }
})
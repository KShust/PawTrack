import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import BottomNav from './BottomNav'

const meta = {
  title: 'Layout/BottomNav',
  component: BottomNav,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
      navigation: { pathname: '/en/dashboard' },
    },
    docs: {
      description: {
        component:
          'Mobile tab bar, visible below 768px. Only the active item shows its label; the rest ' +
          'keep theirs as `sr-only`, so an icon-only item is still announced. Each target is ' +
          '56px tall, above the 44px minimum for touch.',
      },
    },
  },
  globals: { viewport: { value: 'mobile' } },
} satisfies Meta<typeof BottomNav>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const HealthActive: Story = {
  parameters: {
    nextjs: { appDirectory: true, navigation: { pathname: '/en/health' } },
  },
}

/** Above 768px the bar is hidden entirely — the Sidebar takes over. */
export const HiddenOnDesktop: Story = {
  globals: { viewport: { value: 'desktop' } },
}

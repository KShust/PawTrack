import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Sidebar from './Sidebar'

const meta = {
  title: 'Layout/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
      navigation: { pathname: '/en/dashboard' },
    },
    docs: {
      description: {
        component:
          'Desktop navigation rail. Hidden below 768px, icon-only between 768px and 1024px, ' +
          'labelled above that. The label is never removed from the DOM — it switches between ' +
          '`sr-only` and visible — so every item keeps an accessible name at the narrow width, ' +
          'and the current item carries `aria-current="page"`.',
      },
    },
  },
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

/** ≥1024px: icons with labels. */
export const Expanded: Story = {
  globals: { viewport: { value: 'desktop' } },
}

/** 768–1023px: icon-only rail, labels still announced. */
export const IconOnly: Story = {
  globals: { viewport: { value: 'tablet' } },
}

/** A different route is active. */
export const CalendarActive: Story = {
  parameters: {
    nextjs: { appDirectory: true, navigation: { pathname: '/en/calendar' } },
  },
}

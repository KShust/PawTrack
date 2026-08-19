import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import Card from './Card'

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component:
          'The base surface. Passing `onClick` swaps the wrapper from `<div>` to `<button>`, ' +
          'so a clickable card is reachable with Tab and activates on Enter/Space instead of ' +
          'being mouse-only. Try tabbing into the interactive stories below.',
      },
    },
  },
  args: {
    className: 'p-5',
    children: (
      <>
        <p className="text-heading-3">Card title</p>
        <p className="text-body">Anything can go inside a card.</p>
      </>
    ),
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

/** Static card: renders a `<div>`, not focusable. */
export const Static: Story = {}

/** With `onClick` the card becomes a real button — focusable, Enter/Space activates it. */
export const Interactive: Story = {
  args: { onClick: fn() },
}

/** A card that toggles a disclosure reports its state through `aria-expanded`. */
export const Expandable: Story = {
  args: { onClick: fn(), ariaExpanded: true },
}

/** Tinted variant, as used for the selected pet on the dashboard. */
export const Tinted: Story = {
  args: {
    onClick: fn(),
    style: {
      background: 'var(--tint-primary-bg)',
      borderColor: 'var(--tint-primary-solid)',
    },
  },
}

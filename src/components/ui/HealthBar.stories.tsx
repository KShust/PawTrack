import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import HealthBar from './HealthBar'

const meta = {
  title: 'UI/HealthBar',
  component: HealthBar,
  parameters: {
    docs: {
      description: {
        component:
          'Health score readout. Exposed as `role="progressbar"` with `aria-valuenow` and an ' +
          '`aria-valuetext` of "75/100", so a screen reader announces the score rather than a ' +
          'bare percentage. `label` is required because a progressbar has no implicit name.',
      },
    },
  },
  args: {
    score: 75,
    color: 'var(--tint-primary-solid)',
    label: 'Health score for Mia',
  },
  argTypes: {
    score: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    color: {
      control: 'select',
      options: [
        'var(--tint-primary-solid)',
        'var(--tint-accent-solid)',
        'var(--tint-purple-solid)',
        'var(--tint-blue-solid)',
      ],
    },
  },
  decorators: [
    Story => (
      <div style={{ width: 260 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HealthBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithVisibleLabel: Story = {
  args: { showLabel: true },
}

export const Empty: Story = { args: { score: 0 } }

export const Full: Story = { args: { score: 100 } }

export const AllColours: Story = {
  render: args => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['primary', 'accent', 'purple', 'blue'] as const).map(tint => (
        <HealthBar
          key={tint}
          {...args}
          color={`var(--tint-${tint}-solid)`}
          label={`Health score, ${tint}`}
          showLabel
        />
      ))}
    </div>
  ),
}

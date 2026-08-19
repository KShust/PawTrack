import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Chip from './Chip'

const meta = {
  title: 'UI/Chip',
  component: Chip,
  parameters: {
    docs: {
      description: {
        component:
          'A compact label / value pair. Colours come from the `--tint-*` token families, ' +
          'so every variant keeps at least 4.5:1 between its text and its fill in both themes.',
      },
    },
  },
  args: {
    label: 'Female',
    sublabel: 'Sex',
    variant: 'neutral',
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'accent', 'neutral', 'outline'] },
    textColor: {
      control: 'select',
      options: [undefined, 'var(--tint-primary-fg)', 'var(--tint-accent-fg)', 'var(--tint-blue-fg)'],
    },
  },
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

export const Neutral: Story = {}

export const Primary: Story = { args: { variant: 'primary' } }

export const Accent: Story = { args: { variant: 'accent' } }

/** The variant used across pet cards, where chips sit on a tinted card. */
export const Outline: Story = { args: { variant: 'outline' } }

/** Without a sublabel the chip collapses to a single line. */
export const LabelOnly: Story = { args: { sublabel: undefined } }

/** `textColor` tints only the value, for stats that carry a pet's colour. */
export const ColouredValue: Story = {
  args: { label: '75/100', sublabel: 'Health', variant: 'outline', textColor: 'var(--tint-primary-fg)' },
}

export const AllVariants: Story = {
  render: args => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {(['primary', 'accent', 'neutral', 'outline'] as const).map(variant => (
        <Chip key={variant} {...args} variant={variant} label={variant} />
      ))}
    </div>
  ),
}

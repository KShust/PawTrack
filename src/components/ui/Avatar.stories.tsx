import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import Avatar from './Avatar'

const meta = {
  title: 'UI/Avatar',
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component:
          'Pet portrait with a species icon fallback. The fallback icon is `aria-hidden` — ' +
          'every place that renders an Avatar also renders the pet name next to it, so ' +
          'announcing the icon would duplicate that name.',
      },
    },
  },
  args: {
    name: 'Mia',
    petType: 'cat',
    size: 'md',
    color: 'var(--tint-primary-solid)',
  },
  argTypes: {
    color: {
      control: 'select',
      options: [
        'var(--tint-primary-solid)',
        'var(--tint-accent-solid)',
        'var(--tint-purple-solid)',
        'var(--tint-blue-solid)',
      ],
    },
    size: { control: 'inline-radio', options: ['xs', 'sm', 'md', 'lg'] },
    variant: { control: 'inline-radio', options: ['default', 'contrast'] },
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithPhoto: Story = {
  args: { photoUrl: '/pet-photo-sample.svg' },
}

export const Dog: Story = {
  args: { petType: 'dog', name: 'Rex', color: 'var(--tint-accent-solid)' },
}

/** `contrast` is for avatars sitting on a tinted surface rather than a plain one. */
export const OnTintedSurface: Story = {
  args: { variant: 'contrast' },
  decorators: [
    Story => (
      <div style={{ background: 'var(--tint-primary-bg)', padding: 24, borderRadius: 'var(--radius-3xl)' }}>
        <Story />
      </div>
    ),
  ],
}

export const AllSizes: Story = {
  render: args => (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16 }}>
      {(['xs', 'sm', 'md', 'lg'] as const).map(size => (
        <div key={size} style={{ textAlign: 'center' }}>
          <Avatar {...args} size={size} />
          <p className="text-caption" style={{ marginTop: 8 }}>{size}</p>
        </div>
      ))}
    </div>
  ),
}

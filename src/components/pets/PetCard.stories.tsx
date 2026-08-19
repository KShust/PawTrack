import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { fn } from 'storybook/test'
import { getPetPalette } from '@/lib/petColors'
import PetCard from './PetCard'
import { catWithPhoto, dog, longNamePet, minimalPet } from './pets.fixtures'

const meta = {
  title: 'Pets/PetCard',
  component: PetCard,
  parameters: {
    docs: {
      description: {
        component:
          'The dashboard card for one pet. It has three shapes: compact, expanded, and — on ' +
          'tablet, when a sibling is expanded — a collapsed avatar-only rail. The whole card ' +
          'is a button and reports its disclosure state with `aria-expanded`.',
      },
    },
  },
  args: {
    pet: catWithPhoto,
    palette: getPetPalette(0),
    isActive: true,
    isExpanded: false,
    isTablet: false,
    hasExpanded: false,
    onClick: fn(),
  },
  argTypes: {
    palette: { control: false },
    pet: { control: false },
  },
  decorators: [
    Story => (
      <div style={{ maxWidth: 560 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PetCard>

export default meta
type Story = StoryObj<typeof meta>

export const Compact: Story = {}

export const Expanded: Story = {
  args: { isExpanded: true, hasExpanded: true },
}

export const Inactive: Story = {
  args: { isActive: false },
}

/** Tablet, sibling expanded: this card collapses to an avatar-only rail. */
export const CollapsedRail: Story = {
  args: { isActive: false, isTablet: true, hasExpanded: true },
  decorators: [
    Story => (
      <div style={{ width: 96 }}>
        <Story />
      </div>
    ),
  ],
}

/** Missing breed, birth date and weight all fall back rather than render blank. */
export const MinimalData: Story = {
  args: { pet: minimalPet, palette: getPetPalette(3), isExpanded: true },
}

/** Long names truncate in compact mode instead of pushing the layout. */
export const LongName: Story = {
  args: { pet: longNamePet, palette: getPetPalette(2) },
}

export const EveryPalette: Story = {
  render: args => (
    <div style={{ display: 'grid', gap: 12 }}>
      {[catWithPhoto, dog, minimalPet, longNamePet].map((pet, index) => (
        <PetCard key={pet.id} {...args} pet={pet} palette={getPetPalette(index)} />
      ))}
    </div>
  ),
}

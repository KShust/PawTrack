import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { getPetPalette } from '@/lib/petColors'
import PetHeroCard from './PetHeroCard'
import { catWithPhoto, dog, minimalPet } from './pets.fixtures'

const meta = {
  title: 'Pets/PetHeroCard',
  component: PetHeroCard,
  parameters: {
    docs: {
      description: {
        component:
          'The mobile summary card. The whole card is one link to the pet profile, so the link ' +
          'text is the pet name and breed rather than a bare "view".',
      },
    },
  },
  args: {
    pet: catWithPhoto,
    palette: getPetPalette(0),
  },
  argTypes: {
    pet: { control: false },
    palette: { control: false },
  },
  decorators: [
    Story => (
      <div style={{ maxWidth: 420 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PetHeroCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Dog: Story = {
  args: { pet: dog, palette: getPetPalette(1) },
}

export const MinimalData: Story = {
  args: { pet: minimalPet, palette: getPetPalette(3) },
}

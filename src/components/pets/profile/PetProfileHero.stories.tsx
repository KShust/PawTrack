import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { getPetPalette } from '@/lib/petColors'
import PetProfileHero from './PetProfileHero'
import { catWithPhoto, dog, minimalPet } from '../pets.fixtures'

const meta = {
  title: 'Pets/PetProfileHero',
  component: PetProfileHero,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Header of the pet profile page. Holds the page `<h1>`. The tint is passed in from ' +
          "the page rather than derived here, so a pet keeps the colour it has on the " +
          'dashboard — the colour follows the pet across screens.',
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
} satisfies Meta<typeof PetProfileHero>

export default meta
type Story = StoryObj<typeof meta>

export const FirstPet: Story = {}

export const SecondPet: Story = {
  args: { pet: dog, palette: getPetPalette(1) },
}

export const MinimalData: Story = {
  args: { pet: minimalPet, palette: getPetPalette(3) },
}

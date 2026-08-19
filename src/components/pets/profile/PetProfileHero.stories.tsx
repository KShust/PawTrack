import type { Meta, StoryObj } from '@storybook/nextjs-vite'
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
          'Header of the pet profile page. Holds the page `<h1>`; the tint comes from the ' +
          'species, since a single-pet screen has no list index to colour by.',
      },
    },
  },
  args: { pet: catWithPhoto },
  argTypes: { pet: { control: false } },
} satisfies Meta<typeof PetProfileHero>

export default meta
type Story = StoryObj<typeof meta>

export const Cat: Story = {}

export const Dog: Story = { args: { pet: dog } }

export const MinimalData: Story = { args: { pet: minimalPet } }

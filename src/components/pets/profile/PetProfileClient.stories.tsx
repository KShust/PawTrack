import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import PetProfileClient from './PetProfileClient'
import { cat, catWithPhoto, dog, minimalPet } from '../pets.fixtures'

const meta = {
  title: 'Pets/PetProfileClient',
  component: PetProfileClient,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The full pet profile screen. `paletteIndex` is the pet\'s position in its owner\'s ' +
          'list, so the tint here matches the one the same pet has on the dashboard. ' +
          '\n\nThe section switcher follows the WAI-ARIA tabs pattern: `role="tablist"`, a roving ' +
          'tabindex (Tab enters the tablist once, then moves past it), and ArrowLeft / ' +
          'ArrowRight / Home / End between tabs. Focus the selected tab and try the arrow keys.',
      },
    },
  },
  args: { pet: catWithPhoto, paletteIndex: 0 },
  argTypes: {
    pet: { control: false },
    paletteIndex: { control: { type: 'inline-radio' }, options: [0, 1, 2, 3] },
  },
} satisfies Meta<typeof PetProfileClient>

export default meta
type Story = StoryObj<typeof meta>

export const FirstPet: Story = {}

export const SecondPet: Story = {
  args: { pet: dog, paletteIndex: 1 },
}

export const ThirdPet: Story = {
  args: { pet: cat, paletteIndex: 2 },
}

export const FourthPetMinimalData: Story = {
  args: { pet: minimalPet, paletteIndex: 3 },
}

export const Mobile: Story = {
  globals: { viewport: { value: 'mobile' } },
}

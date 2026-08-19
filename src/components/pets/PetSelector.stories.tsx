import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import PetSelector from './PetSelector'
import { catWithPhoto, manyPets, pets } from './pets.fixtures'

const meta = {
  title: 'Pets/PetSelector',
  component: PetSelector,
  parameters: {
    docs: {
      description: {
        component:
          'The responsive shell around the pet cards. It reads `useBreakpoint()` and swaps ' +
          'layouts at 768px and 1024px: pill switcher + hero card on mobile, a flexing row of ' +
          'cards on tablet and desktop. Use the viewport toolbar to cross those breakpoints — ' +
          'the component re-renders from `matchMedia`, so the switch happens live.',
      },
    },
  },
  args: { pets },
  argTypes: { pets: { control: false } },
} satisfies Meta<typeof PetSelector>

export default meta
type Story = StoryObj<typeof meta>

export const Desktop: Story = {
  globals: { viewport: { value: 'desktop' } },
}

export const Tablet: Story = {
  globals: { viewport: { value: 'tablet' } },
}

export const Mobile: Story = {
  globals: { viewport: { value: 'mobile' } },
}

/** More pets than palettes — the colour assignment wraps around. */
export const ManyPets: Story = {
  args: { pets: manyPets },
}

export const SinglePet: Story = {
  args: { pets: [catWithPhoto] },
}

/** No pets yet: the empty message is rendered instead of an empty row. */
export const Empty: Story = {
  args: { pets: [] },
}

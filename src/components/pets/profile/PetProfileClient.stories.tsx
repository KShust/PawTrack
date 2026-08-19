import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import PetProfileClient from './PetProfileClient'
import { catWithPhoto, dog } from '../pets.fixtures'

const meta = {
  title: 'Pets/PetProfileClient',
  component: PetProfileClient,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The full pet profile screen. The section switcher follows the WAI-ARIA tabs ' +
          'pattern: `role="tablist"`, a roving tabindex (Tab enters the tablist once, then ' +
          'moves past it), and ArrowLeft / ArrowRight / Home / End between tabs. Focus the ' +
          'selected tab and try the arrow keys.',
      },
    },
  },
  args: { pet: catWithPhoto },
  argTypes: { pet: { control: false } },
} satisfies Meta<typeof PetProfileClient>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Dog: Story = { args: { pet: dog } }

export const Mobile: Story = {
  globals: { viewport: { value: 'mobile' } },
}

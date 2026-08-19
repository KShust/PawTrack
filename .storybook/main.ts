import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(ts|tsx)',
  ],

  addons: [
    '@storybook/addon-docs',   // autodocs + MDX pages
    '@storybook/addon-a11y',   // axe-core audit per story
    '@storybook/addon-themes', // light / dark switcher in the toolbar
  ],

  framework: {
    name: '@storybook/nextjs-vite',
    options: {},
  },

  staticDirs: ['../public'],

  typescript: {
    // Reads prop types + JSDoc off the component's interface so the Controls
    // table documents itself.
    reactDocgen: 'react-docgen-typescript',
  },
};

export default config;

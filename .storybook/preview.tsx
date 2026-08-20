import React from 'react';
import type { Preview } from '@storybook/nextjs-vite';
import { withThemeByClassName } from '@storybook/addon-themes';
import { NextIntlClientProvider } from 'next-intl';

import '../src/app/globals.css';
import './preview.css';

import en from '../messages/en.json';
import uk from '../messages/uk.json';

const messagesByLocale = { en, uk } as const;

if (typeof document !== 'undefined') {
  const root = document.documentElement;
  let frame = 0;

  new MutationObserver(() => {
    root.setAttribute('data-theme-switching', '');
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => root.removeAttribute('data-theme-switching'));
    });
  }).observe(root, { attributes: true, attributeFilter: ['class'] });
}

type LocaleKey = keyof typeof messagesByLocale;

/**
 * The app's own breakpoints, so a story can be checked at exactly the widths
 * `useBreakpoint` switches on (768px / 1024px).
 */
const viewports = {
  mobile: {
    name: 'Mobile (375px)',
    styles: { width: '375px', height: '812px' },
    type: 'mobile' as const,
  },
  mobileWide: {
    name: 'Mobile wide (430px)',
    styles: { width: '430px', height: '932px' },
    type: 'mobile' as const,
  },
  tablet: {
    name: 'Tablet (820px)',
    styles: { width: '820px', height: '1180px' },
    type: 'tablet' as const,
  },
  desktop: {
    name: 'Desktop (1280px)',
    styles: { width: '1280px', height: '800px' },
    type: 'desktop' as const,
  },
};

const preview: Preview = {
  parameters: {
    // Enables the next/navigation mocks (usePathname, useRouter) that the
    // nav and profile components call.
    nextjs: { appDirectory: true },

    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },

    a11y: {
      // 'todo' reports violations in the a11y panel without failing the run.
      // Switch to 'error' once the backlog is clear to make it a hard gate.
      test: 'todo',
    },

    viewport: { options: viewports },

    // The theme decorator paints the background, so the backgrounds tool would
    // only fight with it.
    backgrounds: { disable: true },

    docs: { toc: true },

    options: {
      storySort: {
        order: ['Design', ['Tokens'], 'UI', 'Pets', 'Layout'],
      },
    },
  },

  initialGlobals: {
    viewport: { value: 'desktop', isRotated: false },
    locale: 'en',
  },

  globalTypes: {
    locale: {
      description: 'Active next-intl locale',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'en', title: 'English' },
          { value: 'uk', title: 'Українська' },
        ],
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    // Innermost: every component below calls useTranslations().
    (Story, context) => {
      const locale = (context.globals.locale ?? 'en') as LocaleKey;
      return (
        <NextIntlClientProvider locale={locale} messages={messagesByLocale[locale]}>
          <div className="sb-canvas">
            <Story />
          </div>
        </NextIntlClientProvider>
      );
    },

    // Outermost: toggles `.dark` on <html>, which is what globals.css keys off.
    withThemeByClassName({
      themes: { light: '', dark: 'dark' },
      defaultTheme: 'light',
    }),
  ],

  tags: ['autodocs'],
};

export default preview;

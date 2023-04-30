import type { StorybookConfig } from '@storybook/nextjs';
import type { AddonOptionsBabel } from '@storybook/addon-coverage';

const coverageConfig: AddonOptionsBabel = {
  istanbul: {
    excludeNodeModules: true,
    useInlineSourceMaps: false,
  },
};

const config: StorybookConfig = {
  stories: ['../components/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-coverage',
      options: coverageConfig,
    },
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  features: {
    storyStoreV7: true,
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../public'],
};

export default config;

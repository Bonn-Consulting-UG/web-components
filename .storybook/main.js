const json = require('@rollup/plugin-json');

module.exports = {
  stories: ['../dist/**/**/docs/*.stories.{js,md,mdx}'],
  addon: [
    {
      name: '@storybook/addons',
      options: {
        enableShortcuts: false,
      },
    },
  ],
  rollupConfig(config) {
    // add a new plugin to the build
    config.plugins.push(json());
    return config;
  },
};

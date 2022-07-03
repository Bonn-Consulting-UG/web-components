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
};

module.exports = {
  "stories": ['../dist/components/**/**/docs/*.stories.{js,md,mdx}'],
  "addons": ["@storybook/addon-links", "@storybook/addon-essentials"],
  "framework": {
    name: "@storybook/web-components-webpack5",
    options: {}
  },
  docs: {
    autodocs: true
  }
};
module.exports = {
  "stories": ['../dist/components/**/**/docs/*.stories.{js,md,mdx}'],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "framework": "@storybook/web-components",
  rollupConfig(config) {
    return config;
  },
}
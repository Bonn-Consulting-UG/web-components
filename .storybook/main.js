const json = require('@rollup/plugin-json');

module.exports = {
  stories: ['../dist/**/**/docs/*.stories.{js,md,mdx}'],
  rollupConfig(config) {
    // add a new plugin to the build
    config.plugins.push(json());
    return config;
  }
};

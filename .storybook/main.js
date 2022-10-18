


module.exports = {
  stories: ['../dist/components/**/**/docs/*.stories.{js,md,mdx}'],
  rollupConfig(config) {
    return config;
  },
};

    // config.plugins.push( replace({
    //   'process.env.API_BASE_URL': JSON.stringify(process.env.API_BASE_URL)
    // }))

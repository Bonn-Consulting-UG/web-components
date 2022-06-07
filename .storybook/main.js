module.exports = {
  stories: ['../src/components/**/docs/*.stories.{js,md,mdx,ts}'],
  babel: async options => ({
    options: {
      ...options,
      plugins: [
        ...options.plugins,
        [
          '@babel/plugin-proposal-decorators',
          {
            decoratorsBeforeExport: true,
          },
        ],
        ['@babel/plugin-proposal-class-properties', { loose: false }],
        ['@babel/plugin-proposal-private-methods', { loose: false }],
      ],
    },
  }),
};

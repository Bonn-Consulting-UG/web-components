import { storybookPlugin } from '@web/dev-server-storybook';
import baseConfig from '../web-dev-server.config.mjs';

export default /** @type {import('@web/dev-server').DevServerConfig} */ ({
  ...baseConfig,
  open: '/',
  nodeResolve: true,
  plugins: [storybookPlugin({ type: 'web-components' }), ...baseConfig.plugins],
  addon: [
    {
      name: '@storybook/addons',
      options: {
        enableShortcuts: false,
      },
    },
  ],
});

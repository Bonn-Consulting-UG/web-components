import { hmrPlugin, presets } from '@open-wc/dev-server-hmr';
import { esbuildPlugin } from '@web/dev-server-esbuild';

/** Use Hot Module replacement by adding --hmr to the start command */
const hmr = process.argv.includes('--hmr');

export default /** @type {import('@web/dev-server').DevServerConfig} */ ({
  open: '/demo/',
  /** Use regular watch mode if HMR is not enabled. */
  watch: !hmr,
  /** Resolve bare module imports */

  /** Compile JS for older browsers. Requires @web/dev-server-esbuild plugin */
  // esbuildTarget: 'auto'

  /** Set appIndex to enable SPA routing */
  // appIndex: 'demo/index.html',

  plugins: [
    esbuildPlugin({ ts: true, target: 'auto' }),
    hmr &&
      hmrPlugin({
        exclude: ['**/*/node_modules/**/*'],
        include: ['src/**/*'],
        presets: [presets.lit],
      }),
  ],

  // See documentation for all available options
});

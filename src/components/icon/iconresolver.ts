import { icons } from '@lion/icon';

function resolveBcgIcons(iconset: any, name: any) {
  switch (iconset) {
    case 'comments':
      return import('./export-icons.js').then((module: any) => module[name]);
    default:
      throw new Error(`Unknown iconset ${iconset}`);
  }
}

icons.addIconResolver('bcg', resolveBcgIcons);

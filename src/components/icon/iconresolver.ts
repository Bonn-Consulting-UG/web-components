import { icons } from '@lion/icon';

function resolveBcgIcons(iconset: any, name: any) {
  switch (iconset) {
    case 'comments':
      return import('./export-comment-icons.js').then(
        (module: any) => module[name]
      );
    case 'general':
      return import('./export-general-icons.js').then(
        (module: any) => module[name]
      );
    case 'spamfilter':
      return import('./export-spamfilter-icons.js').then(
        (module: any) => module[name]
      );
    default:
      throw new Error(`Unknown iconset ${iconset}`);
  }
}

icons.addIconResolver('bcg', resolveBcgIcons);

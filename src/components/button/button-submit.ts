import { css, customElement, unsafeCSS } from '@lion/core';
import { LionButtonSubmit } from '@lion/button';

const buttoPadding: any = '10px 30px;';

export class BcgButtonSubmit extends LionButtonSubmit {
  static get styles() {
    return [
      ...super.styles,
      css`
        :host {
          background-color: var(--secondary-color);
          border-radius: var(--border-radius-l);
          font-family: var(--primary-body-medium-L);
          color: var(--primary-color);
          padding: ${unsafeCSS(buttoPadding)};
        }
        :host(:hover) {
          box-shadow: var(--core-shadow-plus-10);
          background-color: var(--secondary-color);
        }
        :host(:active) {
          background-color: var(--secondary-color-600);
        }
        :host([variant='primary']:focused) {
        }
      `
    ];
  }
}

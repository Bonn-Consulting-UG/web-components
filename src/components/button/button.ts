import { css, customElement, unsafeCSS } from '@lion/core';
import { LionButton } from '@lion/button';

const buttoPadding: any = '10px 30px;';

@customElement('bcg-button')
export class BcgButton extends LionButton {
  static get properties() {
    return {
      ...super.properties,
      variant: {
        type: String,
        reflect: true
      },
      style: {
        type: String,
        reflect: true
      },
      size: {
        type: String,
        reflect: true
      }
    };
  }

  static get styles() {
    return [
      ...super.styles,
      css`
        :host([variant='primary']) {
          background-color: var(--secondary-color);
          border-radius: var(--border-radius-l);
          font-family: var(--primary-body-medium-L);
          color: var(--primary-color);
          padding: ${unsafeCSS(buttoPadding)};
        }
        :host([variant='secondary']) {
          background-color: var(--neutral-color-0);
          font-family: var(--primary-body-medium-L);
          color: var(--primary-color);
          border-radius: var(--border-radius-l);
          border: var(--border-xs) solid var(--primary-color);
          padding: ${unsafeCSS(buttoPadding)};
        }
        :host([variant='tertiary']) {
          background-color: var(--neutral-color-0);
          font-family: var(--primary-body-medium-L);
          color: var(--primary-color);
          border-radius: var(--border-radius-l);
          border: var(--border-xs) solid var(--primary-color);
          padding: ${unsafeCSS(buttoPadding)};
        }
      `
    ];
  }
}

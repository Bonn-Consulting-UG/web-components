import { css, unsafeCSS } from '@lion/core';
import { LionButton } from '@lion/button';

const buttoPadding: any = '10px 30px;';

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
          font-family: var(--primary-body-regular-L-font-family);
          color: var(--primary-color);
          padding: ${unsafeCSS(buttoPadding)};
        }
        :host([variant='primary']:hover) {
          background-color: var(--secondary-color);
          border-radius: var(--border-radius-l);
          font-family: var(--primary-body-regular-L-font-family);
          color: var(--primary-color);
          box-shadow: var(--core-shadow-plus-10);
        }
        :host([variant='primary']:active) {
          background-color: var(--secondary-color-600);
        }
        :host([variant='primary']:focused) {
        }
        :host([variant='primary'][disabled]) {
          background-color: var(--background-color-500);
          color: var(--neutral-color-500);
        }
        :host([variant='secondary']) {
          background-color: var(--neutral-color-0);
          font-family: var(--primary-body-regular-L-font-family);
          color: var(--primary-color);
          border-radius: var(--border-radius-l);
          border: var(--border-xs) solid var(--primary-color);
          padding: ${unsafeCSS(buttoPadding)};
        }
        :host([variant='secondary']:hover) {
          box-shadow: var(--core-shadow-plus-10);
        }
        :host([variant='secondary']:active) {
          background-color: var(--primary-color-100);
          border: none;
        }
        :host([variant='secondary'][disabled]) {
          background-color: var(--neutral-color-0);
          color: var(--neutral-color-500);
          border: var(--border-xs) solid var(--neutral-color-500);
        }
        :host([variant='tertiary']) {
          background-color: var(--neutral-color-0);
          font-family: var(--primary-body-regular-L-font-family);
          color: var(--primary-color);
          border-radius: var(--border-radius-l);
          border: var(--border-xs) solid var(--primary-color);
          padding: ${unsafeCSS(buttoPadding)};
        }
        :host([variant='tertiary']) {
          width: 35px;
          height: 35px;
          background-color: var(--neutral-color-0);
          font-family: var(--primary-body-regular-L-font-family);
          color: var(--primary-color);
          border-radius: 100%;
          border: var(--border-xs) solid var(--primary-color);
          padding: 0px;
          justify-content: center;
        }
        :host([variant='tertiary']:hover) {
          box-shadow: var(--core-shadow-plus-10);
        }
        :host([variant='tertiary']:active) {
          background-color: var(--primary-color-100);
          border: none;
        }
        :host([variant='tertiary'][disabled]) {
          background-color: var(--neutral-color-0);
          color: var(--neutral-color-500);
          border: var(--border-xs) solid var(--neutral-color-500);
        }
      `
    ];
  }
}

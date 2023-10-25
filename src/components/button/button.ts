import { css, unsafeCSS } from '@lion/core';
import { LionButton } from '@lion/button';

const buttoPadding: any = '10px 30px;';

export class BcgButton extends LionButton {
  static get properties() {
    return {
      ...super.properties,
      variant: {
        type: String,
        reflect: true,
      },
      style: {
        type: String,
        reflect: true,
      },
      size: {
        type: String,
        reflect: true,
      },
    };
  }

  static get styles() {
    return [
      ...super.styles,
      css`
        :host() {
          box-sizing: border-box;
        }
        :host([variant='primary']) {
          display: inline-block;
          font-family: var(--primary-button-default-font-family);
          font-size: var(--primary-button-default-font-size);
          font-weight: var(--primary-button-default-font-weight);
          color: var(--primary-button-default-foreground-color);
          line-height: var(--button-line-height);
          background-color: var(--primary-button-default-background-color);
          border: var(--primary-button-default-border);
          border-radius: var(--primary-button-default-border-radius);
          padding: var(--primary-button-default-inner-spacing);
        }
        :host([variant='primary']:hover) {
          /* States contain default state fallback value*/
          font-family: var(
            --primary-button-hover-font-family,
            var(--primary-default-hover-font-family)
          );
          font-size: var(
            --primary-button-hover-font-size,
            var(--primary-default-hover-font-size)
          );
          /* ... usw. */
          /* Only Values that changed need to be defined in global.css*/
          box-shadow: var(
            --primary-button-hover-box-shadow,
            var(--primary-button-default-box-shadow)
          );
          --foreground-color: white;
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
          font-family: var(
            --secondary-button-default-font-family,
            var(--primary-button-default-font-family)
          );
          font-size: var(
            --secondary-button-default-font-size,
            var(--primary-button-default-font-size)
          );
          font-weight: var(
            --secondary-button-default-font-weight,
            var(--primary-button-default-font-weight)
          );
          color: var(
            --secondary-button-default-foreground-color,
            var(--primary-button-default-foreground-color)
          );
          line-height: var(--button-line-height);
          background-color: var(
            --secondary-button-default-background-color,
            var(--primary-button-default-background-color)
          );
          border: var(
            --secondary-button-default-border,
            var(--primary-button-default-border)
          );
          border-radius: var(
            --secondary-button-default-border-radius,
            var(--primary-button-default-border-radius)
          );
          padding: var(
            --secondary-button-default-inner-spacing,
            var(--primary-button-default-inner-spacing)
          );
        }
        :host([variant='secondary']:hover) {
          box-shadow: var(--core-shadow-plus-10);
        }
        :host([variant='secondary']:active) {
          background-color: var(--primary-color-100);
          border: none;
        }

        :host([variant='tertiary']) {
          background-color: var(--neutral-color-0);
          font-family: var(--primary-body-regular-font-family);
          color: var(--primary-color);
          border-radius: var(--border-radius-l);
          border: var(--border-xs) solid var(--primary-color);
          padding: ${unsafeCSS(buttoPadding)};
        }
        :host([variant='tertiary']) {
          width: 35px;
          height: 35px;
          background-color: var(--neutral-color-0);
          font-family: var(--primary-body-regular-font-family);
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
      `,
    ];
  }
}

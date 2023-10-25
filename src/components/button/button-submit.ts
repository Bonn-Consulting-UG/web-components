import { css, customElement, unsafeCSS } from '@lion/core';
import { LionButtonSubmit } from '@lion/button';

const buttoPadding: any = '10px 30px;';

export class BcgButtonSubmit extends LionButtonSubmit {
  static get styles() {
    return [
      ...super.styles,
      css`
        :host {
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
        :host(:hover) {
          background-color: var(--primary-button-default-background-color);
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
        }
      `,
    ];
  }
}

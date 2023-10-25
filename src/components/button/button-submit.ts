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
          font-family: var(--primary-button-default-L-font-family);
          font-size: var(--primary-button-default-L-font-size);
          font-weight: var(--primary-button-default-L-font-weight);
          color: var(--primary-button-default-L-foreground-color);
          line-height: var(--button-line-height);
          background-color: var(--primary-button-default-L-background-color);
          border: var(--primary-button-default-L-border);
          border-radius: var(--primary-button-default-L-border-radius);
          padding: var(--primary-button-default-L-inner-spacing);
        }
        :host(:hover) {
          background-color: var(--primary-button-default-L-background-color);
          /* States contain default state fallback value*/
          font-family: var(
            --primary-button-hover-L-font-family,
            var(--primary-default-hover-L-font-family)
          );
          font-size: var(
            --primary-button-hover-L-font-size,
            var(--primary-default-hover-L-font-size)
          );
          /* ... usw. */
          /* Only Values that changed need to be defined in global.css*/
          box-shadow: var(
            --primary-button-hover-L-box-shadow,
            var(--primary-button-default-L-box-shadow)
          );
        }
      `,
    ];
  }
}

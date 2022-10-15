import { LionTextarea } from '@lion/textarea';
import { css } from '@lion/core';

export class BcgTextarea extends LionTextarea {
  static get styles() {
    return [
      ...super.styles,
      css`
        :host
          .input-group__container
          > .input-group__input
          ::slotted(.form-control) {
          padding: 8px;
          background-color: var(--neutral-color-0);
          border-radius: var(--border-radius-l);
          font-family: var(--primary-body-regular-L);
          color: var(--primary-color);
          border: var(--border-xs) solid var(--neutral-color-500);
        }
        :host .form-field__label ::slotted(label) {
          color: var(--primary-color);
        }
        :host .form-field__help-text ::slotted(div) {
          color: var(--neutral-color-500) !important;
        }
      `,
    ];
  }
}

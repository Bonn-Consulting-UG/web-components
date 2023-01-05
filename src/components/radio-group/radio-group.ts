import { css, html, LitElement, ScopedElementsMixin } from '@lion/core';
import { LionRadioGroup, LionRadio } from '@lion/radio-group';

export class BcgRadioGroup extends LionRadioGroup {
  static get styles() {
    return [
      ...super.styles,
      css`
        .input-group {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-content: space-between;
        }
      `,
    ];
  }
}

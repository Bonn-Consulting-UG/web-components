import { css } from '@lion/core';
import { IsEmail } from '@lion/form-core';
import { BcgInput } from '../input/input';

export class BcgInputEmail extends BcgInput {
  static get styles() {
    return [
      ...super.styles,
      css`
        :host .form-field__feedback {
          color: var(--alert-color-error);
        }
      `,
    ];
  }

  constructor() {
    super();
    this.defaultValidators.push(new IsEmail());
  }
}

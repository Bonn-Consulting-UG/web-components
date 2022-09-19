import { css } from '@lion/core';
import { IsEmail } from '@lion/form-core';
import { BcgInput } from '../input/input';

export class BcgInputEmail extends BcgInput {
  static get styles() {
    return [...super.styles, css``];
  }

  constructor() {
    super();
    this.defaultValidators.push(new IsEmail());
  }
}

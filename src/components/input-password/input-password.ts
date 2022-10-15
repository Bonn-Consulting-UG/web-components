import { css, html, LitElement } from '@lion/core';
import { IsEmail } from '@lion/form-core';
import { BcgInput } from '../input/input';

export class BcgInputPassword extends LitElement {
  static get styles() {
    return [css``];
  }

  render() {
    return html` <bcg-input></bcg-input> `;
  }
}

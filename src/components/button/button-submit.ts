import { css } from '@lion/core';
import { LionButtonSubmit } from '@lion/button';

export class BcgButtonSubmit extends LionButtonSubmit {
  static get styles() {
    return [...super.styles, css``];
  }
}

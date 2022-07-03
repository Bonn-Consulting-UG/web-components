import { LionTextarea } from '@lion/textarea';
import { css } from '@lion/core';

export class BcgTextarea extends LionTextarea {
  static get styles() {
    return [...super.styles, css``];
  }
}

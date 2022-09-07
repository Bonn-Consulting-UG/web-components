import { LionInput } from '@lion/input';
import { css } from '@lion/core';

export class BcgInput extends LionInput {
  static get styles() {
    return [...super.styles, css``];
  }
}

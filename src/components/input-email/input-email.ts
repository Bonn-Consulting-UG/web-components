import { LionInputEmail } from '@lion/input-email';
import { css } from '@lion/core';
import { IsEmail, Required } from '@lion/form-core';

export class BcgInputEmail extends LionInputEmail {
  static get styles() {
    return [...super.styles, css``];
  }
}

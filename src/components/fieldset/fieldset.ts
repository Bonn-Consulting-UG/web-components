import { css } from '@lion/core';
import { LionFieldset } from '@lion/fieldset';

export class BcgFieldSet extends LionFieldset {
  static get styles() {
    return [...super.styles, css``];
  }
}

import { html, css, LitElement, ScopedElementsMixin } from '@lion/core';
import { LionButtonReset } from '@lion/button';

export class BcgButtonReset extends LionButtonReset {
  static get styles() {
    return [...super.styles, css``];
  }
}

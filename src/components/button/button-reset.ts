import { html, css, LitElement, ScopedElementsMixin } from '@lion/core';
import { LionButtonReset } from '@lion/button';

export class BcgButtonReset extends ScopedElementsMixin(LitElement) {
  static get styles() {
    return [css``];
  }

  static get scopedElements() {
    return { 'lion-button-reset': LionButtonReset };
  }

  render() {
    return html` <lion-button-reset>
      <slot></slot>
    </lion-button-reset>`;
  }
}

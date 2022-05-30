import { html, css, LitElement, ScopedElementsMixin } from '@lion/core';
import { LionButtonSubmit } from '@lion/button';

export class BcgButtonSubmit extends ScopedElementsMixin(LitElement) {
  static get styles() {
    return [css``];
  }

  static get scopedElements() {
    return { 'lion-button-submit': LionButtonSubmit };
  }

  render() {
    return html` <lion-button-submit>
      <slot></slot>
    </lion-button-submit>`;
  }
}

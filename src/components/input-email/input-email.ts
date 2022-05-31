import { LionInputEmail } from '@lion/input-email';
import { html, ScopedElementsMixin, LitElement } from '@lion/core';

export class BcgInputEmail extends ScopedElementsMixin(LitElement) {
  static get scopedElements() {
    return { 'lion-input-email': LionInputEmail };
  }

  render() {
    return html`<lion-input-email
      label="Email"
      name="email"
    ></lion-input-email> `;
  }
}

import { LionInputIban } from '@lion/input-iban';
import { html, ScopedElementsMixin, LitElement } from '@lion/core';

export class BcgInputDate extends ScopedElementsMixin(LitElement) {
  static get scopedElements() {
    return { 'lion-input-iban': LionInputIban };
  }

  render() {
    return html`<lion-input-iban
      label="Account"
      name="account"
    ></lion-input-iban> `;
  }
}

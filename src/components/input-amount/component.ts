import { LionInputAmount } from '@lion/input-amount';
import { html, ScopedElementsMixin, LitElement } from '@lion/core';

export class BcgInputAmount extends ScopedElementsMixin(LitElement) {
  static get scopedElements() {
    return { 'lion-input-amount': LionInputAmount };
  }

  render() {
    return html` <lion-input-amount
      label="Amount"
      name="amount"
      currency="EUR"
    ></lion-input-amount>`;
  }
}

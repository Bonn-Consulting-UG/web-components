import { html, LitElement, ScopedElementsMixin } from '@lion/core';
import { LionFieldset } from '@lion/fieldset';
import { BcgInput } from '../input/input.js';

export class BcgFieldSet extends ScopedElementsMixin(LitElement) {
  static get scopedElements() {
    return { 'lion-fieldset': LionFieldset, 'bcg-input': BcgInput };
  }

  render() {
    return html`
      <lion-fieldset name="nameGroup" label="Name">
        <bcg-input
          name="firstName"
          label="First Name"
          .modelValue=${'Foo'}
        ></bcg-input>
        <bcg-input
          name="lastName"
          label="Last Name"
          .modelValue=${'Bar'}
        ></bcg-input>
      </lion-fieldset>
    `;
  }
}

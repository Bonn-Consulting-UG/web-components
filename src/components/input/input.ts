import { LionInput } from '@lion/Input';
import { html, ScopedElementsMixin, LitElement } from '@lion/core';

export class BcgInput extends ScopedElementsMixin(LitElement) {
  static get scopedElements() {
    return { 'lion-input': LionInput };
  }

  render() {
    return html`<lion-input label="First Name"></lion-input>`;
  }
}

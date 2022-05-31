import { LionInputRange } from '@lion/input-range';
import { html, ScopedElementsMixin, LitElement } from '@lion/core';

export class BcgInputRange extends ScopedElementsMixin(LitElement) {
  static get scopedElements() {
    return { 'lion-input-range': LionInputRange };
  }

  render() {
    return html` <lion-input-range
      min="200"
      max="500"
      .modelValue="${300}"
      label="Input range"
    ></lion-input-range>`;
  }
}

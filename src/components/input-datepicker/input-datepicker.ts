import { html, ScopedElementsMixin, LitElement } from '@lion/core';
import { LionInputDatepicker } from '@lion/input-datepicker';

export class BcgInputDatepicker extends ScopedElementsMixin(LitElement) {
  static get scopedElements() {
    return { 'lion-input-datepicker': LionInputDatepicker };
  }

  render() {
    return html`
      <lion-input-datepicker label="Date" name="date"></lion-input-datepicker>
    `;
  }
}

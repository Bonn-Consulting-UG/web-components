import { LionInputStepper } from '@lion/input-stepper';
import { html, ScopedElementsMixin, LitElement } from '@lion/core';

export class BcgInputDatepicker extends ScopedElementsMixin(LitElement) {
  static get scopedElements() {
    return { 'lion-input-stepper': LionInputStepper };
  }

  render() {
    return html` <lion-input-stepper max="5" min="0" name="count">
      <label slot="label">RSVP</label>
      <div slot="help-text">Max. 5 guests</div>
    </lion-input-stepper>`;
  }
}

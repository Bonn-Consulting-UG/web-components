import { LionInputDate } from '@lion/input-date';
import { html, ScopedElementsMixin, LitElement } from '@lion/core';

export class BcgInputDate extends ScopedElementsMixin(LitElement) {
  static get scopedElements() {
    return { 'lion-input-date': LionInputDate };
  }

  render() {
    return html`<lion-input-date label="Date"></lion-input-date>`;
  }
}

import { LionInputTel, PhoneUtilManager } from '@lion/input-tel';
import { html, css, ScopedElementsMixin, LitElement } from '@lion/core';

export class BcgInputTel extends ScopedElementsMixin(LitElement) {
  static get scopedElements() {
    return { 'lion-input-tel': LionInputTel };
  }

  static get styles() {
    return [
      css`
      }`,
    ];
  }

  render() {
    return html`
      <lion-input-tel
        .modelValue="${'+639921343959'}"
        live-format
        label="Telephone number"
        name="phoneNumber"
      ></lion-input-tel>
      <h-output .readyPromise="${PhoneUtilManager.loadComplete}"></h-output>
    `;
  }
}

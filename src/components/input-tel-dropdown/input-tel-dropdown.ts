import { LionInputTelDropdown } from '@lion/input-tel-dropdown';
import { html, css, ScopedElementsMixin, LitElement } from '@lion/core';

export class BcgInputTelDropdown extends ScopedElementsMixin(LitElement) {
  static get scopedElements() {
    return { 'intl-input-tel-dropdown': LionInputTelDropdown };
  }

  static get styles() {
    return [
      css`
      }`,
    ];
  }

  render() {
    return html`
      <intl-input-tel-dropdown
        .preferredRegions="${['DE', 'EN']}"
        .modelValue=${'+491608920056'}
        label="Telephone number"
        help-text="Advanced dropdown and styling"
        name="phoneNumber"
      ></intl-input-tel-dropdown>
    `;
  }
}

import { html, LitElement, ScopedElementsMixin } from '@lion/core';
import { LionCombobox } from '@lion/combobox';

export class BchCombobox extends ScopedElementsMixin(LitElement) {
  static get scopedElements() {
    return { 'lion-combobox': LionCombobox };
  }

  render() {
    return html`
      <lion-combobox name="combo" label="Default">
        <lion-option .checked="${true}" .choiceValue="${'Test1'}"
          >Test1</lion-option
        >,
        <lion-option .checked="${false}" .choiceValue="${'Test2'}"
          >Test2</lion-option
        >,
      </lion-combobox>
    `;
  }
}

import { LitElement, ScopedElementsMixin, html } from '@lion/core';
import { LionCombobox } from '@lion/combobox';
import { LionOption } from '@lion/listbox';

export class BchCombobox extends ScopedElementsMixin(LitElement) {
  static get scopedElements() {
    return { 'lion-combobox': LionCombobox, 'lion-option': LionOption };
  }

  render() {
    return html`
      <lion-combobox name="combo" label="Default">
        <lion-option .choiceValue=${'Apple'}>Apple</lion-option>
        <lion-option .choiceValue=${'Artichoke'}>Artichoke</lion-option>
        <lion-option .choiceValue=${'Asparagus'}>Asparagus</lion-option>
        <lion-option .choiceValue=${'Banana'}>Banana</lion-option>
        <lion-option .choiceValue=${'Beets'}>Beets</lion-option>
      </lion-combobox>
    `;
  }
}

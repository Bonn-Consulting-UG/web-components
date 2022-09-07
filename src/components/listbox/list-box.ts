import { html, LitElement, ScopedElementsMixin } from '@lion/core';
import { LionListbox, LionOption } from '@lion/listbox';

export class BcgListBox extends ScopedElementsMixin(LitElement) {
  static get scopedElements() {
    return { 'lion-listbox': LionListbox, 'lion-option': LionOption };
  }

  render() {
    return html`
      <lion-listbox name="listbox" label="Default">
        <lion-option .choiceValue=${'Apple'}>Apple</lion-option>
        <lion-option checked .choiceValue=${'Artichoke'}>Artichoke</lion-option>
        <lion-option .choiceValue=${'Asparagus'}>Asparagus</lion-option>
        <lion-option .choiceValue=${'Banana'}>Banana</lion-option>
        <lion-option .choiceValue=${'Beets'}>Beets</lion-option>
      </lion-listbox>
    `;
  }
}

import { html, css, LitElement, ScopedElementsMixin } from '@lion/core';
import { LionSelectRich, LionOption } from '@lion/select-rich';

export class BcgSelectRich extends ScopedElementsMixin(LitElement) {
  static get styles() {
    return [css``];
  }

  static get scopedElements() {
    return { 'lion-select-rich': LionSelectRich, 'lion-option': LionOption };
  }

  render() {
    return html` <lion-select-rich name="favoriteColor" label="Favorite color">
      <lion-option .choiceValue=${'red'}>Red</lion-option>
      <lion-option .choiceValue=${'hotpink'}>Hotpink</lion-option>
      <lion-option .choiceValue=${'teal'}>Teal</lion-option>
    </lion-select-rich>`;
  }
}

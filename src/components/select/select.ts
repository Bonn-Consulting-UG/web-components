import { html, css, LitElement, ScopedElementsMixin } from '@lion/core';
import { LionSelect } from '@lion/select';

export class BcgSelect extends ScopedElementsMixin(LitElement) {
  static get styles() {
    return [css``];
  }

  static get scopedElements() {
    return { 'lion-select': LionSelect };
  }

  render() {
    return html`<lion-select name="favoriteColor" label="Favorite color">
      <select slot="input">
        <option selected hidden value>Please select</option>
        <option value="red">Red</option>
        <option value="hotpink">Hotpink</option>
        <option value="teal">Teal</option>
      </select>
    </lion-select>`;
  }
}

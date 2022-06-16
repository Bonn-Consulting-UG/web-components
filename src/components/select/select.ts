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
    return html`<lion-select name="sortBy">
      <select slot="input">
        <option selected hidden value>Sort By</option>
        <option value="Neuste">Neuste</option>
        <option value="Beliebteste">Beliebteste</option>
        <option value="Ältest">Ältest</option>
      </select>
    </lion-select>`;
  }
}

import { html, ScopedElementsMixin, LitElement } from '@lion/core';
import { LionSwitch } from '@lion/switch';

export class BcgSwitch extends ScopedElementsMixin(LitElement) {
  static get scopedElements() {
    return { 'lion-switch': LionSwitch };
  }

  render() {
    return html`<lion-switch
      label="Label"
      help-text="Help text"
    ></lion-switch>`;
  }
}

import { html, ScopedElementsMixin, LitElement, css } from '@lion/core';
import { LionSwitch } from '@lion/switch';
import { BcgSwitchButton } from './switch-button';

export class BcgSwitch extends LionSwitch {
  static get scopedElements() {
    return {
      ...super.scopedElements,
      'bcg-switch-button': BcgSwitchButton,
    };
  }

  get slots() {
    return {
      ...super.slots,
      input: () => {
        const btnEl = this.createScopedElement('bcg-switch-button');
        btnEl.setAttribute('data-tag-name', 'bcg-switch-button');
        return btnEl;
      },
    };
  }

  static get styles() {
    return [...super.styles, css``];
  }
}

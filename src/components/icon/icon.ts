import { html, LitElement, ScopedElementsMixin } from '@lion/core';
import { LionIcon } from '@lion/icon';

export class BcgIcon extends ScopedElementsMixin(LitElement) {
  icon: String;

  constructor() {
    super();
    this.icon = '';
  }

  static get scopedElements() {
    return { 'lion-icon': LionIcon };
  }

  render() {
    const { icon } = this;

    return html`
      <lion-icon
        icon-id="${icon}"
        style="width: 50px; height: 50px;"
      ></lion-icon>
    `;
  }
}

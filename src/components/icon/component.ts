import { html, LitElement, ScopedElementsMixin } from '@lion/core';
import { LionIcon } from '@lion/icon';

export class BcgIcon extends ScopedElementsMixin(LitElement) {
  static get scopedElements() {
    return { 'lion-icon': LionIcon };
  }

  render() {
    return html`
      <lion-icon
        icon-id="fas:fa:cloud"
        style="width: 50px; height: 50px;"
      ></lion-icon>
    `;
  }
}

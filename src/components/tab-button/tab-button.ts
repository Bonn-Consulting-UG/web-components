import { html, css, LitElement, ScopedElementsMixin } from '@lion/core';
import { LionButton } from '@lion/button';
import { LionIcon } from '@lion/icon';

export class BcgTabButton extends ScopedElementsMixin(LitElement) {
  static get styles() {
    return [css`
    .tab-button {
      padding: 1em;
      background: none;
    }
    `];
  }

  static get scopedElements() {
    return {
      'lion-button': LionButton,
      'lion-icon': LionIcon,
    };
  }

  render() {
    return html` <lion-button class="tab-button"><slot></slot></lion-button>`;
  }
}

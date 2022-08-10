import { css, html } from '@lion/core';
import { LionButton } from '@lion/button';

import '@lion/button/define';

export class BcgButton extends LionButton {
  static get styles() {
    return [...super.styles, css``];
  }

  // render() {
  //   return html`
  //     <div class="button-content" id="${this._buttonId}">
  //       <slot name="prefix"></slot>
  //       <slot></slot>
  //       <slot name="suffix"></slot>
  //     </div>
  //   `;
  // }
}

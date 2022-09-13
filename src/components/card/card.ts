import { css, html } from '@lion/core';
import { LionCalendar } from '@lion/calendar';

export class BcgCard extends LionCalendar {
  static get styles() {
    return [
      ...super.styles,
      css`
        :host > div {
          border: 1px solid blue;
          border-radius: 5px;
          box-shadow: 0 0 2px #ccc;
          display: inline-block;
          padding: 5px;
        }
      `
    ];
  }

  render() {
    return html`<div>
      <slot slot="content"></slot>
    </div>`;
  }
}

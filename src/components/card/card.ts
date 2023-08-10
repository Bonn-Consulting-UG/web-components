import { LitElement, css, html } from '@lion/core';
import { LionCalendar } from '@lion/calendar';

export class BcgCard extends LitElement {
  static get styles() {
    return [
      css`
        :host > div {
          border: 1px solid blue;
          border-radius: 5px;
          box-shadow: 0 0 2px #ccc;
          display: inline-block;
          width: 100%;
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

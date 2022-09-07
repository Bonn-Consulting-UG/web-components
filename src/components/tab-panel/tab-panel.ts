import { html, css, LitElement } from '@lion/core';

export class BcgTabPanel extends LitElement {
  static get styles() {
    return [css``];
  }

  render() {
    return html` <p><slot></slot></p>`;
  }
}

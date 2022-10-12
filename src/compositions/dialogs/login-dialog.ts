import { html, LitElement, ScopedElementsMixin } from '@lion/core';

export class BcgLoginDialog extends ScopedElementsMixin(LitElement) {
  render() {
    return html`

  <bcg-dialog >
    <bcg-button variant="primary" slot="invoker">Login</bcg-button>
    <bcg-dialog-frame has-close-button slot="content"><bcg-login slot="content"></bcg-login></bcg-dialog-frame>
  </bcg-dialog>
    `;
  }
}

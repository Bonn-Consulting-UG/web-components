import { html, LitElement, ScopedElementsMixin } from '@lion/core';

export class BcgLoginDialog extends ScopedElementsMixin(LitElement) {
  render() {
    return html`

  <dialog id="dialog">
    <form method="dialog">
      <bcg-login></bcg-login>
    </form>
  </dialog>

<button @click="dialog.showModal()">Open Dialog</button>
    `;
  }
}


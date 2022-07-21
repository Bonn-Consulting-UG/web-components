/* eslint-disable import/extensions */
import { html, LitElement, ScopedElementsMixin } from '@lion/core';

export class BcgLogout extends ScopedElementsMixin(LitElement) {
  render() {
    return html` <bcg-button
      label="Logout"
      @click="${() => alert('Logged out')}"
    ></bcg-button>`;
  }
}

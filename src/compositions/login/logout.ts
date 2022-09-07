/* eslint-disable import/extensions */
import { html, LitElement, ScopedElementsMixin } from '@lion/core';

export class BcgLogout extends ScopedElementsMixin(LitElement) {
  render() {
    return html` <bcg-button
      @click="${() => localStorage.removeItem('auth-token')}"
      >Logout</bcg-button
    >`;
  }
}

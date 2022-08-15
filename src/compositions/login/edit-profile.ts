/* eslint-disable import/extensions */
import { html, css, LitElement, ScopedElementsMixin } from '@lion/core';
import { BcgEditDelete } from './edit-delete';
import { BcgEditPassword } from './edit-password';
import { BcgEditUserData } from './edit-userdata';

export class BcgEditProfile extends ScopedElementsMixin(LitElement) {
  static get styles() {
    return [css``];
  }

  static get scopedElements() {
    return {
      'bcg-edit-userdata': BcgEditUserData,
      'bcg-edit-password': BcgEditPassword,
      'bcg-edit-delete': BcgEditDelete
    };
  }

  render() {
    return html`<div>
      <bcg-edit-userdata></bcg-edit-userdata>
      <bcg-edit-password></bcg-edit-password>
      <bcg-edit-delete></bcg-edit-delete>
    </div>`;
  }
}

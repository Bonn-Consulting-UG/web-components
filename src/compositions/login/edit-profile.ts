/* eslint-disable import/extensions */
import { html, css, LitElement, ScopedElementsMixin } from '@lion/core';
import jwt_decode from 'jwt-decode';
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

  isLoggedIn: any = localStorage.getItem('auth-token');

  user: any = null;

  render() {
    if (this.isLoggedIn != null) {
      this.user = jwt_decode(this.isLoggedIn);
    }
    return html`<div>
      <bcg-edit-userdata .user=${this.user}></bcg-edit-userdata>
      <bcg-edit-password .user=${this.user}></bcg-edit-password>
      <bcg-edit-delete .user=${this.user}></bcg-edit-delete>
    </div>`;
  }
}

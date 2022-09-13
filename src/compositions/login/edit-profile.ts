/* eslint-disable import/extensions */
import { html, css, ScopedElementsMixin } from '@lion/core';
import { BcgModule } from '../../components/module';
import { BcgEditDelete } from './edit-delete';
import { BcgEditPassword } from './edit-password';
import { BcgEditUserData } from './edit-userdata';

export class BcgEditProfile extends ScopedElementsMixin(BcgModule) {
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
      ${localStorage.getItem('auth-token') !== null
        ? html`     <bcg-edit-userdata .user=${this.user}></bcg-edit-userdata>
      <bcg-edit-password .user=${this.user}></bcg-edit-password>
      <bcg-edit-delete .user=${this.user}></bcg-edit-delete>
    </div>`
        : 'Bitte Anmelden'}
    </div> `;
  }
}

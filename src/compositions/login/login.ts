/* eslint-disable import/extensions */

import {
  html,
  css,
  LitElement,
  ScopedElementsMixin,
  property,
} from '@lion/core';
import { IsEmail, Required } from '@lion/form-core';
import { BcgModule } from '../../components/module';

import { BcgPasswordReset } from './password-reset';
import { BcgUserLogin } from './user-login';

export class BcgLogin extends ScopedElementsMixin(BcgModule) {
  static get styles() {
    return [css``];
  }

  static get scopedElements() {
    return {
      'bcg-user-login': BcgUserLogin,
      'bcg-password-reset': BcgPasswordReset,
    };
  }

  @property({ type: String }) context: String = 'login';

  changeContext: any = () => {
    console.log(this.context);
    if (this.context === 'login') {
      this.context = 'passwordreset';
    } else {
      this.context = 'login';
    }
  };

  render() {
    const { context, changeContext } = this;

    IsEmail.getMessage = async () => 'Muss eine gültige Email sein';
    Required.getMessage = async () => 'Angabe benötigt';

    return html`
      ${context === 'login'
        ? html` <bcg-user-login
            .onPasswordReset=${changeContext}
          ></bcg-user-login>`
        : html`<bcg-password-reset></bcg-password-reset>`}
    `;
  }
}

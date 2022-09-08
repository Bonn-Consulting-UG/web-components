/* eslint-disable import/extensions */

import { html, css, LitElement, ScopedElementsMixin } from '@lion/core';
import { IsEmail, Required } from '@lion/form-core';

import { BcgPasswordReset } from './password-reset';
import { BcgUserLogin } from './user-login';

export class BcgLogin extends ScopedElementsMixin(LitElement) {
  static get styles() {
    return [css``];
  }

  static get scopedElements() {
    return {
      'bcg-user-login': BcgUserLogin,
      'bcg-password-reset': BcgPasswordReset
    };
  }

  context: any = 'login';

  changeContext: any = () => {
    console.log(this.context);
    if (this.context === 'login') {
      this.context = 'passwordreset';
      this.requestUpdate();
    } else {
      this.context = 'login';
      this.requestUpdate();
    }
  };

  render() {
    const { context, changeContext } = this;

    IsEmail.getMessage = async () => 'Muss eine gültige Email sein';
    Required.getMessage = async () => 'Angabe benötigt';

    return html`
      ${context === 'login'
        ? html`<bcg-user-login
            .onPasswordReset=${changeContext}
          ></bcg-user-login>`
        : html`<bcg-password-reset></bcg-password-reset>`}
    `;
  }
}

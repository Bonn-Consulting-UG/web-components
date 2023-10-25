/* eslint-disable import/extensions */

import {
  html,
  css,
  LitElement,
  ScopedElementsMixin,
  property,
} from '@lion/core';
import { Required, IsEmail } from '../../utils/helpers/input-errors';
import { BcgModule } from '../../components/module';

import { BcgPasswordReset } from './password-reset';
import { BcgUserLogin } from './user-login';

export class BcgLogin extends ScopedElementsMixin(BcgModule) {
  static get styles() {
    return [css``];
  }
  @property({ type: Boolean }) disablePasswordReset: boolean = false;

  static get scopedElements() {
    return {
      'bcg-user-login': BcgUserLogin,
      'bcg-password-reset': BcgPasswordReset,
    };
  }

  @property({ type: String }) context: String = 'login';

  changeContext: any = () => {
    if (this.context === 'login') {
      this.context = 'passwordreset';
    } else {
      this.context = 'login';
    }
  };

  render() {
    const { context, changeContext } = this;

    return html`
      ${context === 'login'
        ? html` <bcg-user-login
            .disablePasswordReset=${this.disablePasswordReset}
            .onPasswordReset=${changeContext}
          ></bcg-user-login>`
        : html`<bcg-password-reset
            .back=${changeContext}
          ></bcg-password-reset>`}
    `;
  }
}

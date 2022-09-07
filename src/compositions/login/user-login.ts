/* eslint-disable import/extensions */

import { html, css, LitElement, ScopedElementsMixin } from '@lion/core';
import { IsEmail, Required } from '@lion/form-core';
import { sendLoginRequest } from '../../utils/services/login';

export class BcgUserLogin extends ScopedElementsMixin(LitElement) {
  static get styles() {
    return [css``];
  }

  static get properties() {
    return {
      onPasswordReset: { type: Function }
    };
  }

  onPasswordReset: any = () => console.log(this);

  email: string = '';

  password: string = '';

  passwordInputType: string = 'password';

  flipPasswordInput() {
    if (this.passwordInputType === 'password') {
      this.passwordInputType = 'text';
    } else {
      this.passwordInputType = 'password';
    }
    this.requestUpdate();
  }

  render() {
    let { email, password, passwordInputType, onPasswordReset } = this;

    IsEmail.getMessage = async () => 'Muss eine gültige Email sein';
    Required.getMessage = async () => 'Angabe benötigt';

    const submitHandler = async (ev: any) => {
      if (ev.target.hasFeedbackFor.includes('error')) {
        const firstFormElWithError = ev.target.formElements.find((el: any) =>
          el.hasFeedbackFor.includes('error')
        );
        firstFormElWithError.focus();
        return;
      }
      const response: any = await sendLoginRequest({ email, password });
      localStorage.setItem('auth-token', response.auth_token);
    };

    return html`
     <bcg-form name="login" @submit=${submitHandler}>
        <form @submit=${(e: any) => e.preventDefault()}>

      <div style="display:flex;flex-direction:row-reverse;justify-content: left;width:640px;">
      <div class="left-side" style="flex-direction:row-reverse;  ">
      <h1>Willkommen!</h1>
          <h2>Anmeldung</h2>
          <div>
            <h2>Anmelden über:</h2>

            <bcg-button disabled>Facebook</bcg-button>
            <bcg-button disabled>Twitter</bcg-button>
            <bcg-button disabled>Gmail</bcg-button>
          </div>
          <div>
          <bcg-input-email
              name="email"
              label="E-Mail"
              placeholder=""
              .modelValue="${email}"
              .validators=${[new Required(), new IsEmail()]}
              @model-value-changed=${({ target }: any) => {
                email = target.value;
              }}
            ></bcg-input-email>
            <div style="display:flex;flex-direction:row ; flex-basis:100%;">
            <bcg-input
            style="flex-basis:100%;"
              label="Password"
              type=${passwordInputType}
              placeholder=""
              .modelValue="${password}"
              .validators=${[new Required()]}
              name="password"
              @model-value-changed=${({ target }: any) => {
                password = target.value;
              }}
            ></bcg-input>
            <bcg-button @click=${this.flipPasswordInput}>P</bcg-button>

            </div>
          </div>
          <bcg-checkbox-group name="save-login-data" .validators=${[]}>
              <bcg-checkbox
                label="Anmeldedaten merken"
                .choiceValue=${'Anmeldedaten merken'}
              ></bcg-checkbox>
            </bcg-checkbox-group>
            <p @click=${onPasswordReset} @keydown=${onPasswordReset}>reset pw</p>
          <bcg-button-submit >Anmelden</bcg-button-submit>
        </div>
        <div class="right-side">
        <img src="https://images.unsplash.com/photo-1654580038810-505030159ca0" style="width: 100%;" alt="123"></img>
        </div>
      </div>
            </form >
            </bcg-form >
    `;
  }
}

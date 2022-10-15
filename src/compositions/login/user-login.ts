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
import { sendLoginRequest } from '../../utils/services/login';
import { BcgButtonSubmit } from '../../components/button/button-submit';

export class BcgUserLogin extends ScopedElementsMixin(BcgModule) {
  static get styles() {
    return [css``];
  }

  static get properties() {
    return {
      onPasswordReset: { type: Function },
      moduleId: { type: String },
    };
  }

  moduleId: number = 0;

  onPasswordReset: any = () => console.log(this);

  email: string = '';

  password: string = '';

  @property({ type: String }) passwordInputType: string = 'password';

  flipPasswordInput() {
    if (this.passwordInputType === 'password') {
      this.passwordInputType = 'text';
    } else {
      this.passwordInputType = 'password';
    }
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

      sendLoginRequest({ email, password });
    };

    return html`
     <bcg-form name="login" @submit=${submitHandler}>
        <form @submit=${(e: any) => e.preventDefault()}>

      <div style="display:flex;flex-direction:row-reverse;justify-content: left;width:640px;">
      <div class="left-side" style="display:flex;flex-direction: column;">
      <h1>Willkommen!</h1>
          <h2>Anmeldung</h2>
          
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
            <div style="display:flex;flex-direction:row ; flex-basis:100%; justify-content:center; align-items:center;">
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
            <bcg-button style="margin-top:25px ;margin-left:5px" variant="tertiary" @click=${
              this.flipPasswordInput
            }>P</bcg-button>

            </div>
          </div>
          <!-- <bcg-checkbox-group name="save-login-data" .validators=${[]}>
              <bcg-checkbox
                label="Anmeldedaten merken"
                .choiceValue=${'Anmeldedaten merken'}
              ></bcg-checkbox>
            </bcg-checkbox-group> -->
          
          <bcg-button-submit style="margin-bottom:10px;" >Anmelden</bcg-button-submit>


          <div> <bcg-button-submit @click=${onPasswordReset} @keydown=${onPasswordReset}>Password zurücksetzten</bcg-button-submit></div>
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

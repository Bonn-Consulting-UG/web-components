/* eslint-disable import/extensions */

import { html, css, LitElement, ScopedElementsMixin } from '@lion/core';
import { IsEmail, Required } from '@lion/form-core';
import { sendLoginRequest } from '../../utils/services/login';

export class BcgLogin extends ScopedElementsMixin(LitElement) {
  static get styles() {
    return [css``];
  }

  email: string = 'testingepart@trash-mail.com';

  password: string = 'test';

  // sendLoginRequest(this.userdata)}

  render() {
    let { email, password } = this;

    IsEmail.getMessage = async () => 'Must be a E mail';
    Required.getMessage = async () => 'Is Required';

    return html`
      <div style="display:flex;flex-direction:row-reverse;justify-content: left;">

      
      <div class="left-side" style="flex-direction:row-reverse; width:640px; ">
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
            <bcg-input
              label="Password"
              type="password"
              placeholder=""
              .modelValue="${password}"
              .validators=${[new Required()]}
              name="password"
              @model-value-changed=${({ target }: any) => {
                password = target.value;
              }}
            ></bcg-input>
          </div>
          <bcg-button label="Anmelden"></bcg-button>
        </div>
        <div class="right-side">
        <img src="https://images.unsplash.com/photo-1654580038810-505030159ca0" style="width:629px;height:864px;" alt="123"></img>
        </div>
      </div>
    `;
  }
}

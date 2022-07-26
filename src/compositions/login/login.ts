/* eslint-disable import/extensions */

import { html, css, LitElement, ScopedElementsMixin } from '@lion/core';
import { sendLoginRequest } from '../../utils/services/login';

export class BcgLogin extends ScopedElementsMixin(LitElement) {
  static get styles() {
    return [css``];
  }

  userdata: any = {
    password: '',
    email: ''
  };

  changePassword(e: any) {
    this.userdata.password = e.target.value;
  }

  changeEmail(e: any) {
    this.userdata.email = e.target.value;
  }

  render() {
    console.log(this.userdata);

    return html`
      <div style="display:flex;flex-direction:row-reverse;justify-content: left;">

      
      <div class="left-side" style="flex-direction:row-reverse; width:640px; ">
      <h1>Willkommen!</h1>
          <h2>Anmeldung</h2>
          <div>
            <h2>Anmelden über:</h2>

            <bcg-button label="Facebook"></bcg-button>
            <bcg-button label="Twitter"></bcg-button>
            <bcg-button label="Gmail"></bcg-button>
          </div>
          <div>
            <bcg-input-email @input-changed="${
              this.changeEmail
            }" label="E-Mail"></bcg-input-email>
            <bcg-input @input-changed="${
              this.changePassword
            }" label="Password" type="password"></bcg-input>
          </div>
          <bcg-button @click='${() =>
            sendLoginRequest(this.userdata)}' value="${
      this.userdata.email
    }" label="Anmelden"></bcg-button>
        </div>
        <div class="right-side">
        <img src="https://images.unsplash.com/photo-1654580038810-505030159ca0" style="width:629px;height:864px;" alt="123"></img>
        </div>
      </div>
    `;
  }
}

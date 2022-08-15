/* eslint-disable import/extensions */
import { html, css, LitElement, ScopedElementsMixin } from '@lion/core';
import { Required } from '@lion/form-core';
import { sendPasswordChangeRequest } from '../../utils/services/login';
import { PasswordMatch } from '../../utils/validators/password-match';

export class BcgEditPassword extends ScopedElementsMixin(LitElement) {
  static get styles() {
    return [css``];
  }

  render() {
    const submitHandler = async (ev: any) => {
      const res = await sendPasswordChangeRequest('');
      console.log(res);
    };
    Required.getMessage = async () => 'Is Required';
    return html`<div>
      <bcg-form @submit=${submitHandler}>
        <form @submit=${(e: any) => e.preventDefault()}>
          <bcg-input
            label="Aktuelles Password*"
            type="password"
            placeholder=""
            name="currentpassword"
            .validators=${[new Required()]}
          ></bcg-input>

          <bcg-fieldset
            name="password-fieldset"
            .validators=${[new PasswordMatch()]}
          >
            <bcg-input
              label="Neues Password"
              type="password"
              placeholder=""
              name="password"
              .validators=${[new Required()]}
            ></bcg-input>

            <bcg-input
              name="passwordrepeat"
              label="Neues  Password wiederholen"
              type="password"
              placeholder=""
              .validators=${[new Required()]}
            ></bcg-input>
          </bcg-fieldset>
          <bcg-button-submit>Password ändern</bcg-button-submit>
        </form>
      </bcg-form>
    </div> `;
  }
}

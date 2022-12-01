/* eslint-disable import/extensions */
import { html, css, LitElement, ScopedElementsMixin } from '@lion/core';
import { Required } from '../../utils/helpers/input-errors';
import { BcgModule } from '../../components/module';
import { sendPasswordChangeRequest } from '../../utils/services/login';
import { PasswordMatch } from '../../utils/validators/password-match';

export class BcgEditPassword extends ScopedElementsMixin(BcgModule) {
  static get styles() {
    return [css``];
  }

  password: any;

  newPassword: any;

  passwordRepeat: any;

  render() {
    const submitHandler = async (ev: any) => {
      if (ev.target.hasFeedbackFor.includes('error')) {
        const firstFormElWithError = ev.target.formElements.find((el: any) =>
          el.hasFeedbackFor.includes('error')
        );
        firstFormElWithError.focus();
        return;
      }

      ev.path[0].resetGroup();

      this.isLoading = true;

      const res = await sendPasswordChangeRequest({
        currentPassword: this.password,
        newPassword: this.newPassword,
        userId: this.user.sub,
      });
      this.isLoading = false;
    };
    return html`<div>
      <bcg-form @submit=${submitHandler}>
        <form @submit=${(e: any) => e.preventDefault()}>
          <h2>Password ändern</h2>
          ${
            this.isLoading
              ? html`<bcg-progress></bcg-progress>`
              : html`
                  <bcg-input
                    label="Aktuelles Password"
                    type="password"
                    placeholder=""
                    name="password"
                    .modelValue="${this.password}"
                    .validators=${[new Required()]}
                  ></bcg-input>

                  <bcg-fieldset
                    name="password-fieldset"
                    .validators=${[new PasswordMatch()]}
                  >
                    <bcg-input
                      label="Neues Password"
                      type="password"
                      .modelValue="${this.newPassword}"
                      @model-value-changed=${({ target }: any) => {
                        this.newPassword = target.value;
                      }}
                      placeholder=""
                      name="password"
                      .validators=${[new Required()]}
                    ></bcg-input>

                    <bcg-input
                      name="passwordrepeat"
                      label="Neues Password wiederholen"
                      type="password"
                      .modelValue="${this.passwordRepeat}"
                      @model-value-changed=${({ target }: any) => {
                        this.passwordRepeat = target.value;
                      }}
                      placeholder=""
                      .validators=${[new Required()]}
                    ></bcg-input>
                  </bcg-fieldset>
                `
          }
          </bcg-fieldset>
          <bcg-button-submit style="margin-top:10px">Password ändern</bcg-button-submit>
        </form>
      </bcg-form>
    </div> `;
  }
}

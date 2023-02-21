/* eslint-disable import/extensions */
import {
  html,
  css,
  LitElement,
  ScopedElementsMixin,
  property,
} from '@lion/core';
import { Required } from '../../utils/helpers/input-errors';
import { BcgModule } from '../../components/module';
import {
  checkVerifyCode,
  sendPasswordChangeRequest,
} from '../../utils/services/login';
import { PasswordMatch } from '../../utils/validators/password-match';
import { LionIcon } from '@lion/icon';

export class BcgEditPassword extends ScopedElementsMixin(BcgModule) {
  static get styles() {
    return [css``];
  }

  @property({ type: String }) password: any = '';

  @property({ type: String }) newPassword: any = '';

  @property({ type: String }) passwordRepeat: any = '';

  render() {
    const submitHandler = async (ev: any) => {
      if (ev.target.hasFeedbackFor.includes('error')) {
        const firstFormElWithError = ev.target.formElements.find((el: any) =>
          el.hasFeedbackFor.includes('error')
        );
        firstFormElWithError.focus();
        return;
      }

      this.isLoading = true;

      const res: any = await sendPasswordChangeRequest({
        currentPassword: this.password,
        newPassword: this.newPassword,
        userId: this.user.sub,
      });

      if (res.status === 401) {
        this.isLoading = false;
        this.showNotification = true;
        this.notificationType = 'error';
        this.notificationMessage =
          'Wir konnten Ihr Password bei uns leider nicht finden! Bitte überprüfen Sie die Eingabe';
        ev.path[0].resetGroup();
      } else {
        this.showNotification = true;
        this.isLoading = false;
        this.notificationMessage = 'Wir habe Ihr Passwort gespeichert';
        ev.path[0].resetGroup();
      }
    };
    return html`<div>
      ${this.showNotification
        ? html`<bcg-notification
            .closeHandler=${this.disabledNotification}
            variant=${this.notificationType}
            message=${this.notificationMessage}
          ></bcg-notification> `
        : null}
      <bcg-form @submit=${submitHandler}>
        <form @submit=${(e: any) => e.preventDefault()}>
          <h2>Passwort ändern</h2>
          ${this.isLoading
            ? html`<bcg-progress></bcg-progress>`
            : html`
                <bcg-input-password
                  label="Aktuelles Passwort"
                  placeholder=""
                  name="password"
                  .modelValue=${this.password}
                  .validators=${[new Required()]}
                ></bcg-input-password>

                <bcg-fieldset
                  name="password-fieldset"
                  .validators=${[new PasswordMatch()]}
                >
                  <bcg-input-password
                    label="Neues Passwort"
                    placeholder=""
                    name="password"
                    .modelValue=${this.newPassword}
                    .validators=${[new Required()]}
                  ></bcg-input-password>

                  <bcg-input-password
                    label="Neues Passwort wiederholen"
                    placeholder=""
                    name="passwordrepeat"
                    .modelValue=${this.passwordRepeat}
                    .validators=${[new Required()]}
                  ></bcg-input-password>
                </bcg-fieldset>
              `}
          <bcg-button-submit style="margin-top:10px"
            >Passwort ändern</bcg-button-submit
          >
        </form>
      </bcg-form>
    </div> `;
  }
}

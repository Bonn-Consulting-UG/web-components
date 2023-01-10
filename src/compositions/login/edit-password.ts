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

  @property({ type: String }) passwordInputType: string = 'password';
  @property({ type: String }) passwordRepeatInputType: string = 'password';
  @property({ type: String }) passwordNewInputType: string = 'password';

  flipPasswordInput() {
    if (this.passwordInputType === 'password') {
      this.passwordInputType = 'text';
    } else {
      this.passwordInputType = 'password';
    }
  }

  flipPasswordNewInput() {
    if (this.passwordNewInputType === 'password') {
      this.passwordNewInputType = 'text';
    } else {
      this.passwordNewInputType = 'password';
    }
  }

  flipPasswordRepeatInput() {
    if (this.passwordRepeatInputType === 'password') {
      this.passwordRepeatInputType = 'text';
    } else {
      this.passwordRepeatInputType = 'password';
    }
  }

  static get scopedElements() {
    return { 'lion-icon': LionIcon };
  }

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
      console.log(this.password);
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
                <div style="position: relative;">
                  <bcg-input
                    label="Aktuelles Passwort"
                    type=${this.passwordInputType}
                    placeholder=""
                    name="password"
                    .modelValue=${this.password}
                    @model-value-changed=${({ target }: any) => {
                      this.password = target.value;
                    }}
                    .validators=${[new Required()]}
                  ></bcg-input>
                  <lion-icon
                    style="position: absolute;right: 2%;top: 30px;width: 24px;height: 24px;"
                    @click=${this.flipPasswordInput}
                    icon-id="${this.passwordInputType === 'password'
                      ? 'bcg:general:eye'
                      : 'bcg:general:eyeopen'}"
                  ></lion-icon>
                </div>
                <bcg-fieldset
                  name="password-fieldset"
                  .validators=${[new PasswordMatch()]}
                >
                  <div style="position: relative;">
                    <bcg-input
                      label="Neues Passwort"
                      type=${this.passwordNewInputType}
                      .modelValue=${this.newPassword}
                      @model-value-changed=${({ target }: any) => {
                        this.newPassword = target.value;
                      }}
                      placeholder=""
                      name="password"
                      .validators=${[new Required()]}
                    ></bcg-input>
                    <lion-icon
                      style="position: absolute;right: 2%;top: 30px;width: 24px;height: 24px;"
                      @click=${this.flipPasswordNewInput}
                      icon-id=${this.passwordNewInputType === 'password'
                        ? 'bcg:general:eye'
                        : 'bcg:general:eyeopen'}
                    ></lion-icon>
                  </div>

                  <div style="position: relative;">
                    <bcg-input
                      name="passwordrepeat"
                      label="Neues Passwort wiederholen"
                      type=${this.passwordRepeatInputType}
                      .modelValue=${this.passwordRepeat}
                      @model-value-changed=${({ target }: any) => {
                        this.passwordRepeat = target.value;
                      }}
                      placeholder=""
                      .validators=${[new Required()]}
                    ></bcg-input>
                    <lion-icon
                      style="position: absolute;right: 2%;top: 30px;width: 24px;height: 24px;"
                      @click=${this.flipPasswordRepeatInput}
                      icon-id=${this.passwordRepeatInputType === 'password'
                        ? 'bcg:general:eye'
                        : 'bcg:general:eyeopen'}
                    ></lion-icon>
                  </div>
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

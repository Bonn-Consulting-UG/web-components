import {
  html,
  css,
  LitElement,
  ScopedElementsMixin,
  property,
} from '@lion/core';
import { Required, MinLength, IsEmail } from '../../utils/helpers/input-errors';
import { BcgModule } from '../../components/module';
import { sendLoginRequest } from '../../utils/services/login';
import { BcgButtonSubmit } from '../../components/button/button-submit';
import { LionIcon } from '@lion/icon';

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

  @property({ type: String }) email: string = '';

  @property({ type: String }) password: string = '';

  @property({ type: String }) passwordInputType: string = 'password';

  flipPasswordInput() {
    if (this.passwordInputType === 'password') {
      this.passwordInputType = 'text';
    } else {
      this.passwordInputType = 'password';
    }
  }

  static get scopedElements() {
    return { 'lion-icon': LionIcon };
  }

  render() {
    let { email, password, passwordInputType, onPasswordReset } = this;

    const submitHandler = async (ev: any) => {
      if (ev.target.hasFeedbackFor.includes('error')) {
        const firstFormElWithError = ev.target.formElements.find((el: any) =>
          el.hasFeedbackFor.includes('error')
        );
        firstFormElWithError.focus();
        return;
      }
      this.isLoading = true;
      const resp: any = await this.logInHandler(email, password);
      if (resp.status === 401) {
        this.isLoading = false;
        this.showNotification = true;
        this.notificationMessage =
          'Wir konnten Ihre Zugangsdaten bei uns leider nicht finden! Bitte überprüfen Sie sie oder registrieren Sie sich zunächst.';
        this.notificationType = 'error';
      }

      if (resp.status === 403) {
        this.isLoading = false;
        this.showNotification = true;
        this.notificationMessage = 'Bitte verifizieren Sie ihren User';
        this.notificationType = 'error';
      }
      console.log(resp);
    };

    return html`
      <div style="width:640px;">
        <div class="left-side" style="display:flex;flex-direction: column;">
          ${this.showNotification
            ? html`<bcg-notification
                .closeHandler=${this.disabledNotification}
                variant=${this.notificationType}
                message=${this.notificationMessage}
              ></bcg-notification> `
            : null}
          ${this.isLoading
            ? html`<bcg-progress></bcg-progress>`
            : html`<h1>Willkommen zurück!</h1>
                <h2>Anmeldung</h2>
                <bcg-form name="loginform" @submit="${(ev: any) =>
                  submitHandler(ev)}">
                  <form @submit=${(e: any) => e.preventDefault()}>
                    <div>
                      <bcg-input-email
                        name="email"
                        label="E-Mail *"
                        placeholder=""
                        .modelValue="${email}"
                        .validators=${[new Required('Input')]}
                        @model-value-changed=${({ target }: any) => {
                          email = target.value;
                        }}
                      ></bcg-input-email>
                      <div
                        style="display:block;flex-direction:row ; flex-basis:100%; justify-content:center; align-items:center;"
                      >
                        <bcg-input
                          style="flex-basis:100%;"
                          label="Passwort *"
                          type=${passwordInputType}
                          placeholder=""
                          .modelValue="${password}"
                          .validators=${[
                            new Required('Input'),
                            new MinLength(3),
                          ]}
                          name="password"
                          @model-value-changed=${({ target }: any) => {
                            password = target.value;
                          }}
                        ></bcg-input>

                        <lion-icon
                          style="position: relative;
                        right: -94%;
                        top: -30px;
                        width: 24px;
                        height: 24px;"
                          @click=${this.flipPasswordInput}
                          icon-id=${
                            passwordInputType === 'password'
                              ? 'bcg:general:eye'
                              : 'bcg:general:eyeopen'
                          }
                        ></lion-icon>
                      </div>
                    </div>

                    <div
                      style="display:flex;margin-top:20px;justify-content: space-between;"
                    >        
              <bcg-button-submit>Anmelden</bcg-button-submit>

                      <a
                      href
                      style="display: flex;
                      align-items: center;"
                      onclick="return false"
                        @click=${onPasswordReset}
                        @keydown=${onPasswordReset}

                        >Passwort zurücksetzen</a
                      >
                    </div>
                  </form></bcg-formw
                >`}
        </div>
      </div>
    `;
  }
}

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

  @property({ type: Boolean }) disablePasswordReset: boolean = false;

  @property({ type: String }) password: string = '';

  static get scopedElements() {
    return { 'lion-icon': LionIcon };
  }

  render() {
    let { email, password, onPasswordReset } = this;

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
    };

    return html`
      <div>
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

                        <bcg-input-password
                          label="Passwort"
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
                        ></bcg-input-password>

                    </div>

                    <div
                      style="display:flex;margin-top:20px;justify-content: space-between;"
                    >        
              <bcg-button-submit>Anmelden</bcg-button-submit>
                ${
                  !this.disablePasswordReset
                    ? html` <a
                        href
                        style="display: flex;
                align-items: center;"
                        onclick="return false"
                        @click=${onPasswordReset}
                        @keydown=${onPasswordReset}
                        >Passwort zurücksetzen</a
                      >`
                    : null
                }
                     
                    </div>
                  </form></bcg-formw
                >`}
        </div>
      </div>
    `;
  }
}

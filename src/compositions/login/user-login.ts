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

  static get scopedElements() {
    return { 'lion-icon': LionIcon };
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
      this.isLoading = true;
      await sendLoginRequest({ email, password });
    };

    return html`
     <bcg-form name="login" @submit=${submitHandler}>
        <form @submit=${(e: any) => e.preventDefault()}>

      <div style="width:640px;">
      <div class="left-side" style="display:flex;flex-direction: column;">
      

      ${
        this.showNotification
          ? html`<bcg-notification
              variant=${this.notificationType}
              message=${this.notificationMessage}
            ></bcg-notification> `
          : null
      }

      ${
        this.isLoading
          ? html`<bcg-progress></bcg-progress>`
          : html`<h1>Willkommen!</h1>
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
                <div
                  style="display:block;flex-direction:row ; flex-basis:100%; justify-content:center; align-items:center;"
                >
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

                  <lion-icon
                    style="    position: relative;
    right: -94%;
    top: -30px;
    width: 24px;
    height: 24px;"
                    @click=${this.flipPasswordInput}
                    icon-id="bcg:general:eye"
                  ></lion-icon>
                </div>
              </div>
              <!-- <bcg-checkbox-group name="save-login-data" .validators=${[]}>
              <bcg-checkbox
                label="Anmeldedaten merken"
                .choiceValue=${'Anmeldedaten merken'}
              ></bcg-checkbox>
            </bcg-checkbox-group> -->
              <div
                style="display:flex;margin-top:20px;justify-content: space-between;"
              >
                <bcg-button
                  variant="secondary"
                  @click=${onPasswordReset}
                  @keydown=${onPasswordReset}
                  >Password zurücksetzten</bcg-button
                >
                <bcg-button-submit>Anmelden</bcg-button-submit>
              </div>`
      }
     
        </div>
        </div>
      </div>
            </form >
            
            </bcg-form >
    `;
  }
}

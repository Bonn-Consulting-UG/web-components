import {
  html,
  css,
  LitElement,
  ScopedElementsMixin,
  property,
} from '@lion/core';
import {
  Required,
  MinLength,
  MaxLength,
} from '../../utils/helpers/input-errors';
import { sendNewVerifyCodeRequest } from '../../utils/services/login';
import { PasswordMatch } from '../../utils/validators/password-match';

export class BcgPasswordResetConfirm extends ScopedElementsMixin(LitElement) {
  nextStep: any;

  user: any;

  dsgvo: object = { value: 'foo', checked: false };

  firstname: string = 'Stefan';

  lastname: string = 'Scheifel';

  email: string = '';

  password: string = '';

  passwordrepeat: string = '';

  @property({ type: String }) passwordInputType: string = 'password';
  @property({ type: String }) passwordRepeatInputType: string = 'password';

  @property({ type: String }) code: string = '';

  @property({ type: String }) resetEmail: string = '';

  flipPasswordInput() {
    if (this.passwordInputType === 'password') {
      this.passwordInputType = 'text';
    } else {
      this.passwordInputType = 'password';
    }
  }

  flipPasswordRepeatInput() {
    if (this.passwordRepeatInputType === 'password') {
      this.passwordRepeatInputType = 'text';
    } else {
      this.passwordRepeatInputType = 'password';
    }
  }

  static get properties() {
    return {
      nextStep: { type: Function },
      user: { type: Object },
    };
  }

  constructor() {
    super();
    this.nextStep = () => 'test';
  }

  static get styles() {
    return [css``];
  }

  render() {
    let { code, password, passwordrepeat } = this;

    const submitHandler = (ev: any) => {
      if (ev.target.hasFeedbackFor.includes('error')) {
        const firstFormElWithError = ev.target.formElements.find((el: any) =>
          el.hasFeedbackFor.includes('error')
        );
        firstFormElWithError.focus();
        return;
      }
      this.nextStep({ code, password });
    };

    return html`<bcg-form @submit=${submitHandler}>
      <form @submit=${(e: any) => e.preventDefault()}>
        <div>
          <h2>Geben Sie den Code ein</h2>
          <p>
            Sie haben einen Code an folgende E-Mail-Adresse erhalten:
            ${this.resetEmail}
          </p>
          <bcg-input
            name="verifycode"
            label=""
            placeholder="Geben Sie den 15-stelligen Code ein"
            .modelValue="${code}"
            .validators=${[
              new Required(),
              new MinLength(15),
              new MaxLength(15),
            ]}
            @model-value-changed=${({ target }: any) => {
              code = target.value;
            }}
          ></bcg-input>
        </div>
        <div>
          <h2>Legen Sie ein neues Password an</h2>
          <bcg-fieldset
            name="password-fieldset"
            .validators=${[new PasswordMatch()]}
          >
            <div style="position: relative;">
              <bcg-input
                label="Passwort"
                type=${this.passwordInputType}
                placeholder=""
                name="password"
                @model-value-changed=${({ target }: any) => {
                  password = target.value;
                }}
                .validators=${[new Required()]}
                .modelValue="${password}"
              ></bcg-input>
              <lion-icon
                style="
    position: absolute;
    right: 2%;
    top: 30px;
    width: 24px;
    height: 24px;"
                @click=${this.flipPasswordInput}
                icon-id=${this.passwordInputType === 'password'
                  ? 'bcg:general:eye'
                  : 'bcg:general:eyeopen'}
              ></lion-icon>
            </div>

            <div style="position: relative;">
              <bcg-input
                name="passwordrepeat"
                label="Passwort wiederholen"
                type=${this.passwordRepeatInputType}
                placeholder=""
                .validators=${[new Required()]}
                .modelValue="${this.passwordrepeat}"
                @model-value-changed=${({ target }: any) => {
                  passwordrepeat = target.value;
                }}
              ></bcg-input>
              <lion-icon
                style="
    position: absolute;
    right: 2%;
    top: 30px;
    width: 24px;
    height: 24px;"
                @click=${this.flipPasswordRepeatInput}
                icon-id=${this.passwordRepeatInputType === 'password'
                  ? 'bcg:general:eye'
                  : 'bcg:general:eyeopen'}
              ></lion-icon>
            </div>
          </bcg-fieldset>
        </div>

        <bcg-button-submit>Password zurücksetzten</bcg-button-submit>
      </form>
    </bcg-form> `;
  }
}

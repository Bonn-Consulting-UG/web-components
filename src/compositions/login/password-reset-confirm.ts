import {
  html,
  css,
  LitElement,
  ScopedElementsMixin,
  property,
} from '@lion/core';
import { MinLength, Required } from '@lion/form-core';
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

  flipPasswordInput() {
    if (this.passwordInputType === 'password') {
      this.passwordInputType = 'text';
    } else {
      this.passwordInputType = 'password';
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
    this.user = 'test';
  }

  static get styles() {
    return [css``];
  }

  code: any = null;

  render() {
    console.log(this.user);
    let { code, password, passwordrepeat } = this;
    Required.getMessage = async () => 'Angabe benötigt';
    MinLength.getMessage = async () => `Mindestens 4 Zeichen`;

    const submitHandler = (ev: any) => {
      if (ev.target.hasFeedbackFor.includes('error')) {
        const firstFormElWithError = ev.target.formElements.find((el: any) =>
          el.hasFeedbackFor.includes('error')
        );
        firstFormElWithError.focus();
        return;
      }
      this.nextStep();
    };

    return html`<bcg-form @submit=${submitHandler}>
      <form @submit=${(e: any) => e.preventDefault()}>
        <div>
          <h2>Geben Sie den Code ein</h2>
          <p>
            Sie haben einen Code an folgende E-Mail-Adresse
            erhalten:${this.user.email}
          </p>
          <bcg-input
            name="verifycode"
            label=""
            placeholder="Geben Sie den 6-stelligen Code ein"
            .modelValue="${code}"
            .validators=${[new Required(), new MinLength(6)]}
            @model-value-changed=${({ target }: any) => {
              code = target.value;
            }}
          ></bcg-input>
        </div>
        <div>
          <h2>Legen Sie ein neues Passwort an</h2>
          <bcg-fieldset
            name="password-fieldset"
            .validators=${[new PasswordMatch()]}
          >
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
            <bcg-button
              style="margin-top:25px ;margin-left:5px"
              variant="tertiary"
              @click=${this.flipPasswordInput}
              >P</bcg-button
            >

            <bcg-input
              name="passwordrepeat"
              label="Passwort wiederholen"
              type=${this.passwordInputType}
              placeholder=""
              .validators=${[new Required()]}
              .modelValue="${passwordrepeat}"
              @model-value-changed=${({ target }: any) => {
                passwordrepeat = target.value;
              }}
            ></bcg-input>
          </bcg-fieldset>
        </div>

        <bcg-button-submit>Code abschicken</bcg-button-submit>
      </form>
    </bcg-form> `;
  }
}

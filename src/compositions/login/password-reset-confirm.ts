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

  @property({ type: String }) code: string = '';

  @property({ type: String }) resetEmail: string = '';

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
            placeholder="Geben Sie den 15-stelligen Code ein  *"
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
            <bcg-input-password
              label="Passwort"
              placeholder=""
              name="password"
              .validators=${[new Required()]}
              .modelValue="${password}"
            ></bcg-input-password>

            <bcg-input-password
              label="Passwort wiederholen"
              placeholder=""
              name="passwordrepeat"
              .validators=${[new Required()]}
              .modelValue="${passwordrepeat}"
            ></bcg-input-password>
          </bcg-fieldset>
        </div>

        <bcg-button-submit>Password zurücksetzten</bcg-button-submit>
      </form>
    </bcg-form> `;
  }
}

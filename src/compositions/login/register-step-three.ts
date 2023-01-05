import { html, css, LitElement, ScopedElementsMixin } from '@lion/core';
import {
  Required,
  MinLength,
  MaxLength,
} from '../../utils/helpers/input-errors';
import { sendNewVerifyCodeRequest } from '../../utils/services/login';

export class BcgRegisterStepThree extends ScopedElementsMixin(LitElement) {
  nextStep: any;

  user: any;

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
    let { code } = this;

    const submitHandler = (ev: any) => {
      if (ev.target.hasFeedbackFor.includes('error')) {
        const firstFormElWithError = ev.target.formElements.find((el: any) =>
          el.hasFeedbackFor.includes('error')
        );
        firstFormElWithError.focus();
        return;
      }
      this.nextStep(code);
    };

    return html`<bcg-form @submit=${(ev: any) => submitHandler(ev)}>
      <form @submit=${(e: any) => e.preventDefault()}>
        <div>
          <h1>Registrierung</h1>

          <h2>
            Sie haben einen Bestätigungscode per E-Mail (${this.user.email})
            erhalten. Bitte geben Sie den Code ein:
          </h2>

          <bcg-input
            name="verifycode"
            label=""
            placeholder="Geben Sie den 6-stelligen Code ein"
            .modelValue="${code}"
            .validators=${[new Required(), new MinLength(6), new MaxLength(6)]}
            @model-value-changed=${({ target }: any) => {
              code = target.value;
            }}
          ></bcg-input>
        </div>
        <div>
          <h3>Sie haben keine E-Mail erhalten?</h3>
          <div style="display:flex;flex-direction:column">
            <a
              href="javascript:void(0)"
              @click=${() => {
                sendNewVerifyCodeRequest(this.user.id);
              }}
            >
              &bull; Neuen Code senden
            </a>

            <a
              href="javascript:void(0)"
              @click=${() => {
                this.nextStep('back');
              }}
            >
              &bull; E-Mail Adresse überarbeiten
            </a>
          </div>
        </div>

        <bcg-button-submit variant="primary">Code abschicken</bcg-button-submit>
      </form>
    </bcg-form> `;
  }
}

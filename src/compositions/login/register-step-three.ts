import { html, css, LitElement, ScopedElementsMixin } from '@lion/core';
import { MinLength, Required } from '@lion/form-core';
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
    Required.getMessage = async () => 'Angabe benötigt';
    MinLength.getMessage = async () => `Mindestens 6 Zeichen`;

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
            .validators=${[new Required(), new MinLength(6)]}
            @model-value-changed=${({ target }: any) => {
              code = target.value;
            }}
          ></bcg-input>
        </div>
        <div>
          <h3>Sie haben keine E-Mail erhalten?</h3>
          <a
            href
            @click=${() => {
              sendNewVerifyCodeRequest(this.user.id);
            }}
          >
            Neuen Code senden
          </a>

          <a
            href
            @click=${() => {
              this.nextStep('back');
            }}
          >
            E-Mail Adresse überarbeiten
          </a>
        </div>

        <bcg-button-submit variant="primary">Code abschicken</bcg-button-submit>
      </form>
    </bcg-form> `;
  }
}

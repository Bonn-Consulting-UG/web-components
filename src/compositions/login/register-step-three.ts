import { html, css, LitElement, ScopedElementsMixin } from '@lion/core';
import { MinLength, Required } from '@lion/form-core';

export class BcgRegisterStepThree extends ScopedElementsMixin(LitElement) {
  nextStep: any;

  static get properties() {
    return {
      nextStep: { type: Function }
    };
  }

  constructor() {
    super();
    this.nextStep = () => 'test';
  }

  static get styles() {
    return [css``];
  }

  code: any = null;

  render() {
    let { code } = this;
    Required.getMessage = async () => 'Is Required';
    MinLength.getMessage = async () => `Mindestens 4 Zeichen`;

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

    return html`<bcg-form @submit=${submitHandler}>
      <form @submit=${(e: any) => e.preventDefault()}>
        <div>
          <h2>
            Sie haben einen Bestätigungscode per E-Mail erhalten. Bitte geben
            Sie den Code ein:
          </h2>

          <bcg-input
            name="verifycode"
            label=""
            placeholder="Geben Sie den 4-stelligen Code ein"
            .modelValue="${code}"
            .validators=${[new Required(), new MinLength(4)]}
            @model-value-changed=${({ target }: any) => {
              code = target.value;
            }}
          ></bcg-input>
        </div>
        <div>
          <h3>Sie haben keine E-Mail erhalten?</h3>
          <ul>
            <li>Neuen Code senden</li>
            <li>E-Mail Adresse überarbeiten</li>
          </ul>
        </div>

        <bcg-button-submit>Code abschicken</bcg-button-submit>
      </form>
    </bcg-form> `;
  }
}

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
import {
  checkVerifyCode,
  sendNewVerifyCodeRequest,
} from '../../utils/services/login';

export class BcgUserVerify extends ScopedElementsMixin(LitElement) {
  @property({ type: String }) code: any = new URLSearchParams(
    window.location.search
  ).get('code');

  @property({ type: String }) userEmail: any;
  @property({ type: String }) userId: any = new URLSearchParams(
    window.location.search
  ).get('userId');

  static get styles() {
    return [css``];
  }

  render() {
    console.log(this.code);
    console.log(this.userId);
    let { code } = this;

    const submitHandler = async (ev: any) => {
      if (ev.target.hasFeedbackFor.includes('error')) {
        const firstFormElWithError = ev.target.formElements.find((el: any) =>
          el.hasFeedbackFor.includes('error')
        );
        firstFormElWithError.focus();
        return;
      }

      const response = await checkVerifyCode(this.userId, this.code);
      console.log(response);
    };

    return html`<bcg-form @submit=${(ev: any) => submitHandler(ev)}>
      <form @submit=${(e: any) => e.preventDefault()}>
        <div>
          <h1>Verifizierung</h1>

          <h2>
            Sie haben einen Bestätigungscode per E-Mail (${this.userEmail})
            erhalten. Bitte geben Sie den Code ein:
          </h2>

          <bcg-input
            name="verifycode"
            label=""
            placeholder="Geben Sie den 6-stelligen Code ein  *"
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
                sendNewVerifyCodeRequest(this.userEmail);
              }}
            >
              &bull; Neuen Code senden
            </a>
          </div>
        </div>

        <bcg-button-submit variant="primary">Code abschicken</bcg-button-submit>
      </form>
    </bcg-form> `;
  }
}

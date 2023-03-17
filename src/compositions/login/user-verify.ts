import {
  html,
  css,
  LitElement,
  ScopedElementsMixin,
  property,
} from '@lion/core';
import { HttpResponseInterceptor } from 'cypress/types/net-stubbing';
import { BcgModule } from '../../components/module';
import {
  Required,
  MinLength,
  MaxLength,
} from '../../utils/helpers/input-errors';
import {
  checkVerifyCode,
  sendNewVerifyCodeRequest,
} from '../../utils/services/login';

export class BcgUserVerify extends ScopedElementsMixin(BcgModule) {
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
    let { code } = this;

    const redirect = () =>
      setTimeout(() => {
        window.location.href = window.origin;
      }, 5000);

    const submitHandler = async (ev: any) => {
      if (ev.target.hasFeedbackFor.includes('error')) {
        const firstFormElWithError = ev.target.formElements.find((el: any) =>
          el.hasFeedbackFor.includes('error')
        );
        firstFormElWithError.focus();
        return;
      }

      const response: any = await checkVerifyCode(this.userId, this.code);

      if (response.status === 200) {
        this.showNotification = true;
        this.notificationMessage = `Ihr User wurde erfolgreich Freigeschaltet - Sie werden in 5 Sekunden weitergeleitet`;
        this.notificationType = 'success';
        redirect();
      } else if (response.status === 409) {
        this.showNotification = true;
        this.notificationMessage = `User wurde bereits Verifiziert.`;
        this.notificationType = 'error';
        redirect();
      } else if (response.status === 400) {
        this.showNotification = true;
        this.notificationMessage = `Unbekannter Fehler aufgetreten`;
        this.notificationType = 'error';
      }
    };

    return html`<bcg-form @submit=${(ev: any) => submitHandler(ev)}>
      ${this.showNotification
        ? html`<bcg-notification
            .closeHandler=${this.disabledNotification}
            variant=${this.notificationType}
            message=${this.notificationMessage}
          ></bcg-notification> `
        : null}
      <form @submit=${(e: any) => e.preventDefault()}>
        <div>
          <h1>Verifizierung</h1>

          <h2>
            Sie haben einen Bestätigungscode per E-Mail erhalten. Bitte geben
            Sie den Code ein:
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

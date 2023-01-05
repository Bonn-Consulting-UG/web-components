/* eslint-disable import/extensions */
import {
  html,
  css,
  LitElement,
  ScopedElementsMixin,
  property,
} from '@lion/core';
import { Required, IsEmail } from '../../utils/helpers/input-errors';
import { BcgButton } from '../../components/button/button';
import { BcgCheckboxGroup } from '../../components/checkbox-group/checkbox-group';
import { BcgInput } from '../../components/input/input';
import { PasswordMatch } from '../../utils/validators/password-match';
import { PasswordSecurity } from '../../utils/validators/password-security';

export class BcgPasswordResetStart extends ScopedElementsMixin(LitElement) {
  static get styles() {
    return [css``];
  }

  nextStep: any;

  @property({ type: Function }) back: any;
  @property({ type: Function }) resetEmail: any;
  @property({ type: Function }) setEmail: any;

  onChange: any;

  static get properties() {
    return {
      nextStep: { type: Function },
      onChange: { type: Function },
      back: { type: Function },
    };
  }

  constructor() {
    super();
    this.nextStep = () => 'test';
  }

  static get scopedElements() {
    return {
      'bcg-input': BcgInput,
      'bcg-button': BcgButton,
      'bcg-checkbox-group': BcgCheckboxGroup,
    };
  }

  render() {
    let { resetEmail } = this;

    const submitHandler = (ev: any) => {
      if (ev.target.hasFeedbackFor.includes('error')) {
        const firstFormElWithError = ev.target.formElements.find((el: any) =>
          el.hasFeedbackFor.includes('error')
        );
        firstFormElWithError.focus();
        return;
      }
      this.nextStep(this.resetEmail);
    };

    return html`
      <bcg-form @submit=${submitHandler}>
        <form @submit=${(e: any) => e.preventDefault()}>
          <div>
          <div style="display:flex;flex-direction:column">
            <a
              href
              onclick="return false"
              @click=${this.back}
              @keydown=${this.back}>
              Zurück
            </a>

            <h2>Passwort zurücksetzen</h2>
            <p>
              Hier können Sie Ihr bestehendes Passwort zurücksetzen und im
              nächsten Schritt ein neues anlegen.
            </p>

            <bcg-input-email
              style="margin-bottom:10px;"
              name="email"
              label="Ihre E-Mail"
              placeholder=""
              .modelValue="${resetEmail}"
              .validators=${[new Required(), new IsEmail()]}
              @model-value-changed=${({ target }: any) => {
                this.resetEmail = target.value;
              }}
            ></bcg-input-email>
            <bcg-button-submit style="display:flex;">Passwort zurücksetzen</bcg-button-submit>
          </div>
        </form>
      </bcg-form>
    `;
  }
}

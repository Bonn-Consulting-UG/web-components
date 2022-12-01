/* eslint-disable import/extensions */
import { html, css, LitElement, ScopedElementsMixin } from '@lion/core';
import { Required, IsEmail } from '../../utils/helpers/input-errors';
import { BcgModule } from '../../components/module';
import { sendUserDataChangeRequest } from '../../utils/services/login';

export class BcgEditUserData extends ScopedElementsMixin(BcgModule) {
  user: any;

  static get properties() {
    return {
      nextStep: { type: Function },
      onChange: { type: Function },
    };
  }

  constructor() {
    super();
    this.user = {};
  }

  static get styles() {
    return [css``];
  }

  render() {
    const submitHandler = async (ev: any) => {
      if (ev.target.hasFeedbackFor.includes('error')) {
        const firstFormElWithError = ev.target.formElements.find((el: any) =>
          el.hasFeedbackFor.includes('error')
        );
        firstFormElWithError.focus();
        return;
      }

      this.isLoading = true;
      const res = await sendUserDataChangeRequest(this.user);
      this.isLoading = false;
    };

    console.log(this.user);
    return html`
      <div>
        <bcg-form @submit=${submitHandler}>
          <form @submit=${(e: any) => e.preventDefault()}>
            <h2>Persönliche Angaben</h2>
            ${this.isLoading
              ? html`<bcg-progress></bcg-progress>`
              : html`
                  <bcg-input
                    label="Ihr Vorname"
                    .validators=${[new Required()]}
                    placeholder=""
                    .modelValue="${this.user.given_name}"
                    @model-value-changed=${({ target }: any) => {
                      this.user.given_name = target.value;
                    }}
                    name="firstname"
                  ></bcg-input>
                  <bcg-input
                    label="Ihr Nachname"
                    .validators=${[new Required()]}
                    placeholder=""
                    @model-value-changed=${({ target }: any) => {
                      this.user.family_name = target.value;
                    }}
                    .modelValue="${this.user.family_name}"
                    name="lastname"
                  ></bcg-input>
                  <bcg-input
                    label="Ihre E-Mail"
                    help-text="Kann nicht geändert werden"
                    .validators=${[new Required(), new IsEmail()]}
                    .modelValue="${this.user.email}"
                    disabled
                    placeholder=""
                    name="email"
                  ></bcg-input>
                  <bcg-button-submit
                    style="margin-top:10px"
                    @click="${() => console.log('ButtonPress Save')}"
                    >Speichern</bcg-button-submit
                  >
                `}
          </form>
        </bcg-form>
      </div>
    `;
  }
}

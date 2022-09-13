/* eslint-disable import/extensions */
import { html, css, LitElement, ScopedElementsMixin } from '@lion/core';
import { IsEmail, Required } from '@lion/form-core';
import { sendUserDataChangeRequest } from '../../utils/services/login';

export class BcgEditUserData extends ScopedElementsMixin(LitElement) {
  user: any;

  static get properties() {
    return {
      nextStep: { type: Function },
      onChange: { type: Function }
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
      console.log(this.user.userId);
      const res = await sendUserDataChangeRequest(this.user);
      console.log(res);
    };
    IsEmail.getMessage = async () => 'Muss eine gültige Email sein';
    Required.getMessage = async () => 'Angabe benötigt';
    return html`
      <div>
        <bcg-form @submit=${submitHandler}>
          <form @submit=${(e: any) => e.preventDefault()}>
            <h2>Persönliche Angaben</h2>

            <bcg-input
              label="Ihr Vorname"
              .validators=${[new Required()]}
              placeholder=""
              .modelValue="${this.user.firstname}"
              @model-value-changed=${({ target }: any) => {
                this.user.firstname = target.value;
              }}
              name="firstname"
            ></bcg-input>
            <bcg-input
              label="Ihr Nachname"
              .validators=${[new Required()]}
              placeholder=""
              @model-value-changed=${({ target }: any) => {
                this.user.lastname = target.value;
              }}
              .modelValue="${this.user.lastname}"
              name="lastname"
            ></bcg-input>
            <bcg-input
              label="Ihre E-Mail"
              .validators=${[new Required(), new IsEmail()]}
              .modelValue="${this.user.email}"
              disabled
              placeholder=""
              name="email"
            ></bcg-input>
            <bcg-button-submit @click="${() => console.log('ButtonPress Save')}"
              >Speichern</bcg-button-submit
            >
          </form>
        </bcg-form>
      </div>
    `;
  }
}

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
      const res = await sendUserDataChangeRequest('');
      console.log(res);
    };
    IsEmail.getMessage = async () => 'Must be a E mail';
    Required.getMessage = async () => 'Is Required';
    return html`
      <div>
        <bcg-form @submit=${submitHandler}>
          <form @submit=${(e: any) => e.preventDefault()}>
            <bcg-input
              label="Ihr Vorname *"
              .validators=${[new Required()]}
              placeholder=""
              .modelValue="${this.user.firstname}"
              name="firstname"
            ></bcg-input>
            <bcg-input
              label="Ihr Nachname *"
              .validators=${[new Required()]}
              placeholder=""
              .modelValue="${this.user.lastname}"
              name="lastname"
            ></bcg-input>
            <bcg-input
              label="Ihre Email *"
              .validators=${[new Required(), new IsEmail()]}
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

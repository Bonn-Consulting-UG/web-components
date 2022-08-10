/* eslint-disable import/extensions */
import { html, css, LitElement, ScopedElementsMixin } from '@lion/core';
import { BcgButton } from '../../components/button/button';
import { BcgCheckboxGroup } from '../../components/checkbox-group/checkbox-group';
import { BcgInput } from '../../components/input/input';
import registerData from '../../utils/data/composition/register.json' assert { type: 'json' };

export class BcgRegisterStepTwo extends ScopedElementsMixin(LitElement) {
  static get styles() {
    return [css``];
  }

  nextStep: any;

  onChange: any;

  static get properties() {
    return {
      nextStep: { type: Function },
      onChange: { type: Function }
    };
  }

  constructor() {
    super();
    this.nextStep = () => 'test';
  }

  firstname: string = '';

  lastname: string = '';

  email: string = '';

  password: string = '';

  passwordrepeat: string = '';

  static get scopedElements() {
    return {
      'bcg-input': BcgInput,
      'bcg-button': BcgButton,
      'bcg-checkbox-group': BcgCheckboxGroup
    };
  }
  // Regex for Password
  // "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$"

  render() {
    let { firstname, lastname, email, password, passwordrepeat } = this;

    return html`
      <div>
        <h2>${registerData.stepTwo.headline}</h2>
        <bcg-button disabled>Facebook</bcg-button>
        <bcg-button disabled>Twitter</bcg-button>
        <bcg-button disabled>Gmail</bcg-button>
      </div>

      <div>
        <bcg-input
          label="Vorname"
          placeholder=""
          .modelValue="${firstname}"
          @model-value-changed=${({ target }: any) => {
            firstname = target.value;
          }}
        ></bcg-input>
        <bcg-input
          @model-value-changed=${({ target }: any) => {
            lastname = target.value;
          }}
          label="Nachname"
          placeholder=""
        ></bcg-input>
        <bcg-input-email
          @model-value-changed=${({ target }: any) => {
            email = target.value;
          }}
          label="E-Mail"
          placeholder=""
        ></bcg-input-email>
        <bcg-input
          @model-value-changed=${({ target }: any) => {
            password = target.value;
          }}
          label="Password"
          type="password"
          placeholder=""
        ></bcg-input>
        <bcg-input
          @model-value-changed=${({ target }: any) => {
            passwordrepeat = target.value;
          }}
          label="Password wiederholen"
          type="password"
          placeholder=""
        ></bcg-input>
        <bcg-checkbox-group>
          <bcg-checkbox
            label="Ich akzeptiere die Netiquette und die Datenschutzerklärung.*"
            .choiceValue=${'Ich akzeptiere die Netiquette und die Datenschutzerklärung.'}
          ></bcg-checkbox>
        </bcg-checkbox-group>
        <bcg-button
          @click="${() => {
            this.nextStep({
              firstname,
              lastname,
              password,
              email
            });
          }}"
          >Registrieren</bcg-button
        >
      </div>
    `;
  }
}

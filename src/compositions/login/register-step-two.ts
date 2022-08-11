/* eslint-disable import/extensions */
import { html, css, LitElement, ScopedElementsMixin } from '@lion/core';
import { IsEmail, Required } from '@lion/form-core';
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

  dsgvo: object = { value: 'foo', checked: false };

  firstname: string = 'Stefan';

  lastname: string = 'Scheifel';

  email: string = 'testingepart@trash-mail.com';

  password: string = 'test';

  passwordrepeat: string = 'test';

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
    let { firstname, lastname, email, password, passwordrepeat, dsgvo } = this;

    const submitHandler = (ev: any) => {
      if (ev.target.hasFeedbackFor.includes('error')) {
        const firstFormElWithError = ev.target.formElements.find((el: any) =>
          el.hasFeedbackFor.includes('error')
        );
        firstFormElWithError.focus();
        return;
      }
      this.nextStep({ firstname, lastname, email, password });
    };

    IsEmail.getMessage = async () => 'Must be a E mail';
    Required.getMessage = async () => 'Is Required';

    return html`
      <bcg-form @submit=${submitHandler}>
        <form @submit=${(e: any) => e.preventDefault()}>
          <div>
            <h2>${registerData.stepTwo.headline}</h2>
            <bcg-button disabled>Facebook</bcg-button>
            <bcg-button disabled>Twitter</bcg-button>
            <bcg-button disabled>Gmail</bcg-button>
          </div>

          <div>
            <bcg-input
              label="Vorname"
              name="firstname"
              placeholder=""
              .validators=${[new Required()]}
              .modelValue="${firstname}"
              @model-value-changed=${({ target }: any) => {
                firstname = target.value;
              }}
            ></bcg-input>
            <bcg-input
              name="lastname"
              label="Nachname"
              placeholder=""
              .modelValue="${lastname}"
              .validators=${[new Required()]}
              @model-value-changed=${({ target }: any) => {
                lastname = target.value;
              }}
            ></bcg-input>
            <bcg-input-email
              name="email"
              label="E-Mail"
              placeholder=""
              .modelValue="${email}"
              .validators=${[new Required(), new IsEmail()]}
              @model-value-changed=${({ target }: any) => {
                email = target.value;
              }}
            ></bcg-input-email>
            <bcg-input
              label="Password"
              type="password"
              placeholder=""
              .modelValue="${password}"
              .validators=${[new Required()]}
              name="password"
              @model-value-changed=${({ target }: any) => {
                password = target.value;
              }}
            ></bcg-input>
            <bcg-input
              .validators=${[new Required()]}
              name="passwordrepeat"
              .modelValue="${passwordrepeat}"
              @model-value-changed=${({ target }: any) => {
                passwordrepeat = target.value;
              }}
              label="Password wiederholen"
              type="password"
              placeholder=""
            ></bcg-input>
            <bcg-checkbox-group name="dsgvo" .validators=${[new Required()]}>
              <bcg-checkbox
                label="Ich akzeptiere die Netiquette und die Datenschutzerklärung.*"
                .choiceValue=${'Ich akzeptiere die Netiquette und die Datenschutzerklärung.'}
              ></bcg-checkbox>
            </bcg-checkbox-group>
            <bcg-button-submit>Registrieren</bcg-button-submit>
          </div>
        </form>
      </bcg-form>
    `;
  }
}

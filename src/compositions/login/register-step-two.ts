/* eslint-disable import/extensions */
import {
  html,
  css,
  LitElement,
  ScopedElementsMixin,
  property,
} from '@lion/core';
import { IsEmail, Pattern, Required } from '@lion/form-core';
import { BcgButton } from '../../components/button/button';
import { BcgCheckboxGroup } from '../../components/checkbox-group/checkbox-group';
import { BcgInput } from '../../components/input/input';
import { PasswordMatch } from '../../utils/validators/password-match';
import { PasswordSecurity } from '../../utils/validators/password-security';

export class BcgRegisterStepTwo extends ScopedElementsMixin(LitElement) {
  static get styles() {
    return [css``];
  }

  nextStep: any;

  onChange: any;

  static get properties() {
    return {
      nextStep: { type: Function },
      onChange: { type: Function },
    };
  }

  constructor() {
    super();
    this.nextStep = () => 'test';
  }

  dsgvo: object = { value: 'foo', checked: true };

  firstName: string = 'Stefan';

  lastName: string = 'Scheifel';

  email: string = 'wefw@me.com';

  password: string = '1234';

  passwordrepeat: string = '1234';

  @property({ type: String }) passwordInputType: string = 'password';

  flipPasswordInput() {
    if (this.passwordInputType === 'password') {
      this.passwordInputType = 'text';
    } else {
      this.passwordInputType = 'password';
    }
  }

  static get scopedElements() {
    return {
      'bcg-input': BcgInput,
      'bcg-button': BcgButton,
      'bcg-checkbox-group': BcgCheckboxGroup,
    };
  }

  // Regex for Password
  // "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$"

  render() {
    let { firstName, lastName, email, password, passwordrepeat, dsgvo } = this;

    const submitHandler = async (ev: any) => {
      if (ev.target.hasFeedbackFor.includes('error')) {
        const firstFormElWithError = ev.target.formElements.find((el: any) =>
          el.hasFeedbackFor.includes('error')
        );
        firstFormElWithError.focus();
        return;
      }

      this.nextStep({
        firstName,
        lastName,
        email,
        password,
        language: 'de_DE',
        isOrganization: false,
      });
    };

    IsEmail.getMessage = async () => 'Muss eine gültige Email sein';
    Required.getMessage = async () => 'Angabe benötigt';

    return html`
      <bcg-form @submit=${submitHandler}>
        <form @submit=${(e: any) => e.preventDefault()}>
          <div>
            <bcg-input
              label="Vorname"
              name="firstName"
              placeholder=""
              .validators=${[new Required()]}
              .modelValue="${firstName}"
              @model-value-changed=${({ target }: any) => {
                firstName = target.value;
              }}
            ></bcg-input>
            <bcg-input
              name="lastName"
              label="Nachname"
              placeholder=""
              .modelValue="${lastName}"
              .validators=${[new Required()]}
              @model-value-changed=${({ target }: any) => {
                lastName = target.value;
              }}
            ></bcg-input>
            <bcg-input-email
              name="email"
              label="Ihre E-Mail"
              placeholder=""
              .modelValue="${email}"
              .validators=${[new Required(), new IsEmail()]}
              @model-value-changed=${({ target }: any) => {
                email = target.value;
              }}
            ></bcg-input-email>
            <bcg-fieldset
              name="password-fieldset"
              .validators=${[new PasswordMatch()]}
            >
              <bcg-input
                label="Passwort"
                type=${this.passwordInputType}
                placeholder=""
                name="password"
                @model-value-changed=${({ target }: any) => {
                  password = target.value;
                }}
                .validators=${[new Required()]}
                .modelValue="${password}"
              ></bcg-input>
              <bcg-button variant="tertiary" @click=${this.flipPasswordInput}
                >P</bcg-button
              >

              <bcg-input
                name="passwordrepeat"
                label="Passwort wiederholen"
                type=${this.passwordInputType}
                placeholder=""
                .validators=${[new Required()]}
                .modelValue="${passwordrepeat}"
                @model-value-changed=${({ target }: any) => {
                  passwordrepeat = target.value;
                }}
              ></bcg-input>
            </bcg-fieldset>
            <bcg-checkbox-group name="dsgvo" .validators=${[new Required()]}>
              <bcg-checkbox
                label="Ich akzeptiere die Netiquette und die Datenschutzerklärung."
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

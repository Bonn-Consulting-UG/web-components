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
import { LionIcon } from '@lion/icon';

export class BcgRegisterStepTwo extends ScopedElementsMixin(LitElement) {
  static get styles() {
    return [css``];
  }

  @property() nextStep: any;

  @property() onChange: any;

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

  @property() dsgvo: object = { value: 'foo', checked: true };

  @property() firstName: string = '';

  @property() lastName: string = '';

  @property() email: string = '';

  @property() password: string = '';

  @property() passwordrepeat: string = '';

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

    return html`
      <bcg-form @submit=${submitHandler}>
        <form @submit=${(e: any) => e.preventDefault()}>
          <div>
            <bcg-input
              label="Vorname  *"
              name="firstName"
              help-text="Dieser Name ist später öffentlich sichtbar"
              placeholder=""
              .validators=${[new Required()]}
              .modelValue="${firstName}"
              @model-value-changed=${({ target }: any) => {
                firstName = target.value;
              }}
            ></bcg-input>
            <bcg-input
              name="lastName"
              label="Nachname  *"
              placeholder=""
              .modelValue="${lastName}"
              .validators=${[new Required()]}
              @model-value-changed=${({ target }: any) => {
                lastName = target.value;
              }}
            ></bcg-input>
            <bcg-input-email
              name="email"
              label="Ihre E-Mail  *"
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
              <bcg-input-password
                name="password"
                label="Passwort"
                placeholder=""
                .validators=${[new Required()]}
                .modelValue="${password}"
                @model-value-changed=${({ target }: any) => {
                  password = target.value;
                }}
              >
              </bcg-input-password>

              <bcg-input-password
                name="passwordrepeat"
                label="Passwort wiederholen"
                placeholder=""
                .validators=${[new Required()]}
                .modelValue="${passwordrepeat}"
                @model-value-changed=${({ target }: any) => {
                  passwordrepeat = target.value;
                }}
              ></bcg-input-password>
            </bcg-fieldset>
            <bcg-checkbox-group
              name="dsgvo"
              .validators=${[new Required('Checkbox')]}
            >
              <bcg-checkbox
                .choiceValue=${'Ich akzeptiere die Netiquette und die Datenschutzerklärung. *'}
                ><p slot="label">
                  Ich akzeptiere die
                  <a target="”_blank”" href="/netiquette">Netiquette</a>
                  und die
                  <a target="”_blank”" href="/datenschutz"
                    >Datenschutzerklärung</a
                  >
                </p></bcg-checkbox
              >
            </bcg-checkbox-group>
            <bcg-button-submit>Registrieren</bcg-button-submit>
          </div>
        </form>
      </bcg-form>
    `;
  }
}

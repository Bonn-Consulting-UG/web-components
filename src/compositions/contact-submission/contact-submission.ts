import { html, ScopedElementsMixin } from '@lion/core';
import { IsEmail, Required } from '@lion/form-core';
import { BcgModule } from '../../components/module';
import { sendContactSubmissionRequest } from '../../utils/services/module';

export class BcgContactSubmission extends ScopedElementsMixin(BcgModule) {
  render() {
    const { isLoggedIn } = this;

    IsEmail.getMessage = async () => 'Muss eine gültige Email sein';
    Required.getMessage = async () => 'Angabe benötigt';

    const submitHandler = (ev: any) => {
      if (ev.target.hasFeedbackFor.includes('error')) {
        const firstFormElWithError = ev.target.formElements.find((el: any) =>
          el.hasFeedbackFor.includes('error')
        );
        firstFormElWithError.focus();
      }
      sendContactSubmissionRequest(123, '123');
    };

    return html`
      <bcg-form @submit=${submitHandler}>
        <form @submit=${(e: any) => e.preventDefault()}>
          <div>
            <h1 style="margin-right:50px;">So erreichen Sie uns</h1>

            <div style="display:flex; flex-direction:row;">
              <div style="display:flex; flex-direction:column; flex-basis:30%;">
                <h2>Per Post</h2>
                <div style="margin-bottom:20px;">
                  <p>Name</p>
                  <p>Zusatz</p>
                  <p>Straße, Hausnummer</p>
                  <p>PLZ Ort</p>
                </div>
                <p>Telefon:</p>
                <p>E-Mail:</p>
              </div>

              <div style="display:flex; flex-direction:column;flex-basis:70%;">
                <h2>Per Konatkformular</h2>

                <bcg-input
                  label="Ihr Name"
                  .validators=${[new Required()]}
                  placeholder=""
                ></bcg-input>

                <bcg-input-email
                  .validators=${[new IsEmail()]}
                  label="Ihre E-Mail "
                  placeholder=""
                ></bcg-input-email>

                <bcg-input
                  label="Betreff"
                  .validators=${[new Required()]}
                  placeholder=""
                ></bcg-input>

                <bcg-textarea
                  rows="6"
                  .validators=${[new Required()]}
                  label="Nachricht"
                  placeholder=""
                ></bcg-textarea>
                <div>
                  <input type="checkbox" id="scales" name="scales" />
                  <label for="scales"
                    >Ich akzeptiere die Datenschutzerklärung</label
                  >
                </div>
                <div>
                  <bcg-button-submit
                    @click="${() => console.log('Frage einreichen Senden')}"
                    >Senden</bcg-button-submit
                  >
                </div>
              </div>
            </div>
          </div>
        </form></bcg-form
      >
    `;
  }
}

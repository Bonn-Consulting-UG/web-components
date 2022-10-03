import { html, ScopedElementsMixin } from '@lion/core';
import { IsEmail, Required } from '@lion/form-core';
import { BcgModule } from '../../components/module';
import { sendContactSubmissionRequest } from '../../utils/services/module';

export class BcgContactSubmission extends ScopedElementsMixin(BcgModule) {
  contactRequest: any = {
    name: '',
    subject: '',
    email: '',
    content: '',
    templateId: '052c982a-656b-4701-87e7-8dda7ce8ddda'
  };

  connectedCallback() {
    super.connectedCallback();
    console.log(this.moduleId);
  }

  render() {
    const { contactRequest } = this;

    IsEmail.getMessage = async () => 'Muss eine gültige Email sein';
    Required.getMessage = async () => 'Angabe benötigt';

    const submitHandler = (ev: any) => {
      if (ev.target.hasFeedbackFor.includes('error')) {
        const firstFormElWithError = ev.target.formElements.find((el: any) =>
          el.hasFeedbackFor.includes('error')
        );
        firstFormElWithError.focus();
        return;
      }
      sendContactSubmissionRequest(this.contactRequest, this.moduleId);
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
                  name="name"
                  .validators=${[new Required()]}
                  placeholder=""
                  .modelValue="${contactRequest.name}"
                  @model-value-changed=${({ target }: any) => {
                    contactRequest.name = target.value;
                  }}
                ></bcg-input>

                <bcg-input-email
                  name="email"
                  .validators=${[new Required()]}
                  .modelValue="${contactRequest.email}"
                  @model-value-changed=${({ target }: any) => {
                    contactRequest.email = target.value;
                  }}
                  label="Ihre E-Mail "
                  placeholder=""
                ></bcg-input-email>

                <bcg-input
                  name="subject"
                  label="Betreff"
                  .validators=${[new Required()]}
                  placeholder=""
                  .modelValue="${contactRequest.subject}"
                  @model-value-changed=${({ target }: any) => {
                    contactRequest.subject = target.value;
                  }}
                ></bcg-input>

                <bcg-textarea
                  name="content"
                  rows="6"
                  .validators=${[new Required()]}
                  label="Nachricht"
                  .modelValue="${contactRequest.content}"
                  @model-value-changed=${({ target }: any) => {
                    contactRequest.content = target.value;
                  }}
                  placeholder=""
                ></bcg-textarea>
                <bcg-checkbox-group
                  name="datasec"
                  .validators=${[new Required()]}
                >
                  <bcg-checkbox
                    label="Ich akzeptiere die 
        Datenschutzerklärung"
                    .choiceValue=${'Ich akzeptiere die Datenschutzerklärung'}
                  ></bcg-checkbox>
                </bcg-checkbox-group>
                <div>
                  <bcg-button-submit>Senden</bcg-button-submit>
                </div>
              </div>
            </div>
          </div>
        </form></bcg-form
      >
    `;
  }
}

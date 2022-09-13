import { html, ScopedElementsMixin } from '@lion/core';
import { IsEmail, Required } from '@lion/form-core';
import { BcgModule } from '../../components/module';
import { sendIdeaSubmissionRequest } from '../../utils/services/module';

export class BcgIdeaSubmission extends ScopedElementsMixin(BcgModule) {
  ideaRequest: any = {
    name: '',
    subject: '',
    email: '',
    content: ''
  };

  render() {
    const { ideaRequest } = this;

    const submitHandler = (ev: any) => {
      if (ev.target.hasFeedbackFor.includes('error')) {
        const firstFormElWithError = ev.target.formElements.find((el: any) =>
          el.hasFeedbackFor.includes('error')
        );
        firstFormElWithError.focus();
        return;
      }
      sendIdeaSubmissionRequest(123, '123');
    };

    IsEmail.getMessage = async () => 'Muss eine gültige Email sein';
    Required.getMessage = async () => 'Angabe benötigt';

    return html`
      <bcg-form @submit=${submitHandler}>
        <form @submit=${(e: any) => e.preventDefault()}>
          <div>
            <div style="display:flex; flex-direction:column;">
              <h1 style="flex-grow: 1;">Idee einreichen</h1>
              <p style="width:650px;">
                Hier steht Text, den das Projektteam geschrieben hat und der
                erklärt, warum es sinnvoll und wichtig ist, eine Idee für das
                projekt zu hinterlassen. Lorem ipsum dolor sit amet. Est
                eligendi accusantium est cumque excepturi sit necessitatibus
                consequatur non minus sunt et nobis quia et veniam eligendi. Ea
                rerum voluptas non nulla alias aut expedita assumenda sit dolor
                conse.
              </p>
              <p style="background-color:#56A1E8; width:500px">
                Alle mit * gekennzeichneten Felder sind Pflichtfelder.
              </p>

              <bcg-input
                label="Titel Ihrer Idee *"
                .validators=${[new Required()]}
                name="subject"
                .modelValue="${ideaRequest.subject}"
                @model-value-changed=${({ target }: any) => {
                  ideaRequest.subject = target.value;
                }}
                placeholder=""
              ></bcg-input>
              <bcg-textarea
                name="content"
                .validators=${[new Required()]}
                .modelValue="${ideaRequest.content}"
                @model-value-changed=${({ target }: any) => {
                  ideaRequest.content = target.value;
                }}
                rows="5"
                label="Erzählen Sie uns mehr von Ihrer Idee *"
                placeholder=""
              ></bcg-textarea>

              <h1 style="flex-grow: 1;">Über Sie</h1>
              <p style="width:650px;">
                Bitte geben Sie Ihren Namen ein. Dieser wird öffentlich sichtbar
                in Verbindung mit Ihrer Idee erscheinen.
              </p>
              <bcg-input
                label="Ihr Name "
                placeholder=""
                name="name"
                .validators=${[new Required()]}
                .modelValue="${ideaRequest.name}"
                @model-value-changed=${({ target }: any) => {
                  ideaRequest.name = target.value;
                }}
              ></bcg-input>
              <p>Sofern Sie von uns kontaktiert werden möchten.</p>
              <bcg-input-email
                label="Ihre E-Mail "
                name="email"
                placeholder=""
                .validators=${[new Required()]}
                .modelValue="${ideaRequest.email}"
                @model-value-changed=${({ target }: any) => {
                  ideaRequest.email = target.value;
                }}
              ></bcg-input-email>
              <bcg-checkbox-group
                name="checkbox"
                .validators=${[new Required()]}
              >
                <bcg-checkbox
                  label="Ich akzeptiere die 
        Datenschutzerklärung"
                  .choiceValue=${'Ich akzeptiere die Datenschutzerklärung'}
                ></bcg-checkbox>
              </bcg-checkbox-group>
              <div>
                <bcg-button
                  disabled
                  @click="${() => console.log('ButtonPress Vorschau')}"
                  >Vorschau</bcg-button
                >
                <bcg-button-submit
                  @click="${() => console.log('ButtonPress Senden')}"
                  >Senden</bcg-button-submit
                >
              </div>
            </div>
          </div>
        </form></bcg-form
      >
    `;
  }
}
import { html, ScopedElementsMixin } from '@lion/core';
import { IsEmail, Required } from '@lion/form-core';
import { BcgModule } from '../../components/module';
import { sendFaqSubmissionRequest } from '../../utils/services/module';

export class BcgFaqSubmission extends ScopedElementsMixin(BcgModule) {
  faqRequest: any = {
    name: '',
    title: '',
    email: '',
    text: ''
  };

  render() {
    const { faqRequest } = this;

    IsEmail.getMessage = async () => 'Muss eine gültige Email sein';
    Required.getMessage = async () => 'Angabe benötigt';

    const submitHandler = async (ev: any) => {
      if (ev.target.hasFeedbackFor.includes('error')) {
        const firstFormElWithError = ev.target.formElements.find((el: any) =>
          el.hasFeedbackFor.includes('error')
        );
        firstFormElWithError.focus();
        return;
      }
      // sendContactSubmissionRequest(this.contactRequest, this.moduleId);

      try {
        const fetchOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            text: JSON.stringify(faqRequest),
            moduleId: this.moduleId
          })
        };

        const resp = await fetch(
          'https://ifok-epart-api-dev.bonnconsulting.group/v1/comments/',
          fetchOptions
        );

        ev.path[0].resetGroup();

        console.log(resp);
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    };

    return html`
      <bcg-form @submit=${submitHandler}>
        <form @submit=${(e: any) => e.preventDefault()}>
          <div>
            <div style="display:flex; flex-direction:row;">
              <h1 style="margin-right:50px;">Reichen Sie Ihre Frage ein!</h1>
              <div style="display:flex; flex-direction:column;">
                <p style="width:650px;">
                  Unser FAQ konnte Ihre Frage nicht beantworten? Schreiben Sie
                  uns! Erreicht uns eine Frage häufiger, veröffentlichen wir sie
                  hier. Wir kontaktieren Sie mit einer Antwort, sofern uns Ihre
                  E-Mail-Daten vorliegen.
                </p>

                <bcg-textarea
                  rows="6"
                  name="title"
                  label="Ihre Frage *"
                  .validators=${[new Required()]}
                  placeholder=""
                  .modelValue="${faqRequest.title}"
                  @model-value-changed=${({ target }: any) => {
                    faqRequest.title = target.value;
                  }}
                ></bcg-textarea>

                <bcg-textarea
                  rows="6"
                  label="Erläuterungen"
                  name="content"
                  placeholder=""
                  .validators=${[new Required()]}
                  .modelValue="${faqRequest.text}"
                  @model-value-changed=${({ target }: any) => {
                    faqRequest.text = target.value;
                  }}
                ></bcg-textarea>
                <p style="width:650px;">
                  Sie können Ihre Frage hier erläutern, damit wir sie besser
                  verstehen und einordnen können. Dies hilft uns, eine
                  zufriedenstellende Antwort zu formulieren. Ihre Erläuterungen
                  werden nicht veröffentlicht.
                </p>
                <bcg-input
                  label="Ihr Name "
                  placeholder=""
                  name="name"
                  .validators=${[new Required()]}
                  .modelValue="${faqRequest.name}"
                  @model-value-changed=${({ target }: any) => {
                    faqRequest.name = target.value;
                  }}
                ></bcg-input>
                <p>Sofern Sie von uns kontaktiert werden möchten.</p>
                <bcg-input-email
                  label="Ihre E-Mail "
                  name="email"
                  placeholder=""
                  .validators=${[new Required()]}
                  .modelValue="${faqRequest.email}"
                  @model-value-changed=${({ target }: any) => {
                    faqRequest.email = target.value;
                  }}
                ></bcg-input-email>
                <p>
                  Sofern Sie von uns mit einer Antwort direkt kontaktiert werden
                  möchten.
                </p>
                <bcg-checkbox-group .validators=${[
                  new Required()
                ]}                   name="datasec"
>
                  <bcg-checkbox
                    label="Ich akzeptiere die 
        Datenschutzerklärung"
                    .choiceValue=${'Ich akzeptiere die Datenschutzerklärung'}
                  ></bcg-checkbox>
                </bcg-checkbox-group>
                <div>
                  
                  <bcg-button-submit>Frage einreichen</bcg-button-submit>
              </div>
            </div>
          </div>
        </form></bcg-form>
    `;
  }
}

import { html, property, ScopedElementsMixin } from '@lion/core';
import {
  Required,
  MinLength,
  MaxLength,
} from '../../utils/helpers/input-errors';
import { thumbsdown } from '../../components/icon/export-comment-icons';
import { BcgModule } from '../../components/module';
import { faqSubmissionEndpoint } from '../../utils/services/config';
import { sendFaqSubmissionRequest } from '../../utils/services/module';

export class BcgFaqSubmission extends ScopedElementsMixin(BcgModule) {
  faqRequest: any = {
    firstName: null,
    lastName: null,
    email: null,
    title: '',
    description: '',
  };

  render() {
    const renderRequiredStringForInputs = !this.submissionWriters.includes(
      'ANONYMOUS'
    )
      ? ' *'
      : null;

    const hiddenUserValidator = !this.submissionWriters.includes('ANONYMOUS')
      ? [new Required(), new MaxLength(50)]
      : [new MaxLength(50)];

    const { faqRequest } = this;

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
        const fetchOptionsloggedout = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('accessToken')
              ? `Bearer ${localStorage.getItem('accessToken')}`
              : '',
          },
          body: this.isLoggedIn
            ? JSON.stringify({
                description: this.faqRequest.description,
                title: this.faqRequest.title,
                moduleId: this.moduleId,
                templateId: '7fbab510-a25b-4aab-a2f5-0fc36cc880cd',
              })
            : JSON.stringify({
                moduleId: this.moduleId,
                templateId: '7fbab510-a25b-4aab-a2f5-0fc36cc880cd',
                ...this.faqRequest,
              }),
        };
        const resp = await fetch(
          faqSubmissionEndpoint(this.moduleId),
          fetchOptionsloggedout
        );

        this.notificationType = 'success';
        this.showNotification = true;
        this.notificationMessage =
          'Danke für Ihre Frage! Wir bearbeiten sie so schnell wie möglich.';
        setTimeout(() => location.reload(), 1000);
      } catch (err) {
        this.showNotification = true;
        this.notificationType = 'error';
        this.notificationMessage = 'Ein Fehler ist aufgetreten';
      }
    };

    return this.createSubmissionHtml(html`
      <bcg-form @submit=${(ev: any) => submitHandler(ev)}>
        <form @submit=${(e: any) => e.preventDefault()}>
        ${
          this.showNotification
            ? html` <bcg-notification
                .closeHandler=${this.disabledNotification}
                variant=${this.notificationType}
                message=${this.notificationMessage}
              ></bcg-notification>`
            : null
        }
          <div>
            <div style="display:flex; flex-direction:row;">
              <div style="display:flex; flex-direction:column;">
                <p style="">
                Alle mit * gekennzeichneten Felder sind Pflichtfelder.
                </p>
                <bcg-textarea
                  rows="6"
                  name="title"
                  label="Ihre Frage *"
                  .validators=${[
                    new Required('Textarea'),
                    new MinLength(3),
                    new MaxLength(1000),
                  ]}
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
                  .validators=${[new MinLength(3), new MaxLength(1000)]}
                  .modelValue="${faqRequest.description}"
                  @model-value-changed=${({ target }: any) => {
                    faqRequest.description = target.value;
                  }}
                ></bcg-textarea>
                <p >
                  Sie können Ihre Frage hier erläutern, damit wir sie besser
                  verstehen und einordnen können. Dies hilft uns, eine
                  zufriedenstellende Antwort zu formulieren. Ihre Erläuterungen
                  werden nicht veröffentlicht.
                </p>
 

                ${
                  !this.isLoggedIn
                    ? html` <bcg-input
                          label="Ihr Vorname${renderRequiredStringForInputs}"
                          placeholder=""
                          name="surname"
                          .validators=${hiddenUserValidator}
                          .modelValue="${faqRequest.firstName}"
                          @model-value-changed=${({ target }: any) => {
                            faqRequest.firstName = target.value;
                          }}
                        ></bcg-input>

                        <bcg-input
                          label="Ihr Nachname${renderRequiredStringForInputs}"
                          placeholder=""
                          name="lastname"
                          .validators=${hiddenUserValidator}
                          .modelValue="${faqRequest.lastName}"
                          @model-value-changed=${({ target }: any) => {
                            faqRequest.lastName = target.value;
                          }}
                        ></bcg-input>
                        <p>Sofern Sie von uns kontaktiert werden möchten.</p>
                        <bcg-input-email
                          label="Ihre E-Mail${renderRequiredStringForInputs}"
                          name="email"
                          placeholder=""
                          .validators=${hiddenUserValidator}
                          .modelValue="${faqRequest.email}"
                          @model-value-changed=${({ target }: any) => {
                            faqRequest.email = target.value;
                          }}
                        ></bcg-input-email>
                        <p>
                          Sofern Sie von uns mit einer Antwort direkt
                          kontaktiert werden möchten.
                        </p>
                        <bcg-checkbox-group
                          .validators=${[new Required()]}
                          name="datasec"
                        >
                          <bcg-checkbox
                            .choiceValue=${'Ich akzeptiere die Datenschutzerklärung'}
                            ><label slot="label">
                              Ich akzeptiere die
                              <a href="/datenschutz">Datenschutzerklärung</a>
                            </label></bcg-checkbox
                          >
                        </bcg-checkbox-group>`
                    : null
                }
              
                <div>
                  
                  <bcg-button-submit>Frage einreichen</bcg-button-submit>
              </div>
            </div>
          </div>
        </form></bcg-form>
    `);
  }
}

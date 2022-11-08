import { html, ScopedElementsMixin } from '@lion/core';
import { IsEmail, Required } from '@lion/form-core';
import { thumbsdown } from '../../components/icon/export-comment-icons';
import { BcgModule } from '../../components/module';
import { faqSubmissionEndpoint } from '../../utils/services/config';
import { sendFaqSubmissionRequest } from '../../utils/services/module';

export class BcgFaqSubmission extends ScopedElementsMixin(BcgModule) {
  faqRequest: any = {
    firstName: '',
    lastName: '',
    email: '',
    title: '',
    description: '',
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
        if (!this.isLoggedIn) {
          const fetchOptionsloggedout = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
            body: JSON.stringify({
              ...faqRequest,
              moduleId: this.moduleId,
              firstName: this.faqRequest.firstName,
              lastName: this.faqRequest.lastName,
              email: this.faqRequest.email,
            }),
          };
          const resp = await fetch(
            faqSubmissionEndpoint(this.moduleId),
            fetchOptionsloggedout
          );
        }

        if (this.isLoggedIn) {
          const fetchOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
            body: JSON.stringify({
              ...faqRequest,
              moduleId: this.moduleId,
              firstName: localStorage.getItem('accessToken')
                ? this.user.given_name
                : faqRequest.firstName,
              lastName: localStorage.getItem('accessToken')
                ? this.user.family_name
                : faqRequest.lastName,
              email: localStorage.getItem('accessToken')
                ? this.user.email
                : faqRequest.email,
            }),
          };

          const resp = await fetch(
            faqSubmissionEndpoint(this.moduleId),
            fetchOptions
          );
        }

        ev.path[0].resetGroup();
        this.showNotification = true;
        this.notificationMessage = 'Ihre Frage wurde Erfolgreich übersendet';
      } catch (err) {
        this.showNotification = true;
        console.log(err);
        this.notificationType = 'error';
        this.notificationMessage = 'Fehler ist aufgetreten';
      }
    };

    return html`
      <bcg-form @submit=${(ev: any) => submitHandler(ev)}>
        <form @submit=${(e: any) => e.preventDefault()}>
        ${
          this.showNotification
            ? html` <bcg-notification
                variant=${this.notificationType}
                message=${this.notificationMessage}
              ></bcg-notification>`
            : null
        }
          <div>
            <div style="display:flex; flex-direction:row;">
              <h1 style="margin-right:50px;">Reichen Sie Ihre Frage ein!</h1>
              <div style="display:flex; flex-direction:column;">
                <p>
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
                  .validators=${[]}
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
                          label="Ihr Name "
                          placeholder=""
                          name="name"
                          .validators=${[]}
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
                          .validators=${[]}
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
                            label="Ich akzeptiere die Datenschutzerklärung</a>"
                            .choiceValue=${'Ich akzeptiere die Datenschutzerklärung'}
                          ></bcg-checkbox>
                        </bcg-checkbox-group>`
                    : null
                }
              
                <div>
                  
                  <bcg-button-submit>Frage einreichen</bcg-button-submit>
              </div>
            </div>
          </div>
        </form></bcg-form>
    `;
  }
}

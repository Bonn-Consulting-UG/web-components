import { html, ScopedElementsMixin } from '@lion/core';
import { BcgModule } from '../../components/module';
import { Required } from '../../utils/helpers/input-errors';
import { contactSubmissionEndpoint } from '../../utils/services/config';
import { sendContactSubmissionRequest } from '../../utils/services/module';

export class BcgContactSubmission extends ScopedElementsMixin(BcgModule) {
  contactRequest: any = {
    description: '',
    templateId: '052c982a-656b-4701-87e7-8dda7ce8ddda',
    lastName: '',
    title: '',
    email: '',
    firstName: '',
  };

  render() {
    const { contactRequest } = this;

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
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('accessToken')
              ? `Bearer ${localStorage.getItem('accessToken')}`
              : '',
          },
          body: this.isLoggedIn
            ? JSON.stringify({
                description: this.contactRequest.description,
                title: this.contactRequest.title,
                moduleId: this.moduleId,
                templateId: '052c982a-656b-4701-87e7-8dda7ce8ddda',
              })
            : JSON.stringify({
                ...this.contactRequest,
                moduleId: this.moduleId,
              }),
        };

        this.isLoading = true;

        const resp = await fetch(contactSubmissionEndpoint('1'), fetchOptions);

        if (resp.status === 201) {
          this.contactRequest = {
            description: '',
            templateId: '052c982a-656b-4701-87e7-8dda7ce8ddda',
            lastName: '',
            title: '',
            email: '',
            firstName: '',
          };
        }
        this.isLoading = false;

        if (!resp.ok) {
          this.showNotification = true;
          this.notificationType = 'error';
          this.notificationMessage = 'Fehler ist aufgetreten';
          throw new Error('Fehler ist aufgetreten');
        }

        this.showNotification = true;
        this.notificationType = 'success';
        this.notificationMessage = 'Danke für Ihren Beitrag!';
      } catch (err) {
        this.showNotification = true;
        this.notificationType = 'error';
        this.notificationMessage = 'Fehler ist aufgetreten';
        this.isLoading = false;
      }
    };

    return this.createSubmissionHtml(html`
      <bcg-form @submit=${submitHandler}>
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

              <div style="display:flex; flex-direction:column;flex-basis:100%;">
              <p> Alle mit * gekennzeichneten Felder sind Pflichtfelder.</p>
                ${
                  this.isLoading
                    ? html` <bcg-progress></bcg-progress>`
                    : html`
                        ${!this.isLoggedIn
                          ? html` <bcg-input
                                label="Ihr Vorname *"
                                placeholder=""
                                name="firstname"
                                .validators=${[new Required()]}
                                .modelValue="${contactRequest.firstName}"
                                @model-value-changed=${({ target }: any) => {
                                  contactRequest.firstName = target.value;
                                }}
                              ></bcg-input>
                              <bcg-input
                                label="Ihr Nachname  *"
                                placeholder=""
                                name="lastname"
                                .validators=${[new Required()]}
                                .modelValue="${contactRequest.lastName}"
                                @model-value-changed=${({ target }: any) => {
                                  contactRequest.lastName = target.value;
                                }}
                              ></bcg-input>

                              <bcg-input-email
                                name="email"
                                .validators=${[new Required()]}
                                .modelValue="${contactRequest.email}"
                                @model-value-changed=${({ target }: any) => {
                                  contactRequest.email = target.value;
                                }}
                                label="Ihre E-Mail  *"
                                placeholder=""
                              ></bcg-input-email>`
                          : null}

                        <bcg-input
                          name="title"
                          label="Betreff *"
                          .validators=${[new Required()]}
                          placeholder=""
                          .modelValue="${contactRequest.title}"
                          @model-value-changed=${({ target }: any) => {
                            contactRequest.title = target.value;
                          }}
                        ></bcg-input>

                        <bcg-textarea
                          name="content"
                          rows="6"
                          .validators=${[new Required()]}
                          label="Nachricht *"
                          .modelValue="${contactRequest.description}"
                          @model-value-changed=${({ target }: any) => {
                            contactRequest.description = target.value;
                          }}
                          placeholder=""
                        ></bcg-textarea>
                        <bcg-checkbox-group
                          .validators=${[new Required()]}
                          name="datasec"
                        >
                          <bcg-checkbox
                            .choiceValue=${'Ich akzeptiere die Datenschutzerklärung'}
                            ><label slot="label">
                              Ich akzeptiere die
                              <a href="/datenschutz">Datenschutzerklärung *</a>
                        </label></bcg-checkbox
                          >
                        </bcg-checkbox-group>

                        <bcg-spamfilter></bcg-spamfilter>
                        <div>
                          <bcg-button-submit>Senden</bcg-button-submit>
                        </div>
                      `
                }
                </div>
              </div>
            </div>
          </div>
        </form></bcg-form
      >
    `);
  }
}

import { html, ScopedElementsMixin } from '@lion/core';
import { IsEmail, Required } from '@lion/form-core';
import { BcgModule } from '../../components/module';
import { contactSubmissionEndpoint } from '../../utils/services/config';
import { sendContactSubmissionRequest } from '../../utils/services/module';

export class BcgContactSubmission extends ScopedElementsMixin(BcgModule) {
  contactRequest: any = {
    firstName: '',
    lastName: '',
    title: '',
    email: '',
    description: '',
    templateId: '052c982a-656b-4701-87e7-8dda7ce8ddda',
  };

  render() {
    const { contactRequest } = this;

    IsEmail.getMessage = async () => 'Muss eine gültige Email sein';
    Required.getMessage = async () => 'Angabe benötigt';

    const submitHandler = async (ev: any) => {
      console.log(ev.parentElement);
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
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
          body: JSON.stringify({
            ...contactRequest,
            moduleId: this.moduleId,
          }),
        };

        this.isLoading = true;

        const resp = await fetch(contactSubmissionEndpoint('1'), fetchOptions);

        if (resp.status === 201) {
          ev.path[0].resetGroup();
        }

        this.isLoading = false;

        this.showNotification = true;
        this.notificationMessage =
          'Ihre Nachricht wurde Erfolgreich übersendet';

        setTimeout(() => {
          this.showNotification = false;
        }, 2000);
      } catch (err) {
        this.showNotification = true;
        this.notificationType = 'error';
        this.notificationMessage = 'Fehler ist aufgetreten';

        setTimeout(() => {
          this.showNotification = false;
        }, 2000);
        console.error(err);
      }
    };

    return html`
      <bcg-form @submit=${submitHandler}>
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

                ${
                  this.isLoading
                    ? html` <bcg-progress></bcg-progress>`
                    : html`
                        ${!this.isLoggedIn
                          ? html` <bcg-input
                                label="Ihr Vorname "
                                placeholder=""
                                name="firstname"
                                .validators=${[new Required()]}
                                .modelValue="${contactRequest.firstName}"
                                @model-value-changed=${({ target }: any) => {
                                  contactRequest.firstName = target.value;
                                }}
                              ></bcg-input>
                              <bcg-input
                                label="Ihr Nachname"
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
                                label="Ihre E-Mail "
                                placeholder=""
                              ></bcg-input-email>`
                          : null}

                        <bcg-input
                          name="title"
                          label="Betreff"
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
                          label="Nachricht"
                          .modelValue="${contactRequest.text}"
                          @model-value-changed=${({ target }: any) => {
                            contactRequest.description = target.value;
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
                      `
                }
                
                </div>
              </div>
            </div>
          </div>
        </form></bcg-form
      >
    `;
  }
}

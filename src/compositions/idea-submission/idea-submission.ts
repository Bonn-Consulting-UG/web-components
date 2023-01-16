import { html, ScopedElementsMixin } from '@lion/core';
import { Required, IsEmail } from '../../utils/helpers/input-errors';
import { BcgModule } from '../../components/module';
import { ideaSubmissionEndpoint } from '../../utils/services/config';
import { sendIdeaSubmissionRequest } from '../../utils/services/module';

export class BcgIdeaSubmission extends ScopedElementsMixin(BcgModule) {
  ideaRequest: any = {
    title: '',
    descirption: '',
  };

  externalUser: any = {
    firstName: '',
    lastName: '',
    email: '',
  };

  render() {
    const { ideaRequest, moduleId, externalUser } = this;

    // sendIdeaSubmissionRequest(123, '123');
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
        const loggedOutpayload = this.isLoggedIn
          ? {}
          : {
              email: `${externalUser.email}`,
              firstName: `${externalUser.firstName}`,
              lastName: `${externalUser.lastName}`,
            };
        console.log(loggedOutpayload);
        const fetchOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('accessToken')
              ? `Bearer ${localStorage.getItem('accessToken')}`
              : '',
          },
          body: JSON.stringify({
            moduleId,
            title: `${ideaRequest.title}`,
            description: `${ideaRequest.descirption}`,
            ...loggedOutpayload,
          }),
        };

        const resp = await fetch(
          ideaSubmissionEndpoint(this.moduleId),
          fetchOptions
        );

        this.ideaRequest.description = '';
        this.ideaRequest.title = '';
        this.showNotification = true;
        this.notificationMessage = 'Ihre Idee wurde Erfolgreich übersendet';

        console.log(resp);
      } catch (err) {
        this.showNotification = true;
        this.notificationType = 'error';
        this.notificationMessage = 'Fehler ist aufgetreten';

        console.error(err);
      }
    };

    return html`
      <bcg-form @submit=${submitHandler}>
        <form @submit=${(e: any) => e.preventDefault()}>
          ${this.showNotification
            ? html` <bcg-notification
                .closeHandler=${this.disabledNotification}
                variant=${this.notificationType}
                message=${this.notificationMessage}
              ></bcg-notification>`
            : null}
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
                .validators=${[]}
                name="title"
                .modelValue="${ideaRequest.title}"
                @model-value-changed=${({ target }: any) => {
                  ideaRequest.title = target.value;
                }}
                placeholder=""
              ></bcg-input>
              <bcg-textarea
                name="content"
                .validators=${[new Required()]}
                .modelValue="${ideaRequest.descirption}"
                @model-value-changed=${({ target }: any) => {
                  ideaRequest.descirption = target.value;
                }}
                rows="5"
                label="Erzählen Sie uns mehr von Ihrer Idee *"
                placeholder=""
              ></bcg-textarea>

              ${!this.isLoggedIn
                ? html`
                    <h1 style="flex-grow: 1;">Über Sie</h1>
                    <p style="width:650px;">
                      Bitte geben Sie Ihren Namen ein. Dieser wird öffentlich
                      sichtbar in Verbindung mit Ihrer Idee erscheinen.
                    </p>
                    <bcg-input
                      label="Ihr Vorname "
                      placeholder=""
                      name="firstname"
                      .validators=${[new Required()]}
                      .modelValue="${externalUser.firstName}"
                      @model-value-changed=${({ target }: any) => {
                        externalUser.firstName = target.value;
                      }}
                    ></bcg-input>
                    <bcg-input
                      label="Ihr Nachname"
                      placeholder=""
                      name="lastname"
                      .validators=${[new Required()]}
                      .modelValue="${externalUser.lastName}"
                      @model-value-changed=${({ target }: any) => {
                        externalUser.lastName = target.value;
                      }}
                    ></bcg-input>
                    <p>Sofern Sie von uns kontaktiert werden möchten.</p>
                    <bcg-input-email
                      label="Ihre E-Mail "
                      name="email"
                      placeholder=""
                      .validators=${[new Required()]}
                      .modelValue="${externalUser.email}"
                      @model-value-changed=${({ target }: any) => {
                        externalUser.email = target.value;
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
                  `
                : null}

              <div>
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

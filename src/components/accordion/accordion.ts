import {
  css,
  html,
  LitElement,
  property,
  ScopedElementsMixin,
} from '@lion/core';
import { LionAccordion } from '@lion/accordion';
import { BcgAccordionButton } from './accordion-button';
import { BcgModule } from '../module';
import { Required } from '@lion/form-core';
import { getSubmissionsEndpoint } from '../../utils/services/config';
import { BcgIcon } from '../icon';
import { LionIcon } from '@lion/icon';

export class BcgAccordion extends ScopedElementsMixin(BcgModule) {
  @property({ type: String }) question = 'Default Question';
  @property({ type: String }) answer =
    'Hallo ja find ich sehr toll - send help';
  @property({ type: String }) description: string = '';
  @property({ type: String }) firstName: string = '';
  @property({ type: Function }) changeDialog: any;
  @property({ type: String }) updatedAnswer: string = '';
  @property({ type: String }) lastName: string = '';
  @property({ type: String }) email: string = '';
  @property({ type: String }) status: string = '';
  @property({ type: String }) moduleIDBUTNOREQUESTIGUESS: string = '';
  @property() currentSubmissionId: number = 0;

  static get scopedElements() {
    return { 'lion-accordion': LionAccordion, 'lion-icon': LionIcon };
  }

  async updateSubmission() {
    try {
      const fetchOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('accessToken')
            ? `Bearer ${localStorage.getItem('accessToken')}`
            : '',
        },
        body: JSON.stringify({
          content: this.updatedAnswer,
          description: this.description,
          moduleId: this.moduleIDBUTNOREQUESTIGUESS,
        }),
      };

      const resp = await fetch(
        getSubmissionsEndpoint(this.currentSubmissionId),
        fetchOptions
      );

      if (resp.ok) {
        this.answer = this.updatedAnswer;
        this.showNotification = true;
        this.notificationType = 'success';
        this.notificationMessage = 'Antwort wurde geupdated';
      }

      return resp.json();
    } catch (err) {
      this.showNotification = true;
      this.notificationType = 'error';
      this.notificationMessage = 'Es ist ein Fehler aufgetreten';

      console.error(err);
      return err;
    }
  }

  static get styles() {
    return [
      css`
        span,
        p {
          color: var(--primary-color);
        }
      `,
    ];
  }

  render() {
    return html`
      ${this.showNotification
        ? html` <bcg-notification
            .closeHandler=${this.disabledNotification}
            variant=${this.notificationType}
            message=${this.notificationMessage}
          ></bcg-notification>`
        : null}
      <div style="display:flex;flex-direction:column;position:relative;">
        <lion-accordion>
          <h1 slot="invoker">
            <bcg-accordion-button label=${this.question}></bcg-accordion-button>
          </h1>
          <p slot="content" style="font-size:16px">${this.answer}</p>
        </lion-accordion>

        ${this.user?.realm_access.roles.includes('MODERATOR')
          ? html`<span>Description:${this.description}</span>
              <span>Vorname:${this.firstName}</span>
              <span>Nachname:${this.lastName}</span>
              <span>Email:${this.email}</span>
              <span>Status:${this.status}</span>
              <bcg-faq-moderator-menu
                .changeDialog=${this.changeDialog}
                .submissionId=${this.currentSubmissionId}
              ></bcg-faq-moderator-menu> `
          : null}
        ${this.user?.realm_access.roles.includes('MODERATOR')
          ? html`<bcg-textarea
                name="content"
                rows="6"
                .validators=${[new Required()]}
                label="Antwort *"
                .modelValue=${this.updatedAnswer}
                @model-value-changed=${({ target }: any) => {
                  this.updatedAnswer = target.value;
                }}
                placeholder=""
              ></bcg-textarea>
              <bcg-button
                style="margin-top:30px;"
                @click=${this.updateSubmission}
                variant="primary"
                >Antwort updaten</bcg-button
              >`
          : null}
      </div>
      <hr />
    `;
  }
}

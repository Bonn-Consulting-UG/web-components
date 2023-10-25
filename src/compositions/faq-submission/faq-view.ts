import {
  html,
  css,
  LitElement,
  ScopedElementsMixin,
  property,
} from '@lion/core';
import { de } from 'date-fns/locale';
import { format } from 'date-fns';

import {
  addReaction,
  approveComment,
  censorComment,
  removeReaction,
  reportComment,
} from '../../utils/services/comments';
import { BcgModule } from '../../components/module/module';
import { getSubmissionsEndpointforModule } from '../../utils/services/config';

export class BcgFaqView extends BcgModule {
  @property() submissions = [];
  async fetchSubmissions() {
    try {
      const fetchOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('accessToken')
            ? `Bearer ${localStorage.getItem('accessToken')}`
            : '',
        },
      };

      const resp = await fetch(
        getSubmissionsEndpointforModule(this.moduleId),
        fetchOptions
      );

      return resp.json();
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  async connectedCallback(): Promise<void> {
    console.log(this.moduleId);
    super.connectedCallback();
    const resp = await this.fetchSubmissions();
    this.submissions = resp?.results;
  }

  changeDialog = (content: any, callback: any) => {
    this.showDialog = true;
    this.dialogContent = content;
    this.confirmHandler = async () => {
      await callback();
      this.showDialog = false;
    };
  };

  static get styles() {
    return [css``];
  }

  render() {
    return html`
      ${this.dialogHtml}
      ${this.submissions.map(
        (el: any) =>
          html`<bcg-accordion
            question=${el.title}
            status=${el.status}
            answer=${el.content || 'No Answer Provided Yet'}
            description=${el.description || 'No Description Provided Yet'}
            email=${el?.mail || el?.author?.email || 'No Email Provided'}
            currentSubmissionId=${el.id}
            .changeDialog=${this.changeDialog}
            moduleIDBUTNOREQUESTIGUESS=${this.moduleId}
            firstName=${el?.firstName || el?.author?.firstName}
            lastName=${el?.lastName || el?.author?.lastName}
          ></bcg-accordion> `
      )}
    `;
  }
}

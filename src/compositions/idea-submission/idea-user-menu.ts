import { html, ScopedElementsMixin } from '@lion/core';
import {
  Required,
  IsEmail,
  MaxLength,
  MinLength,
} from '../../utils/helpers/input-errors';
import { BcgModule } from '../../components/module';
import { ideaSubmissionEndpoint } from '../../utils/services/config';
import { sendIdeaSubmissionRequest } from '../../utils/services/module';

export class BcgIdeaUserMenu extends ScopedElementsMixin(BcgModule) {
  onEditHandler() {
    this.dialogContent = html`<bcg-idea-submission
      moduleID=${this.moduleId}
    ></bcg-idea-submission>`;
    this.showDialog = true;
  }

  onDeleteHandler() {}

  render() {
    const { moduleId } = this;

    return html`
      ${this.dialogHtml}
      <div style="display:flex;">
        <bcg-button @click=${this.onEditHandler} variant="primary"
          >Bearbeiten</bcg-button
        >
        <bcg-button @click=${this.onDeleteHandler} variant="primary"
          >Löschen</bcg-button
        >
      </div>
    `;
  }
}

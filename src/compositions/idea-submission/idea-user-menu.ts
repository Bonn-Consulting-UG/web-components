import { html, property, ScopedElementsMixin } from '@lion/core';
import {
  Required,
  IsEmail,
  MaxLength,
  MinLength,
} from '../../utils/helpers/input-errors';
import { BcgModule } from '../../components/module';
import { ideaSubmissionEndpoint } from '../../utils/services/config';
import {
  deleteModule,
  sendIdeaSubmissionRequest,
  updateModule,
  updateSubmission,
} from '../../utils/services/module';
import { PropertyValueMap } from 'lit';
import { LionIcon } from '@lion/icon';
import { deleteSubmission } from '../../utils/services/test';

export class BcgIdeaUserMenu extends ScopedElementsMixin(BcgModule) {
  @property() onCancelLabel = 'Abbrechen';
  @property() onConfirmLabel = 'Speichern';
  @property() title = this.config?.name;
  @property() description = this.config?.description;
  onEditHandler() {
    const editSubmitHandler = (ev: any) => {
      if (ev.target.hasFeedbackFor.includes('error')) {
        const firstFormElWithError = ev.target.formElements.find((el: any) =>
          el.hasFeedbackFor.includes('error')
        );
        firstFormElWithError.focus();
        return null;
      }
    };

    this.title = this.config.name || this.config.title;
    this.description = this.config.description;

    this.dialogContent = html`
      <bcg-form name="edit-idea" @submit=${(ev: any) => editSubmitHandler(ev)}>
        <form name="edit-idea" @submit=${(e: any) => e.preventDefault()}>
          <bcg-input
            label="Titel Ihrer Idee *"
            .validators=${[
              new Required(),
              new MinLength(5),
              new MaxLength(100),
            ]}
            name="title"
            .modelValue="${this.title}"
            @model-value-changed=${({ target }: any) => {
              this.title = target.value;
            }}
            placeholder=""
          ></bcg-input>
          <bcg-textarea
            name="content"
            .validators=${[new Required()]}
            .modelValue="${this.description}"
            @model-value-changed=${({ target }: any) => {
              this.description = target.value;
            }}
            rows="5"
            label="Erzählen Sie uns mehr von Ihrer Idee *"
            placeholder=""
          ></bcg-textarea></form
      ></bcg-form>
    `;
    this.showDialog = true;
    this.confirmHandler = async () => {
      const data = {
        name: this.title,
        description: this.description,
      };
      if (this.moduleId !== 0) await updateModule(this.moduleId, data);
      const submissonData = {
        title: this.title,
        description: this.description,
        moduleId: this.config?.moduleConfig.moduleId,
      };
      if (this.submissionId !== 0) {
      }
      await updateSubmission(this.submissionId, submissonData);
    };
  }

  static get scopedElements() {
    return { 'lion-icon': LionIcon };
  }

  onDeleteHandler() {
    this.showDialog = true;
    this.dialogContent = html`<span>
      Soll Ihr Beitrag wirklich gelöscht werden? Hinweis: Damit werden auch
      dazugehörige Kommentare gelöscht.</span
    >`;
    this.confirmHandler = async () => {
      if (this.submissionId !== 0) await deleteSubmission(this.submissionId);
      if (this.moduleId !== 0) await deleteModule(this.submissionId);
      this.showDialog = false;
    };
  }

  connectedCallback(): void {
    super.connectedCallback();
  }

  protected updated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    super.updated(_changedProperties);
  }
  render() {
    return this.user?.sub === this?.config?.authorId || this.hasModeratorRole
      ? html`
          ${this.dialogHtml}
          <div style="display:flex;">
            <bcg-button
              style="margin-right:10px;"
              @click=${this.onEditHandler}
              variant="primary"
              >Bearbeiten</bcg-button
            >
            <bcg-button @click=${this.onDeleteHandler} variant="primary"
              >Löschen</bcg-button
            >
          </div>
        `
      : null;
  }
}

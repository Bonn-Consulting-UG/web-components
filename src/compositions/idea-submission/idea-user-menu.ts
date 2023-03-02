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
  sendIdeaSubmissionRequest,
  updateModule,
} from '../../utils/services/module';
import { PropertyValueMap } from 'lit';
import { LionIcon } from '@lion/icon';

export class BcgIdeaUserMenu extends ScopedElementsMixin(BcgModule) {
  onCancelLabel = 'Abbrechen';
  onConfirmLabel = 'Speichern';
  @property() title = this.config?.name;
  @property() content = this.config?.content;
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

    this.title = this.config.name;
    this.content = this.config.content;

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
            .modelValue="${this.content}"
            @model-value-changed=${({ target }: any) => {
              this.content = target.value;
            }}
            rows="5"
            label="Erzählen Sie uns mehr von Ihrer Idee *"
            placeholder=""
          ></bcg-textarea></form
      ></bcg-form>
    `;
    this.showDialog = true;
    this.confirmHandler = async () => {
      await updateModule(this.moduleId, {
        name: this.title,
        content: this.content,
      });
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
      this.showDialog = false;
    };
  }

  render() {
    const { moduleId } = this;

    return html`
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
    `;
  }
}

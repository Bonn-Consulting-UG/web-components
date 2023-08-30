import {
  html,
  LitElement,
  property,
  ScopedElementsMixin,
  TemplateResult,
} from '@lion/core';
import {
  Required,
  MinLength,
  MaxLength,
} from '../../utils/helpers/input-errors';
import { format } from 'date-fns';
import de from 'date-fns/locale/de';
import { BcgModule } from '../../components/module/module';
import {
  getAllCommentsForModule,
  addComment,
  addCommentToComment,
  getSubmission,
} from '../../utils/services/comments';
import { BcgCommentReaction } from './comment-reaction';
import { BcgComment } from './comment';
import { LionIcon } from '@lion/icon';
import { BcgDialog } from '../../components/dialog/dialog';
import { BcgModeratorMenu } from './comment-moderator-menu';

export interface CommentInterface {
  id: string;
  status: string;
  isModerator: boolean;
  authorId: string;
  content: string;
  moduleId: string;
  children: Array<CommentInterface>;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  email: string;
  isSubmission: boolean;
  templateId: string;
  title: string;
  _count: {
    likes: Number;
    dislikes: Number;
  };
}

export class BcgComments extends ScopedElementsMixin(BcgModule) {
  connectedCallback() {
    super.connectedCallback();
    this.setupComments();
  }

  @property({ type: LitElement || null }) createSubmissionCommentHtml = (
    content: TemplateResult
  ): any => {
    if (!this.isCommentsAllowed) return null;

    if (this.commentReaders.includes('ANONYMOUS')) {
      return content;
    }
    if (this.commentReaders.includes('REGISTERED_USER') && this.isLoggedIn) {
      return content;
    }
    return html`<div class="submission-permission-hint">
      Sie müssen angemeldet sein, um sich beteiligen zu können
    </div>`;
  };

  @property({ type: LitElement || null }) createCommentHtml = (
    content: TemplateResult
  ): any => {
    if (!this.isCommentsAllowed) {
      return html`<div class="submission-permission-hint">
        Kommentare sind deaktiviert
      </div>`;
    }
    if (this.commentReaders.includes('ANONYMOUS')) {
      return content;
    }
    if (this.commentReaders.includes('REGISTERED_USER') && this.isLoggedIn) {
      return content;
    }

    return html`<div class="submission-permission-hint">
      Sie müssen angemeldet sein, Kommentare sehen zu können
    </div>`;
  };

  @property({ type: Number }) displayedComments: number = 9;

  @property() comments: any = [];

  @property() count: any = [];

  @property() newComment: any = '';
  @property() firstName: any = '';
  @property() lastName: any = '';
  @property() email: any = '';

  @property() responseTo: any = {};

  @property() setResponseTo: any = (comment: any) => {
    this.responseTo = comment;
    this.shadowRoot?.querySelector('bcg-form')?.scrollIntoView();
  };

  maxCharCount: Number = 500;

  currentCharCount: Number = this.getElementsByTagName('textarea').length;

  changeDialog = (content: any, callback: any) => {
    this.showDialog = true;
    this.dialogContent = content;
    this.confirmHandler = async () => {
      await callback();
      this.showDialog = false;
      this.setupComments();
    };
  };

  closeDialog = (content: any) => {
    this.showDialog = true;
    this.dialogContent = content;
    this.closeHandler = () => {
      this.showDialog = false;
    };
  };

  setupComments: any = async (scrollTo?: any) => {
    let response;
    if (this.moduleId !== 0 && !this.submissionId) {
      response = await getAllCommentsForModule(this.moduleId);
      this.comments = response.results;
      this.count = response.totalCount;
    }

    if (this.submissionId !== 0 && !this.moduleId) {
      response = await getSubmission(this.submissionId);
      this.comments = response.comments;
      this.count = response._count.comments;
    }

    setTimeout(
      () =>
        scrollTo
          ? this.shadowRoot?.querySelector(`#${scrollTo}`)?.scrollIntoView()
          : null,
      500
    );
  };

  static get scopedElements() {
    return {
      'bcg-comment': BcgComment,
      'lion-icon': LionIcon,
      'bcg-dialog': BcgDialog,
      'bcg-moderator-menu': BcgModeratorMenu,
    };
  }

  render() {
    const renderRequiredStringForInputs =
      this.isHiddenUserAllowed || this.commentWriters.includes('USER')
        ? null
        : ' *';

    const hiddenUserValidator =
      this.isHiddenUserAllowed || this.commentWriters.includes('USER')
        ? [new MaxLength(50)]
        : [new Required(), new MaxLength(50)];

    const { comments } = this;

    const submitHandler = async (ev: any) => {
      if (ev.target.hasFeedbackFor.includes('error')) {
        const firstFormElWithError = ev.target.formElements.find((el: any) =>
          el.hasFeedbackFor.includes('error')
        );
        firstFormElWithError.focus();
        return;
      }
      let newCommentId;

      if (!this.responseTo.author) {
        const resp = await addComment(
          this.moduleId,
          this.newComment,
          this.submissionId,
          {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
          }
        );
        newCommentId = resp.id;
      }

      if (this.responseTo.author) {
        const resp = await addCommentToComment(
          this.responseTo.id,
          this.newComment,
          {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
          }
        );
        newCommentId = resp.id;
        this.responseTo = {};
      }
      let textarea = this.shadowRoot?.querySelector('textarea');
      textarea!.value = '';
      this.newComment = '';
      this.setupComments(newCommentId);
    };

    return html`
      ${this.dialogHtml}

      <div style="display:flex; flex-direction:column;">
        ${this.createSubmissionCommentHtml(html`<bcg-form
          name="sentcomment"
          @submit=${(ev: any) => submitHandler(ev)}
        >
          <form name="sentcomment" @submit=${(e: any) => e.preventDefault()}>
            ${this.responseTo.author
              ? html`<div class="responseTo" style="flex-grow:1">
                  Sie antworten: ${this.responseTo.author.firstName}
                  ${this.responseTo.author.lastName} vom     ${format(
                  Date.parse(this.responseTo.createdAt),
                  'dd.MM.yyyy HH:mm ',
                  {
                    locale: de,
                  }
                )}
                  <lion-icon id="close-button-notification"w  @click=${() => {
                    this.responseTo = {};
                  }}  icon-id="bcg:general:cross"></bcg-icon>

                </div>`
              : null}
            <div></div>
            ${!this.isLoggedIn ||
            (!this.isLoggedIn &&
              (this?.config?.moduleConfig?.commentWriters.includes(
                'ANONYMOUS'
              ) ||
                this?.config?.config?.commentWriters.includes('ANONYMOUS')))
              ? html`<bcg-input
                        label="Ihr Vorname${renderRequiredStringForInputs}"
                        placeholder=""
                        name="firstname"
                        .validators=${hiddenUserValidator}
                        .modelValue="${this.firstName}"
                        @model-value-changed=${({ target }: any) => {
                          this.firstName = target.value;
                        }}
                      ></bcg-input>
                      <bcg-input
                        label="Ihr Nachname${renderRequiredStringForInputs}"
                        placeholder=""
                        name="lastname"
                        .validators=${hiddenUserValidator}
                        .modelValue="${this.lastName}"
                        @model-value-changed=${({ target }: any) => {
                          this.lastName = target.value;
                        }}
                      ></bcg-input>

                      <bcg-input-email
                        name="email"
                        .validators=${hiddenUserValidator}
                        .modelValue="${this.email}"
                        @model-value-changed=${({ target }: any) => {
                          this.email = target.value;
                        }}
                        label="Ihre E-Mail${renderRequiredStringForInputs}"
                        placeholder=""
                      ></bcg-input-email></br>`
              : null}
            <bcg-textarea
              @model-value-changed=${({ target }: any) => {
                this.newComment = target.value;
              }}
              .validators=${[
                new Required(),
                new MinLength(3),
                new MaxLength(500),
              ]}
              name="comment"
              id="comment-textarea"
              rows="4"
              placeholder="Was denken Sie?"
            ></bcg-textarea>

            <div style="display:flex;margin-top:20px;">
              <p style="flex-grow: 1;"></p>
              <div>
                <bcg-button-submit>Kommentieren</bcg-button-submit>
              </div>
            </div>
          </form>
        </bcg-form>`)}
        ${this.createCommentHtml(html`<div>
        <h2 style="flex-grow: 1;">Kommentare (${this.count || 0})</h2>

          ${
            this.comments &&
            this.comments.map((comment: any, index: any) => {
              if (index <= this.displayedComments) {
                if (comment.comments) {
                  return html`
                  <bcg-comment
                  .config=${this.config}
                    id=${comment.id}
                    .changeDialog=${this.changeDialog}
                    .refresh=${this.setupComments}
                    .comments="${comment}"
                    .setResponseTo=${this.setResponseTo}
                  ></bcg-comment>
                  ${comment.comments.map((subcomment: any) => {
                    return html`<div
                      style=" background-color: white;
                    padding-left: 100px;
                    border: none!important;"
                    >
                      <bcg-comment
                        .config=${this.config}
                        id="${subcomment.id}"
                        .changeDialog=${this.changeDialog}
                        .refresh=${this.setupComments}
                        .comments="${subcomment}"
                      ></bcg-comment>
                    </div>`;
                  })}
                </div>`;
                }
                if (!comment.comments)
                  return html`<bcg-comment
                    .config=${this.config}
                    id=${comment}
                    .changeDialog=${this.changeDialog}
                    .refresh=${this.setupComments}
                    .comments="${comment}"
                    .setResponseTo=${this.setResponseTo}
                  ></bcg-comment> `;
              }
            })
          }
        </div>
        <div
          style="display:flex;align-items: center; align-content: center;justify-content: center; margin-top:20px;"
        >
          ${
            comments && comments.length > this.displayedComments
              ? html`<bcg-button
                  variant="secondary"
                  @click=${() =>
                    (this.displayedComments = this.displayedComments + 10)}
                  >Mehr Laden</bcg-button
                >`
              : null
          }
        </div>
      </div>`)}
      </div>
    `;
  }
}

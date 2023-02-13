import { html, LitElement, property, ScopedElementsMixin } from '@lion/core';
import {
  Required,
  MinLength,
  MaxLength,
} from '../../utils/helpers/input-errors';
import { format } from 'date-fns';
import de from 'date-fns/locale/de';
import { BcgModule } from '../../components/module/module.js';
import {
  getAllCommentsForModule,
  addComment,
  addCommentToComment,
  getAllSubmissionsForAModule,
} from '../../utils/services/comments.js';
import { BcgCommentReaction } from './comment-reaction.js';
import { BcgComment } from './comment.js';
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

  @property({ type: Number }) displayedComments: number = 9;

  @property() comments: any = [];

  @property() count: any = [];

  @property() newComment: any = '';

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

      // console.log(scrollTo);
      // console.log(this.shadowRoot?.querySelector(`[data-id="${scrollTo}"]`));
      // if (scrollTo)
      //   document.querySelector(`[data-id="${scrollTo}"]`)?.scrollIntoView();
    }

    if (this.submissionId !== 0 && !this.moduleId) {
      console.log(this.submissionId);
      response = await getAllSubmissionsForAModule(this.submissionId);
      // this.comments = response.comments;

      const test = response.moduleId;

      this.comments = response.results;
      this.count = response.totalCount;
      if (scrollTo)
        this.shadowRoot
          ?.querySelector(`[data-id="${scrollTo}"]`)
          ?.scrollIntoView();
    }
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
          this.submissionId
        );
        newCommentId = resp.id;
      }

      if (this.responseTo.author) {
        const resp = await addCommentToComment(
          this.responseTo.id,
          this.newComment
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
        <bcg-form name="sentcomment" @submit=${(ev: any) => submitHandler(ev)}>
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
            ${this.isLoggedIn
              ? html`<bcg-textarea
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
                ></bcg-textarea>`
              : html`<div>
                  <h3>
                    Sie müssen sich erst anmelden, um sich beteiligen zu können.
                  </h3>
                </div>`}
            ${this.isLoggedIn
              ? html`
                  <div style="display:flex;margin-top:20px;">
                    <p style="flex-grow: 1;"></p>
                    <div>
                      <bcg-button-submit>Kommentieren</bcg-button-submit>
                    </div>
                  </div>
                `
              : null}

            <h2 style="flex-grow: 1;">Kommentare (${this.count || 0})</h2>
          </form>
        </bcg-form>

        <div>
          ${this.comments &&
          this.comments.map((comment: any, index: any) => {
            if (index <= this.displayedComments) {
              if (comment.comments) {
                return html`
                  <bcg-comment
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
                  .changeDialog=${this.changeDialog}
                  .refresh=${this.setupComments}
                  .comments="${comment}"
                  .setResponseTo=${this.setResponseTo}
                ></bcg-comment> `;
            }
          })}
        </div>
        <div
          style="display:flex;align-items: center; align-content: center;justify-content: center; margin-top:20px;"
        >
          ${comments && comments.length > this.displayedComments
            ? html`<bcg-button
                variant="secondary"
                @click=${() =>
                  (this.displayedComments = this.displayedComments + 10)}
                >Mehr Laden</bcg-button
              >`
            : null}
        </div>
      </div>
    `;
  }
}

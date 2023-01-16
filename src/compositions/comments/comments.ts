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

  @property() responseTo: any = {};

  @property() setResponseTo: any = (comment: any) => {
    this.responseTo = comment;
    this.shadowRoot?.querySelector('bcg-form')?.scrollIntoView();
  };

  maxCharCount: Number = 500;

  currentCharCount: Number = this.getElementsByTagName('textarea').length;

  newComment: any = '';

  setupComments: any = async (scrollTo?: any) => {
    let response;
    if (this.moduleId !== 0 && !this.submissionId) {
      response = await getAllCommentsForModule(this.moduleId);

      this.comments = response.results;
      this.count = response.totalCount;
      if (scrollTo)
        this.shadowRoot
          ?.querySelector(`[data-id="${scrollTo}"]`)
          ?.scrollIntoView();
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
    console.log(this.shadowRoot);
    console.log(scrollTo);
  };

  static get scopedElements() {
    return {
      'bcg-comment': BcgComment,
      'lion-icon': LionIcon,
    };
  }

  render() {
    const { maxCharCount, currentCharCount, comments } = this;

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

      ev.path[0].resetGroup();
      this.setupComments(newCommentId);
    };

    return html`
      <div style="display:flex; flex-direction:column;">
        <bcg-form @submit=${submitHandler}>
          <form @submit=${(e: any) => console.log(e)}>
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
          ${comments &&
          comments.map((comment: any, index: any) => {
            if (index <= this.displayedComments) {
              return html`<bcg-comment
                .refresh=${this.setupComments}
                .comments="${comment}"
                .setResponseTo=${this.setResponseTo}
              ></bcg-comment>`;
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

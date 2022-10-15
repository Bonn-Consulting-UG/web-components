import { html, LitElement, property, ScopedElementsMixin } from '@lion/core';
import { BcgModule } from '../../components/module/module.js';
import {
  getAllCommentsForModule,
  addCommentToModule,
} from '../../utils/services/comments.js';
import { BcgCommentReaction } from './comment-reaction.js';
import { BcgComment } from './comment.js';

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

  @property() comments: any = [];

  @property() count: any = [];

  maxCharCount: Number = 500;

  currentCharCount: Number = this.getElementsByTagName('textarea').length;

  newComment: any = '';

  setupComments: any = async () => {
    const response = await getAllCommentsForModule(this.moduleId);
    this.comments = response.results;
    console.log(this.comments);
    this.count = response.resultCount;
  };

  static get scopedElements() {
    return {
      'bcg-comment': BcgComment,
    };
  }

  render() {
    const { maxCharCount, currentCharCount, comments } = this;

    return html`
      <div style="display:flex; flex-direction:column;">
        <h2 style="flex-grow: 1;">Kommentare(${this.count || 0})</h2>
        <bcg-select>
          <select slot="input">
            <option selected hidden value>placeholder</option>
            <option value="Registrierung nötig ">Newest</option>
            <option value="keine Registrierung nötig (anonym)">Oldest</option>
          </select>
        </bcg-select>
        <bcg-form
          @submit=${async () => {
            await addCommentToModule(this.moduleId, this.newComment);
            this.setupComments();
          }}
        >
          <form @submit=${(e: any) => console.log(e)}>
            <bcg-textarea
              @model-value-changed=${({ target }: any) => {
                this.newComment = target.value;
              }}
              name="comment"
              id="comment-textarea"
              rows="4"
              placeholder="Wie finden Sie die Idee"
            ></bcg-textarea>

            <div style="display:flex;margin-top:20px;">
              <p style="flex-grow: 1;">${currentCharCount}/${maxCharCount}</p>
              <div>
                <bcg-button-submit>Kommentieren</bcg-button-submit>
              </div>
            </div>
          </form>
        </bcg-form>

        <div>
          ${comments &&
          comments.map(
            (comment: any) =>
              html`<bcg-comment
                .refresh=${this.setupComments}
                .comments="${comment}"
              ></bcg-comment>`
          )}
        </div>
        <div
          style="display:flex;align-items: center; align-content: center;justify-content: center; margin-top:20px;"
        >
          <bcg-button variant="secondary">Mehr Laden</bcg-button>
        </div>
      </div>
    `;
  }
}

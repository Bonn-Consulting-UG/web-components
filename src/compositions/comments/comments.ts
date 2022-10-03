import { html, LitElement, ScopedElementsMixin } from '@lion/core';
import { BcgComment } from './comment.js';

export interface CommentInterface {
  name: String;
  date: String | Date;
  icon: String;
  isModerator?: Boolean;
  children?: Array<CommentInterface>;
  comment: String;
  feedback: {
    likes: Number;
    dislikes: Number;
  };
}

export class BcgComments extends ScopedElementsMixin(LitElement) {
  static get scopedElements() {
    return {
      'bcg-comment': BcgComment
    };
  }

  maxCharCount: Number = 500;

  currentCharCount: Number = this.getElementsByTagName('textarea').length;

  commentChildren: Array<CommentInterface> = [];

  comments: Array<CommentInterface> = [];

  testcomment: CommentInterface = {
    name: 'Stefan Scheifel',
    date: '',
    isModerator: true,
    icon: 'https://pickaface.net/gallery/avatar/unr_test_180620_0636_ocf45ak.png',
    comment: '',
    feedback: {
      likes: 0,
      dislikes: 0
    }
  };

  render() {
    const { maxCharCount, currentCharCount, comments } = this;

    return html`
      <div style="display:flex; flex-direction:column;">
        <h2 style="flex-grow: 1;">Kommentare(count)</h2>
        <bcg-select>
          <select slot="input">
            <option selected hidden value>placeholder</option>
            <option value="Registrierung nötig ">Newest</option>
            <option value="keine Registrierung nötig (anonym)">Oldest</option>
          </select>
        </bcg-select>
        <bcg-form @submit=${console.log('test')}>
          <form @submit=${(e: any) => console.log(e)}>
            <bcg-textarea
              @model-value-changed=${(e: any) => e}
              name="comment"
              id="comment-textarea"
              rows="4"
              placeholder="Wie finden Sie die Idee"
            ></bcg-textarea>

            <div style="display:flex; margin-top:10px;">
              <p style="flex-grow: 1;">${currentCharCount}/${maxCharCount}</p>
              <bcg-button label="Kommentieren"></bcg-button>
            </div>
          </form>
        </bcg-form>

        <div>
          ${comments.map(
            comment => html`<bcg-comment .comments="${comment}"></bcg-comment>`
          )}
        </div>
        <bcg-button>Mehr Laden</bcg-button>
      </div>
    `;
  }
}

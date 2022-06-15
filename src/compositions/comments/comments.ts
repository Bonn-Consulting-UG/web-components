import { html, LitElement, ScopedElementsMixin } from '@lion/core';
import BcgTextarea from '../../components/textarea/index.js';
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
    return { 'bcg-textarea': BcgTextarea, 'bcg-comment': BcgComment };
  }

  commentChildren: Array<CommentInterface> = [
    {
      name: 'Carlos Caceres (Moderator)',
      date: 'Vor 4 Tagen',
      icon: 'https://pickaface.net/gallery/avatar/unr_test_180620_0636_ocf45ak.png',
      comment:
        'I think this n realen Projekten in einer realen Stadt und in einem realen Umfeld. Und auf dieser Basis ist das Reallabor Hamburg entstanden, mit über 30 Partnern, ganz vielen Projekten und einer Simulationsebene, um eben auch praktische Erkenntnisse zu erlangen.',
      feedback: {
        likes: 5,
        dislikes: 23,
      },
    },
    {
      name: 'Carlos Caceres (Moderator)',
      date: 'Vor 4 Tagen',
      icon: 'https://pickaface.net/gallery/avatar/unr_test_180620_0636_ocf45ak.png',
      comment:
        'I think this n realen Projekten in einer realen Stadt und in einem realen Umfeld. Und auf dieser Basis ist das Reallabor Hamburg entstanden, mit über 30 Partnern, ganz vielen Projekten und einer Simulationsebene, um eben auch praktische Erkenntnisse zu erlangen.',
      feedback: {
        likes: 5,
        dislikes: 23,
      },
    },
  ];

  comments: Array<CommentInterface> = [
    {
      name: 'Amelie',
      icon: 'https://pickaface.net/gallery/avatar/unr_test_180620_0636_ocf45ak.png',
      date: 'vor 1 Woche',
      comment:
        'ealen Projekten in einer realen Stadt und in einem realen Umfeld. Und auf dieser Basis ist das Reallabor Hamburg entstanden, mit über 30 Partnern, ganz vielen Projekten und einer Simulationsebene, um eben auch praktische Erkenntnisse zu erlangen.',
      children: [...this.commentChildren],
      feedback: {
        likes: 25,
        dislikes: 1,
      },
    },
  ];

  render() {
    return html`
      <div>
        <h1>Kommentare(count)</h1>
        <div style="max-width:100px;">
          <bcg-select></bcg-select>
        </div>
            <bcg-textarea placeholder="Wie finden Sie die Idee"></bcg-textarea>
           
            <div> 
            <p style="max-width:100px;" >0/5000</p>
                         <bcg-button label="Abbrechen"></bcg-button>
              <bcg-button label="Kommentieren"></bcg-button>


              ${this.comments.map(
                comment =>
                  html`<bcg-comment .comments="${comment}"></bcg-comment>`
              )}
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

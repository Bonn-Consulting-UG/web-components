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

  maxCharCount: Number = 500;

  currentCharCount: Number = this.getElementsByTagName('textarea').length;

  commentChildren: Array<CommentInterface> = [
    {
      name: 'Carlos Caceres (Moderator)',
      date: 'Vor 4 Tagen',
      isModerator: true,
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
      isModerator: true,
      icon: 'https://pickaface.net/gallery/avatar/unr_test_180620_0636_ocf45ak.png',
      comment:
        'I think this n realen Projekten in einer realen Stadt und in einem realen Umfeld. Und auf dieser Basis ist das Reallabor Hamburg entstanden, mit über 30 Partnern, ganz vielen Projekten und einer Simulationsebene, um eben auch praktische Erkenntnisse zu erlangen.',
      feedback: {
        likes: 5,
        dislikes: 23,
      },
    },
    {
      name: 'Carlos Caceres ',
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
      isModerator: false,
      comment:
        'ealen Projekten in einer realen Stadt und in einem realen Umfeld. Und auf dieser Basis ist das Reallabor Hamburg entstanden, mit über 30 Partnern, ganz vielen Projekten und einer Simulationsebene, um eben auch praktische Erkenntnisse zu erlangen.',
      children: [...this.commentChildren],
      feedback: {
        likes: 25,
        dislikes: 1,
      },
    },
    {
      name: 'Amelie',
      icon: 'https://pickaface.net/gallery/avatar/unr_test_180620_0636_ocf45ak.png',
      date: 'vor 1 Woche',
      isModerator: false,
      comment:
        'ealen Projekten in einer realen Stadt und in einem realen Umfeld. Und auf dieser Basis ist das Reallabor Hamburg entstanden, mit über 30 Partnern, ganz vielen Projekten und einer Simulationsebene, um eben auch praktische Erkenntnisse zu erlangen.',
      children: [...this.commentChildren],
      feedback: {
        likes: 25,
        dislikes: 1,
      },
    },
  ];

  testcomment: CommentInterface = {
    name: 'Stefan Scheifel',
    date: '',
    isModerator: true,
    icon: 'https://pickaface.net/gallery/avatar/unr_test_180620_0636_ocf45ak.png',
    comment: '',
    feedback: {
      likes: 0,
      dislikes: 0,
    },
  };

  updated() {
    console.log(this.renderRoot.querySelector('textarea')?.value);
  }

  render() {
    const { maxCharCount, currentCharCount, comments } = this;

    return html`
      <div>
        <div style="display:flex; flex-direction:column;">
          <h2  style="flex-grow: 1;">Kommentare(count)</h2>
          <bcg-select style="display: flex;align-self: flex-end;"></bcg-select>
          <div>
          <bcg-textarea id="comment-textarea" rows="4"  placeholder="Wie finden Sie die Idee"></bcg-textarea>  
</div>
            <div style="display:flex; margin-top:10px;"> 
              <p style="flex-grow: 1;" >${currentCharCount}/${maxCharCount}</p>
              <bcg-button label="Kommentieren"></bcg-button>
            </div>
            <div>
              ${comments.map(
                comment =>
                  html`<bcg-comment .comments="${comment}"></bcg-comment>`
              )}
            </div>
            <bcg-button style="display:flex;align-self:center; margin-top:20px;" label="Mehr Laden"></bcg-button>

          </div>
        </div>
      </div>
    `;
  }
}

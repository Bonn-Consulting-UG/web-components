import { html, LitElement, ScopedElementsMixin } from '@lion/core';
import { BcgModule } from '../../components/module/module.js';
import { getAllCommentsForModule,addCommentToModule } from '../../utils/services/comments.js';
import { BcgCommentReaction } from './comment-reaction.js';
import { BcgComment } from './comment.js';


export interface CommentInterface {
  id: string,
  status: string,
  isModerator: boolean 
  authorId: string,
  content: string,
  moduleId: string,
  children: Array<CommentInterface>,
  createdAt: string,
  updatedAt: string,
  firstName: string,
  lastName: string,
  email: string,
  isSubmission: boolean,
  templateId: string,
  title: string,
  _count: {
    likes: Number;
    dislikes: Number;
  };
}

export class BcgComments extends ScopedElementsMixin(BcgModule) {

  static get scopedElements() {
    return {
      'bcg-comment': BcgComment,
    };
  }

  connectedCallback () {
    super.connectedCallback();
    console.log(this.moduleId)
    this.test()
    console.log(this.comments)
  }



  maxCharCount: Number = 500;

  test: any = async()=> {
    this.comments =  await getAllCommentsForModule(this.moduleId)
    this.requestUpdate();
  }



  currentCharCount: Number = this.getElementsByTagName('textarea').length;

  newComment:any=""

  comments: any = [];


  

  render() {
    const { maxCharCount, currentCharCount, comments } = this;

    return html`
      <div style="display:flex; flex-direction:column;">
        <h2 style="flex-grow: 1;">Kommentare(${this.comments.resultCount || 0})</h2>
        <bcg-select>
          <select slot="input">
            <option selected hidden value>placeholder</option>
            <option value="Registrierung nötig ">Newest</option>
            <option value="keine Registrierung nötig (anonym)">Oldest</option>
          </select>
        </bcg-select>
        <bcg-form @submit=${async()=> {
          await addCommentToModule(this.moduleId,this.newComment),
          this.test();
          this.requestUpdate();
          }}>
          <form @submit=${(e: any) => console.log(e)}>
            <bcg-textarea
              @model-value-changed=${({ target }: any) => {
                this.newComment = target.value
                }}
              name="comment"
              id="comment-textarea"
              rows="4"
              placeholder="Wie finden Sie die Idee"
            ></bcg-textarea>

            <div style="display:flex;margin-top:20px;">
              <p style="flex-grow: 1;">${currentCharCount}/${maxCharCount}</p>
              <div>
              <bcg-button-submit >Kommentieren</bcg-button-submit>
              </div>
            </div>
          </form>
        </bcg-form>

        <div>
          ${comments.results && comments.results.map(
            (comment:any) => html`<bcg-comment .comments="${comment}"></bcg-comment>`
          )}
        </div>
        <div style="display:flex;align-items: center;
    align-content: center;
    justify-content: center; margin-top:20px;">
        <bcg-button variant="secondary">Mehr Laden</bcg-button>
        </div>
      </div>
    `;
  }
}

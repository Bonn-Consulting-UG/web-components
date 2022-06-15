
import { html,css, LitElement, ScopedElementsMixin, property } from '@lion/core';
import BcgTextarea from '../../components/textarea/index.js';
import { CommentInterface } from './comments.js';

export class BcgComment extends ScopedElementsMixin(LitElement) {
  comments: CommentInterface;

  constructor() {
    super();
    this.comments =  {
      name: '',
      date: '',
      icon: '',
      comment:
        '',
      feedback: {
        likes: 0,
        dislikes: 0,
      },
    };
  }

  static get styles() {
    return [
      css`
        :host .comment-response {
          background-color: grey;
          margin-left:100px;
          border-bottom:1px  white solid;
        }
        :host .comment-poster {
         display:flex;
         flex-direction:row;
        }
        :host .comment-wrapper {
          display:flex;
          flex-direction:column;
         }
         :host .comment-details {
          display:flex;
          flex-direction:column;
         }
        :host .comment-image {
          display:flex;
          align-self:center;
width:42px;
height:42px;
border-radius: 50%;
margin-right:15px;

         }
      `,
    ];
  }



  static get properties(){
    return {
      comments: {type: Array<CommentInterface>},
     }
 }

 static get scopedElements() {
  return { 'bcg-textarea': BcgTextarea };
}


  render() {
    return html`
    <div class="comment-wrapper">
    
    <div class="comment-poster">
      <img src="${this.comments.icon}" class="comment-image" alt="Avatar/Representation of the Poster">
      <div class="comment-poster-details">

        <p>${this.comments.name}</p>
        <p>${this.comments.date}</p>

      </div>



    </div>
    <div>
    <p>${this.comments.comment}</p>
</div>
    

    ${this.comments.children?.map(i => html `


    <div class="comment-wrapper comment-response">
    <div class="comment-poster">
    <img src="${i.icon}" class="comment-image" alt="Avatar/Representation of the Poster">

    <div class="comment-poster-details">
      <p>${i.name}</p>
      <p>${i.date}</p>
    </div> </div>

    <p>${i.comment}</p>

    </div>`
    
    )}


    </div>
    `
    }
  
}

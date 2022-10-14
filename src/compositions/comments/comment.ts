import { html, css, LitElement, ScopedElementsMixin } from '@lion/core';
import { de } from 'date-fns/locale';
import {  format, } from 'date-fns'

import { BcgCommentReaction } from './comment-reaction.js';
import { addReaction } from '../../utils/services/comments.js';


export class BcgComment extends ScopedElementsMixin(LitElement) {
  comments: any;

  constructor() {
    super();
    this.comments = {};
  }

  reactionConfig = [{
    value:0,
    icon: 'bcg:comments:thumbsup',
    clickHandler:() => console.log('click thumbps up')
  },{
    value:5,
    icon: 'bcg:comments:thumbsdown',
    clickHandler:() => console.log('click thumps down')
  },{
    value: 'Antworten',
    icon:"bcg:comments:message",
    clickHandler:() => console.log('click message')
  },{
    value:'Melden',
    icon:"bcg:comments:report",
    clickHandler:() => console.log('click report')
  }]




  static get scopedElements() {
    return {
      'bcg-comment-reaction': BcgCommentReaction,
    };
  }

  static get properties() {
    return {
      comments: { type: Object },
    };
  }

  static get styles() {
    return [
      css`
        :host .comment-response {
          background-color: white;
          margin-left: 100px;
          border: 1px grey solid;
        }
        :host .moderator {
          border-left: 5px solid green;
        }
        :host .moderator-name {
          color: green;
        }

        :host .comment-poster {
          display: flex;
          flex-direction: row;
        }
        :host .comment-wrapper {
          display: flex;
          flex-direction: column;
        }
        :host .comment-details {
          display: flex;
          flex-direction: column;
        }
        :host .comment-image {
          display: flex;
          align-self: center;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          margin-right: 15px;
        }
      `
    ];
  }

  render() {
    const { isModerator, createdAt, author,content, comments, _count,id } = this.comments;
    return html`
    <hr>
      <div class="comment-wrapper ${isModerator ? 'moderator' : null}">
        <div class="comment-poster">
          <img
            src="https://pickaface.net/gallery/avatar/unr_test_180620_0636_ocf45ak.png"
            class="comment-image"
            alt="Avatar/Representation of the Poster"
          />
          <div class="comment-poster-details">
            <p class=" ${author.roles.includes('MODERATOR') ? 'moderator-name' : null}">${author.firstName}${author.lastName}</p>            
            <p>${format(Date.parse(createdAt),'MM/dd/yyyy',{locale:de})}</p>    
          </div>
        </div>
        <div>
          <p>${content}</p>
          <bcg-reaction .reactions=${[{
    value:_count.likes,
    icon: 'bcg:comments:thumbsup',
    clickHandler:() => {addReaction({type:"LIKE"},id,null)}
  },{
    value:_count.dislikes,
    icon: 'bcg:comments:thumbsdown',
    clickHandler:() => {addReaction({type:"DISLIKE"},id,null)}
  },{
    value: 'Antworten',
    icon:"bcg:comments:message",
    clickHandler:() => console.log('click message')
  },{
    value:'Melden',
    icon:"bcg:comments:report",
    clickHandler:() => console.log('click report')
  }]}></bcg-reaction>
        </div>
        ${    console.log(this.comments)
}
        ${comments && comments.map(
          (i:any)=> html` <div
            class="comment-wrapper comment-response ${i.author.roles.includes('MODERATOR')
              ? 'moderator'
              : null}"
          >
            <div class="comment-poster">
              <img
                src="https://pickaface.net/gallery/avatar/unr_test_180620_0636_ocf45ak.png"
                class="comment-image"
                alt="Avatar/Representation of the Poster"
              />
              <div class="comment-poster-details">
                <p class=" ${i.isModerator ? 'moderator-name' : null}">
                  ${i.author.firstName} ${i.author.lastName}
                </p>
                <p>${format(Date.parse(i.createdAt),'MM/dd/yyyy',{locale:de})}</p>
              </div>
            </div>
            <p>${i.content}</p>
            <bcg-reaction></bcg-reaction>
          </div>`
        )}
      </div>
    `;
  }
}

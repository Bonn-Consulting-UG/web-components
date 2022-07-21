import { html, css, LitElement, ScopedElementsMixin } from '@lion/core';
import { BcgReaction } from '../reactions/reaction.js';
import { CommentInterface } from './comments.js';

export class BcgComment extends ScopedElementsMixin(LitElement) {
  comments: CommentInterface;

  constructor() {
    super();

    this.comments = {
      name: '',
      date: '',
      icon: '',
      comment: '',
      feedback: {
        likes: 0,
        dislikes: 0
      }
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

  static get scopedElements() {
    return { 'bcg-reaction': BcgReaction };
  }

  render() {
    const { isModerator, icon, date, name, comment, children } = this.comments;
    return html`
      <div class="comment-wrapper ${isModerator ? 'moderator' : null}">
        <div class="comment-poster">
          <img
            src="${icon}"
            class="comment-image"
            alt="Avatar/Representation of the Poster"
          />
          <div class="comment-poster-details">
            <p class=" ${isModerator ? 'moderator-name' : null}">${name}</p>
            <p>${date}</p>
          </div>
        </div>
        <div>
          <p>${comment}</p>
          <bcg-reaction></bcg-reaction>
        </div>
        ${children?.map(
          i => html` <div
            class="comment-wrapper comment-response ${i.isModerator
              ? 'moderator'
              : null}"
          >
            <div class="comment-poster">
              <img
                src="${i.icon}"
                class="comment-image"
                alt="Avatar/Representation of the Poster"
              />
              <div class="comment-poster-details">
                <p class=" ${i.isModerator ? 'moderator-name' : null}">
                  ${i.name}
                </p>
                <p>${i.date}</p>
              </div>
            </div>
            <p>${i.comment}</p>
            <bcg-reaction></bcg-reaction>
          </div>`
        )}
      </div>
    `;
  }
}

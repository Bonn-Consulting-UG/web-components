import { html, css, LitElement, ScopedElementsMixin } from '@lion/core';
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

  // render() {
  //   const { isModerator, icon, date, name, comment, children } = this.comments;
  //   return html` <bcg-reaction .config=${config}></bcg-reaction> `;
  // }
}
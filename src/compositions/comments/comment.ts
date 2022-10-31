import {
  html,
  css,
  LitElement,
  ScopedElementsMixin,
  property,
} from '@lion/core';
import { de } from 'date-fns/locale';
import { format } from 'date-fns';

import { addReaction, reportComment } from '../../utils/services/comments.js';
import { BcgModule } from '../../components/module/module.js';

export class BcgComment extends ScopedElementsMixin(BcgModule) {
  @property({ type: Object }) comments: any;

  @property({ type: Function }) setResponseTo: any;

  @property({ type: Function }) refresh: Function = () =>
    console.log('default');

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
      `,
    ];
  }

  render() {
    const { isModerator, createdAt, author, content, comments, _count, id } =
      this.comments;
    return html`
      <hr />
      <div class="comment-wrapper ${isModerator ? 'moderator' : null}">
        <div class="comment-poster">
          <div class="comment-poster-details">
            <p
              class=" ${author.roles.includes('MODERATOR')
                ? 'moderator-name'
                : null}"
            >
              ${author.firstName} ${author.lastName}
            </p>
            <p>
              ${format(Date.parse(createdAt), 'dd.MM.yyyy HH:mm ', {
                locale: de,
              })}
              Uhr
            </p>
          </div>
        </div>
        <div>
          <p>${content}</p>
          ${this.isLoggedIn
            ? html`<div style="display:flex;">
                <bcg-reaction
                  .value=${_count.likes}
                  .icon=${'bcg:comments:thumbsup'}
                  .clickHandler=${async () => {
                    await addReaction({ type: 'LIKE' }, id, null);
                    this.refresh();
                  }}
                ></bcg-reaction>
                <bcg-reaction
                  .value=${_count.dislikes}
                  .icon=${'bcg:comments:thumbsdown'}
                  .clickHandler=${async () => {
                    await addReaction({ type: 'DISLIKE' }, id, null);
                    this.refresh();
                  }}
                ></bcg-reaction>
                <bcg-reaction
                  .value=${'Antworten'}
                  .icon=${'bcg:comments:message'}
                  @click=${() => this.setResponseTo(this.comments)}
                ></bcg-reaction>
                <bcg-reaction
                  .value=${'Melden'}
                  .icon=${'bcg:comments:report'}
                  .clickHandler=${async () => {
                    await reportComment(this.comments.id);
                    this.refresh();
                  }}
                ></bcg-reaction>
              </div>`
            : null}
        </div>
        ${comments &&
        comments.map(
          (i: any, index: number) => html` <div
            class="comment-wrapper comment-response ${i.author.roles.includes(
              'MODERATOR'
            )
              ? 'moderator'
              : null}"
          >
            <div class="comment-poster">
              <div class="comment-poster-details">
                <p class=" ${i.isModerator ? 'moderator-name' : null}">
                  ${i.author.firstName} ${i.author.lastName}
                </p>
                <p>
                  ${format(Date.parse(createdAt), 'dd.MM.yyyy HH:mm ', {
                    locale: de,
                  })}
                  Uhr
                </p>
              </div>
            </div>
            <p>${i.content}</p>
            <div style="display:flex;">
              ${this.isLoggedIn
                ? html`
                    <bcg-reaction
                      .value=${_count.likes}
                      .icon=${'bcg:comments:thumbsup'}
                      .clickHandler=${async () => {
                        await addReaction({ type: 'LIKE' }, i.id, null);
                        this.refresh();
                      }}
                    ></bcg-reaction>
                    <bcg-reaction
                      .value=${_count.dislikes}
                      .icon=${'bcg:comments:thumbsdown'}
                      .clickHandler=${async () => {
                        await addReaction({ type: 'DISLIKE' }, i.id, null);
                        this.refresh();
                      }}
                    ></bcg-reaction>
                    <bcg-reaction
                      .value=${'Antworten'}
                      .icon=${'bcg:comments:message'}
                      @click=${() => this.setResponseTo(i)}
                    ></bcg-reaction>

                    <bcg-reaction
                      .value=${'Melden'}
                      .icon=${'bcg:comments:report'}
                      .clickHandler=${async () => {
                        await reportComment(i.id);
                        this.refresh();
                      }}
                    ></bcg-reaction>
                  `
                : null}
            </div>
          </div>`
        )}
      </div>
    `;
  }
}

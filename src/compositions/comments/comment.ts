import {
  html,
  css,
  LitElement,
  ScopedElementsMixin,
  property,
} from '@lion/core';
import { de } from 'date-fns/locale';
import { format } from 'date-fns';

import {
  addReaction,
  approveComment,
  censorComment,
  removeReaction,
  reportComment,
} from '../../utils/services/comments.js';
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
        .error-color {
          color: var(--alert-color-error) !important;
        }
      `,
    ];
  }

  render() {
    const { isModerator, createdAt, author, content, comments, _count, id } =
      this.comments;

    const likeReaction = this.comments.$userReactions.find(
      (e: any) => e.type === 'LIKE'
    );

    const dislikeReaction = this.comments.$userReactions.find(
      (e: any) => e.type === 'DISLIKE'
    );

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

          ${console.log()}
          ${this.isLoggedIn
            ? html`<div style="display:flex;">
                <bcg-button
                  @click="${async () => {
                    !dislikeReaction && !likeReaction
                      ? await addReaction({ type: 'LIKE' }, id, null)
                      : await removeReaction(likeReaction.id);
                    this.refresh();
                  }}"
                >
                  <bcg-reaction
                    .value=${_count.likes}
                    .icon=${'bcg:comments:thumbsup'}
                    iconclass=${likeReaction ? 'filled' : ''}
                  ></bcg-reaction>
                </bcg-button>
                <bcg-button
                  @click=${async () => {
                    !dislikeReaction && !likeReaction
                      ? await addReaction({ type: 'DISLIKE' }, id, null)
                      : await removeReaction(dislikeReaction.id);

                    this.refresh();
                  }}
                >
                  <bcg-reaction
                    .value=${_count.dislikes}
                    .icon=${'bcg:comments:thumbsdown'}
                    iconclass=${dislikeReaction ? 'filled' : ''}
                  ></bcg-reaction>
                </bcg-button>

                <bcg-button @click=${() => this.setResponseTo(this.comments)}>
                  <bcg-reaction
                    .value=${'Antworten'}
                    .icon=${'bcg:comments:message'}
                  ></bcg-reaction>
                </bcg-button>
                <bcg-button
                  @click=${async () => {
                    if (this.comments.$userReported) return;
                    await reportComment(this.comments.id);
                    this.refresh();
                  }}
                >
                  <bcg-reaction
                    .value=${this.comments.$userReported
                      ? 'Kommentar wurde gemeldet'
                      : 'Melden'}
                    .icon=${this.comments.$userReported
                      ? 'bcg:comments:reportFilled'
                      : 'bcg:comments:report'}
                    class=${this.comments.$userReported ? 'error-color' : ''}
                  ></bcg-reaction>
                </bcg-button>

                ${this.user.resource_access.account.roles.includes(
                  'manage-account'
                )
                  ? html`
                      ${this.comments.status === 'REPORTED' ||
                      this.comments.status === 'WAITING' ||
                      this.comments.status === 'CENSORED'
                        ? html` <bcg-button
                            @click=${async () => {
                              await approveComment(this.comments.id);
                              this.refresh();
                            }}
                          >
                            <bcg-reaction
                              .value=${'Kommentar freigeben'}
                              .icon=${'bcg:comments:report'}
                            ></bcg-reaction>
                          </bcg-button>`
                        : null}
                      ${this.comments.status === 'APPROVED' ||
                      this.comments.status === 'PUBLISHED'
                        ? html`<bcg-button
                            @click=${async () => {
                              await censorComment(this.comments.id);
                              this.refresh();
                            }}
                          >
                            <bcg-reaction
                              .value=${'Kommentar sperren'}
                              .icon=${'bcg:comments:report'}
                            ></bcg-reaction>
                          </bcg-button>`
                        : null}
                    `
                  : ''}
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
                    <bcg-button
                      @click=${async () => {
                        await addReaction({ type: 'LIKE' }, i.id, null);
                        this.refresh();
                      }}
                    >
                      <bcg-reaction
                        .value=${i._count.likes}
                        .icon=${'bcg:comments:thumbsup'}
                      ></bcg-reaction>
                    </bcg-button>
                    <bcg-button
                      @click=${async () => {
                        await addReaction({ type: 'DISLIKE' }, i.id, null);
                        this.refresh();
                      }}
                    >
                      <bcg-reaction
                        .value=${i._count.dislikes}
                        .icon=${'bcg:comments:thumbsdown'}
                      ></bcg-reaction>
                    </bcg-button>
                    <bcg-button
                      @click=${async () => {
                        if (i.$userReported) return;
                        await reportComment(i.id);
                        this.refresh();
                      }}
                    >
                      <bcg-reaction
                        .value=${i.$userReported
                          ? 'Kommentar wurde gemeldet'
                          : 'Melden'}
                        .icon=${i.$userReported
                          ? 'bcg:comments:reportFilled'
                          : 'bcg:comments:report'}
                        class=${i.$userReported ? 'error-color' : ''}
                      ></bcg-reaction>
                    </bcg-button>
                  `
                : null}
            </div>
          </div>`
        )}
      </div>
    `;
  }
}

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
    const {
      isModerator,
      createdAt,
      author,
      content,
      comments,
      _count,
      id,
      status,
    } = this.comments;

    const dialog: any = this.shadowRoot?.querySelector('#dialog');

    const likeReaction = (comment: any) =>
      comment.$userReactions.find((e: any) => e.type === 'LIKE');

    const dislikeReaction = (comment: any) =>
      comment.$userReactions.find((e: any) => e.type === 'DISLIKE');

    return html`
        <!--  <dialog id="dialog" open>
     <header style=" display:flex;justify-content: flex-end;align-content: flex-end;">
              <bcg-button id="close-button" variant="tertiary"
                ><lion-icon icon-id="bcg:general:cross"></bcg-icon
              ></bcg-button>
            </header>

           <p> Verstößt dieser Kommentar aus Ihrer Sicht wirklich gegen unsere Netiquette</p>
          <div>
          <bcg-button variant="primary">Ja</bcg-button>
          <bcg-button variant="primary">Nein</bcg-button>
          </div>
    </dialog> -->
        <hr />
        <div
          data-id=${id}
          class="comment-wrapper ${isModerator ? 'moderator' : null}"
        >
          <div class="comment-poster">
            <div class="comment-poster-details">
              <p
                class=" ${
                  author.roles.includes('MODERATOR') ? 'moderator-name' : null
                }"
              >
                ${
                  author.firstName
                    ? author.firstName
                    : html`<i><b>Gelöschtes Profil</b></i>`
                }
                ${author.lastName ? author.lastName : null}
                ${author.roles.includes('MODERATOR') ? '(Moderator)' : null}
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
            <p>
              ${
                status !== 'CENSORED'
                  ? content
                  : html`<span style="color:grey;">
                      Dieser Kommentar ist nicht sichtbar, weil er gegen die
                      Netiquette verstößt.</span
                    >`
              }
            </p>

            ${
              this.isLoggedIn && status !== 'CENSORED'
                ? html`<div style="display:flex;">
                    <bcg-button
                      @click="${async () => {
                        !dislikeReaction(this.comments) &&
                        !likeReaction(this.comments)
                          ? await addReaction({ type: 'LIKE' }, id, null)
                          : await removeReaction(
                              likeReaction(this.comments).id
                            );
                        this.refresh();
                      }}"
                    >
                      <bcg-reaction
                        .value=${_count.likes}
                        .icon=${'bcg:comments:thumbsup'}
                        iconclass=${likeReaction(this.comments) ? 'filled' : ''}
                      ></bcg-reaction>
                    </bcg-button>
                    <bcg-button
                      @click=${async () => {
                        !dislikeReaction(this.comments) &&
                        !likeReaction(this.comments)
                          ? await addReaction({ type: 'DISLIKE' }, id, null)
                          : await removeReaction(
                              dislikeReaction(this.comments).id
                            );

                        this.refresh();
                      }}
                    >
                      <bcg-reaction
                        .value=${_count.dislikes}
                        .icon=${'bcg:comments:thumbsdown'}
                        iconclass=${dislikeReaction(this.comments)
                          ? 'filled'
                          : ''}
                      ></bcg-reaction>
                    </bcg-button>

                    <bcg-button
                      @click=${() => this.setResponseTo(this.comments)}
                    >
                      <bcg-reaction
                        .value=${'Antworten'}
                        .icon=${'bcg:comments:message'}
                      ></bcg-reaction>
                    </bcg-button>

                    ${this.user.sub !== this.comments.authorId
                      ? html` <bcg-button
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
                            class=${this.comments.$userReported
                              ? 'error-color'
                              : ''}
                          ></bcg-reaction>
                        </bcg-button>`
                      : null}
                    ${this.user.sub === this.comments.authorId
                      ? html` <bcg-button
                          @click=${async () => {
                            console.log('remove comment');
                          }}
                        >
                          <bcg-reaction
                            .value=${this.comments.$userReported
                              ? 'Kommentar wurde gemeldet'
                              : 'Melden'}
                            .icon=${this.comments.$userReported
                              ? 'bcg:comments:reportFilled'
                              : 'bcg:comments:report'}
                            class=${this.comments.$userReported
                              ? 'error-color'
                              : ''}
                          ></bcg-reaction>
                        </bcg-button>`
                      : null}
                    ${this.user &&
                    this.user.realm_access.roles.includes('MODERATOR')
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
                : null
            }
          </div>
          ${
            comments &&
            comments.map(
              (i: any, index: number) => html` <div
                data-id=${i.id}
                class="comment-wrapper comment-response ${i.author.roles.includes(
                  'MODERATOR'
                )
                  ? 'moderator'
                  : null}"
              >
                <div class="comment-poster">
                  <div class="comment-poster-details">
                    <p
                      class=" ${i.author.roles.includes('MODERATOR')
                        ? 'moderator-name'
                        : null}"
                    >
                      ${i.author.firstName
                        ? i.author.firstName
                        : html`<i><b>Gelöschtes Profil</b></i>`}
                      ${i.author.lastName ? i.author.lastName : null}
                      ${i.author.roles.includes('MODERATOR')
                        ? '(Moderator)'
                        : null}
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
                  ${this.isLoggedIn && status !== 'CENSORED'
                    ? html`
                        <bcg-button
                          @click=${async () => {
                            !dislikeReaction(i) && !likeReaction(i)
                              ? await addReaction({ type: 'LIKE' }, i.id, null)
                              : await removeReaction(likeReaction(i).id);

                            this.refresh();
                          }}
                        >
                          <bcg-reaction
                            .value=${i._count.likes}
                            .icon=${'bcg:comments:thumbsup'}
                            iconclass=${likeReaction(i) ? 'filled' : ''}
                          ></bcg-reaction>
                        </bcg-button>
                        <bcg-button
                          @click=${async () => {
                            !dislikeReaction(i) && !likeReaction(i)
                              ? await addReaction(
                                  { type: 'DISLIKE' },
                                  i.id,
                                  null
                                )
                              : await removeReaction(dislikeReaction(i).id);
                            this.refresh();
                          }}
                        >
                          <bcg-reaction
                            .value=${i._count.dislikes}
                            .icon=${'bcg:comments:thumbsdown'}
                            iconclass=${dislikeReaction(i) ? 'filled' : ''}
                          ></bcg-reaction>
                        </bcg-button>
                        ${this.user.sub !== i.authorId
                          ? html` <bcg-button
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
                            </bcg-button>`
                          : null}
                        ${this.user.realm_access.roles.includes('MODERATOR')
                          ? html`
                              ${i.status === 'REPORTED' ||
                              i.status === 'WAITING' ||
                              i.status === 'CENSORED'
                                ? html` <bcg-button
                                    @click=${async () => {
                                      await approveComment(i.id);
                                      this.refresh();
                                    }}
                                  >
                                    <bcg-reaction
                                      .value=${'Kommentar freigeben'}
                                      .icon=${'bcg:comments:report'}
                                    ></bcg-reaction>
                                  </bcg-button>`
                                : null}
                              ${i.status === 'APPROVED' ||
                              i.status === 'PUBLISHED'
                                ? html`<bcg-button
                                    @click=${async () => {
                                      await censorComment(i.id);
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
                      `
                    : null}
                </div>
              </div>`
            )
          }
        </div>
      </dialog>
    `;
  }
}

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
import { BcgModeratorMenu } from './comment-moderator-menu.js';
import { BcgUserMenu } from './comment-user-menu.js';

export class BcgComment extends ScopedElementsMixin(BcgModule) {
  @property({ type: Object }) comments: any;

  @property({ type: Boolean }) isFocused: any;

  @property({ type: Function }) changeDialog: any;

  @property({ type: Function }) canEdit: any = false;

  @property({ type: Function }) setResponseTo: any;

  @property({ type: Boolean }) requestPending: boolean = false;

  @property({ type: Function }) refresh: Function = () =>
    console.log('default');

  @property({ type: Function }) onEdit: Function = () =>
    (this.canEdit = !this.canEdit);

  static get scopedElements() {
    return {
      'bcg-moderator-menu': BcgModeratorMenu,
      'bcg-user-comment-menu': BcgUserMenu,
    };
  }

  static get styles() {
    return [
      css`
        :host .comment-response {
          background-color: white;
          margin-left: 100px;
          border: none;!important;
        }
        :host .moderator {
          border-left: 3px solid #028e86;
        }
        :host .moderator-name {
          color: #028e86;
        }

        :host .comment-poster {
          display: flex;
          flex-direction: row;
        }
        :host .comment-wrapper {
          display: flex;
          flex-direction: column;
          padding: 14px;
          border-top: 1px solid var(--neutral-color-900);
          border-bottom: none;
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

  updated(changedProperties: any): void {
    this?.shadowRoot
      ?.querySelector(`#comment`)
      ?.addEventListener('mouseenter', () => (this.isFocused = true));

    this?.shadowRoot
      ?.querySelector(`#comment`)
      ?.addEventListener('mouseleave', () => (this.isFocused = false));
    console.log(this.isFocused);
    super.updated(changedProperties);
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
      authorId,
    } = this.comments;

    const likeReaction = (comment: any) =>
      comment.$userReactions.find((e: any) => e.type === 'LIKE');

    const dislikeReaction = (comment: any) =>
      comment.$userReactions.find((e: any) => e.type === 'DISLIKE');

    return html`
        <div
          id="comment"
          data-id=${id}
          class="comment-wrapper ${isModerator ? 'moderator' : null}"
        >
       ${
         this.isFocused & this.user.realm_access.roles.includes('MODERATOR')
           ? html`<bcg-moderator-menu
               .commentStatus=${this.comments.status}
               .commentId=${this.comments.id}
               .changeDialog=${this.changeDialog}
             ></bcg-moderator-menu>`
           : null
       } 
       ${
         this.isFocused && this.user.sub === authorId
           ? html` <bcg-user-comment-menu
               .commentStatus=${this.comments.status}
               .onEdit=${this.onEdit}
               .commentId=${this.comments.id}
               .changeDialog=${this.changeDialog}
             ></bcg-user-comment-menu>`
           : null
       }
       
          <div class="comment-poster">
            <div class="comment-poster-details">
            <p>
                ${
                  author.firstName
                    ? author.firstName
                    : html`<i><b>Gelöschtes Profil</b></i>`
                }
                ${author.lastName ? author.lastName : null}
               
                <span
                class=" ${
                  author.roles.includes('MODERATOR') ? 'moderator-name' : null
                }"
              >${author.roles.includes('MODERATOR') ? '(Moderator)' : null}
              </span>
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
                status !== 'CENSORED' ||
                (this.isLoggedIn &&
                  this.user.realm_access.roles.includes('MODERATOR'))
                  ? this.canEdit
                    ? html`<div style="display:flex;flex-direction:column;">
                        <bcg-textarea .value=${content}></bcg-textarea>
                        <div>
                          <bcg-button style="margin-top:10px;" variant="primary"
                            >Speichern</bcg-button
                          >
                          <bcg-button
                            @click=${this.onEdit}
                            style="margin-top:10px;"
                            variant="primary"
                            >Abbrechen</bcg-button
                          >
                        </div>
                      </div>`
                    : content
                  : html`<span style="color:grey;">
                      Dieser Kommentar ist nicht sichtbar, weil er gegen die
                      Netiquette verstößt.</span
                    >`
              }
            </p>

            ${
              (this.isLoggedIn && status !== 'CENSORED') ||
              (this.isLoggedIn &&
                this.user.realm_access &&
                this.user.realm_access.roles.includes('MODERATOR'))
                ? html`<div style="display:flex;">
                    <bcg-button
                      @click=${async () => {
                        if (this.requestPending) return;
                        this.requestPending = true;
                        !dislikeReaction(this.comments) &&
                        !likeReaction(this.comments)
                          ? await addReaction({ type: 'LIKE' }, id, null)
                          : await removeReaction(
                              likeReaction(this.comments).id ||
                                dislikeReaction(this.comments.id)
                            );
                        this.requestPending = false;
                        this.refresh();
                      }}
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
                        iconclass=${
                          dislikeReaction(this.comments) ? 'filled' : ''
                        }
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

                    <!-- ${
                      this.user.sub !== this.comments.authorId
                        ? html` <bcg-button
                            @click=${async () => {
                              if (this.comments.$userReported) return;
                              this.changeDialog('Hallo?', reportComment);
                              // await reportComment(this.comments.id);
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
                        : null
                    } -->
                    <!-- ${
                      this.user.sub === this.comments.authorId
                        ? html` <bcg-button
                            @click=${async () => {
                              this.changeDialog(
                                `Löschen ? ${this.comments.authorId}`
                              );
                            }}
                          >
                            <bcg-reaction
                              .value=${'Kommentar löschen'}
                              .icon=${'bcg:general:cross'}
                              class=${this.comments.$userReported
                                ? 'error-color'
                                : ''}
                            ></bcg-reaction>
                          </bcg-button>`
                        : null
                    } -->
                    <!-- ${
                      this.user &&
                      this.user.realm_access &&
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
                            -->
                          `
                        : ''
                    }
                  </div>`
                : null
            }
          </div>
          <!-- ${
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
                    <p>
                      ${i.author.firstName
                        ? i.author.firstNamex
                        : html`<i><b>Gelöschtes Profil</b></i>`}
                      ${i.author.lastName ? i.author.lastName : null}
                      <span
                        class=" ${i.author.roles.includes('MODERATOR')
                          ? 'moderator-name'
                          : null}"
                        ><b
                          >${i.author.roles.includes('MODERATOR')
                            ? '(Moderator)'
                            : null}</b
                        >
                      </span>
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
          } -->
        </div>
      </dialog>
    `;
  }
}

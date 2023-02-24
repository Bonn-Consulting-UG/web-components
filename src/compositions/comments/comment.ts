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
  addComment,
  addReaction,
  approveComment,
  censorComment,
  editComment,
  removeReaction,
  reportComment,
} from '../../utils/services/comments.js';
import { BcgModule } from '../../components/module/module.js';
import { BcgModeratorMenu } from './comment-moderator-menu.js';
import { BcgUserMenu } from './comment-user-menu.js';
import {
  MaxLength,
  MinLength,
  Required,
} from '../../utils/helpers/input-errors.js';
import { Func } from 'mocha';

export class BcgComment extends ScopedElementsMixin(BcgModule) {
  @property({ type: Object }) comments: any;

  @property({ type: Boolean }) isFocused: any;

  @property({ type: Function }) changeDialog: any;

  @property({ type: Function }) canEdit: any = false;

  @property({ type: Function }) setResponseTo: any;

  @property({ type: Function }) newComment: any;

  @property({ type: Boolean }) requestPending: boolean = false;

  @property({ type: Function }) changeReaction: any = async (type: any) => {
    const likeReaction = () =>
      this.comments.$userReactions.find((e: any) => e.type === 'LIKE');

    const dislikeReaction = () =>
      this.comments.$userReactions.find((e: any) => e.type === 'DISLIKE');

    if (this.requestPending) return;
    this.requestPending = true;

    if (!dislikeReaction() && !likeReaction()) {
      await addReaction({ type }, this.comments.id);
      this.refresh();
      setTimeout(() => (this.requestPending = false), 300);
    } else {
      await removeReaction(likeReaction()?.id || dislikeReaction()?.id);
      setTimeout(() => (this.requestPending = false), 300);
      this.refresh();
    }
  };

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

    super.updated(changedProperties);
  }

  render() {
    const likeReaction = (comment: any) =>
      comment.$userReactions.find((e: any) => e.type === 'LIKE');

    const dislikeReaction = (comment: any) =>
      comment.$userReactions.find((e: any) => e.type === 'DISLIKE');

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
      isDeleted,
    } = this.comments;

    const editSubmitHandler = async (ev: any) => {
      if (ev.target.hasFeedbackFor.includes('error')) {
        const firstFormElWithError = ev.target.formElements.find((el: any) =>
          el.hasFeedbackFor.includes('error')
        );
        firstFormElWithError.focus();
        return;
      }
      let newCommentId;
      console.log(ev.target);

      const resp = await editComment(id, this.newComment);
      this.refresh();
      this.canEdit = false;
    };

    return html`
    <a id=${id}></a>
        <div
          id="comment"
          data-id=${id}
          class="comment-wrapper ${isModerator ? 'moderator' : null}"
        >
       ${
         this.isFocused && this.user?.realm_access?.roles?.includes('MODERATOR')
           ? html`<bcg-moderator-menu
               style="position: relative;"
               .commentStatus=${this.comments.status}
               .commentId=${this.comments.id}
               .changeDialog=${this.changeDialog}
             ></bcg-moderator-menu>`
           : null
       } 
       ${
         this.isFocused && this.isLoggedIn
           ? html` <bcg-user-comment-menu
               style="position: relative;"
               .authorId=${this.comments.authorId}
               .commentStatus=${this.comments.status}
               .onEdit=${this.onEdit}
               .canEdit=${this.canEdit}
               .commentId=${this.comments.id}
               .changeDialog=${this.changeDialog}
             ></bcg-user-comment-menu>`
           : null
       }
       
          <div class="comment-poster">
            <div class="comment-poster-details">
            <p>
                ${
                  author && author.firstName
                    ? author.firstName
                    : html`<i><b>Gelöschtes Profil</b></i>`
                }
                ${author && author.lastName ? author.lastName : null}
               
                <span
                class=" ${
                  author && author.roles.includes('MODERATOR')
                    ? 'moderator-name'
                    : null
                }"
              >${
                author && author.roles.includes('MODERATOR')
                  ? '(Moderator)'
                  : null
              }</span>
            <span>${
              this.user.realm_access &&
              this.user.realm_access.roles.includes('MODERATOR')
                ? `Status:${this.comments.status}`
                : null
            }
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
                    ? html` <bcg-form
                        name="editform"
                        @submit=${editSubmitHandler}
                      >
                        <form @submit=${(e: any) => console.log(e)}>
                          <div style="display:flex;flex-direction:column;">
                            <bcg-textarea
                              name="edittextarea"
                              @model-value-changed=${({ target }: any) => {
                                this.newComment = target.value;
                              }}
                              .validators=${[
                                new Required(),
                                new MinLength(3),
                                new MaxLength(500),
                              ]}
                              .value=${content}
                            ></bcg-textarea>
                            <div>
                              <bcg-button-submit
                                style="margin-top:10px;"
                                variant="primary"
                                >Speichern</bcg-button-submit
                              >
                              <bcg-button
                                @click=${this.onEdit}
                                style="margin-top:10px;"
                                variant="primary"
                                >Abbrechen</bcg-button
                              >
                            </div>
                          </div>
                        </form></bcg-form
                      >`
                    : !isDeleted
                    ? content
                    : html`<span style="color:grey;">
                        Kommentar wurde durch Autor gelöscht</span
                      >`
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
                    <bcg-button @click=${() => this.changeReaction('LIKE')}>
                      <bcg-reaction
                        .value=${_count.likes}
                        .icon=${'bcg:comments:thumbsup'}
                        iconclass=${likeReaction(this.comments) ? 'filled' : ''}
                      ></bcg-reaction>
                    </bcg-button>

                    <bcg-button @click=${() => this.changeReaction('DISLIKE')}>
                      <bcg-reaction
                        .value=${_count.dislikes}
                        .icon=${'bcg:comments:thumbsdown'}
                        iconclass=${dislikeReaction(this.comments)
                          ? 'filled'
                          : ''}
                      ></bcg-reaction>
                    </bcg-button>

                    ${this.setResponseTo
                      ? html`<bcg-button
                          @click=${() => this.setResponseTo(this.comments)}
                        >
                          <bcg-reaction
                            .value=${'Antworten'}
                            .icon=${'bcg:comments:message'}
                          ></bcg-reaction>
                        </bcg-button>`
                      : null}
                  </div>`
                : null
            }
          </div>
        </div>
      </dialog>
    `;
  }
}

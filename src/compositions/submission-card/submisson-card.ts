import { css, html, LitElement, property, ScopedElementsMixin } from '@lion/core';
import { LionIcon } from '@lion/icon';
import { BcgButton } from '../../components/button/button';
import { BcgCard } from '../../components/card/card';
import { MapSubmission } from '../../model/MapSubmission';
import { BcgReaction } from '../reactions/reaction';

export class SubmissionCard extends ScopedElementsMixin(LitElement) {

  @property({ type: Object }) submission?: MapSubmission;
  @property({ type: String }) buttonLabel = 'Zum Hinweis';

  static get styles() {
    return [
      css`
      .card {
        max-width: 500px;
      }

      .content-wrapper {
        padding: 10px;
        max-width: 500px;
      }

      .text-container {
        max-width: 500px;
      }
      
      .creator-text {
        font-size: 0.9em;
        font-style: italic;
        margin: 0;
      }

      .title-text {
        font-size: 1.2em;
        font-weight: bold;
        margin: 0;
      }

      .actions-container {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        margin-top: 20px;
      }

      .reactions-container {
        display: flex;
        align-items: center;
      }

      .comment {
        display: flex;
        align-items: center;
      }

      .comment-icon {
        width: 18px;
        height: 18px;
        margin-left: 20px;
        margin-right: 10px
      }

      @media screen and (max-width:500px) {
        .actions-container {
          display: block;
        }

        .submission-button {
          width: 100%;
        }
      }
      `
    ];
  }

  static get scopedElements() {
    return {
      'bcg-card': BcgCard,
      'bcg-button': BcgButton,
      'lion-icon': LionIcon,
      'bcg-reaction': BcgReaction
    };
  }

  render() {
    return html`
    <bcg-card class="card">
      <slot name="content">
        <div class="content-wrapper">
          <div class="text-container">
            <p class="creator-text">${this.submission?.firstName} ${this.submission?.lastName}</p>
            <p class="creator-text">${new Date(this.submission?.createdAt ?? '').toLocaleDateString()}</p>
            <p class="title-text">${this.submission?.title}</p>
          </div>

          <div class="actions-container">
            <a
            href=${window.origin + '/submission/' + this.submission?.id}
            target="_blank">
              <bcg-button
              class="submission-button"
              variant="primary">${this.buttonLabel}</bcg-button>
            </a>
            <div class="reactions-container">
              <div class="comment">
                <lion-icon
                class="comment-icon"
                icon-id="bcg:comments:comment"
                ></lion-icon>
                <span style="margin-right: 20px">${this.submission?._count?.comments}</span>
              </div>
              <bcg-idea-reaction likeCount=${this.submission?._count?.likes} dislikeCount=${this.submission?._count?.dislikes}></bcg-idea-reaction>
            </div>
          </div>
        </div>
      </slot>
    </bcg-card>
    `;
  }
}

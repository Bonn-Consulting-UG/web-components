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
      .content-wrapper {
        padding: 10px;
      }

      .text-container {
        max-width: 500px;
      }
      
      .creator-text {
        font-size: 0.9em;
        font-style: italic;
      }

      .title-text {
        font-size: 1.2em;
        font-weight: bold;
        margin-top: 5px;
        margin-bottom: 5px;
      }

      .actions-container {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
        margin-top: 20px;
      }

      .reactions-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .comment-icon {
        width: 18px;
        height: 18px;
        margin-left: 20px;
        margin-right: 10px
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
    <bcg-card>
      <slot name="content">
        <div class="content-wrapper">
          <div class="text-container">
            <span class="creator-text">${this.submission?.firstName} ${this.submission?.lastName}</span>
            <p class="title-text">${this.submission?.title}</p>
            <span>${this.submission?.description}</span>
          </div>

          <div class="actions-container">
            <bcg-button variant="primary">${this.buttonLabel}</bcg-button>
            <div class="reactions-container">
              <lion-icon
              class="comment-icon"
              icon-id="bcg:comments:comment"
              ></lion-icon>
              <span style="margin-right: 20px">${this.submission?._count?.comments}</span>
              <bcg-idea-reaction likeCount=${this.submission?._count?.likes} dislikeCount=${this.submission?._count?.dislikes}></bcg-idea-reaction>
            </div>
          </div>
        </div>
      </slot>
    </bcg-card>
    `;
  }
}

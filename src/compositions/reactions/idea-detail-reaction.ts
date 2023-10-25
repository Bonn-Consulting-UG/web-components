import { html, css, ScopedElementsMixin, property } from '@lion/core';
import { BcgModule } from '../../components/module';
import { addReaction, getSubmission } from '../../utils/services/comments';

import { getModule } from '../../utils/services/module';

export class BcgIdeaReaction extends ScopedElementsMixin(BcgModule) {
  async connectedCallback(): Promise<void> {
    super.connectedCallback();
    await this.fetchData();
  }

  async fetchData(): Promise<void> {
    if (this.submissionId) {
      this.config = await getSubmission(this.submissionId);
      this.dislikeCount = this.config._count.dislikes;
      this.likeCount = this.config._count.likes;
    }

    if (this.moduleId) {
      this.config = await getModule(this.moduleId);
      this.dislikeCount = this.config._count.dislikes;
      this.likeCount = this.config._count.likes;
    }
  }
  @property({ type: Object }) likeCount: any = 0;
  @property({ type: Object }) dislikeCount: any = 0;

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
    return html`<div style="display:flex;">
      ${this.loadingHtml}
      <bcg-reaction
        .value=${this.likeCount}
        .icon=${'bcg:comments:thumbsup'}
        .clickHandler=${async () => {
          this.isLoading = true;
          await addReaction(
            { type: 'LIKE' },
            '',
            this.moduleId,
            this.submissionId
          ),
            setTimeout(() => (this.isLoading = false), 3000);
          this.fetchData();
        }}
      ></bcg-reaction>
      <bcg-reaction
        .value=${this.dislikeCount}
        .icon=${'bcg:comments:thumbsdown'}
        .clickHandler=${async () => {
          await addReaction(
            { type: 'DISLIKE' },
            '',
            this.moduleId,
            this.submissionId
          ),
            this.fetchData();
        }}
      ></bcg-reaction>
    </div>`;
  }
}

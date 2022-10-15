import { html, css, ScopedElementsMixin, property } from '@lion/core';
import { BcgModule } from '../../components/module';
import { addReaction } from '../../utils/services/comments';

import { getModule } from '../../utils/services/module';

export class BcgIdeaReaction extends ScopedElementsMixin(BcgModule) {
  async connectedCallback(): Promise<void> {
    super.connectedCallback();
    await this.fetchData();
  }

  async fetchData(): Promise<void> {
    this.count = await getModule(this.moduleId);
  }

  @property({ type: Object }) count: any = {};

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
        .value=${this.count?._count?.likes}
        .icon=${'bcg:comments:thumbsup'}
        .clickHandler=${async () => {
          this.isLoading = true;
          await addReaction({ type: 'LIKE' }, '', this.moduleId),
            setTimeout(() => (this.isLoading = false), 3000);

          this.fetchData();
        }}
      ></bcg-reaction>
      <bcg-reaction
        .value=${this.count?._count?.dislikes}
        .icon=${'bcg:comments:thumbsdown'}
        .clickHandler=${async () => {
          await addReaction({ type: 'DISLIKE' }, '', this.moduleId),
            this.fetchData();
        }}
      ></bcg-reaction>
    </div>`;
  }
}

import { html, css, ScopedElementsMixin, property } from '@lion/core';
import { BcgModule } from '../../components/module';
import { addReaction, getSubmission } from '../../utils/services/comments';

import { getModule } from '../../utils/services/module';

export class BcgIdeaReaction extends ScopedElementsMixin(BcgModule) {
  @property({ type: Object }) likeCount: any = 0;

  @property({ type: Object }) dislikeCount: any = 0;

  static get styles() {
    return [css``];
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
            this.moduleId || this.submissionId
          ),
            setTimeout(() => (this.isLoading = false), 3000);
        }}
      ></bcg-reaction>
      <bcg-reaction
        .value=${this.dislikeCount}
        .icon=${'bcg:comments:thumbsdown'}
        .clickHandler=${async () => {
          await addReaction(
            { type: 'DISLIKE' },
            '',
            this.moduleId || this.submissionId
          ),
            setTimeout(() => (this.isLoading = false), 3000);
        }}
      ></bcg-reaction>
    </div>`;
  }
}

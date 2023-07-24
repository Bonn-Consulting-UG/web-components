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
    if (this.submissionId !== 0) {
      this.config = await getSubmission(this.submissionId);
      this.dislikeCount = this.config._count.dislikes;
      this.likeCount = this.config._count.likes;
    }

    if (this.moduleId !== 0) {
      this.config = await getModule(this.moduleId);
      this.dislikeCount = this.config._count.dislikes;
      this.likeCount = this.config._count.likes;
    }
  }
  @property() label: any = 'Hinweis bewerten';
  @property({ type: Object }) likeCount: any = 0;
  @property({ type: Object }) dislikeCount: any = 0;

  static get styles() {
    return [
      css`
        .wrapper {
          background-color: var(--neutral-color);
        }
      `,
    ];
  }

  render() {
    return html`<div
      class="wrapper"
      style="display:flex; flex-direction:column; align-items:center;justify-content:center"
    >
      ${this.loadingHtml}
      ${this.config?.moduleConfig?.allowedSubmissionReactionTypes?.includes(
        'LIKE'
      ) ||
      this.config?.config?.allowedSubmissionReactionTypes?.includes('LIKE') ||
      this.config?.moduleConfig?.allowedSubmissionReactionTypes?.includes(
        'DISLIKE'
      ) ||
      this.config?.config?.allowedSubmissionReactionTypes?.includes('DISLIKE')
        ? html` <h5>${this.label}</h5>`
        : null}
      <div style="display:flex;">
        ${this.config?.moduleConfig?.allowedSubmissionReactionTypes?.includes(
          'LIKE'
        ) ||
        this.config?.config?.allowedSubmissionReactionTypes?.includes('LIKE')
          ? html` <bcg-reaction
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
            ></bcg-reaction>`
          : null}
        ${this.config?.moduleConfig?.allowedSubmissionReactionTypes?.includes(
          'DISLIKE'
        ) ||
        this.config?.config?.allowedSubmissionReactionTypes?.includes('DISLIKE')
          ? html` <bcg-reaction
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
            ></bcg-reaction>`
          : null}
      </div>
    </div>`;
  }
}

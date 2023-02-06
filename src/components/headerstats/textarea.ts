import { LionTextarea } from '@lion/textarea';
import { css, html, property, TemplateResultType } from '@lion/core';
import { MaxLength } from '@lion/form-core';

export class BcgTextarea extends LionTextarea {
  @property({ type: Function }) count: any = 0;

  static get styles() {
    return [...super.styles, css``];
  }

  updated(_changed: any) {
    super.updated(_changed);
    this.count = this.querySelector('textarea')?.value.length;
  }
  render() {
    return html`<div class="counter-wrapper">
      ${super.render()}

      <p
        class="counter     ${this.hasFeedbackFor.length > 0 && this.touched
          ? 'counter-with-feedback'
          : ''} ${this.label ? null : 'no-label'}"
      >
        ${this.count}
      </p>
    </div> `;
  }
}

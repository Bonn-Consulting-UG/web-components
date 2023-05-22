import { LionTextarea } from '@lion/textarea';
import { css, html, property, TemplateResultType } from '@lion/core';
import { MaxLength } from '@lion/form-core';

export class BcgTextarea extends LionTextarea {
  @property({ type: Function }) count: any = 0;

  static get styles() {
    return [
      ...super.styles,
      css`
        :host
          .input-group__container
          > .input-group__input
          ::slotted(.form-control) {
          padding: 8px;
          background-color: var(--neutral-color-0);
          border-radius: var(--border-radius-l);
          font-family: var(--primary-body-regular-L);
          color: var(--primary-color);
          border: var(--border-xs) solid var(--neutral-color-500);
        }

        :host .form-field__help-text ::slotted(div) {
          color: var(--neutral-color-500) !important;
        }
        .counter {
          position: absolute;
          right: 10px;
        }

        .counter-wrapper {
          position: relative;
        }
        .counter-with-feedback {
          bottom: 0px;
        }
        .no-label {
          // top: calc(80% - 10px);
        }
        :host .form-field__feedback {
          color: var(--alert-color-error);
        }
      `,
    ];
  }

  updated(_changed: any) {
    super.updated(_changed);
    this.count = this.querySelector('textarea')?.value.length;
  }
  render() {
    return html`<div class="counter-wrapper">
      ${super.render()}

      <div
        class="counter ${this.hasFeedbackFor.length > 0 && this.touched
          ? 'counter-with-feedback'
          : null} ${this.label ? null : 'no-label'}"
      >
        ${this.count}
      </div>
    </div> `;
  }
}

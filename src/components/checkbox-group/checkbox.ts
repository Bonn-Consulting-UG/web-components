import { html } from '@lion/core';
import { LionCheckbox } from '@lion/checkbox-group';

export class BcgCheckbox extends LionCheckbox {
  static get styles() {
    return [...super.styles];
  }

  render() {
    return html`
      <slot name="input"></slot>
      <div class="choice-field__graphic-container">
        ${this._choiceGraphicTemplate()}
      </div>
      <div class="choice-field__label">
        <slot name="label"></slot>
      </div>
    `;
  }
}

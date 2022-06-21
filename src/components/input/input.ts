import { LionInput } from '@lion/Input';
import { html, ScopedElementsMixin, LitElement, css } from '@lion/core';

export class BcgInput extends ScopedElementsMixin(LitElement) {
  label: string;

  placeholder: string;

  static get styles() {
    return [css``];
  }

  static get properties() {
    return {
      label: { type: String },
      placeholder: { type: String },
    };
  }

  constructor() {
    super();
    this.label = 'Default Label';
    this.placeholder = 'Default Placeholder';
  }

  static get scopedElements() {
    return { 'lion-input': LionInput };
  }

  render() {
    return html`<lion-input
      label="${this.label}"
      placeholder="${this.placeholder}"
    ></lion-input>`;
  }
}

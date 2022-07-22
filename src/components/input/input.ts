import { LionInput } from '@lion/input';
import { html, ScopedElementsMixin, LitElement, css } from '@lion/core';

export class BcgInput extends ScopedElementsMixin(LitElement) {
  label: string;

  type: string;

  placeholder: string;

  static get styles() {
    return [css``];
  }

  static get properties() {
    return {
      label: { type: String },
      placeholder: { type: String },
      type: { type: String }
    };
  }

  constructor() {
    super();
    this.label = '';
    this.placeholder = '';
    this.type = 'text';
  }

  static get scopedElements() {
    return { 'lion-input': LionInput };
  }

  render() {
    return html`<lion-input
      label="${this.label}"
      placeholder="${this.placeholder}"
      type="${this.type}"
    ></lion-input>`;
  }
}

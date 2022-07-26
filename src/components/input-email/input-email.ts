import { LionInputEmail } from '@lion/input-email';
import { html, ScopedElementsMixin, LitElement } from '@lion/core';

export class BcgInputEmail extends ScopedElementsMixin(LitElement) {
  static get scopedElements() {
    return { 'lion-input-email': LionInputEmail };
  }

  label: string;

  type: string;

  value: string;

  placeholder: string;

  static get properties() {
    return {
      label: { type: String },
      placeholder: { type: String },
      type: { type: String },
      value: { type: String },
      inputChanged: { type: Function }
    };
  }

  constructor() {
    super();
    this.label = '';
    this.placeholder = '';
    this.type = 'text';
    this.value = '';
    this.value = '';
  }

  changeValue(e: any) {
    this.value = e.target.value;
    const options = {
      detail: { newname: 'Changed From InputField' },
      bubbles: true,
      composed: true
    };
    this.dispatchEvent(new CustomEvent('input-changed', options));
  }

  render() {
    return html`<lion-input-email
      label="${this.label}"
      placeholder="${this.placeholder}"
      type="${this.type}"
      value="${this.value}"
      @change="${(e: any) => this.changeValue(e)}"
    ></lion-input-email> `;
  }
}

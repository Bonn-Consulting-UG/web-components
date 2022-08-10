import { LionInput } from '@lion/input';
import { html, ScopedElementsMixin, LitElement, css } from '@lion/core';

export class BcgInput extends ScopedElementsMixin(LitElement) {
  label: string;

  type: string;

  value: string;

  placeholder: string;

  static get styles() {
    return [css``];
  }

  static get properties() {
    return {
      label: { type: String },
      placeholder: { type: String },
      type: { type: String },
      value: { type: String },
      inputChanged: { type: Function }
    };
  }

  changeValue(e: any, key: any) {
    this.value = e.target.value;
    const options = {
      detail: { key },
      bubbles: true,
      composed: true
    };
    this.dispatchEvent(new CustomEvent('input-changed', options));
  }

  constructor() {
    super();
    this.label = '';
    this.placeholder = '';
    this.type = 'text';
    this.value = '';
  }

  static get scopedElements() {
    return { 'lion-input': LionInput };
  }

  render() {
    return html`<lion-input
      label="${this.label}"
      placeholder="${this.placeholder}"
      type="${this.type}"
      value="${this.value}"
      @change="${(e: any) => this.changeValue(e, this.label)}"
    ></lion-input>`;
  }
}

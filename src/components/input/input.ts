import { LionInput } from '@lion/Input';
import { html, ScopedElementsMixin, LitElement, css } from '@lion/core';

export class BcgInput extends ScopedElementsMixin(LitElement) {
  label: string;

  static get styles() {
    return [css``];
  }

  static get properties() {
    return {
      label: { type: String },
    };
  }

  constructor() {
    super();
    this.label = 'Default Label';
  }

  static get scopedElements() {
    return { 'lion-input': LionInput };
  }

  render() {
    return html`<lion-input label="${this.label}"></lion-input>`;
  }
}
